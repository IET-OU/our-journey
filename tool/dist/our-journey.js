/*!
  our-journey | 1.2.1
  © 2018 The Open University (IET) | Tim Coughlan {lead}, Glen Darby, Nick Freear | PROPRIETARY.
  Build: 2018-09-20T09:06Z
  https://github.com/IET-OU/our-journey.git

*/
require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Default application | ©The Open University.
*/

module.exports.run = run;

const LOC = window.location;
const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');
const UTIL = require('./util'); // Was: require('./config');
const VIEWS = require('./views');

function run (config) {
  console.warn('The our-journey API:', require('../index'), 'config:', config);

  UTIL.putConfig(config);

  VIEWS.setup();

  console.warn('qs test:', UTIL.qs('#journey-canvas'));

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

  UI.toggleOptions();
  UI.changeBackground('Wheat');

  SHARE.createLink(CORE.getElements());
  SHARE.loadLink(CORE.getElements());

  document.getElementById('group0').focus();
  CORE.editFocus();
  window.scrollTo(0, 0);
}

},{"../index":"our-journey","./core":3,"./event":5,"./layout":7,"./share-link":14,"./user-interface":15,"./util":16,"./views":17}],2:[function(require,module,exports){
/* Get paths & ALT text for icons & emojis | ©The Open University.
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

const UTIL = require('./util'); // Was: CONFIG = require('./config');

// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png', alt: 'Achievement'}, {name: 'admin', file: 'Admin_card.png', alt: 'Admin and forms'}, {name: 'assessment', file: 'Assessments_card.png', alt: 'Assessment'}, {name: 'barrier', file: 'Barrier_card.png', alt: 'Barrier'}, {name: 'communication', file: 'Communication_card.png', alt: 'Communication'}, {name: 'confidence', file: 'ConfidenceBoost_card.png', alt: 'Confidence boost'}, {name: 'considerstudy', file: 'ConsiderStudy_card.png', alt: 'Considering study'}, {name: 'duedates', file: 'DueDates_card.png', alt: 'Due dates'}, {name: 'employment', file: 'Employment_card.png', alt: 'Jobs and employment'}, {name: 'finances', file: 'Finances_card.png', alt: 'Finances'}, {name: 'helpneeded', file: 'HelpNeeded_card.png', alt: 'Help needed'}, {name: 'highpressure', file: 'HighPressure_card.png', alt: 'High pressure'}, {name: 'information', file: 'Information_card.png', alt: 'Finding information'}, {name: 'lostdirection', file: 'LostDirection_card.png', alt: 'Lost direction'}, {name: 'lowenergy', file: 'LowEnergy_card.png', alt: 'Low energy'}, {name: 'lowscores', file: 'LowScores_card.png', alt: 'Low scores'}, {name: 'moving', file: 'Moving_card.png', alt: 'Moving home'}, {name: 'nosupport', file: 'NoSupport_card.png', alt: 'No support'}, {name: 'peersupport', file: 'PeerSupport_card.png', alt: 'Peer support'}, {name: 'problem', file: 'Problem_card.png', alt: 'Problem'}, {name: 'register', file: 'Register_card.png', alt: 'Registering'}, {name: 'repetition', file: 'Repetition_card.png', alt: 'Repetition'}, {name: 'studybreak', file: 'StudyBreak_card.png', alt: 'Break from study'}, {name: 'studyexperience', file: 'StudyExperience_card.png', alt: 'Study experience'}, {name: 'studygoal', file: 'StudyGoal_card.png', alt: 'Goal'}, {name: 'studymilestone', file: 'StudyMilestone_card.png', alt: 'Study milestone'}, {name: 'studysuccess', file: 'StudySuccess_card.png', alt: 'Study success'}, {name: 'studysupport', file: 'StudySupport_card.png', alt: 'Study support'}, {name: 'timelost', file: 'TimeLost_card.png', alt: 'Time lost'} ];
const emoticonFiles = [ {name: 'proud', file: 'Proud_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'anxious', file: 'Anxious_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confident', file: 'Confident_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'curious', file: 'Curious_emoji.png'}, {name: 'embarrassed', file: 'Embarrassed_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'scared', file: 'Scared_emoji.png'}, {name: 'unwell', file: 'Unwell_emoji.png'}, {name: 'stressed', file: 'Stressed_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'}, {name: 'tired', file: 'Tired_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'} ];
const backgroundElements = ['head_background', 'pencil_background', 'plant_background', 'calc_background', 'biscuits_background', 'glasses_background', 'folder_background', 'coffee_background', 'pens_background', 'graph_background', 'jammie_background', 'pencil_background', 'biscuits_background_2', 'plant_background_2', 'tablet_background', 'calc_background_2', 'tablet_background_2', 'glasses_background_2', 'coffee_background_2', 'pens_background_2', 'folder_background_2', 'graph_background_2', 'jammie_background_2', 'coffee_background_3'];
const emojiDir = '/emoji/';
const cardDir = '/card/';

function emoticonCount () {
  return emoticonFiles.length;
}

function iconCount () {
  return iconFiles.length;
}

function getEmoticonPath (j) {
  return UTIL.config('assetUrl') + emojiDir + emoticonFiles[ j ].file;
}

function getEmoticonName (j) {
  return emoticonFiles[ j ].name;
}

function getIconPath (j) {
  return UTIL.config('assetUrl') + cardDir + iconFiles[ j ].file;
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

},{"./util":16}],3:[function(require,module,exports){
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

},{"./assets":2,"./dimension.json":4,"./layout":7,"./user-interface":15}],4:[function(require,module,exports){
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
  "floatEmptyEmoVRY": 280,
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

  attachEvent('#add_more_card', 'focusin', function (e) {
    CORE.addMoreCardFocus();
  });

  attachEvent('#journey-background', 'click', function (e) {
    CORE.stopFloatingFocus();
  });
}

function attachEvent (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, function (ev) {
    callback(ev);
  });
}

},{"./core":3,"./file":6,"./layout":7,"./user-interface":15}],6:[function(require,module,exports){
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
/* Layout the SVG journey cards | ©The Open University.
*/

module.exports = {
  reflow: reflow,
  getLayout: getLayout,
  getLayoutData: getLayoutData,
  addElementsToLayout: addElementsToLayout,
  setScol: setScol,
  getLayoutStyle: getLayoutStyle
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = require('./views').cardTemplate; // Was: document.querySelector('#oj-svg-card-template').innerText;
const HOLDER_SELECTOR = '#journey-canvas .card-holder';
const CORE = require('./core');
const UI = require('./user-interface');
const UTIL = require('./util'); // Was: require('./config');

var layoutStyle = 'default';
var setLayout = 'default';

function setScol () {
  layoutStyle = 'scol';
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
  const HOLDER = UTIL.qs(HOLDER_SELECTOR); // Was: document.querySelector(HOLDER_SELECTOR);

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];
  if (layout === 'scol') {
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': (i * 130) + 70, '{w}': 240, '{h}': 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      elem[ '{assets}' ] = UTIL.config('assetUrl'); // Was: CONFIG.get('assetUrl');

      cards.push(UTIL.replace(SVG_TEMPLATE, elem)); // Was: VIEWS.replace();
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

      elem[ '{assets}' ] = UTIL.config('assetUrl');

      cards.push(UTIL.replace(SVG_TEMPLATE, elem));
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

    if (layoutStyle === 'default') {
      setLayout = 'default' + CORE.getNumElements();
      reflow(setLayout);
      newHeight = parseInt(document.getElementById('journey-canvas').getAttribute('height')) + 720;
      if (CORE.getNumElements() < CORE.getMaxElements()) {
        newAddMoreY = parseInt(document.getElementById('add_more_card').getAttribute('y')) + 710;
        document.getElementById('add_more_card').setAttribute('y', newAddMoreY);
      } else {
        document.getElementById('add_more_card').setAttribute('visibility', 'collapse');
      }
    } else if (layoutStyle === 'scol') {
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
    document.getElementById('journey-background').setAttribute('height', newHeight);

    CORE.initialiseElements(numExistingElements);
    CORE.setFocusElement(numExistingElements);
    CORE.changeFocus();
  }
}

function getLayout () {
  return setLayout;
}

function getLayoutStyle () {
  return layoutStyle;
}

function getLayoutData () {
  return LAYOUTS;
}

},{"./core":3,"./layouts.json":8,"./user-interface":15,"./util":16,"./views":17}],8:[function(require,module,exports){
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
module.exports = "\r\n<p class=\"footer-copy\">\r\n  <a href=\"https://iet-ou.github.io/our-journey/\">our-journey</a>\r\n  v<i>1.2.1</i>\r\n  |\r\n  © 2018 <a href=\"http://www.open.ac.uk/\">The Open University</a>\r\n  (<a href=\"https://iet.open.ac.uk/\" title=\"Institute of Educational Technology\">IET</a>).\r\n</p>\r\n\r\n<p class=\"footer-logos\">\r\n  <a href=\"https://iet.open.ac.uk/\"><img src=\"{assets}/iet-logo.svg\" alt=\"Institute of Educational Technology\" title=\"Institute of Educational Technology\" /></a>\r\n  <a href=\"http://www.open.ac.uk/\"><img src=\"{assets}/ou-logo.svg\" alt=\"The Open University\" title=\"The Open University\" /></a>\r\n</p>\r\n";

},{}],10:[function(require,module,exports){
module.exports = "\r\n<svg x=\"270\" y=\"0\" id='head_background'>\r\n  <image xlink:href='{assets}/background/head-background.png' role='presentation' x='0' y='0' height=\"315\" width=\"952\" id='headBackgroundImage'/>\r\n</svg>\r\n\r\n<svg x=\"120\" y=\"20\" id='start_point'>\r\n  <rect aria-labelledby=\"start-card\" width=\"130\" height=\"240\" y=\"20\" x=\"0\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" id='start_place' fill-opacity=\"1.0\" role='presentation'/>\r\n  <image xlink:href='{assets}/start-here-trans.png' x=\"7\" y=\"60\" height=\"156\" width=\"115\" id='startIcon' role='presentation'/>\r\n</svg>\r\n<svg x='0' y='0' id='scol_start_point' visibility='collapse'>\r\n  <rect aria-labelledby=\"start-card\" width=\"240\" height=\"170\" y=\"0\" x=\"0\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" id='start_place' fill-opacity=\"1.0\" role='presentation'/>\r\n  <image xlink:href='{assets}/start-here-trans.png' x=\"65\" y=\"5\" height=\"156\" width=\"115\" id='startIcon' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"390\" y=\"565\" id='journey_logo'>\r\n  <image xlink:href='{assets}/background/journey-logo.png' x='0' y='0' height=\"140\" width=\"442\" id='journeyLogoImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"320\" y=\"930\" id='pencil_background'>\r\n  <image xlink:href='{assets}/background/pencil.png' x='0' y='0' height=\"97\" width=\"161\" id='pencilImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"1010\" y=\"920\" id='plant_background'>\r\n  <image xlink:href='{assets}/background/plant.png' x='0' y='0' height=\"134\" width=\"137\" id='plantImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"100\" y=\"1260\" id='calc_background'>\r\n  <image xlink:href='{assets}/background/calculator.png' x='0' y='0' height=\"145\" width=\"141\" id='calcImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"50\" y=\"580\" id='biscuits_background'>\r\n  <image xlink:href='{assets}/background/biscuits.png' x='0' y='0' height=\"144\" width=\"139\" id='biscuitsImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"770\" y=\"1280\" id='glasses_background'>\r\n  <image xlink:href='{assets}/background/glasses.png' x='0' y='0' height=\"90\" width=\"141\" id='glassesImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"950\" y=\"1600\" id='folder_background'>\r\n  <image xlink:href='{assets}/background/folder.png' x='0' y='0' height=\"202\" width=\"209\" id='folderImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"300\" y=\"1610\" id='coffee_background'>\r\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"610\" y=\"1630\" id='pens_background'>\r\n  <image xlink:href='{assets}/background/pens.png' x='0' y='0' height=\"122\" width=\"197\" id='pensImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"130\" y=\"1970\" id='graph_background'>\r\n  <image xlink:href='{assets}/background/graph.png' x='0' y='0' height=\"191\" width=\"247\" id='graphImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"750\" y=\"1970\" id='jammie_background'>\r\n  <image xlink:href='{assets}/background/jammie.png' x='0' y='0' height=\"124\" width=\"134\" id='jammieImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"990\" y=\"3780\" id='pencil_background_2'>\r\n  <image xlink:href='{assets}/background/pencil.png' x='0' y='0' height=\"97\" width=\"161\" id='pencilImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"700\" y=\"2315\" id='biscuits_background_2'>\r\n  <image xlink:href='{assets}/background/biscuits.png' x='0' y='0' height=\"144\" width=\"139\" id='biscuitsImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"440\" y=\"2315\" id='plant_background_2'>\r\n  <image xlink:href='{assets}/background/plant.png' x='0' y='0' height=\"134\" width=\"137\" id='plantImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"900\" y=\"4450\" id='tablet_background'>\r\n  <image xlink:href='{assets}/background/tablet.png' x='0' y='0' height=\"206\" width=\"292\" id='tabletImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"700\" y=\"2670\" id='calc_background_2'>\r\n  <image xlink:href='{assets}/background/calculator.png' x='0' y='0' height=\"145\" width=\"141\" id='calcImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"30\" y=\"2660\" id='tablet_background_2'>\r\n  <image xlink:href='{assets}/background/tablet.png' x='0' y='0' height=\"206\" width=\"292\" id='tabletImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"1030\" y=\"3080\" id='glasses_background_2'>\r\n  <image xlink:href='{assets}/background/glasses.png' x='0' y='0' height=\"90\" width=\"141\" id='glassesImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"270\" y=\"3030\" id='coffee_background_2'>\r\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"640\" y=\"3390\" id='pens_background_2'>\r\n  <image xlink:href='{assets}/background/pens.png' x='0' y='0' height=\"122\" width=\"197\" id='pensImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"100\" y=\"3380\" id='folder_background_2'>\r\n  <image xlink:href='{assets}/background/folder.png' x='0' y='0' height=\"202\" width=\"209\" id='folderImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"20\" y=\"4080\" id='graph_background_2'>\r\n  <image xlink:href='{assets}/background/graph.png' x='0' y='0' height=\"191\" width=\"247\" id='graphImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"985\" y=\"4920\" id='jammie_background_2'>\r\n  <image xlink:href='{assets}/background/jammie.png' x='0' y='0' height=\"124\" width=\"134\" id='jammieImage' role='presentation'/>\r\n</svg>\r\n\r\n<svg x=\"800\" y=\"4100\" id='coffee_background_3'>\r\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\r\n</svg>\r\n\r\n<rect width=\"1240\" height=\"1600\" fill-opacity=\"0.0\" stroke-opacity=\"0.0\" id=\"journey-background\" role=\"presentation\"/>\r\n";

},{}],11:[function(require,module,exports){
module.exports = "\r\n<svg x=\"{x}\" y=\"{y}\" id=\"group{j}\" role=\"listitem\" class=\"card orient-{orient}\" tabindex=\"0\">\r\n  <rect width=\"{w}\" height=\"{h}\" id=\"place{j}\"/>\r\n  <image href=\"\" id=\"icon{j}\"/>\r\n  <switch>\r\n    <foreignObject id=\"description{j}\" class=\"in_card\" width=\"110\" height=\"200\">\r\n      <p xmlns=\"http://www.w3.org/1999/xhtml\">not filled</p>\r\n    </foreignObject>\r\n    <text id=\"description{j}\" class=\"in_card\">not filled</text>\r\n  </switch>\r\n\r\n  <image href=\"\" id=\"emoticon{j}\"/>\r\n\r\n  <image id=\"postit{j}\" href=\"{assets}/PostIt.png\" width=\"100\" height=\"100\" visibility=\"collapse\" role=\"presentation\"></image>\r\n  <switch>\r\n    <foreignObject id=\"postittext{j}\" class=\"in_postit\" width=\"85\" height=\"85\" visibility=\"collapse\">\r\n      <p xmlns=\"http://www.w3.org/1999/xhtml\">not filled</p>\r\n    </foreignObject>\r\n    <text id=\"postittext{j}\" class=\"in_card\">not filled</text>\r\n  </switch>\r\n</svg>\r\n";

},{}],12:[function(require,module,exports){
module.exports = "\r\n<div class=\"editorbar\" id=\"editorbar\">\r\n  <div class=\"formeditor\" id=\"formeditor\">\r\n\r\n    <h1 id=\"title\">Journey editor: Map your study journey on to the cards</h1>\r\n\r\n    <form id=\"updateform\">\r\n      <select id=\"icon_select\" aria-labelledby=\"What happened?\">\r\n        <option value=\"considerstudy\">Considering study</option>\r\n        <option value=\"information\">Finding information</option>\r\n        <option value=\"register\">Registering</option>\r\n        <option value=\"finances\">Finances</option>\r\n        <option value=\"peersupport\">Peer support</option>\r\n        <option value=\"none\">What happened?</option>\r\n        <option value=\"achievement\">Achievement</option>\r\n        <option value=\"admin\">Admin and forms</option>\r\n        <option value=\"assessment\">Assessment</option>\r\n        <option value=\"studybreak\">Break from study</option>\r\n        <option value=\"barrier\">Barrier</option>\r\n        <option value=\"communication\">Communication</option>\r\n        <option value=\"confidence\">Confidence boost</option>\r\n        <option value=\"duedates\">Due dates</option>\r\n        <option value=\"employment\">Jobs and Employment</option>\r\n        <option value=\"studygoal\">Goal</option>\r\n        <option value=\"helpneeded\">Help needed</option>\r\n        <option value=\"highpressure\">High pressure</option>\r\n        <option value=\"lostdirection\">Lost direction</option>\r\n        <option value=\"lowenergy\">Low energy</option>\r\n        <option value=\"lowscores\">Low scores</option>\r\n        <option value=\"moving\">Moving home</option>\r\n        <option value=\"studymilestone\">Milestone</option>\r\n        <option value=\"nosupport\">No support</option>\r\n        <option value=\"problem\">Problem</option>\r\n        <option value=\"repetition\">Repetition</option>\r\n        <option value=\"studyexperience\">Study experience</option>\r\n        <option value=\"studysuccess\">Study success</option>\r\n        <option value=\"studysupport\">Study support</option>\r\n        <option value=\"timelost\">Time Lost</option>\r\n      </select>\r\n\r\n      <label for=\"event_desc\">Describe it:</label>\r\n      <textarea rows=3 maxlength=45 cols=12 id=\"event_desc\" value=\"\"></textarea>\r\n\r\n      <select id=\"emoticon_select\" aria-labelledby=\"How did you feel?\">\r\n        <option value=\"none\">How did you feel?</option>\r\n        <option value=\"angry\">Angry</option>\r\n        <option value=\"anxious\">Anxious</option>\r\n        <option value=\"bored\">Bored</option>\r\n        <option value=\"confident\">Confident</option>\r\n        <option value=\"confused\">Confused</option>\r\n        <option value=\"curious\">Curious</option>\r\n        <option value=\"embarrassed\">Embarrassed</option>\r\n        <option value=\"excited\">Excited</option>\r\n        <option value=\"happy\">Happy</option>\r\n        <option value=\"nervous\">Nervous</option>\r\n        <option value=\"proud\">Proud</option>\r\n        <option value=\"scared\">Scared</option>\r\n        <option value=\"stressed\">Bored</option>\r\n        <option value=\"thinking\">Thinking</option>\r\n        <option value=\"tired\">Tired</option>\r\n        <option value=\"unhappy\">Unhappy</option>\r\n        <option value=\"unwell\">Unwell</option>\r\n        <option value=\"upset\">Upset</option>\r\n      </select>\r\n\r\n      <label for=\"post_it_text\">Optional note:</label>\r\n      <textarea rows=3 maxlength=44 cols=12 id=\"post_it_text\" value=\"\"></textarea>\r\n      <input type='submit' aria-label=\"Update element\" value=\"Update\" id=\"updateButton\">\r\n    </form>\r\n\r\n    <form id=\"deleteform\">\r\n      <input type='submit' aria-label=\"Delete element\" value=\"Clear\" id=\"deleteButton\">\r\n    </form>\r\n\r\n    <form id=\"backform\">\r\n      <input type='submit' aria-label=\"Move element backwards\" value=\"Move Back\" id=\"backButton\">\r\n    </form>\r\n    <form id=\"forwardform\">\r\n      <input type='submit' aria-label=\"Move element forwards\" value=\"Move Fwd\" id=\"fwdButton\">\r\n    </form>\r\n    <form id=\"optionsform\">\r\n      <input type='submit' aria-label=\"Show or hide other menu options\" value=\"Options\" id=\"optionsButton\">\r\n    </form>\r\n    <a href=\"help.html\" target=\"_blank\">Help</a>\r\n  </div>\r\n\r\n  <div id=\"float_bar\" class=\"float_bar\">\r\n    <form id=\"float_optionsform\">\r\n      <input type='submit' aria-label=\"Show or hide menu options\" value=\"Menu\" id=\"float_optionsButton\">\r\n    </form>\r\n\r\n    <a class=\"help_link\" href=\" help.html\" target=\"_blank\">Help</a>\r\n  </div>\r\n\r\n  <div class=\"optionsbar\" id=\"options\" aria-label=\"Menu\">\r\n\r\n    <h2>Options:</h2>\r\n    <h3>File: Save, load, or print a journey</h3>\r\n\r\n    <form id=\"saveform\" aria-label=\"Save journey to file\">\r\n      <label for=\"filenamearea\">Save:</label>\r\n      <input type='text' value=\"journey_file\" id=\"filenamearea\">\r\n      <input type='submit' value=\"Save\" id=\"saveButton\" >\r\n    </form>\r\n\r\n    <br><br>\r\n\r\n    <form id=\"loadform\" aria-label=\"Load journey from file\">\r\n      <label for=\"fileinput\">Load:</label>\r\n      <input type='file' id='fileinput' required aria-required=\"true\">\r\n      <input type='submit' id=\"loadButton\" value=\"Load\" >\r\n    </form>\r\n\r\n    <br><br>\r\n\r\n    <form id=\"printform\">\r\n      <input type='submit' aria-label=\"Print\" value=\"Print\" id=\"printButton\">\r\n    </form>\r\n\r\n    <h3>View: Change how it looks</h3>\r\n\r\n    <form id=\"backgroundform\" aria-label=\"Choose background colour\">\r\n      <label for=\"background_select\">Background Colour:</label>\r\n      <select id=\"background_select\">\r\n        <option value=\"none\">None</option>\r\n        <option value=\"Ivory\">Ivory</option>\r\n        <option value=\"Linen\">Linen</option>\r\n        <option value=\"Beige\">Beige</option>\r\n        <option value=\"Wheat\">Wheat</option>\r\n        <option value=\"BurlyWood\">Wood</option>\r\n        <option value=\"DarkSeaGreen\">Green</option>\r\n        <option value=\"PaleTurquoise\">Turquoise</option>\r\n        <option value=\"SkyBlue\">Blue</option>\r\n        <option value=\"LightPink\">Pink</option>\r\n        <option value=\"Lavender\">Lavender</option>\r\n        <option value=\"LightGray\">Grey</option>\r\n        <option value=\"Coral\">Orange</option>\r\n      </select>\r\n    </form>\r\n\r\n    <br>\r\n\r\n    <form id=\"backgroundelementsform\" aria-label=\"Show or hide background images\">\r\n      <label for=\"background_elements_select\">Background Images:</label>\r\n      <select id=\"background_elements_select\">\r\n        <option value=\"all\">All images</option>\r\n        <option value=\"some\">Some images</option>\r\n        <option value=\"none\">No images</option>\r\n      </select>\r\n    </form>\r\n\r\n    <br>\r\n\r\n    <form id=\"cardcolourform\" aria-label=\"Choose card colour\">\r\n      <label for=\"card_colour_select\">Card Colour:</label>\r\n      <select id=\"card_colour_select\">\r\n        <option value=\"none\">None</option>\r\n        <option value=\"Ivory\">Ivory</option>\r\n        <option value=\"Linen\">Linen</option>\r\n        <option value=\"Beige\">Beige</option>\r\n        <option value=\"Wheat\">Wheat</option>\r\n        <option value=\"BurlyWood\">Wood</option>\r\n        <option value=\"DarkSeaGreen\">Green</option>\r\n        <option value=\"PaleTurquoise\">Turquoise</option>\r\n        <option value=\"SkyBlue\">Blue</option>\r\n        <option value=\"LightPink\">Pink</option>\r\n        <option value=\"Lavender\">Lavender</option>\r\n        <option value=\"LightGray\">Grey</option>\r\n        <option value=\"Coral\">Orange</option>\r\n      </select>\r\n    </form>\r\n\r\n    <br>\r\n\r\n    <p>\r\n      <a href=\"?demo=1\">Demo fill</a> | <a href=\"?demo=0\">Reset &ndash; no fill</a>\r\n      |\r\n      <a id=\"oj-share-link\" class=\"oj-share-link\" href=\"?empty\" rel=\"nofollow\" title=\"Base64 encoded!\">Share</a>\r\n    </p>\r\n  </div>\r\n</div>\r\n";

},{}],13:[function(require,module,exports){
module.exports = "\r\n<svg id=\"floating_editor\" x=\"0\" y=\"0\" width=\"370\" height=\"370\" visibility=\"collapse\">\r\n  <rect id=\"floating_editor_outline\" width=\"240\" height=\"130\" stroke=\"black\" stroke-width=\"0\" fill-opacity=\"0.0\" fill=\"Ivory\"/>\r\n\r\n  <svg id=\"empty_icon\" x=\"10\" y=\"110\">\r\n    <rect id=\"empty_icon_rect\" width=\"110\" height=\"110\"  stroke=\"LightGray\" fill=\"LightGray\"/>\r\n    <foreignObject id=\"empty_icon_text\" width=\"100\" height=\"75\" x=\"5\" y=\"10\">\r\n      <p>1. What happened?</p>\r\n    </foreignObject>\r\n  </svg>\r\n\r\n  <foreignObject id=\"floating_icon\" y=85 x=5>\r\n    <form>\r\n    <select class=\"floating_icon_select\" id=\"floating_icon_select\" aria-label=\"Select an event\" tabindex=\"0\">\r\n      <option value=\"none\">Select</option>\r\n\r\n      <optgroup label=\"Figuring things out\">\r\n        <option value=\"considerstudy\">Considering study</option>\r\n        <option value=\"information\">Finding information</option>\r\n        <option value=\"register\">Registering</option>\r\n        <option value=\"admin\">Admin and forms</option>\r\n        <option value=\"communication\">Communication</option>\r\n        <option value=\"studygoal\">Study goal</option>\r\n      </optgroup>\r\n      <optgroup label=\"Study\">\r\n        <option value=\"assessment\">Assessment</option>\r\n        <option value=\"duedates\">Due dates</option>\r\n        <option value=\"lowscores\">Low scores</option>\r\n        <option value=\"studymilestone\">Milestone</option>\r\n        <option value=\"studyexperience\">Study experience</option>\r\n        <option value=\"studysupport\">Study support</option>\r\n      </optgroup>\r\n      <optgroup label=\"Positives\">\r\n        <option value=\"achievement\">Achievement</option>\r\n        <option value=\"confidence\">Confidence boost</option>\r\n        <option value=\"peersupport\">Peer support</option>\r\n        <option value=\"studysuccess\">Study success</option>\r\n      </optgroup>\r\n      <optgroup label=\"Challenges\">\r\n        <option value=\"barrier\">Barrier</option>\r\n        <option value=\"helpneeded\">Help needed</option>\r\n        <option value=\"highpressure\">High pressure</option>\r\n        <option value=\"lostdirection\">Lost direction</option>\r\n        <option value=\"nosupport\">No support</option>\r\n        <option value=\"problem\">Problem</option>\r\n        <option value=\"timelost\">Time lost</option>\r\n      </optgroup>\r\n      <optgroup label=\"Life\">\r\n        <option value=\"studybreak\">Break from study</option>\r\n        <option value=\"finances\">Finances</option>\r\n        <option value=\"employment\">Jobs and employment</option>\r\n        <option value=\"lowenergy\">Low energy</option>\r\n        <option value=\"moving\">Moving home</option>\r\n        <option value=\"repetition\">Repetition</option>\r\n      </optgroup>\r\n\r\n    </select>\r\n    </form>\r\n  </foreignObject>\r\n\r\n  <foreignObject x=125 y=10 id=\"floating_desc\">\r\n    <textarea id=\"floating_event_desc\" rows=3 cols=12 tabindex=\"0\" maxlength=40 placeholder=\"2. Describe the event\"></textarea>\r\n  </foreignObject>\r\n\r\n  <svg id=\"empty_emoticon\" x=\"125\" y=\"150\">\r\n    <rect id=\"empty_emoticon_rect\" width=\"110\" height=\"75\" stroke=\"LightGray\" fill=\"LightGray\"/>\r\n    <foreignObject id=\"empty_emoticon_text\" width=\"100\" height=\"75\" x=\"5\" y=\"0\">\r\n      <p>3. How did you feel?</p>\r\n    </foreignObject>\r\n  </svg>\r\n\r\n  <foreignObject id=\"floating_emoticon\" y=140 x=12>\r\n    <form>\r\n      <select class=\"floating_emoticon_select\" id=\"floating_emoticon_select\" aria-label=\"How did you feel?\" tabindex=\"0\">\r\n        <option value=\"none\">Select</option>\r\n        <option value=\"angry\">Angry</option>\r\n        <option value=\"anxious\">Anxious</option>\r\n        <option value=\"bored\">Bored</option>\r\n        <option value=\"confident\">Confident</option>\r\n        <option value=\"confused\">Confused</option>\r\n        <option value=\"curious\">Curious</option>\r\n        <option value=\"embarrassed\">Embarrassed</option>\r\n        <option value=\"excited\">Excited</option>\r\n        <option value=\"happy\">Happy</option>\r\n        <option value=\"nervous\">Nervous</option>\r\n        <option value=\"proud\">Proud</option>\r\n        <option value=\"scared\">Scared</option>\r\n        <option value=\"stressed\">Stressed</option>\r\n        <option value=\"thinking\">Thinking</option>\r\n        <option value=\"tired\">Tired</option>\r\n        <option value=\"unhappy\">Unhappy</option>\r\n        <option value=\"unwell\">Unwell</option>\r\n        <option value=\"upset\">Upset</option>\r\n      </select>\r\n    </form>\r\n  </foreignObject>\r\n\r\n  <foreignObject x='245' y='10' id=\"floating_post\" >\r\n    <textarea class=\"floating_post\" id=\"floating_post_it_text\" rows=3 cols=9 maxlength=40 placeholder=\"4. Add an optional note?\"></textarea>\r\n  </foreignObject>\r\n\r\n  <foreignObject x='245' y='75' id=\"floating_back\">\r\n    <form id=\"floating_backform\" tabindex=\"0\">\r\n      <input type='submit' aria-label=\"Move element backwards\" value=\"<\" id=\"floating_backButton\">\r\n    </form>\r\n  </foreignObject>\r\n\r\n  <foreignObject x='245' y='105' id=\"floating_fwd\">\r\n    <form id=\"floating_forwardform\" tabindex=\"0\">\r\n      <input type='submit' aria-label=\"Move element forwards\" value=\">\" id=\"floating_fwdButton\">\r\n    </form>\r\n  </foreignObject>\r\n</svg>\r\n";

},{}],14:[function(require,module,exports){
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

},{"./core":3}],15:[function(require,module,exports){
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

},{"./assets":2,"./core":3}],16:[function(require,module,exports){
/* Utility & configuration functions | ©The Open University.
*/

module.exports = {

  putConfig: putConfig,

  config: getConfig,

  qs: querySelector,

  replace: replaceObj
};

let CONFIG = {};

/** Set (all) configuration options.
 */
function putConfig (config) {
  module.exports.CFG = CONFIG = config;

  CONFIG.container = document.querySelector(CONFIG.containerSelector);
}

/** Get one or all configuration options.
 */
function getConfig (key) {
  return key ? CONFIG[ key ] : CONFIG;
}

/** qs: Select a HTML or SVG element, from within the Our-journey container element.
 *  Generally, "document.getElementById('my_id')" should be replaced with "UTIL.qs('#my_id')";
 */
function querySelector (selector) {
  return CONFIG.container.querySelector(selector);
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}

},{}],17:[function(require,module,exports){
/* Create tool markup from HTML & SVG templates | ©The Open University.
*/

module.exports = {
  cardTemplate: require('./partials/card-template.svg'),

  // Was: replace: replaceObj,

  setup: setup
};

const UTIL = require('./util'); // Was: CONFIG = require('./config');

function setup () {
  const CONTAINER = UTIL.config('container'); // document.querySelector(CONFIG.get('containerSelector'));

  // We're using stringify.

  CONTAINER.innerHTML = UTIL.replace(require('./views/default-tool.html'), {
    '{assets}': UTIL.config('assetUrl'),
    '{attribution partial}': partial(require('./partials/attribute.html')),
    '{background partial}': partial(require('./partials/background.svg')),
    '{editor bar partial}': partial(require('./partials/editor-bar.html')),
    '{floating editor partial}': partial(require('./partials/floating-editor.svg'))
  });

  CONTAINER.className += ' our-journey-js ok';
}

function partial (partialContent) {
  return partialContent.replace(/\{assets\}/g, UTIL.config('assetUrl'));

  // return replaceObj(partialContent, { '{assets}': UTIL.config('assetUrl') });
}

},{"./partials/attribute.html":9,"./partials/background.svg":10,"./partials/card-template.svg":11,"./partials/editor-bar.html":12,"./partials/floating-editor.svg":13,"./util":16,"./views/default-tool.html":18}],18:[function(require,module,exports){
module.exports = "\r\n<!-- {{> ../partials/background.svg.hbs }} -->\r\n\r\n{editor bar partial}\r\n\r\n<div class=\"main\" id=\"main\">\r\n\r\n  <svg width=\"1240\" height=\"1600\" class=\"journey-canvas\" id=\"journey-canvas\" aria-label=\"Journey canvas\" role=\"img\">\r\n    <desc id=\"start-card\">Start of the journey</desc>\r\n    <desc id=\"group-0\">Card group</desc>\r\n    <desc id=\"empty-card\">Empty journey card</desc>\r\n\r\n    {background partial}\r\n\r\n    <g class=\"card-holder\" ></g>\r\n\r\n    {floating editor partial}\r\n\r\n    <svg id=\"add_more_card\" class=\"add_more_card\" width=\"130\" height=\"240\" y=\"1350\" x=\"990\" tabindex=0>\r\n        <rect role=\"button\" fill=\"crimson\" id=\"add_more_rect\" width = \"130\" height = \"240\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" fill-opacity=\"1.0\"/>\r\n        <image xlink:href = \"{assets}/add-more.png\" x = \"4\" y = \"30\" height=\"176\" width=\"121\" id=\"add_more_img\" class=\"add_more_img\"/>\r\n    </svg>\r\n\r\n  </svg>\r\n\r\n</div>\r\n\r\n{attribution partial}\r\n";

},{}],"our-journey":[function(require,module,exports){
/*!
  Our-journey module | © The Open University.
*/

module.exports = {

  version: '1.2.1',

  app: require('./src/app'),

  core: require('./src/core'),

  layout: require('./src/layout'),

  events: require('./src/event'),

  file: require('./src/file'),

  share: require('./src/share-link'),

  ui: require('./src/user-interface'),

  util: require('./src/util'), // Was: config: require('./src/config'),

  views: require('./src/views')
};

},{"./src/app":1,"./src/core":3,"./src/event":5,"./src/file":6,"./src/layout":7,"./src/share-link":14,"./src/user-interface":15,"./src/util":16,"./src/views":17}]},{},[]);
