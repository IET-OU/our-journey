require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
  Default application | © 2018 The Open University (IET-OU).
*/

module.exports.run = run;

const LOC = window.location;
const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');

function run () {
  console.warn('The our-journey API:', require('../index'));
  if (LOC.search.match(/[?&]layout=scol/)) {
    LAYOUT.setScol();
  } else {
    LAYOUT.reflow();
  }

  if (LOC.search.match(/[?&]edit=fixed/)) {
    UI.chooseEditor('fixed');
  } else if (LOC.search.match(/[?&]edit=float/)) {
    UI.chooseEditor('float');
  } else {
    UI.chooseEditor('float');
  }

  CORE.initialiseElements(0);

  EVENTS.initialise();

  if (LOC.search.match(/[?&]demo=1/)) {
    CORE.demoFill();

    document.body.className += ' demo-fill';
  }

  CORE.setFocusElement(0);
  CORE.changeFocus();
  CORE.editFocus();

  UI.toggleOptions();
  UI.changeBackground('Wheat');

  SHARE.createLink(CORE.getElements());
  SHARE.loadLink(CORE.getElements());

  document.getElementById('journey-canvas').focus();
  window.scrollTo(0, 0);
}

},{"../index":"our-journey","./core":3,"./event":5,"./layout":7,"./share-link":9,"./user-interface":10}],2:[function(require,module,exports){
/*!
  Get paths to icon and emoji files. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  emoticonCount: emoticonCount,
  iconCount: iconCount,
  getEmoticonName: getEmoticonName,
  getEmoticonPath: getEmoticonPath,
  getIconPath: getIconPath,
  getIconName: getIconName,
  getIconAlt: getIconAlt,
  getBackgroundElements: getBackgroundElements,
  hasEmoticon: hasEmoticon,
  hasIcon: hasIcon
};

// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png', alt: 'Achievement'}, {name: 'admin', file: 'Admin_card.png', alt: 'Admin and forms'}, {name: 'assessment', file: 'Assessments_card.png', alt: 'Assessment'}, {name: 'barrier', file: 'Barrier_card.png', alt: 'Barrier'}, {name: 'communication', file: 'Communication_card.png', alt: 'Communication'}, {name: 'confidence', file: 'ConfidenceBoost_card.png', alt: 'Confidence boost'}, {name: 'considerstudy', file: 'ConsiderStudy_card.png', alt: 'Considering study'}, {name: 'duedates', file: 'DueDates_card.png', alt: 'Due dates'}, {name: 'employment', file: 'Employment_card.png', alt: 'Jobs and employment'}, {name: 'finances', file: 'Finances_card.png', alt: 'Finances'}, {name: 'helpneeded', file: 'HelpNeeded_card.png', alt: 'Help needed'}, {name: 'highpressure', file: 'HighPressure_card.png', alt: 'High pressure'}, {name: 'information', file: 'Information_card.png', alt: 'Finding information'}, {name: 'lostdirection', file: 'LostDirection_card.png', alt: 'Lost direction'}, {name: 'lowenergy', file: 'LowEnergy_card.png', alt: 'Low energy'}, {name: 'lowscores', file: 'LowScores_card.png', alt: 'Low scores'}, {name: 'moving', file: 'Moving_card.png', alt: 'Moving home'}, {name: 'nosupport', file: 'NoSupport_card.png', alt: 'No support'}, {name: 'peersupport', file: 'PeerSupport_card.png', alt: 'Peer support'}, {name: 'problem', file: 'Problem_card.png', alt: 'Problem'}, {name: 'register', file: 'Register_card.png', alt: 'Registering'}, {name: 'repetition', file: 'Repetition_card.png', alt: 'Repetition'}, {name: 'studybreak', file: 'StudyBreak_card.png', alt: 'Break from study'}, {name: 'studyexperience', file: 'StudyExperience_card.png', alt: 'Study experience'}, {name: 'studygoal', file: 'StudyGoal_card.png', alt: 'Goal'}, {name: 'studymilestone', file: 'StudyMilestone_card.png', alt: 'Study milestone'}, {name: 'studysuccess', file: 'StudySuccess_card.png', alt: 'Study success'}, {name: 'studysupport', file: 'StudySupport_card.png', alt: 'Study support'}, {name: 'timelost', file: 'TimeLost_card.png', alt: 'Time lost'} ];
const emoticonFiles = [ {name: 'proud', file: 'Proud_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'anxious', file: 'Anxious_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confident', file: 'Confident_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'curious', file: 'Curious_emoji.png'}, {name: 'embarrassed', file: 'Embarrassed_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'scared', file: 'Scared_emoji.png'}, {name: 'unwell', file: 'Unwell_emoji.png'}, {name: 'stressed', file: 'Stressed_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'}, {name: 'tired', file: 'Tired_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'} ];
const backgroundElements = ['head_background', 'pencil_background', 'plant_background', 'calc_background', 'biscuits_background', 'glasses_background', 'folder_background', 'coffee_background', 'pens_background', 'graph_background', 'jammie_background', 'pencil_background', 'biscuits_background_2', 'plant_background_2', 'tablet_background', 'calc_background_2', 'tablet_background_2', 'glasses_background_2', 'coffee_background_2', 'pens_background_2', 'folder_background_2', 'graph_background_2', 'jammie_background_2', 'coffee_background_3'];
// var assetDir = 'assets/';
const emojiDir = 'assets/emoji/';
const cardDir = 'assets/card/';

function emoticonCount () {
  return emoticonFiles.length;
}

function iconCount () {
  return iconFiles.length;
}

function getEmoticonPath (j) {
  return emojiDir + emoticonFiles[ j ].file;
}

function getEmoticonName (j) {
  return emoticonFiles[ j ].name;
}

function getIconPath (j) {
  return cardDir + iconFiles[ j ].file;
}

function getIconName (j) {
  return iconFiles[ j ].name;
}

function hasEmoticon (j, element) {
  return emoticonFiles[ j ].name === element.emoticon;
}

function hasIcon (j, element) {
  return iconFiles[j].name === element.icon;
}

function getIconAlt (j, element) {
  return iconFiles[j].alt;
}

function getBackgroundElements () {
  return backgroundElements;
}

},{}],3:[function(require,module,exports){
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
  isPrinting: isPrinting
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
        } else {
          editFocus();
        }
        break;
      case 'Escape':
        if (floatEditing) {
          editFocus();
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
    changeFocus();
    if (printed) {
      UI.toggleEditor('show');
      printed = false;
    }
    stopFloatingFocus();
  } else {
    editFocus();
  }
  document.getElementById('journey-canvas').focus();
}

function setCardColour (colour) {
  cardColour = colour;
  updateElements();
  document.getElementById('card_colour_select').value = cardColour;
}

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    var ePlace = document.getElementById('group' + i);
    ePlace.addEventListener('click', elementClick);
    var card = document.getElementById('place' + i);
    card.style.fill = cardColour;
    if ((LAYOUT.getLayout() === 'default') && vlElements.includes(i)) {
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
  var layout = LAYOUT.getLayout();
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
  var layout = LAYOUT.getLayout();
  if (getElement(i).emoticon !== 'none') {
    for (var j = 0; j < ASSET.emoticonCount(); j++) {
      if (ASSET.hasEmoticon(j, getElement(i))) {
        eEmo.setAttribute('height', DIM.emoticonHeight);
        eEmo.setAttribute('width', DIM.emoticonWidth);
        if ((layout === 'default') && (vlElements.includes(i))) {
          eEmo.setAttribute('x', DIM.emoticonXV);
          eEmo.setAttribute('y', DIM.emoticonYV);
        } else if ((layout === 'default') && (vrElements.includes(i))) {
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
  var layout = LAYOUT.getLayout();
  if (getElement(i).icon !== 'none') {
    for (var j = 0; j < ASSET.iconCount(); j++) {
      if (ASSET.hasIcon(j, getElement(i))) {
        eIcon.setAttribute('height', DIM.iconHeight);
        eIcon.setAttribute('width', DIM.iconWidth);
        if ((layout === 'default') && (vlElements.includes(i))) {
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
  var layout = LAYOUT.getLayout();
  if (getElement(i).postit !== '') {
    ePostIt.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('visibility', 'visible');
    ePostItText.setAttribute('width', DIM.postitTextWidth);
    // ePostItText.setAttribute('y', DIM.postitTextY);

    if (((layout === 'default') && vlElements.includes(i))) {
      ePostIt.setAttribute('y', DIM.postitVY);
      ePostIt.setAttribute('x', DIM.postitVX);
      ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVY);
      ePostItText.setAttribute('x', DIM.postitTextVX);
      ePostItText.setAttribute('y', DIM.postitTextVY);
    } else if ((layout === 'default') && vrElements.includes(i)) {
      ePostIt.setAttribute('x', DIM.postitVRX);
      ePostIt.setAttribute('y', DIM.postitVRY);
      ePostItText.setAttribute('y', DIM.postitTextVRY);
      ePostItText.setAttribute('x', DIM.postitTextVRX);
    } else if (layout === 'scol') {
      ePostIt.setAttribute('x', DIM.postitScolX);
      ePostIt.setAttribute('y', DIM.postitScolY);
      ePostItText.setAttribute('y', DIM.postitTextScolY + DIM.postitScolY);
      ePostItText.setAttribute('x', DIM.postitTextScolX);
    } else if (layout === 'default') {
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
    var element = document.getElementById(elements[i].eID);
    element.setAttribute('class', 'not-focussed');
  }
  var focus = document.getElementById(elements[focusElement].eID);
  focus.setAttribute('class', 'focussed');

  if (UI.getEditor() === 'fixed') {
    document.getElementById('event_desc').value = elements[focusElement].description;
    document.getElementById('icon_select').value = elements[focusElement].icon;
    document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
    document.getElementById('post_it_text').value = elements[focusElement].postit;
    document.getElementById('title').innerHTML = 'Journey Editor: Card ' + focusElement;
  } else if (UI.getEditor() === 'float') {
    // stopFloatingFocus();
  }
}

function addMoreFocus (focusin) {
  if (focusin) {
    document.getElementById('add_more_rect').setAttribute('class', 'focussed');
    focusOnAddMore = true;
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
      document.getElementById('journey-canvas').focus();
    } else {
      if (LAYOUT.getLayout() === 'scol') {
        newY = (focusElement * 130) + 170;
        document.getElementById('floating_editor').setAttribute('x', '0');
        document.getElementById('floating_editor').setAttribute('y', newY);
        document.getElementById('floating_editor').setAttribute('visibility', 'visible');
      } else if (LAYOUT.getLayout() === 'default') {
        var layoutData = LAYOUT.getLayoutData();
        newX = layoutData['default'][focusElement]['{x}'];
        newY = layoutData['default'][focusElement]['{y}'];
        // newY = newY + DIM.rectY;
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
    }
  } else if (UI.getEditor() === 'fixed') {
    document.getElementById('event_desc').focus();
  }
}

function canvasGotFocus () {
  canvasInFocus = true;
  // changeFocus();
}

function canvasLostFocus () {
  canvasInFocus = false;
}

function cycleNextFocus () {
  // move to the next focus element, if no more elements, release focus outside of canvas
  if ((elements.length - 1) > focusElement) {
    focusElement++;
    var focusY = document.getElementById('group' + focusElement).getAttribute('y');
    window.scrollTo(0, focusY - 200);
    changeFocus();
  } else {
    if (numElements < maxElements) {
      addMoreFocus(true);
      focusElement = -1;
      var addfocusY = document.getElementById('add_more_card').getAttribute('y');
      window.scrollTo(0, addfocusY - 200);
      changeFocus();
    }
  }
}

function cyclePrevFocus () {
  if (focusElement > 0) {
    focusElement--;
    var focusY = document.getElementById('group' + focusElement).getAttribute('y');
    window.scrollTo(0, focusY - 200);
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
  // document.getElementById('journey-canvas').focus();
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

},{"./assets":2,"./dimension.json":4,"./layout":7,"./user-interface":10}],4:[function(require,module,exports){
module.exports={
  "#": "Sizes & positions of card and Post-it components.",

  "iconWidth": 111,
  "iconHeight": 111,
  "iconXV": 110,
  "iconYV": 5,
  "iconX": 10,
  "iconY": 110,
  "emoticonWidth": 72,
  "emoticonHeight": 72,
  "emoticonXV": 130,
  "emoticonYV": 170,
  "emoticonXVR": 30,
  "emoticonYVR": 273,
  "emoticonX": 140,
  "emoticonY": 160,
  "textXV": 110,
  "textYV": 120,
  "textXVR": 10,
  "textYVR": 225,
  "textX": 125,
  "textY": 110,
  "rectY": 100,
  "rectXV": 100,
  "postitX": 72,
  "postitY": 12,
  "postitVX": 5,
  "postitVY": 70,
  "postitVRY": 160,
  "postitVRX": 125,
  "postitTextX": 78,
  "postitTextVX": 12,
  "postitTextVRX": 130,
  "postitTextY": 27,
  "postitTextVY": 87,
  "postitTextVRY": 177,
  "postitTextWidth": 85,
  "postitScolX": 245,
  "postitTextScolX": 250,
  "postitScolY": 100,
  "postitTextScolY": 15, 
  "floatEditOutlineW": 240,
  "floatEditOutlineH": 165,
  "floatEditOutlineVW": 140,
  "floatEditOutlineVH": 270,
  "floatEditOutlineX": 0,
  "floatEditOutlineY": 95, 
  "floatEditOutlineVX": 95,
  "floatEditOutlineVY": 0,
  "floatEditIconVX": 110,
  "floatEditIconVY": 90,
  "floatEditIconX": 10,
  "floatEditIconY": 195,
  "floatEditEmoVX": 110,
  "floatEditEmoVY": 238,
  "floatEditEmoX": 125,
  "floatEditEmoY": 228,
  "floatEditDescX": 125,
  "floatEditDescY": 105,
  "floatEditDescVX": 110,
  "floatEditDescVY": 120,
  "floatEmptyIconVX": 110,
  "floatEmptyIconVY": 5,
  "floatEmptyIconX": 10,
  "floatEmptyIconY": 105,
  "floatEmptyEmoVX": 110,
  "floatEmptyEmoVY": 180,
  "floatEmptyEmoX": 125,
  "floatEmptyEmoY": 165,
  "floatBackX": 0,
  "floatBackY": 65,
  "floatFwdX": 30,
  "floatFwdY": 65,
  "floatBackVX": 40,
  "floatBackVY": 0,
  "floatFwdVX": 70,
  "floatFwdVY": 0,
  "floatPostItX": 77,
  "floatPostItY": 30,
  "floatPostItVX": 10,
  "floatPostItVY": 90,
  "floatEditOutlineVRW": 140,
  "floatEditOutlineVRH": 270,
  "floatEditOutlineVRX": 95,
  "floatEditOutlineVRY": 0,
  "floatEditIconVRX": 10,
  "floatEditIconVRY": 195,
  "floatEditEmoVRX": 10,
  "floatEditEmoVRY": 340,
  "floatEditDescVRX": 10,
  "floatEditDescVRY": 220,
  "floatEmptyIconVRX": 10,
  "floatEmptyIconVRY": 105,
  "floatEmptyEmoVRX": 10,
  "floatEmptyEmoVRY": 260,
  "floatBackVRX": 140,
  "floatBackVRY": 100,
  "floatFwdVRX": 170,
  "floatFwdVRY": 100,
  "floatPostItVRX": 130,
  "floatPostItVRY": 178
}

},{}],5:[function(require,module,exports){
/*!
  Setup form & SVG 'canvas' event handlers | © 2018 The Open University (IET-OU).
*/

module.exports = {
  initialise: initialiseEventHandlers
};

const CORE = require('./core');
const FILE = require('./file');
const UI = require('./user-interface');
const LAYOUT = require('./layout');

// Initialises the event handlers for form submit buttons.
function initialiseEventHandlers () {
  attachEvent('#updateform', 'submit', function (e) {
    e.preventDefault();
    CORE.updateElement();
  });

  attachEvent('#deleteform', 'submit', function (e) {
    e.preventDefault();
    CORE.clearElement();
  });

  attachEvent('#backform', 'submit', function (e) {
    e.preventDefault();
    CORE.moveBackElement();
  });

  attachEvent('#forwardform', 'submit', function (e) {
    e.preventDefault();
    CORE.moveFwdElement();
  });

  attachEvent('#floating_backform', 'submit', function (e) {
    e.preventDefault();
    CORE.moveBackElement();
  });

  attachEvent('#floating_forwardform', 'submit', function (e) {
    e.preventDefault();
    CORE.moveFwdElement();
  });

  attachEvent('#optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();
  });

  attachEvent('#float_optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();
  });

  attachEvent('#background_select', 'change', function (e) {
    e.preventDefault();
    UI.changeBackground();
  });

  attachEvent('#background_elements_select', 'change', function (e) {
    e.preventDefault();
    UI.changeBackgroundElements();
  });

  attachEvent('#card_colour_select', 'change', function (e) {
    e.preventDefault();
    UI.changeCardColour();
  });

  attachEvent('#printform', 'submit', function (e) {
    e.preventDefault();
    UI.printJourney();
  });

  attachEvent('#loadform', 'submit', function (e) {
    e.preventDefault();
    FILE.loadJourney();
  });

  attachEvent('#saveform', 'submit', function (e) {
    e.preventDefault();
    FILE.saveJourney();
  });

  attachEvent('#journey-canvas', 'focusin', function (e) {
    CORE.canvasGotFocus();
  });

  attachEvent('#journey-canvas', 'focusout', function (e) {
    CORE.canvasLostFocus();
  });

  attachEvent('#floating_icon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#floating_emoticon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#floating_event_desc', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#floating_post_it_text', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#icon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#emoticon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#event_desc', 'keyup', function (e) {
    CORE.updateElement();
  });

  attachEvent('#post_it_text', 'keyup', function (e) {
    CORE.updateElement();
  });

  attachEvent('#add_more_rect', 'click', function (e) {
    LAYOUT.addElementsToLayout();
  });

  attachEvent('#add_more_img', 'click', function (e) {
    LAYOUT.addElementsToLayout();
  });
}

