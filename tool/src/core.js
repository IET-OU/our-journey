/*!
  Core API | © 2018 The Open University (IET-OU).
*/

module.exports = /* WAS: window.our_journeys */ {
  // Functions.
  initialiseElements: initialiseElements,
  updateElements: updateElements,
  changeFocus: changeFocus,
  demoFill: demoFill,
  updateElement: updateElement,
  clearElement: clearElement,
  moveFwdElement: moveFwdElement,
  moveBackElement: moveBackElement,
  canvasGotFocus: canvasGotFocus,
  canvasLostFocus: canvasLostFocus,
  // Properties.
  getElements: getElements,
  setFocusElement: setFocusElement,
  getNumElements: getNumElements,
  editFocus: editFocus,
  stopFloatingFocus: stopFloatingFocus,
  addElements: addElements,
  getMaxElements: getMaxElements,
  addMoreFocus: addMoreFocus,
  setCardColour: setCardColour,
  isPrinting: isPrinting,
  cardFocus: cardFocus,
  addMoreCardFocus: addMoreCardFocus
};

const UI = require('./user-interface');
const ASSET = require('./assets');
const DIM = require('./dimension.json');
const LAYOUT = require('./layout');

// Status variables
var elements = [];
var focusElement = 0;
var canvasInFocus = false;
var floatEditing = false;
var focusOnAddMore = false;
var printed = false;
var cardColour = 'Ivory';

// Number of card elements presented in page
var numElements = 15;
var maxElements = 64;

// These variables state which elements are vertical ones for the default layout presentation. On the left (vl) or the right (vr).
var vlElements = [ 0, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60 ];
var vrElements = [ 4, 5, 14, 15, 24, 25, 34, 35, 44, 45, 54, 55, 64 ];

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  var focus = document.activeElement.getAttribute('id');
  if (canvasInFocus) {
    switch (keyName) {
      case 'ArrowUp':
        if (!((focus === 'floating_icon_select') || (focus === 'floating_emoticon_select'))) {
          event.preventDefault();
        }
        if (!floatEditing) {
          cyclePrevFocus();
        }
        break;
      case 'ArrowLeft':
        if (!floatEditing) {
          cyclePrevFocus();
        }
        break;
      case 'ArrowRight':
        if (!floatEditing) {
          cycleNextFocus();
        }
        break;
      case 'ArrowDown':
        if (!((focus === 'floating_icon_select') || (focus === 'floating_emoticon_select'))) {
          event.preventDefault();
        }
        if (!floatEditing) {
          cycleNextFocus();
        }
        break;
      case 'Enter':
        if (focus === 'floating_backform') {
          moveBackElement();
        } else if (focus === 'floating_forwardform') {
          moveFwdElement();
        } else if (focusOnAddMore) {
          LAYOUT.addElementsToLayout();
        } else if (!floatEditing) {
          editFocus();
        }
        break;
      case 'Escape':
        if (floatEditing) {
          editFocus();
          document.getElementById('group' + focusElement).focus();
        }
        break;
    }
  }
}, false);

window.addEventListener('beforeunload', function (e) {
  var confirmationMessage = 'WARNING: If you leave without saving, you will lose changes to your journey.';
  (e || window.event).returnValue = confirmationMessage;
  return confirmationMessage;
});

function initialiseElements (start) {
  for (var i = start; i < numElements; i++) {
    var element = { eID: 'place' + i, description: '', emoticon: 'none', icon: 'none', postit: '' };
    elements.push(element);
  }
  updateElements();
}

function demoFill () {
  for (var i = 0; i < elements.length; i++) {
    elements[i] = { eID: 'place' + i, description: 'test description ' + i, emoticon: 'happy', icon: 'timelost', postit: 'post it text' };
  }
  updateElements();
}

function elementClick () {
  var e = parseInt(this.id.substring(5));
  if (e !== focusElement) {
    focusElement = e;
    if (printed) {
      UI.toggleEditor('show');
      printed = false;
    }
    stopFloatingFocus();
  } else {
    editFocus();
  }
}

