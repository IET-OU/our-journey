/* Core API | ©The Open University.
*/

module.exports = {
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
  addMoreCardFocus: addMoreCardFocus,
  clearFocus: clearFocus,
  addCard: addCard,
  moveMenuChanged: moveMenuChanged
};

const UI = require('./user-interface');
const ASSET = require('./assets');
const DIM = require('./dimension.json');
const LAYOUT = require('./layout');
const UTIL = require('./util');

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

document.addEventListener('keydown', function (event) { // Was: , (event) => {
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
      case 'Tab':
        if (floatEditing) {
          if (focus === 'floating_move_menu') {
            if (event.shiftKey === false) {
              editFocus();
              document.getElementById('group' + focusElement).focus();
            }
          }
          if (focus === 'floating_icon_select') {
            if (event.shiftKey === true) {
              if (focusElement === 0) {
                event.preventDefault();
                editFocus();
                document.getElementById('help_link').focus();
              } else {
                editFocus();
                document.getElementById('group' + focusElement).focus();
              }
            }
          }
        }
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
  var layoutStyle = LAYOUT.getLayoutStyle();
  if (getElement(i).postit !== '') {
    ePostIt.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('width', DIM.postitTextWidth);
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
  UI.toggleOptions(0);
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

function clearFocus () {
  focusElement = -1;
  for (var i = 0; i < elements.length; i++) {
    document.getElementById(elements[i].eID).setAttribute('class', 'not-focussed');
  }
}

function addMoreCardFocus () {
  // - Needs improvement - tab focus does not remove focus from previous element
  focusOnAddMore = true;
  focusElement = -1;
  // addMoreFocus(true);
  // changeFocus();
  var focusY = UTIL.qs('#add_more_card').getAttribute('y');
  window.scrollTo(0, focusY);
}

function addMoreFocus (focusin) {
  if (focusin) {
    UTIL.qs('#add_more_rect').setAttribute('class', 'focussed');

    // -causes loop? updateElements();
  } else {
    UTIL.qs('#add_more_rect').setAttribute('class', 'not-focussed');
    focusOnAddMore = false;
  }
}

function stopFloatingFocus () {
  UTIL.qs('#floating_editor').setAttribute('visibility', 'collapse');
  floatEditing = false;
}

function editFocus () {
  const FL_EDITOR = UTIL.qs('#floating_editor');
  const FL_ED_OUTLINE = UTIL.qs('#floating_editor_outline');
  const FL_ICON = UTIL.qs('#floating_icon');
  const FL_EMOJI = UTIL.qs('#floating_emoticon');
  const FL_DESC = UTIL.qs('#floating_desc');
  const FL_BACK = UTIL.qs('#floating_back');
  const FL_FWD = UTIL.qs('#floating_fwd');
  const FL_POST = UTIL.qs('#floating_post');
  const FL_ADD = UTIL.qs('#floating_add');
  const EM_ICON = UTIL.qs('#empty_icon');
  const EM_EMOJI = UTIL.qs('#empty_emoticon');
  const FL_MOVE = UTIL.qs('#floating_move');

  const FOCUS_EL = LAYOUT.getLayoutData()[ LAYOUT.getLayout() ][ focusElement ];

  // let newX;
  let newY;

  if (UI.getEditor() === 'float') {
    if (floatEditing) {
      stopFloatingFocus();
    } else {
      if (LAYOUT.getLayoutStyle() === 'scol') {
        newY = (focusElement * 130) + 170;
        FL_EDITOR.setAttribute('x', '0');
        FL_EDITOR.setAttribute('y', newY);
        FL_EDITOR.setAttribute('visibility', 'visible');
      } else if (LAYOUT.getLayoutStyle() === 'default') {
        FL_EDITOR.setAttribute('x', FOCUS_EL[ '{x}' ]);
        FL_EDITOR.setAttribute('y', FOCUS_EL[ '{y}' ]);
        FL_EDITOR.setAttribute('visibility', 'visible');
        if (vlElements.includes(focusElement)) {
          FL_ED_OUTLINE.setAttribute('width', DIM.floatEditOutlineVW);
          FL_ED_OUTLINE.setAttribute('height', DIM.floatEditOutlineVH);
          FL_ED_OUTLINE.setAttribute('x', DIM.floatEditOutlineVX);
          FL_ED_OUTLINE.setAttribute('y', DIM.floatEditOutlineVY);
          FL_ICON.setAttribute('x', DIM.floatEditIconVX);
          FL_ICON.setAttribute('y', DIM.floatEditIconVY);
          FL_EMOJI.setAttribute('x', DIM.floatEditEmoVX);
          FL_EMOJI.setAttribute('y', DIM.floatEditEmoVY);
          FL_DESC.setAttribute('x', DIM.floatEditDescVX);
          FL_DESC.setAttribute('y', DIM.floatEditDescVY);
          EM_ICON.setAttribute('x', DIM.floatEmptyIconVX);
          EM_ICON.setAttribute('y', DIM.floatEmptyIconVY);
          EM_EMOJI.setAttribute('x', DIM.floatEmptyEmoVX);
          EM_EMOJI.setAttribute('y', DIM.floatEmptyEmoVY);
          FL_BACK.setAttribute('x', DIM.floatBackVX);
          FL_BACK.setAttribute('y', DIM.floatBackVY);
          FL_FWD.setAttribute('x', DIM.floatFwdVX);
          FL_FWD.setAttribute('y', DIM.floatFwdVY);
          FL_POST.setAttribute('x', DIM.floatPostItVX);
          FL_POST.setAttribute('y', DIM.floatPostItVY);
          FL_ADD.setAttribute('x', DIM.floatAddButtonVX);
          FL_ADD.setAttribute('y', DIM.floatAddButtonVY);
          FL_MOVE.setAttribute('x', DIM.floatMoveMenuVX);
          FL_MOVE.setAttribute('y', DIM.floatMoveMenuVY);
        } else if (vrElements.includes(focusElement)) {
          FL_ED_OUTLINE.setAttribute('width', DIM.floatEditOutlineVRW);
          FL_ED_OUTLINE.setAttribute('height', DIM.floatEditOutlineVRH);
          FL_ED_OUTLINE.setAttribute('x', DIM.floatEditOutlineVRX);
          FL_ED_OUTLINE.setAttribute('y', DIM.floatEditOutlineVRY);
          FL_ICON.setAttribute('x', DIM.floatEditIconVRX);
          FL_ICON.setAttribute('y', DIM.floatEditIconVRY);
          FL_EMOJI.setAttribute('x', DIM.floatEditEmoVRX);
          FL_EMOJI.setAttribute('y', DIM.floatEditEmoVRY);
          FL_DESC.setAttribute('x', DIM.floatEditDescVRX);
          FL_DESC.setAttribute('y', DIM.floatEditDescVRY);
          EM_ICON.setAttribute('x', DIM.floatEmptyIconVRX);
          EM_ICON.setAttribute('y', DIM.floatEmptyIconVRY);
          EM_EMOJI.setAttribute('x', DIM.floatEmptyEmoVRX);
          EM_EMOJI.setAttribute('y', DIM.floatEmptyEmoVRY);
          FL_BACK.setAttribute('x', DIM.floatBackVRX);
          FL_BACK.setAttribute('y', DIM.floatBackVRY);
          FL_FWD.setAttribute('x', DIM.floatFwdVRX);
          FL_FWD.setAttribute('y', DIM.floatFwdVRY);
          FL_POST.setAttribute('x', DIM.floatPostItVRX);
          FL_POST.setAttribute('y', DIM.floatPostItVRY);
          FL_ADD.setAttribute('x', DIM.floatAddButtonVRX);
          FL_ADD.setAttribute('y', DIM.floatAddButtonVRY);
          FL_MOVE.setAttribute('x', DIM.floatMoveMenuVRX);
          FL_MOVE.setAttribute('y', DIM.floatMoveMenuVRY);
        } else {
          FL_ED_OUTLINE.setAttribute('width', DIM.floatEditOutlineW);
          FL_ED_OUTLINE.setAttribute('height', DIM.floatEditOutlineH);
          FL_ED_OUTLINE.setAttribute('x', DIM.floatEditOutlineX);
          FL_ED_OUTLINE.setAttribute('y', DIM.floatEditOutlineY);
          FL_ICON.setAttribute('x', DIM.floatEditIconX);
          FL_ICON.setAttribute('y', DIM.floatEditIconY);
          FL_EMOJI.setAttribute('x', DIM.floatEditEmoX);
          FL_EMOJI.setAttribute('y', DIM.floatEditEmoY);
          FL_DESC.setAttribute('x', DIM.floatEditDescX);
          FL_DESC.setAttribute('y', DIM.floatEditDescY);
          EM_ICON.setAttribute('x', DIM.floatEmptyIconX);
          EM_ICON.setAttribute('y', DIM.floatEmptyIconY);
          EM_EMOJI.setAttribute('x', DIM.floatEmptyEmoX);
          EM_EMOJI.setAttribute('y', DIM.floatEmptyEmoY);
          FL_BACK.setAttribute('x', DIM.floatBackX);
          FL_BACK.setAttribute('y', DIM.floatBackY);
          FL_FWD.setAttribute('x', DIM.floatFwdX);
          FL_FWD.setAttribute('y', DIM.floatFwdY);
          FL_POST.setAttribute('x', DIM.floatPostItX);
          FL_POST.setAttribute('y', DIM.floatPostItY);
          FL_ADD.setAttribute('x', DIM.floatAddButtonX);
          FL_ADD.setAttribute('y', DIM.floatAddButtonY);
          FL_MOVE.setAttribute('x', DIM.floatMoveMenuX);
          FL_MOVE.setAttribute('y', DIM.floatMoveMenuY);
        }
      }

      const ICON_VALUE = elements[focusElement].icon;
      const EMO_VALUE = elements[focusElement].emoticon;
      const emptyIconText = UTIL.qs('#empty_icon_text');
      const emptyEmoText = UTIL.qs('#empty_emoticon_text');

      UTIL.qs('#floating_icon_select').value = ICON_VALUE;
      if (ICON_VALUE === 'none') {
        EM_ICON.setAttribute('fill-opacity', '0.5');
        emptyIconText.textContent = '1. What happened?';
      } else {
        EM_ICON.setAttribute('fill-opacity', '0.0');
        emptyIconText.textContent = '';
      }
      UTIL.qs('#floating_emoticon_select').value = EMO_VALUE;
      if (EMO_VALUE === 'none') {
        EM_EMOJI.setAttribute('fill-opacity', '0.5');
        emptyEmoText.textContent = '3. How did you feel?';
      } else {
        EM_EMOJI.setAttribute('fill-opacity', '0.0');
        emptyEmoText.textContent = '';
      }
      UTIL.qs('#floating_event_desc').value = elements[focusElement].description;
      UTIL.qs('#floating_post_it_text').value = elements[focusElement].postit;
      floatEditing = true;
      UTIL.qs('#floating_icon_select').focus();
    }
  } else if (UI.getEditor() === 'fixed') {
    UTIL.qs('#event_desc').focus();
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

function moveMenuChanged () {
  var itemSelected = UTIL.qs('#floating_move_menu');
  if (itemSelected.value === 'SwapBack') {
    moveBackElement();
  } else if (itemSelected.value === 'SwapFwd') {
    moveFwdElement();
  } else if (itemSelected.value === 'AddNew') {
    addCard();
  }
  itemSelected.value = 'Move';
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

function addCard () {
  // adds in a new card after the one currently in focus
  if (focusElement < (maxElements - 1)) {
    // check if last card is used, if so, extend number of cards (if not already at maximum)
    if ((elements[elements.length - 1].icon !== 'none') || (elements[elements.length - 1].description !== '') || (elements[elements.length - 1].emoticon !== 'none') || (elements[elements.length - 1].postit !== '')) {
      if (elements.length < maxElements) {
        LAYOUT.addElementsToLayout();
      } else {
        // TODO: alert the user to failure?
        return;
      }
    }
    // loop through all cards and move them forward one in the list
    for (var i = elements.length - 2; i > focusElement; i--) {
      elements[i + 1] = elements[i];
      elements[i + 1].eID = 'place' + (i + 1);
    }
    // add the new card into place
    elements[focusElement + 1] = { eID: 'place' + (focusElement + 1), description: '', emoticon: 'none', icon: 'none', postit: '' };
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