function attachEvent (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, function (ev) {
    callback(ev);
  });
}

},{"./core":3,"./file":6,"./layout":7,"./user-interface":10}],6:[function(require,module,exports){
/*!
  Save and load journeys to file, in the browser. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  saveJourney: saveJourney,
  loadJourney: loadJourney
};

const CORE = require('./core');
const LAYOUT = require('./layout');
const alert = window.alert;
const FileReader = window.FileReader;

function saveJourney () {
  var filename = document.getElementById('filenamearea').value + '.json';
  // Pretty print JSON.
  var data = JSON.stringify(CORE.getElements(), null, 2);
  var a = document.createElement('a');

  a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(data));
  a.setAttribute('download', filename);
  a.click();
}

function loadJourney () {
  var input, file, fr;
  if (typeof FileReader !== 'function') {
    alert("The file API isn't supported on this browser yet.");
    return;
  }

  input = document.getElementById('fileinput');

  if (!input) {
    alert("Couldn't find the fileinput element.");
  } else if (!input.files) {
    alert("This browser doesn't seem to support the `files` property of file inputs.");
  } else if (!input.files[0]) {
    alert("Please select a file before clicking 'Load'");
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }
}

function receivedText (ev) {
  let lines = ev.target.result;
  const newArr = JSON.parse(lines);
  var elements = CORE.getElements();
  var additionalElements = newArr.length - CORE.getNumElements();
  if (additionalElements > 0) {
    var addIterations = additionalElements / 10;
    for (var j = 0; j < addIterations; j++) {
      LAYOUT.addElementsToLayout();
    }
  }
  for (var i = 0; i < newArr.length; i++) {
    elements[i] = { eID: newArr[i].eID, description: newArr[i].description, emoticon: newArr[i].emoticon, icon: newArr[i].icon, postit: newArr[i].postit };
  }
  CORE.updateElements();
}

},{"./core":3,"./layout":7}],7:[function(require,module,exports){
/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

module.exports = {
  reflow: reflow,
  getLayout: getLayout,
  getLayoutData: getLayoutData,
  addElementsToLayout: addElementsToLayout,
  setScol: setScol
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');
const CORE = require('./core');
const UI = require('./user-interface');

var setLayout = 'default';

function setScol () {
  setLayout = 'scol';
  document.getElementById('journey-canvas').setAttribute('height', '2400');
  document.getElementById('journey-canvas').setAttribute('width', '500');
  reflow(setLayout);
  UI.chooseEditor('float');
  UI.changeBackgroundElements('none');
  document.getElementById('journey_logo').setAttribute('visibility', 'collapse');
  document.getElementById('add_more_card').setAttribute('x', 55);
  document.getElementById('start_point').setAttribute('visibility', 'collapse');
  document.getElementById('scol_start_point').setAttribute('visibility', 'visible');
}

function reflow (layout) {
  layout = layout || 'default';
  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);
  let cards = [];
  if (layout === 'scol') {
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': (i * 130) + 70, '{w}': 240, '{h}': 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('add_more_card').setAttribute('y', (CORE.getNumElements() * 130) + 170);
  } else {
    LAYOUTS[ layout ].forEach(function (elem) {
      if (elem[ '{orient}' ] === 'vert') {
        elem[ '{w}' ] = 130;
        elem[ '{h}' ] = 240;
      } else {
        elem[ '{w}' ] = 240;
        elem[ '{h}' ] = 130;
      }
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('scol_start_point').setAttribute('visibility', 'collapse');
  }
  HOLDER.innerHTML = cards.join('\n');
}

function addElementsToLayout () {
  if (CORE.getNumElements() < CORE.getMaxElements()) {
    var numExistingElements = CORE.getNumElements();
    var newHeight;
    var newAddMoreY;
    CORE.addElements(10);
    if (setLayout === 'default') {
      reflow('default' + CORE.getNumElements());
      newHeight = parseInt(document.getElementById('journey-canvas').getAttribute('height')) + 720;
      if (CORE.getNumElements() < CORE.getMaxElements()) {
        newAddMoreY = parseInt(document.getElementById('add_more_card').getAttribute('y')) + 710;
        document.getElementById('add_more_card').setAttribute('y', newAddMoreY);
      } else {
        document.getElementById('add_more_card').setAttribute('visibility', 'collapse');
      }
    } else if (setLayout === 'scol') {
      reflow('scol');
      newHeight = parseInt(document.getElementById('journey-canvas').getAttribute('height')) + 1400;
      if (CORE.getNumElements() < CORE.getMaxElements()) {
        newAddMoreY = parseInt(document.getElementById('add_more_card').getAttribute('y'));
        document.getElementById('add_more_card').setAttribute('y', newAddMoreY);
      } else {
        document.getElementById('add_more_card').setAttribute('visibility', 'collapse');
      }
    }
    document.getElementById('journey-canvas').setAttribute('height', newHeight);
    CORE.initialiseElements(numExistingElements);
  }
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}

function getLayout () {
  return setLayout;
}

function getLayoutData () {
  return LAYOUTS;
}

},{"./core":3,"./layouts.json":8,"./user-interface":10}],8:[function(require,module,exports){
module.exports={
  "#": "Position data for the SVG cards.",

  "default": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" }
  ],
  
  "default25": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 990,  "{y}": 1250,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 745,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 500,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 255,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1460,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1705,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 255,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 500,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 745,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 990,  "{y}": 1715,  "{orient}": "vert" }
  ],

  "default35": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 990,  "{y}": 1250,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 745,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 500,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 255,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1460,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1705,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 255,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 500,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 745,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 990,  "{y}": 1715,  "{orient}": "vert" },
    { "{j}": 25,  "{x}": 990,  "{y}": 1960,  "{orient}": "vert" },
    { "{j}": 26,  "{x}": 745,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 27,  "{x}": 500,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 28,  "{x}": 255,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 29,  "{x}": 20,   "{y}": 2170,  "{orient}": "vert" },
    { "{j}": 30,  "{x}": 20,   "{y}": 2415,  "{orient}": "vert" },
    { "{j}": 31,  "{x}": 255,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 32,  "{x}": 500,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 33,  "{x}": 745,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 34,  "{x}": 990,  "{y}": 2425,  "{orient}": "vert"  }
  ],

  "default45": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 990,  "{y}": 1250,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 745,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 500,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 255,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1460,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1705,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 255,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 500,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 745,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 990,  "{y}": 1715,  "{orient}": "vert" },
    { "{j}": 25,  "{x}": 990,  "{y}": 1960,  "{orient}": "vert" },
    { "{j}": 26,  "{x}": 745,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 27,  "{x}": 500,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 28,  "{x}": 255,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 29,  "{x}": 20,   "{y}": 2170,  "{orient}": "vert" },
    { "{j}": 30,  "{x}": 20,   "{y}": 2415,  "{orient}": "vert" },
    { "{j}": 31,  "{x}": 255,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 32,  "{x}": 500,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 33,  "{x}": 745,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 34,  "{x}": 990,  "{y}": 2425,  "{orient}": "vert"  },
    { "{j}": 35,  "{x}": 990,  "{y}": 2670,  "{orient}": "vert" },
    { "{j}": 36,  "{x}": 745,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 37,  "{x}": 500,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 38,  "{x}": 255,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 39,  "{x}": 20,   "{y}": 2880,  "{orient}": "vert" },
    { "{j}": 40,  "{x}": 20,   "{y}": 3125,  "{orient}": "vert" },
    { "{j}": 41,  "{x}": 255,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 42,  "{x}": 500,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 43,  "{x}": 745,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 44,  "{x}": 990,  "{y}": 3135,  "{orient}": "vert"  }
  ],

  "default55": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 990,  "{y}": 1250,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 745,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 500,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 255,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1460,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1705,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 255,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 500,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 745,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 990,  "{y}": 1715,  "{orient}": "vert" },
    { "{j}": 25,  "{x}": 990,  "{y}": 1960,  "{orient}": "vert" },
    { "{j}": 26,  "{x}": 745,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 27,  "{x}": 500,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 28,  "{x}": 255,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 29,  "{x}": 20,   "{y}": 2170,  "{orient}": "vert" },
    { "{j}": 30,  "{x}": 20,   "{y}": 2415,  "{orient}": "vert" },
    { "{j}": 31,  "{x}": 255,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 32,  "{x}": 500,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 33,  "{x}": 745,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 34,  "{x}": 990,  "{y}": 2425,  "{orient}": "vert"  },
    { "{j}": 35,  "{x}": 990,  "{y}": 2670,  "{orient}": "vert" },
    { "{j}": 36,  "{x}": 745,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 37,  "{x}": 500,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 38,  "{x}": 255,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 39,  "{x}": 20,   "{y}": 2880,  "{orient}": "vert" },
    { "{j}": 40,  "{x}": 20,   "{y}": 3125,  "{orient}": "vert" },
    { "{j}": 41,  "{x}": 255,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 42,  "{x}": 500,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 43,  "{x}": 745,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 44,  "{x}": 990,  "{y}": 3135,  "{orient}": "vert"  },
    { "{j}": 45,  "{x}": 990,  "{y}": 3380,  "{orient}": "vert" },
    { "{j}": 46,  "{x}": 745,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 47,  "{x}": 500,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 48,  "{x}": 255,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 49,  "{x}": 20,   "{y}": 3590,  "{orient}": "vert" },
    { "{j}": 50,  "{x}": 20,   "{y}": 3835,  "{orient}": "vert" },
    { "{j}": 51,  "{x}": 255,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 52,  "{x}": 500,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 53,  "{x}": 745,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 54,  "{x}": 990,  "{y}": 3845,  "{orient}": "vert"  }
  ],

  "default65": [
    { "{j}": 0,  "{x}": 20,   "{y}": 285,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 255,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 500,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 745,  "{y}": 295,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 990,  "{y}": 295,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 990,  "{y}": 540,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 745,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 500,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 255,  "{y}": 650,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 750,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 995,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 255,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 500,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 745,  "{y}": 1005,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 990,  "{y}": 1005,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 990,  "{y}": 1250,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 745,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 500,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 255,  "{y}": 1360,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1460,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1705,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 255,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 500,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 745,  "{y}": 1715,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 990,  "{y}": 1715,  "{orient}": "vert" },
    { "{j}": 25,  "{x}": 990,  "{y}": 1960,  "{orient}": "vert" },
    { "{j}": 26,  "{x}": 745,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 27,  "{x}": 500,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 28,  "{x}": 255,  "{y}": 2070,  "{orient}": "horiz" },
    { "{j}": 29,  "{x}": 20,   "{y}": 2170,  "{orient}": "vert" },
    { "{j}": 30,  "{x}": 20,   "{y}": 2415,  "{orient}": "vert" },
    { "{j}": 31,  "{x}": 255,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 32,  "{x}": 500,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 33,  "{x}": 745,  "{y}": 2425,  "{orient}": "horiz" },
    { "{j}": 34,  "{x}": 990,  "{y}": 2425,  "{orient}": "vert"  },
    { "{j}": 35,  "{x}": 990,  "{y}": 2670,  "{orient}": "vert" },
    { "{j}": 36,  "{x}": 745,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 37,  "{x}": 500,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 38,  "{x}": 255,  "{y}": 2780,  "{orient}": "horiz" },
    { "{j}": 39,  "{x}": 20,   "{y}": 2880,  "{orient}": "vert" },
    { "{j}": 40,  "{x}": 20,   "{y}": 3125,  "{orient}": "vert" },
    { "{j}": 41,  "{x}": 255,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 42,  "{x}": 500,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 43,  "{x}": 745,  "{y}": 3135,  "{orient}": "horiz" },
    { "{j}": 44,  "{x}": 990,  "{y}": 3135,  "{orient}": "vert"  },
    { "{j}": 45,  "{x}": 990,  "{y}": 3380,  "{orient}": "vert" },
    { "{j}": 46,  "{x}": 745,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 47,  "{x}": 500,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 48,  "{x}": 255,  "{y}": 3490,  "{orient}": "horiz" },
    { "{j}": 49,  "{x}": 20,   "{y}": 3590,  "{orient}": "vert" },
    { "{j}": 50,  "{x}": 20,   "{y}": 3835,  "{orient}": "vert" },
    { "{j}": 51,  "{x}": 255,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 52,  "{x}": 500,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 53,  "{x}": 745,  "{y}": 3845,  "{orient}": "horiz" },
    { "{j}": 54,  "{x}": 990,  "{y}": 3845,  "{orient}": "vert"  },
    { "{j}": 55,  "{x}": 990,  "{y}": 4090,  "{orient}": "vert" },
    { "{j}": 56,  "{x}": 745,  "{y}": 4200,  "{orient}": "horiz" },
    { "{j}": 57,  "{x}": 500,  "{y}": 4200,  "{orient}": "horiz" },
    { "{j}": 58,  "{x}": 255,  "{y}": 4200,  "{orient}": "horiz" },
    { "{j}": 59,  "{x}": 20,   "{y}": 4300,  "{orient}": "vert" },
    { "{j}": 60,  "{x}": 20,   "{y}": 4545,  "{orient}": "vert" },
    { "{j}": 61,  "{x}": 255,  "{y}": 4555,  "{orient}": "horiz" },
    { "{j}": 62,  "{x}": 500,  "{y}": 4555,  "{orient}": "horiz" },
    { "{j}": 63,  "{x}": 745,  "{y}": 4555,  "{orient}": "horiz" },
    { "{j}": 64,  "{x}": 990,  "{y}": 4555,  "{orient}": "vert"  }
  ]
}

},{}],9:[function(require,module,exports){
/*!
  A sharing-link | © 2018 The Open University (IET-OU).
*/

module.exports = {
  createLink: createShareLink,
  loadLink: loadShareLink
};

const CORE = require('./core');

function createShareLink (elements) {
  var share = document.getElementById('oj-share-link');

  share.setAttribute('href', '?j=base64:' + encodeURIComponent(b64EncodeUnicode(JSON.stringify(elements))) + '&z');

  console.warn('createShareLink');
}

function loadShareLink (elements) {
  console.warn('loadShareLink - start');

  var qm = window.location.search.match(/\?j=base64:(.+(%3D%3D|==))/);
  if (qm) {
    var decoded;
    try {
      decoded = JSON.parse(b64DecodeUnicode(decodeURIComponent(qm[ 1 ])));
    } catch (ex) {
      console.error('---- ! ERROR in "loadShareLink()" function ! ----');
      console.error(ex);
      window.alert('Sorry, the URL parameter "j" was wrongly encoded. I failed to load your Journey :(');
      return;
    }

    for (var i = 0; i < decoded.length; i++) {
      elements[ i ] = { eID: decoded[i].eID, description: decoded[i].description, emoticon: decoded[i].emoticon, icon: decoded[i].icon, postit: decoded[i].postit };
    }

    CORE.updateElements();

    console.warn('loadShareLink - load COMPLETE ;) !');
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem

function b64EncodeUnicode (str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode (str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(window.atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

// End.

},{"./core":3}],10:[function(require,module,exports){
/*!
  User interface. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  toggleEditor: toggleEditor,
  toggleOptions: toggleOptions,
  changeBackground: changeBackground,
  changeBackgroundElements: changeBackgroundElements,
  changeCardColour: changeCardColour,
  chooseEditor: chooseEditor,
  getEditor: getEditor,
  toggleFloatOptions: toggleFloatOptions,
  printJourney: printJourney
};

const ASSET = require('./assets');
const CORE = require('./core');

var editor = 'fixed';

function toggleEditor (tog) {
  if (editor === 'fixed') {
    var editorElement = document.getElementById('editorbar');
    if (tog === 1 || tog === 'show') {
      editorElement.style.display = 'block';
    } else if (tog === 0 || tog === 'hide') {
      editorElement.style.display = 'none';
    }
  } else if (editor === 'float') {
    var floatElement = document.getElementById('float_bar');
    if (tog === 1 || tog === 'show') {
      toggleOptions(1);
      floatElement.style.display = 'block';
    } else if (tog === 0 || tog === 'hide') {
      toggleOptions(0);
      floatElement.style.display = 'none';
    }
  }
}

function printJourney () {
  if (editor === 'fixed') {
    var editorElement = document.getElementById('editorbar');
    editorElement.style.display = 'none';
  } else if (editor === 'float') {
    var floatElement = document.getElementById('float_bar');
    toggleOptions(0);
    floatElement.style.display = 'none';
    CORE.stopFloatingFocus();
    CORE.isPrinting();
  }
  window.print();
}

function toggleFloatOptions () {
  var saveload = document.getElementById('float_saveload');
  if ((saveload.style.display === 'none') || (!saveload.style.display)) {
    saveload.style.display = 'block';
  } else {
    saveload.style.display = 'none';
  }
}

function toggleOptions (tog) {
  var options = document.getElementById('options');
  if (options.style.display === 'none' || tog === 1) {
    options.style.display = 'block';
    document.getElementById('optionsButton').value = 'Hide Options';
    document.getElementById('float_optionsButton').value = 'Hide Menu';
  } else {
    options.style.display = 'none';
    document.getElementById('optionsButton').value = 'Options';
    document.getElementById('float_optionsButton').value = 'Menu';
  }
}

function changeBackground (bg) {
  var background = bg || document.getElementById('background_select').value;
  document.body.style.background = background;
  document.getElementById('background_select').value = background;
}

function changeBackgroundElements (c) {
  var choice = c || document.getElementById('background_elements_select').value;
  var elements = ASSET.getBackgroundElements();
  var i;
  if (choice === 'all') {
    for (i = 0; i < elements.length; i++) {
      document.getElementById(elements[i]).setAttribute('visibility', 'visible');
    }
  } else if (choice === 'some') {
    var x = 1;
    for (i = 0; i < elements.length; i++) {
      if (x % 2 === 0) {
        document.getElementById(elements[i]).setAttribute('visibility', 'visible');
      } else {
        document.getElementById(elements[i]).setAttribute('visibility', 'collapse');
      }
      x = x + 1;
    }
  } else if (choice === 'none') {
    for (i = 0; i < elements.length; i++) {
      document.getElementById(elements[i]).setAttribute('visibility', 'collapse');
    }
  }
}

function changeCardColour () {
  var colour = document.getElementById('card_colour_select').value;
  CORE.setCardColour(colour);
}

function chooseEditor (newEdit) {
  if (newEdit === 'float') {
    document.getElementById('formeditor').style.display = 'none';
    document.getElementById('float_bar').style.display = 'inline';
    editor = newEdit;
  } else if (newEdit === 'fixed') {
    document.getElementById('floating_editor').setAttribute('visibility', 'collapse');
    document.getElementById('float_bar').style.display = 'none';
  }
}

function getEditor () {
  return editor;
}

},{"./assets":2,"./core":3}],"our-journey":[function(require,module,exports){
/*!
  Our Journey module | © 2018 The Open University (IET-OU).
*/

module.exports = {

  app: require('./src/app'),

  core: require('./src/core'),

  layout: require('./src/layout'),

  events: require('./src/event'),

  file: require('./src/file'),

  share: require('./src/share-link'),

  ui: require('./src/user-interface')
};

},{"./src/app":1,"./src/core":3,"./src/event":5,"./src/file":6,"./src/layout":7,"./src/share-link":9,"./src/user-interface":10}]},{},[]);