function cardFocus () {
  var e = parseInt(this.id.substring(5));
  if (e !== focusElement) {
    focusElement = e;
    changeFocus();
  }
}

function setCardColour (colour) {
  cardColour = colour;
  updateElements();
  document.getElementById('card_colour_select').value = cardColour;
}

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    var elementGroup = document.getElementById('group' + i);
    elementGroup.addEventListener('click', elementClick);
    elementGroup.addEventListener('focus', cardFocus);
    var card = document.getElementById('place' + i);
    card.style.fill = cardColour;
    if ((LAYOUT.getLayoutStyle() === 'default') && vlElements.includes(i)) {
      card.setAttribute('x', DIM.rectXV);
    } else {
      card.setAttribute('y', DIM.rectY);
    }

    updateDescription(i);

    updateEmoticon(i);

    updateIcon(i);

    updatePostIt(i);

    updateAltText(i);
  }
}

function updateDescription (i) {
  var eText = document.getElementById('description' + i);
  var layout = LAYOUT.getLayoutStyle();
  eText.textContent = getElement(i).description;
  if ((layout === 'default') && vlElements.includes(i)) {
    eText.setAttribute('x', DIM.textXV);
    eText.setAttribute('y', DIM.textYV);
  } else if ((layout === 'default') && vrElements.includes(i)) {
    eText.setAttribute('x', DIM.textXVR);
    eText.setAttribute('y', DIM.textYVR);
  } else {
    eText.setAttribute('x', DIM.textX);
    eText.setAttribute('y', DIM.textY);
  }
}

function updateEmoticon (i) {
  var eEmo = document.getElementById('emoticon' + i);
  var emptyEmo = document.getElementById('empty_emoticon');
  var emptyEmoText = document.getElementById('empty_emoticon_text');
  var layoutStyle = LAYOUT.getLayoutStyle();
  if (getElement(i).emoticon !== 'none') {
    for (var j = 0; j < ASSET.emoticonCount(); j++) {
      if (ASSET.hasEmoticon(j, getElement(i))) {
        eEmo.setAttribute('height', DIM.emoticonHeight);
        eEmo.setAttribute('width', DIM.emoticonWidth);
        if ((layoutStyle === 'default') && (vlElements.includes(i))) {
          eEmo.setAttribute('x', DIM.emoticonXV);
          eEmo.setAttribute('y', DIM.emoticonYV);
        } else if ((layoutStyle === 'default') && (vrElements.includes(i))) {
          eEmo.setAttribute('x', DIM.emoticonXVR);
          eEmo.setAttribute('y', DIM.emoticonYVR);
        } else {
          eEmo.setAttribute('x', DIM.emoticonX);
          eEmo.setAttribute('y', DIM.emoticonY);
        }
        eEmo.setAttribute('display', 'inline');
        eEmo.setAttribute('href', ASSET.getEmoticonPath(j));
        eEmo.setAttribute('alt', ASSET.getEmoticonName(j));
        emptyEmo.setAttribute('fill-opacity', '0.0');
        emptyEmoText.textContent = '';
      }
    }
  } else {
    eEmo.setAttribute('display', 'none');
  }
}

function updateIcon (i) {
  var eIcon = document.getElementById('icon' + i);
  var emptyIcon = document.getElementById('empty_icon');
  var emptyIconText = document.getElementById('empty_icon_text');
  var layoutStyle = LAYOUT.getLayoutStyle();
  if (getElement(i).icon !== 'none') {
    for (var j = 0; j < ASSET.iconCount(); j++) {
      if (ASSET.hasIcon(j, getElement(i))) {
        eIcon.setAttribute('height', DIM.iconHeight);
        eIcon.setAttribute('width', DIM.iconWidth);
        if ((layoutStyle === 'default') && (vlElements.includes(i))) {
          eIcon.setAttribute('x', DIM.iconXV);
          eIcon.setAttribute('y', DIM.iconYV);
        } else {
          eIcon.setAttribute('x', DIM.iconX);
          eIcon.setAttribute('y', DIM.iconY);
        }
        eIcon.setAttribute('display', 'inline');
        eIcon.setAttribute('href', ASSET.getIconPath(j));
        eIcon.setAttribute('alt', ASSET.getIconName(j));
        emptyIcon.setAttribute('fill-opacity', '0.0');
        emptyIconText.textContent = '';
      }
    }
  } else {
    eIcon.setAttribute('display', 'none');
  }
}

function updatePostIt (i) {
  var ePostIt = document.getElementById('postit' + i);
  var ePostItText = document.getElementById('postittext' + i);
  var layoutStyle = LAYOUT.getLayout();
  if (getElement(i).postit !== '') {
    ePostIt.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('width', DIM.postitTextWidth);
    // ePostItText.setAttribute('y', DIM.postitTextY);

    if (((layoutStyle === 'default') && vlElements.includes(i))) {
      ePostIt.setAttribute('y', DIM.postitVY);
      ePostIt.setAttribute('x', DIM.postitVX);
      ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVY);
      ePostItText.setAttribute('x', DIM.postitTextVX);
      ePostItText.setAttribute('y', DIM.postitTextVY);
    } else if ((layoutStyle === 'default') && vrElements.includes(i)) {
      ePostIt.setAttribute('x', DIM.postitVRX);
      ePostIt.setAttribute('y', DIM.postitVRY);
      ePostItText.setAttribute('y', DIM.postitTextVRY);
      ePostItText.setAttribute('x', DIM.postitTextVRX);
    } else if (layoutStyle === 'scol') {
      ePostIt.setAttribute('x', DIM.postitScolX);
      ePostIt.setAttribute('y', DIM.postitScolY);
      ePostItText.setAttribute('y', DIM.postitTextScolY + DIM.postitScolY);
      ePostItText.setAttribute('x', DIM.postitTextScolX);
    } else if (layoutStyle === 'default') {
      ePostIt.setAttribute('x', DIM.postitX);
      ePostIt.setAttribute('y', DIM.postitY);
      ePostItText.setAttribute('x', DIM.postitTextX);
      ePostItText.setAttribute('y', DIM.postitTextY);
    }
    ePostItText.textContent = getElement(i).postit;
  } else {
    ePostIt.setAttribute('visibility', 'collapse');
    ePostItText.setAttribute('visibility', 'collapse');
  }
}

function updateAltText (i) {
  var ePlace = document.getElementById('group' + i);
  var iconText;
  for (var j = 0; j < ASSET.iconCount(); j++) {
    if (ASSET.hasIcon(j, getElement(i))) {
      iconText = ASSET.getIconAlt(j);
    }
  }
  var alttext = 'Card ' + i + '. Event: ' + iconText + ' : ' + elements[i].description + '. Feeling ' + elements[i].emoticon + '. ' + elements[i].postit;
  ePlace.setAttribute('aria-label', alttext);
}

function changeFocus () {
  for (var i = 0; i < elements.length; i++) {
    document.getElementById(elements[i].eID).setAttribute('class', 'not-focussed');
  }
  document.getElementById(elements[focusElement].eID).setAttribute('class', 'focussed');
  document.getElementById('group' + focusElement).focus();
  if (UI.getEditor() === 'fixed') {
    document.getElementById('event_desc').value = elements[focusElement].description;
    document.getElementById('icon_select').value = elements[focusElement].icon;
    document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
    document.getElementById('post_it_text').value = elements[focusElement].postit;
    document.getElementById('title').innerHTML = 'Journey Editor: Card ' + focusElement;
  } else if (UI.getEditor() === 'float') {
    stopFloatingFocus();
    addMoreFocus(false);
  }
  if (focusElement !== -1) {
    var focusY = document.getElementById('group' + focusElement).getAttribute('y');
    window.scrollTo(0, focusY - 200);
  }
}

function addMoreCardFocus () {
  // - Needs improvement - tab focus does not remove focus from previous element
  focusOnAddMore = true;
  focusElement = -1;
  // addMoreFocus(true);
  // changeFocus();
  var focusY = document.getElementById('add_more_card').getAttribute('y');
  window.scrollTo(0, focusY);
}

function addMoreFocus (focusin) {
  if (focusin) {
    document.getElementById('add_more_rect').setAttribute('class', 'focussed');

    // -causes loop? updateElements();
  } else {
    document.getElementById('add_more_rect').setAttribute('class', 'not-focussed');
    focusOnAddMore = false;
  }
}

function stopFloatingFocus () {
  document.getElementById('floating_editor').setAttribute('visibility', 'collapse');
  floatEditing = false;
}

function editFocus () {
  var newX;
  var newY;
  if (UI.getEditor() === 'float') {
    if (floatEditing) {
      stopFloatingFocus();
    } else {
      if (LAYOUT.getLayoutStyle() === 'scol') {
        newY = (focusElement * 130) + 170;
        document.getElementById('floating_editor').setAttribute('x', '0');
        document.getElementById('floating_editor').setAttribute('y', newY);
        document.getElementById('floating_editor').setAttribute('visibility', 'visible');
      } else if (LAYOUT.getLayoutStyle() === 'default') {
        var layoutData = LAYOUT.getLayoutData();
        newX = layoutData[LAYOUT.getLayout()][focusElement]['{x}'];
        newY = layoutData[LAYOUT.getLayout()][focusElement]['{y}'];
        document.getElementById('floating_editor').setAttribute('x', newX);
        document.getElementById('floating_editor').setAttribute('y', newY);
        document.getElementById('floating_editor').setAttribute('visibility', 'visible');
        if (vlElements.includes(focusElement)) {
          document.getElementById('floating_editor_outline').setAttribute('width', DIM.floatEditOutlineVW);
          document.getElementById('floating_editor_outline').setAttribute('height', DIM.floatEditOutlineVH);
          document.getElementById('floating_editor_outline').setAttribute('x', DIM.floatEditOutlineVX);
          document.getElementById('floating_editor_outline').setAttribute('y', DIM.floatEditOutlineVY);
          document.getElementById('floating_icon').setAttribute('x', DIM.floatEditIconVX);
          document.getElementById('floating_icon').setAttribute('y', DIM.floatEditIconVY);
          document.getElementById('floating_emoticon').setAttribute('x', DIM.floatEditEmoVX);
          document.getElementById('floating_emoticon').setAttribute('y', DIM.floatEditEmoVY);
          document.getElementById('floating_desc').setAttribute('x', DIM.floatEditDescVX);
          document.getElementById('floating_desc').setAttribute('y', DIM.floatEditDescVY);
          document.getElementById('empty_icon').setAttribute('x', DIM.floatEmptyIconVX);
          document.getElementById('empty_icon').setAttribute('y', DIM.floatEmptyIconVY);
          document.getElementById('empty_emoticon').setAttribute('x', DIM.floatEmptyEmoVX);
          document.getElementById('empty_emoticon').setAttribute('y', DIM.floatEmptyEmoVY);
          document.getElementById('floating_back').setAttribute('x', DIM.floatBackVX);
          document.getElementById('floating_back').setAttribute('y', DIM.floatBackVY);
          document.getElementById('floating_fwd').setAttribute('x', DIM.floatFwdVX);
          document.getElementById('floating_fwd').setAttribute('y', DIM.floatFwdVY);
          document.getElementById('floating_post').setAttribute('x', DIM.floatPostItVX);
          document.getElementById('floating_post').setAttribute('y', DIM.floatPostItVY);
        } else if (vrElements.includes(focusElement)) {
          document.getElementById('floating_editor_outline').setAttribute('width', DIM.floatEditOutlineVRW);
          document.getElementById('floating_editor_outline').setAttribute('height', DIM.floatEditOutlineVRH);
          document.getElementById('floating_editor_outline').setAttribute('x', DIM.floatEditOutlineVRX);
          document.getElementById('floating_editor_outline').setAttribute('y', DIM.floatEditOutlineVRY);
          document.getElementById('floating_icon').setAttribute('x', DIM.floatEditIconVRX);
          document.getElementById('floating_icon').setAttribute('y', DIM.floatEditIconVRY);
          document.getElementById('floating_emoticon').setAttribute('x', DIM.floatEditEmoVRX);
          document.getElementById('floating_emoticon').setAttribute('y', DIM.floatEditEmoVRY);
          document.getElementById('floating_desc').setAttribute('x', DIM.floatEditDescVRX);
          document.getElementById('floating_desc').setAttribute('y', DIM.floatEditDescVRY);
          document.getElementById('empty_icon').setAttribute('x', DIM.floatEmptyIconVRX);
          document.getElementById('empty_icon').setAttribute('y', DIM.floatEmptyIconVRY);
          document.getElementById('empty_emoticon').setAttribute('x', DIM.floatEmptyEmoVRX);
          document.getElementById('empty_emoticon').setAttribute('y', DIM.floatEmptyEmoVRY);
          document.getElementById('floating_back').setAttribute('x', DIM.floatBackVRX);
          document.getElementById('floating_back').setAttribute('y', DIM.floatBackVRY);
          document.getElementById('floating_fwd').setAttribute('x', DIM.floatFwdVRX);
          document.getElementById('floating_fwd').setAttribute('y', DIM.floatFwdVRY);
          document.getElementById('floating_post').setAttribute('x', DIM.floatPostItVRX);
          document.getElementById('floating_post').setAttribute('y', DIM.floatPostItVRY);
        } else {
          document.getElementById('floating_editor_outline').setAttribute('width', DIM.floatEditOutlineW);
          document.getElementById('floating_editor_outline').setAttribute('height', DIM.floatEditOutlineH);
          document.getElementById('floating_editor_outline').setAttribute('x', DIM.floatEditOutlineX);
          document.getElementById('floating_editor_outline').setAttribute('y', DIM.floatEditOutlineY);
          document.getElementById('floating_icon').setAttribute('x', DIM.floatEditIconX);
          document.getElementById('floating_icon').setAttribute('y', DIM.floatEditIconY);
          document.getElementById('floating_emoticon').setAttribute('x', DIM.floatEditEmoX);
          document.getElementById('floating_emoticon').setAttribute('y', DIM.floatEditEmoY);
          document.getElementById('floating_desc').setAttribute('x', DIM.floatEditDescX);
          document.getElementById('floating_desc').setAttribute('y', DIM.floatEditDescY);
          document.getElementById('empty_icon').setAttribute('x', DIM.floatEmptyIconX);
          document.getElementById('empty_icon').setAttribute('y', DIM.floatEmptyIconY);
          document.getElementById('empty_emoticon').setAttribute('x', DIM.floatEmptyEmoX);
          document.getElementById('empty_emoticon').setAttribute('y', DIM.floatEmptyEmoY);
          document.getElementById('floating_back').setAttribute('x', DIM.floatBackX);
          document.getElementById('floating_back').setAttribute('y', DIM.floatBackY);
          document.getElementById('floating_fwd').setAttribute('x', DIM.floatFwdX);
          document.getElementById('floating_fwd').setAttribute('y', DIM.floatFwdY);
          document.getElementById('floating_post').setAttribute('x', DIM.floatPostItX);
          document.getElementById('floating_post').setAttribute('y', DIM.floatPostItY);
        }
      }
      var iconValue = elements[focusElement].icon;
      var emoValue = elements[focusElement].emoticon;
      var emptyIcon = document.getElementById('empty_icon');
      var emptyEmo = document.getElementById('empty_emoticon');
      var emptyIconText = document.getElementById('empty_icon_text');
      var emptyEmoText = document.getElementById('empty_emoticon_text');
      document.getElementById('floating_icon_select').value = iconValue;
      if (iconValue === 'none') {
        emptyIcon.setAttribute('fill-opacity', '0.5');
        emptyIconText.textContent = '1. What happened?';
      } else {
        emptyIcon.setAttribute('fill-opacity', '0.0');
        emptyIconText.textContent = '';
      }
      document.getElementById('floating_emoticon_select').value = emoValue;
      if (emoValue === 'none') {
        emptyEmo.setAttribute('fill-opacity', '0.5');
        emptyEmoText.textContent = '3. How did you feel?';
      } else {
        emptyEmo.setAttribute('fill-opacity', '0.0');
        emptyEmoText.textContent = '';
      }
      document.getElementById('floating_event_desc').value = elements[focusElement].description;
      document.getElementById('floating_post_it_text').value = elements[focusElement].postit;
      floatEditing = true;
      document.getElementById('floating_icon_select').focus();
    }
  } else if (UI.getEditor() === 'fixed') {
    document.getElementById('event_desc').focus();
  }
}

function canvasGotFocus () {
  canvasInFocus = true;
}

function canvasLostFocus () {
  canvasInFocus = false;
}

function cycleNextFocus () {
  if ((elements.length - 1) > focusElement) {
    focusElement++;
    changeFocus();
  } else {
    if (numElements < maxElements) {
      addMoreFocus(true);
      focusElement = -1;
      changeFocus();
    }
  }
}

function cyclePrevFocus () {
  if (focusElement > 0) {
    focusElement--;
    changeFocus();
  }
  if (focusOnAddMore) {
    addMoreFocus(false);
    focusElement = numElements - 1;
    changeFocus();
  }
}

function updateElement () {
  if (UI.getEditor() === 'fixed') {
    elements[focusElement].description = document.getElementById('event_desc').value;
    elements[focusElement].icon = document.getElementById('icon_select').value;
    elements[focusElement].emoticon = document.getElementById('emoticon_select').value;
    elements[focusElement].postit = document.getElementById('post_it_text').value;
  } else if (UI.getEditor() === 'float') {
    elements[focusElement].icon = document.getElementById('floating_icon_select').value;
    elements[focusElement].emoticon = document.getElementById('floating_emoticon_select').value;
    elements[focusElement].description = document.getElementById('floating_event_desc').value;
    elements[focusElement].postit = document.getElementById('floating_post_it_text').value;
  }
  updateElements();
}

function clearElement () {
  // clears the information contained in the focused on element.
  elements[focusElement] = { eID: 'place' + focusElement, description: '', emoticon: 'none', icon: 'none', postit: '' };
  updateElements();
  changeFocus();
}

function moveBackElement () {
  // moves the focused on element back towards the start
  if (focusElement > 0) {
    // swap the elements
    var swap = elements[focusElement - 1];
    elements[focusElement - 1] = elements[focusElement];
    elements[focusElement] = swap;
    // swap the eID strings for the elements to maintain correct link to the locations
    var swapeIDfore = elements[focusElement].eID;
    var swapeIDback = elements[focusElement - 1].eID;
    elements[focusElement - 1].eID = swapeIDfore;
    elements[focusElement].eID = swapeIDback;
    // return focus to the same element as at the start of this process
    focusElement--;
    changeFocus();
    editFocus();
  }
  updateElements();
}

function moveFwdElement () {
  // moves the focused on element forward from its current position
  if (focusElement < (elements.length - 1)) {
    // swap the elements
    var swap = elements[focusElement + 1];
    elements[focusElement + 1] = elements[focusElement];
    elements[focusElement] = swap;
    // swap the eID strings for the elements to maintain correct link to the locations
    var swapeIDfore = elements[focusElement].eID;
    var swapeIDback = elements[focusElement + 1].eID;
    elements[focusElement + 1].eID = swapeIDfore;
    elements[focusElement].eID = swapeIDback;
    focusElement++;
    changeFocus();
    editFocus();
  }
  updateElements();
}

function setFocusElement (num) {
  focusElement = num;
}

function getElements () {
  return elements;
}

function getElement (idx) {
  return elements[ idx ];
}

function getNumElements () {
  return numElements;
}

function addElements (addition) {
  numElements = numElements + addition;
}

function getMaxElements () {
  return maxElements;
}

function isPrinting () {
  printed = true;
}
