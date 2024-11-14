/*!
 * our-journey | 1.6.5
 * © 2024 The Open University (IET) | Tim Coughlan {lead}, Glen Darby, Nick Freear | GPL-3.0+.
 * Build: 2024-11-14T16:05Z
 * https://github.com/IET-OU/our-journey
 */

require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* Default application | ©The Open University.
*/

module.exports.run = run;

// Run 'check' when Javascript is included, not on 'run()'!
const IS_COMPAT = require('./compat').check();

const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');
const UTIL = require('./util');
const VIEWS = require('./views');

function run (config) {
  const T_START = Date.now();
  console.time('our-journey int');

  window.ourJourneySvgLoad = function (ev) {
    const T_END = Date.now();
    UTIL.config().times = { start: T_START, end: T_END };

    console.warn('Svg load, ms:', T_END - T_START, ev);
    console.timeLog && console.timeLog('our-journey int');
  };

  const promise = new Promise(function (resolve, reject) {
    if (!IS_COMPAT) {
      // This should never be reached!
      reject(new Error('our-journey. Browser compatibility error'));

      return;
    }

    const CFG = UTIL.putConfig(config);

    console.warn('The our-journey API:', require('../index'), 'config:', CFG);

    VIEWS.setup();

    console.warn('qs test:', UTIL.qs('#journey-canvas'));

    if (CFG.layout === 'scol') {
      LAYOUT.setScol();
    } else {
      LAYOUT.reflow();
    }

    if (CFG.editor === 'fixed') {
      UI.chooseEditor('fixed');
    } else {
      UI.chooseEditor('float');
    }

    CORE.initialiseElements(0);

    EVENTS.initialise();

    if (CFG.demo) {
      CORE.demoFill();

      UTIL.container().className += ' demo-fill';
    }

    if (CFG.wholePage) {
      document.body.className += ' our-journey-whole-page';
    }

    CORE.setFocusElement(0);
    CORE.changeFocus();

    UI.toggleOptions(0);
    UI.changeBackground(CFG.background); // Was: 'Wheat'

    SHARE.createLink(CORE.getElements());
    var loadedJourneyLength = SHARE.loadLink(CORE.getElements());

    document.getElementById('group0').focus();

    if (loadedJourneyLength > 0) {
      // increase length of loaded journey if needed
      if (loadedJourneyLength > CORE.getNumElements()) {
        var adds = (loadedJourneyLength - CORE.getNumElements()) / 10;
        var i;
        for (i = 0; i < adds; i++) {
          LAYOUT.addElementsToLayout();
        }
      }
    } else {
      CORE.editFocus();
    }
    window.scrollTo(0, 0);
    resolve('our-journey: OK');
  });

  return promise;
}

},{"../index":"our-journey","./compat":3,"./core":5,"./event":7,"./layout":9,"./share-link":16,"./user-interface":17,"./util":18,"./views":19}],2:[function(require,module,exports){
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

/* eslint-disable */
// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png', alt: 'Achievement'}, {name: 'admin', file: 'Admin_card.png', alt: 'Admin and forms'}, {name: 'assessment', file: 'Assessments_card.png', alt: 'Assessment'}, {name: 'barrier', file: 'Barrier_card.png', alt: 'Barrier'}, {name: 'communication', file: 'Communication_card.png', alt: 'Communication'}, {name: 'confidence', file: 'ConfidenceBoost_card.png', alt: 'Confidence boost'}, {name: 'considerstudy', file: 'ConsiderStudy_card.png', alt: 'Considering study'}, {name: 'duedates', file: 'DueDates_card.png', alt: 'Due dates'}, {name: 'employment', file: 'Employment_card.png', alt: 'Jobs and employment'}, {name: 'finances', file: 'Finances_card.png', alt: 'Finances'}, {name: 'helpneeded', file: 'Needed_card.png', alt: 'Help needed'}, {name: 'highpressure', file: 'HighPressure_card.png', alt: 'High pressure'}, {name: 'information', file: 'Information_card.png', alt: 'Finding information'}, {name: 'lostdirection', file: 'LostDirection_card.png', alt: 'Lost direction'}, {name: 'lowenergy', file: 'LowEnergy_card.png', alt: 'Low energy'}, {name: 'lowscores', file: 'LowScores_card.png', alt: 'Low scores'}, {name: 'moving', file: 'Moving_card.png', alt: 'Moving home'}, {name: 'nosupport', file: 'NoSupport_card.png', alt: 'No support'}, {name: 'peersupport', file: 'PeerSupport_card.png', alt: 'Peer support'}, {name: 'problem', file: 'Problem_card.png', alt: 'Problem'}, {name: 'register', file: 'Register_card.png', alt: 'Registering'}, {name: 'repetition', file: 'Repetition_card.png', alt: 'Repetition'}, {name: 'studybreak', file: 'StudyBreak_card.png', alt: 'Break from study'}, {name: 'studyexperience', file: 'StudyExperience_card.png', alt: 'Study experience'}, {name: 'studygoal', file: 'StudyGoal_card.png', alt: 'Goal'}, {name: 'studymilestone', file: 'StudyMilestone_card.png', alt: 'Study milestone'}, {name: 'studysuccess', file: 'StudySuccess_card.png', alt: 'Study success'}, {name: 'studysupport', file: 'StudySupport_card.png', alt: 'Study support'}, {name: 'timelost', file: 'TimeLost_card.png', alt: 'Time lost'} ];
const emoticonFiles = [ {name: 'proud', file: 'Proud_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'anxious', file: 'Anxious_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confident', file: 'Confident_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'curious', file: 'Curious_emoji.png'}, {name: 'embarrassed', file: 'Embarrassed_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'scared', file: 'Scared_emoji.png'}, {name: 'unwell', file: 'Unwell_emoji.png'}, {name: 'stressed', file: 'Stressed_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'}, {name: 'tired', file: 'Tired_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'} ];
const backgroundElements = ['head_background', 'pencil_background', 'plant_background', 'calc_background', 'biscuits_background', 'glasses_background', 'folder_background', 'coffee_background', 'pens_background', 'graph_background', 'jammie_background', 'pencil_background', 'biscuits_background_2', 'plant_background_2', 'tablet_background', 'calc_background_2', 'tablet_background_2', 'glasses_background_2', 'coffee_background_2', 'pens_background_2', 'folder_background_2', 'graph_background_2', 'jammie_background_2', 'coffee_background_3'];
/* eslint-enable */
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

},{"./util":18}],3:[function(require,module,exports){
/* Browser compatibility | ©The Open University.
*/

module.exports.check = checkAndHandle;

const UA = window.navigator.userAgent;
const DOC = window.document;
const LOC = window.location;
const NO_COMPAT_MSG = [
  '<div class="X-ojs-error alert alert-danger" role="alert">',
  '  <p>Sorry! <i>our-journey</i> does not work on Internet Explorer.</p>',
  '  <p><a href="https://browsehappy.com">Try a different browser — Browse Happy</a></p>',
  '</div>'
];
const COMPAT_REGEX = /(MSIE|Trident\/)/; // Live!
// const COMPAT_REGEX = /(MSIE|Trident\/|Chrome)/; // Test!

function checkAndHandle () {
  const IS_COMPAT = (!COMPAT_REGEX.test(UA) || /compatCheck=false/.test(LOC.href));

  if (IS_COMPAT) {
    console.warn('our-journey. Browser is compatible');
  } else {
    notCompatibleMessage();

    tryHideContainer();

    let err = new Error('our-journey. Browser NOT compatible (MSIE ?)');
    err.name = 'CompatError';
    throw err;
  }

  return IS_COMPAT;
}

function notCompatibleMessage () {
  const DIV = DOC.createElement('div');

  DIV.innerHTML = NO_COMPAT_MSG.join('\n');
  DIV.className = 'our-journey-js ojs-error ojs-no-compat ojs-msie';

  DOC.body.insertBefore(DIV, DOC.body.firstChild);
}

function tryHideContainer () {
  // We can't use UTIL.config('container') here, so guess!
  const TRY_CTR = DOC.querySelector('#our-journey-tool');

  if (TRY_CTR) {
    TRY_CTR.style.display = 'none';
  }
}

},{}],4:[function(require,module,exports){
/* Default configuration | ©The Open University.
*/

const UTIL = require('./util');

module.exports.DEFAULTS = {
  // CSS-style selector for the containing HTML element.
  containerSelector: '#our-journey-tool',
  // URL to load icons and emoticons from (Default: Unpkg CDN https://unpkg.com/our-journey@^1/assets).
  assetUrl: 'https://ourjourney.ac.uk/v1/tool-assets',
  // URL of the help page, to use in HTML links.
  helpUrl: 'https://ourjourney.ac.uk/v1/help.html',
  // @prop {string} privacyUrl Link to a privacy policy, and terms.
  privacyUrl: 'https://ourjourney.ac.uk/v1/privacy-ou-generic.html',
  // Load a demonstration journey (Default: false)
  demo: UTIL.param(/[?&]demo=(1)/, false),
  // Use the floating or fixed editor (Default: floating)
  editor: UTIL.param(/[?&]edit=(fixed|float)/, 'float'),
  // Load a journey. A null (default), base-64 encoded JSON, or an array of journey objects.
  journey: UTIL.param(/[?&]j=(base64:[\w%=]+)/),
  // Use a single-column or default layout (Default: 'default')
  layout: UTIL.param(/[?&]layout=(scol|default)/, 'default'),
  // @prop {string} background  Set the background colour-name (Default: 'wheat')
  // @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
  background: UTIL.param(/[?&]bg=([a-z]+)/, 'Wheat'),
  // @prop {integer} zoom Set the zoom-level for embeds (50 ... 95)% (Default: 100).
  zoom: UTIL.param(/[?&]zoom=([5-9][05])/, 100),
  // @prop {boolean} wholePage  Does the our-journey tool occupy the whole page? (Default: true)
  wholePage: true,
  // @readonly {string} version  Version.
  version: '1.6.5',
  // Experimental! Custom events (asynchronous) or callbacks (synchronous) ?
  events: [
    // Asynchronous custom event fired after each time the share link is re-generated.
    'updatesharelink.ourjourney'
  ],
  // Experimental! Synchronous callback fired after each time the share link is re-generated. (Was: 'onRecreate')
  onUpdateShareLink: function () {}
};

},{"./util":18}],5:[function(require,module,exports){
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
  setEmoticonColour: setEmoticonColour,
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
var emoColour = 'White';

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
      case 'Enter':
        if (focusOnAddMore) {
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

function setEmoticonColour (colour) {
  emoColour = colour;
  updateElements();
  document.getElementById('emoticon_colour_select').value = emoColour;
}

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    var elementGroup = document.getElementById('group' + i);
    elementGroup.addEventListener('click', elementClick);
    elementGroup.addEventListener('focus', cardFocus);
    var card = document.getElementById('place' + i);
    var emoticonback = document.getElementById('emoticonback' + i);
    card.style.fill = cardColour;
    emoticonback.style.fill = emoColour;
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
  var backEmo = document.getElementById('emoticonback' + i);
  var layoutStyle = LAYOUT.getLayoutStyle();
  if (getElement(i).emoticon !== 'none') {
    for (var j = 0; j < ASSET.emoticonCount(); j++) {
      if (ASSET.hasEmoticon(j, getElement(i))) {
        backEmo.setAttribute('visibility', 'visible');
        eEmo.setAttribute('height', DIM.emoticonHeight);
        eEmo.setAttribute('width', DIM.emoticonWidth);
        if ((layoutStyle === 'default') && (vlElements.includes(i))) {
          backEmo.setAttribute('cx', DIM.emoticonXV + 36);
          backEmo.setAttribute('cy', DIM.emoticonYV + 36);
          eEmo.setAttribute('x', DIM.emoticonXV);
          eEmo.setAttribute('y', DIM.emoticonYV);
        } else if ((layoutStyle === 'default') && (vrElements.includes(i))) {
          backEmo.setAttribute('cx', DIM.emoticonXVR + 36);
          backEmo.setAttribute('cy', DIM.emoticonYVR + 36);
          eEmo.setAttribute('x', DIM.emoticonXVR);
          eEmo.setAttribute('y', DIM.emoticonYVR);
        } else {
          backEmo.setAttribute('cx', DIM.emoticonX + 36);
          backEmo.setAttribute('cy', DIM.emoticonY + 36);
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
    backEmo.setAttribute('visibility', 'collapse');
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
    window.scrollTo(window.scrollX, focusY - 200);
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
  const FL_POST = UTIL.qs('#floating_post');
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
          FL_POST.setAttribute('x', DIM.floatPostItVX);
          FL_POST.setAttribute('y', DIM.floatPostItVY);
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
          FL_POST.setAttribute('x', DIM.floatPostItVRX);
          FL_POST.setAttribute('y', DIM.floatPostItVRY);
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
          FL_POST.setAttribute('x', DIM.floatPostItX);
          FL_POST.setAttribute('y', DIM.floatPostItY);
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
        EM_ICON.setAttribute('fill-opacity', '0.9');
        emptyIconText.textContent = '1. What happened?';
      } else {
        EM_ICON.setAttribute('fill-opacity', '0.0');
        emptyIconText.textContent = '';
      }
      UTIL.qs('#floating_emoticon_select').value = EMO_VALUE;
      if (EMO_VALUE === 'none') {
        EM_EMOJI.setAttribute('fill-opacity', '0.9');
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

},{"./assets":2,"./dimension.json":6,"./layout":9,"./user-interface":17,"./util":18}],6:[function(require,module,exports){
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
  "emoticonXV": 30,
  "emoticonYV": 160,
  "emoticonXVR": 130,
  "emoticonYVR": 262,
  "emoticonX": 145,
  "emoticonY": 215,
  "textXV": 108,
  "textYV": 120,
  "textXVR": 8,
  "textYVR": 225,
  "textX": 122,
  "textY": 108,
  "rectY": 100,
  "rectXV": 100,
  "postitX": 72,
  "postitY": 12,
  "postitVX": 7,
  "postitVY": 40,
  "postitVRY": 150,
  "postitVRX": 125,
  "postitTextX": 78,
  "postitTextVX": 12,
  "postitTextVRX": 130,
  "postitTextY": 27,
  "postitTextVY": 57,
  "postitTextVRY": 167,
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
  "floatEditEmoVX": 10,
  "floatEditEmoVY": 240,
  "floatEditEmoX": 125,
  "floatEditEmoY": 300,
  "floatEditDescX": 125,
  "floatEditDescY": 105,
  "floatEditDescVX": 110,
  "floatEditDescVY": 120,
  "floatEmptyIconVX": 110,
  "floatEmptyIconVY": 5,
  "floatEmptyIconX": 10,
  "floatEmptyIconY": 105,
  "floatEmptyEmoVX": 21,
  "floatEmptyEmoVY": 150,
  "floatEmptyEmoX": 135,
  "floatEmptyEmoY": 205,
  "floatBackX": 0,
  "floatBackY": 68,
  "floatFwdX": 30,
  "floatFwdY": 68,
  "floatBackVX": 40,
  "floatBackVY": 0,
  "floatFwdVX": 70,
  "floatFwdVY": 0,
  "floatPostItX": 77,
  "floatPostItY": 30,
  "floatPostItVX": 5,
  "floatPostItVY": 50,
  "floatPostItVRX": 130,
  "floatPostItVRY": 178,
  "floatEditOutlineVRW": 140,
  "floatEditOutlineVRH": 270,
  "floatEditOutlineVRX": 95,
  "floatEditOutlineVRY": 0,
  "floatEditIconVRX": 10,
  "floatEditIconVRY": 195,
  "floatEditEmoVRX": 110,
  "floatEditEmoVRY": 342,
  "floatEditDescVRX": 10,
  "floatEditDescVRY": 225,
  "floatEmptyIconVRX": 10,
  "floatEmptyIconVRY": 105,
  "floatEmptyEmoVRX": 120,
  "floatEmptyEmoVRY": 252,
  "floatBackVRX": 135,
  "floatBackVRY": 100,
  "floatFwdVRX": 165,
  "floatFwdVRY": 100,
  "floatAddButtonX": 215,
  "floatAddButtonY": 68,
  "floatAddButtonVX": 100,
  "floatAddButtonVY": 205,
  "floatAddButtonVRX": 135,
  "floatAddButtonVRY": 310,
  "floatMoveMenuX": 175,
  "floatMoveMenuY": 70,
  "floatMoveMenuVX": 25,
  "floatMoveMenuVY": 5,
  "floatMoveMenuVRX": 133,
  "floatMoveMenuVRY": 95
}

},{}],7:[function(require,module,exports){
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
const SHARE = require('./share-link');

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

  attachEvent('#floating_move_menu', 'change', function (e) {
    e.preventDefault();
    CORE.moveMenuChanged();
  });

  attachEvent('#optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();

    // SHARE.createLink();
  });

  attachEvent('#float_optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();

    SHARE.createLink();
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

  attachEvent('#emoticon_colour_select', 'change', function (e) {
    e.preventDefault();
    UI.changeEmoticonColour();
  });

  attachEvent('#printform', 'submit', function (e) {
    e.preventDefault();
    UI.printJourney();
  });

  attachEvent('#loadform', 'submit', function (e) {
    e.preventDefault();
    FILE.loadJourney();
  });

  attachEvent('#float_simplesaveform', 'submit', function (e) {
    e.preventDefault();
    FILE.saveJourney();
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
    UI.toggleOptions(0);
    CORE.stopFloatingFocus();
  });
}

function attachEvent (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, function (ev) {
    callback(ev);
  });
}

},{"./core":5,"./file":8,"./layout":9,"./share-link":16,"./user-interface":17}],8:[function(require,module,exports){
/*!
  Save and load journeys to file, in the browser. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  saveJourneyJson: saveJourneyJson, // Was: saveJourney()
  saveJourney: saveJourneyHtml,
  loadJourney: loadJourney
};

const CORE = require('./core');
const LAYOUT = require('./layout');
const VIEW = require('./views');

const alert = window.alert;
const FileReader = window.FileReader;

function saveJourneyHtml () {
  var savebutton = document.getElementById('float_simplesavebutton');
  savebutton.value = 'Saving...';
  const FILE_NAME = document.getElementById('filenamearea').value + '.html';
  const DATA = VIEW.getRedirectHtml();

  let anchor = document.createElement('a');

  anchor.setAttribute('href', 'data:text/html;charset=utf-u,' + encodeURIComponent(DATA));
  anchor.setAttribute('download', FILE_NAME);
  anchor.click();
  savebutton.value = 'Save';
}

function saveJourneyJson () {
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

},{"./core":5,"./layout":9,"./views":19}],9:[function(require,module,exports){
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
const SVG_TEMPLATE = require('./views').cardTemplate;
const HOLDER_SELECTOR = '#journey-canvas .card-holder';
const CORE = require('./core');
const UI = require('./user-interface');
const UTIL = require('./util');

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
  const HOLDER = UTIL.qs(HOLDER_SELECTOR);

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];
  if (layout === 'scol') {
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': (i * 130) + 70, '{w}': 240, '{h}': 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      elem[ '{assets}' ] = UTIL.config('assetUrl');

      cards.push(UTIL.replace(SVG_TEMPLATE, elem));
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

},{"./core":5,"./layouts.json":10,"./user-interface":17,"./util":18,"./views":19}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
module.exports = "\n<p class=\"footer-copy\">\n  <a href=\"https://ourjourney.ac.uk/v1/\">our-journey</a>\n  v<i>1.6.5</i>\n  |\n  © <a href=\"http://www.open.ac.uk/\" target='_blank' title='Copyright © 2018 The Open University'>The Open University</a>\n  | <a href=\"https://iet.open.ac.uk/\" target='_blank' title='Developed by the Institute of Educational Technology (IET)'>IET</a>\n  <a rel='license' target='_blank' href=\"https://gnu.org/licenses/gpl-3.0.en.html\" title=\"GNU General Public License, version 3 or later [GPL-3.0+]\">License</a>\n  <a class='p' href='{privacyUrl}' target='_blank' title='Privacy policy, and terms of service'>Privacy</a>\n</p>\n\n<p class=\"footer-logos\">\n  <a href=\"https://iet.open.ac.uk/\" target='_blank'><img src=\"{assets}/iet-logo.svg\" alt=\"Institute of Educational Technology\" title=\"Institute of Educational Technology\" /></a>\n  <a href=\"http://www.open.ac.uk/\" target='_blank'><img src=\"{assets}/ou-logo.svg\" alt=\"The Open University\" title=\"The Open University\" /></a>\n</p>\n\n<p class=\"fork-me-btn\"><a\n  href=\"https://github.com/IET-OU/our-journey#fork\"\n  target=\"_blank\"\n  aria-label=\"Fork IET-OU/our-journey on GitHub\"\n  title=\"Fork IET-OU/our-journey on GitHub\" >\n  <svg version=\"1.1\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" class=\"octicon octicon-mark-github\" aria-hidden=\"true\">\n    <path fill-rule=\"evenodd\" d=\n    \"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z\"></path>\n  </svg>\n  <span>Fork me on GitHub</span>\n</a></p>\n <!--\n  https://buttons.github.io/\n   <a class=\"github-button\" href=\"https://github.com/IET-OU/our-journey/fork\" data-size=\"large\" aria-label=\"Fork IET-OU/our-journey on GitHub\">Fork</a>\n   <script async defer src=\"https://buttons.github.io/buttons.js\"></script>\n-->\n";

},{}],12:[function(require,module,exports){
module.exports = "\n<svg x=\"270\" y=\"0\" id='head_background'>\n  <image xlink:href='{assets}/background/head-background.png' role='presentation' x='0' y='0' height=\"315\" width=\"952\" id='headBackgroundImage'/>\n</svg>\n\n<svg x=\"120\" y=\"20\" id='start_point'>\n  <rect aria-labelledby=\"start-card\" width=\"130\" height=\"240\" y=\"20\" x=\"0\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" id='start_place' fill-opacity=\"1.0\" role='presentation'/>\n  <image xlink:href='{assets}/start-here-trans.png' x=\"7\" y=\"60\" height=\"156\" width=\"115\" id='startIcon' role='presentation'/>\n</svg>\n<svg x='0' y='0' id='scol_start_point' visibility='collapse'>\n  <rect aria-labelledby=\"start-card\" width=\"240\" height=\"170\" y=\"0\" x=\"0\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" id='start_place' fill-opacity=\"1.0\" role='presentation'/>\n  <image xlink:href='{assets}/start-here-trans.png' x=\"65\" y=\"5\" height=\"156\" width=\"115\" id='startIcon' role='presentation'/>\n</svg>\n\n<svg x=\"390\" y=\"565\" id='journey_logo'>\n  <image xlink:href='{assets}/background/journey-logo.png' x='0' y='0' height=\"140\" width=\"442\" id='journeyLogoImage' role='presentation'/>\n</svg>\n\n<svg x=\"320\" y=\"930\" id='pencil_background'>\n  <image xlink:href='{assets}/background/pencil.png' x='0' y='0' height=\"97\" width=\"161\" id='pencilImage' role='presentation'/>\n</svg>\n\n<svg x=\"1010\" y=\"920\" id='plant_background'>\n  <image xlink:href='{assets}/background/plant.png' x='0' y='0' height=\"134\" width=\"137\" id='plantImage' role='presentation'/>\n</svg>\n\n<svg x=\"100\" y=\"1260\" id='calc_background'>\n  <image xlink:href='{assets}/background/calculator.png' x='0' y='0' height=\"145\" width=\"141\" id='calcImage' role='presentation'/>\n</svg>\n\n<svg x=\"50\" y=\"580\" id='biscuits_background'>\n  <image xlink:href='{assets}/background/biscuits.png' x='0' y='0' height=\"144\" width=\"139\" id='biscuitsImage' role='presentation'/>\n</svg>\n\n<svg x=\"770\" y=\"1280\" id='glasses_background'>\n  <image xlink:href='{assets}/background/glasses.png' x='0' y='0' height=\"90\" width=\"141\" id='glassesImage' role='presentation'/>\n</svg>\n\n<svg x=\"950\" y=\"1600\" id='folder_background'>\n  <image xlink:href='{assets}/background/folder.png' x='0' y='0' height=\"202\" width=\"209\" id='folderImage' role='presentation'/>\n</svg>\n\n<svg x=\"300\" y=\"1610\" id='coffee_background'>\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\n</svg>\n\n<svg x=\"610\" y=\"1630\" id='pens_background'>\n  <image xlink:href='{assets}/background/pens.png' x='0' y='0' height=\"122\" width=\"197\" id='pensImage' role='presentation'/>\n</svg>\n\n<svg x=\"130\" y=\"1970\" id='graph_background'>\n  <image xlink:href='{assets}/background/graph.png' x='0' y='0' height=\"191\" width=\"247\" id='graphImage' role='presentation'/>\n</svg>\n\n<svg x=\"750\" y=\"1970\" id='jammie_background'>\n  <image xlink:href='{assets}/background/jammie.png' x='0' y='0' height=\"124\" width=\"134\" id='jammieImage' role='presentation'/>\n</svg>\n\n<svg x=\"990\" y=\"3780\" id='pencil_background_2'>\n  <image xlink:href='{assets}/background/pencil.png' x='0' y='0' height=\"97\" width=\"161\" id='pencilImage' role='presentation'/>\n</svg>\n\n<svg x=\"700\" y=\"2315\" id='biscuits_background_2'>\n  <image xlink:href='{assets}/background/biscuits.png' x='0' y='0' height=\"144\" width=\"139\" id='biscuitsImage' role='presentation'/>\n</svg>\n\n<svg x=\"440\" y=\"2315\" id='plant_background_2'>\n  <image xlink:href='{assets}/background/plant.png' x='0' y='0' height=\"134\" width=\"137\" id='plantImage' role='presentation'/>\n</svg>\n\n<svg x=\"900\" y=\"4450\" id='tablet_background'>\n  <image xlink:href='{assets}/background/tablet.png' x='0' y='0' height=\"206\" width=\"292\" id='tabletImage' role='presentation'/>\n</svg>\n\n<svg x=\"700\" y=\"2670\" id='calc_background_2'>\n  <image xlink:href='{assets}/background/calculator.png' x='0' y='0' height=\"145\" width=\"141\" id='calcImage' role='presentation'/>\n</svg>\n\n<svg x=\"30\" y=\"2660\" id='tablet_background_2'>\n  <image xlink:href='{assets}/background/tablet.png' x='0' y='0' height=\"206\" width=\"292\" id='tabletImage' role='presentation'/>\n</svg>\n\n<svg x=\"1030\" y=\"3080\" id='glasses_background_2'>\n  <image xlink:href='{assets}/background/glasses.png' x='0' y='0' height=\"90\" width=\"141\" id='glassesImage' role='presentation'/>\n</svg>\n\n<svg x=\"270\" y=\"3030\" id='coffee_background_2'>\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\n</svg>\n\n<svg x=\"640\" y=\"3390\" id='pens_background_2'>\n  <image xlink:href='{assets}/background/pens.png' x='0' y='0' height=\"122\" width=\"197\" id='pensImage' role='presentation'/>\n</svg>\n\n<svg x=\"100\" y=\"3380\" id='folder_background_2'>\n  <image xlink:href='{assets}/background/folder.png' x='0' y='0' height=\"202\" width=\"209\" id='folderImage' role='presentation'/>\n</svg>\n\n<svg x=\"20\" y=\"4080\" id='graph_background_2'>\n  <image xlink:href='{assets}/background/graph.png' x='0' y='0' height=\"191\" width=\"247\" id='graphImage' role='presentation'/>\n</svg>\n\n<svg x=\"985\" y=\"4920\" id='jammie_background_2'>\n  <image xlink:href='{assets}/background/jammie.png' x='0' y='0' height=\"124\" width=\"134\" id='jammieImage' role='presentation'/>\n</svg>\n\n<svg x=\"800\" y=\"4100\" id='coffee_background_3'>\n  <image xlink:href='{assets}/background/coffee.png' x='0' y='0' height=\"110\" width=\"115\" id='coffeeImage' role='presentation'/>\n</svg>\n\n<rect width=\"1240\" height=\"1600\" fill-opacity=\"0.0\" stroke-opacity=\"0.0\" id=\"journey-background\" role=\"presentation\"/>\n";

},{}],13:[function(require,module,exports){
module.exports = "\n<svg x=\"{x}\" y=\"{y}\" id=\"group{j}\" role=\"listitem\" class=\"card orient-{orient}\" tabindex=\"0\">\n  <rect width=\"{w}\" height=\"{h}\" id=\"place{j}\"/>\n  <image href=\"\" id=\"icon{j}\"/>\n  <switch>\n    <foreignObject id=\"description{j}\" class=\"in_card\" width=\"115\" height=\"380\">\n      <p xmlns=\"http://www.w3.org/1999/xhtml\">not filled</p>\n    </foreignObject>\n    <text id=\"description{j}\" class=\"in_card\">not filled</text>\n  </switch>\n  <circle r=\"43\" id=\"emoticonback{j}\" visibility=\"collapse\" role=\"presentation\" fill=\"Ivory\" stroke-width=\"2\" stroke=\"gray\"/>\n  <image href=\"\" id=\"emoticon{j}\"/>\n\n  <image id=\"postit{j}\" href=\"{assets}/PostIt.png\" width=\"100\" height=\"100\" visibility=\"collapse\" role=\"presentation\"></image>\n  <switch>\n    <foreignObject id=\"postittext{j}\" class=\"in_postit\" width=\"85\" height=\"85\" visibility=\"collapse\">\n      <p xmlns=\"http://www.w3.org/1999/xhtml\">not filled</p>\n    </foreignObject>\n    <text id=\"postittext{j}\" class=\"in_card\">not filled</text>\n  </switch>\n</svg>\n";

},{}],14:[function(require,module,exports){
module.exports = "\n<div class=\"editorbar\" id=\"editorbar\">\n  <div class=\"formeditor\" id=\"formeditor\">\n\n    <h1 id=\"title\">Journey editor: Map your study journey on to the cards</h1>\n\n    <form id=\"updateform\">\n      <select id=\"icon_select\" aria-labelledby=\"What happened?\">\n        <option value=\"considerstudy\">Considering study</option>\n        <option value=\"information\">Finding information</option>\n        <option value=\"register\">Registering</option>\n        <option value=\"finances\">Finances</option>\n        <option value=\"peersupport\">Peer support</option>\n        <option value=\"none\">What happened?</option>\n        <option value=\"achievement\">Achievement</option>\n        <option value=\"admin\">Admin and forms</option>\n        <option value=\"assessment\">Assessment</option>\n        <option value=\"studybreak\">Break from study</option>\n        <option value=\"barrier\">Barrier</option>\n        <option value=\"communication\">Communication</option>\n        <option value=\"confidence\">Confidence boost</option>\n        <option value=\"duedates\">Due dates</option>\n        <option value=\"employment\">Jobs and Employment</option>\n        <option value=\"studygoal\">Goal</option>\n        <option value=\"helpneeded\">Help needed</option>\n        <option value=\"highpressure\">High pressure</option>\n        <option value=\"lostdirection\">Lost direction</option>\n        <option value=\"lowenergy\">Low energy</option>\n        <option value=\"lowscores\">Low scores</option>\n        <option value=\"moving\">Moving home</option>\n        <option value=\"studymilestone\">Milestone</option>\n        <option value=\"nosupport\">No support</option>\n        <option value=\"problem\">Problem</option>\n        <option value=\"repetition\">Repetition</option>\n        <option value=\"studyexperience\">Study experience</option>\n        <option value=\"studysuccess\">Study success</option>\n        <option value=\"studysupport\">Study support</option>\n        <option value=\"timelost\">Time Lost</option>\n      </select>\n\n      <label for=\"event_desc\">Describe it:</label>\n      <textarea rows=3 maxlength=45 cols=12 id=\"event_desc\" value=\"\"></textarea>\n\n      <select id=\"emoticon_select\" aria-labelledby=\"How did you feel?\">\n        <option value=\"none\">How did you feel?</option>\n        <option value=\"angry\">Angry</option>\n        <option value=\"anxious\">Anxious</option>\n        <option value=\"bored\">Bored</option>\n        <option value=\"confident\">Confident</option>\n        <option value=\"confused\">Confused</option>\n        <option value=\"curious\">Curious</option>\n        <option value=\"embarrassed\">Embarrassed</option>\n        <option value=\"excited\">Excited</option>\n        <option value=\"happy\">Happy</option>\n        <option value=\"nervous\">Nervous</option>\n        <option value=\"proud\">Proud</option>\n        <option value=\"scared\">Scared</option>\n        <option value=\"stressed\">Bored</option>\n        <option value=\"thinking\">Thinking</option>\n        <option value=\"tired\">Tired</option>\n        <option value=\"unhappy\">Unhappy</option>\n        <option value=\"unwell\">Unwell</option>\n        <option value=\"upset\">Upset</option>\n      </select>\n\n      <label for=\"post_it_text\">Optional note:</label>\n      <textarea rows=3 maxlength=44 cols=12 id=\"post_it_text\" value=\"\"></textarea>\n      <input type='submit' aria-label=\"Update element\" value=\"Update\" id=\"updateButton\">\n    </form>\n\n    <form id=\"deleteform\">\n      <input type='submit' aria-label=\"Delete element\" value=\"Clear\" id=\"deleteButton\">\n    </form>\n\n    <form id=\"backform\">\n      <input type='submit' aria-label=\"Move element backwards\" value=\"Move Back\" id=\"backButton\">\n    </form>\n    <form id=\"forwardform\">\n      <input type='submit' aria-label=\"Move element forwards\" value=\"Move Fwd\" id=\"fwdButton\">\n    </form>\n    <form id=\"optionsform\">\n      <input type='submit' aria-label=\"Show or hide other menu options\" value=\"Options\" id=\"optionsButton\">\n    </form>\n    <a href=\"{helpUrl}\" target=\"_blank\">Help</a>\n  </div>\n\n  <div id=\"float_bar\" class=\"float_bar\">\n    <form id=\"float_simplesaveform\">\n      <input type='submit' aria-label=\"Save journey to file\" value=\"Save\" id=\"float_simplesavebutton\">\n    </form>\n    <form id=\"float_optionsform\">\n      <input type='submit' aria-label=\"Show or hide menu options\" value=\"Options\" id=\"float_optionsButton\">\n    </form>\n\n    <a class=\"help_link\" id=\"help_link\" href=\"{helpUrl}\" target=\"_blank\">Help</a>\n  </div>\n\n  <div class=\"optionsbar\" id=\"options\" aria-label=\"Menu\">\n    <h2>Options</h2>\n    <h2>File:</h2>\n    <h3>Save As:</h3>\n    <form id=\"saveform\" aria-label=\"Save journey to file name\">\n      <label for=\"filenamearea\">Choose a filename:</label>\n      <input type='text' value=\"journey-file\" id=\"filenamearea\">\n      <input type='submit' value=\"Save\" id=\"saveButton\" >\n    </form>\n\n    <br>\n    <form id=\"loadform\" aria-label=\"Load journey from file\" hidden>\n      <h3 hidden><label for=\"fileinput\">Load:</label></h3>\n      <input type='file' accept='application/json, text/html' id='fileinput' required aria-required=\"true\" hidden>\n      <input type='submit' id=\"loadButton\" value=\"Load File\" hidden>\n    </form>\n    <h3>Load:</h3>\n    You can load your saved journey by opening the file in a browser. Opening the saved file (for example by double clicking on it) should load it in your default browser.\n    \n    <br>\n    <h3>Print:</h3>\n    <form id=\"printform\">\n      <input type='submit' aria-label=\"Print using browser\" value=\"Print using browser\" id=\"printButton\">\n    </form>\n    <hr>\n    <h2>View:</h2>\n\n    <form id=\"backgroundelementsform\" aria-label=\"Show or hide background images\">\n      <label for=\"background_elements_select\">Show Background Images:</label>\n      <select id=\"background_elements_select\">\n        <option value=\"all\" selected=\"selected\">All images</option>\n        <option value=\"some\">Some images</option>\n        <option value=\"none\">No images</option>\n      </select>\n    </form>\n\n    <br>\n\n    <form id=\"backgroundform\" aria-label=\"Choose background colour\">\n      <label for=\"background_select\">Background Colour:</label>\n      <select id=\"background_select\">\n        <option value=\"none\">None</option>\n        <option value=\"Wheat\" selected=\"selected\">Wheat</option>\n        <option value=\"Ivory\">Ivory</option>\n        <option value=\"Linen\">Linen</option>\n        <option value=\"Beige\">Beige</option>\n        <option value=\"BurlyWood\">Wood</option>\n        <option value=\"DarkSeaGreen\">Green</option>\n        <option value=\"PaleTurquoise\">Turquoise</option>\n        <option value=\"SkyBlue\">Blue</option>\n        <option value=\"LightPink\">Pink</option>\n        <option value=\"Lavender\">Lavender</option>\n        <option value=\"LightGray\">Grey</option>\n        <option value=\"Coral\">Orange</option>\n      </select>\n    </form>\n\n    <br>\n\n    <form id=\"cardcolourform\" aria-label=\"Choose card colour\">\n      <label for=\"card_colour_select\">Card Colour:</label>\n      <select id=\"card_colour_select\">\n        <option value=\"none\">None</option>\n        <option value=\"White\">White</option>\n        <option value=\"Ivory\" selected=\"selected\">Ivory</option>\n        <option value=\"Linen\">Linen</option>\n        <option value=\"Beige\">Beige</option>\n        <option value=\"Wheat\">Wheat</option>\n        <option value=\"BurlyWood\">Wood</option>\n        <option value=\"DarkSeaGreen\">Green</option>\n        <option value=\"PaleTurquoise\">Turquoise</option>\n        <option value=\"SkyBlue\">Blue</option>\n        <option value=\"LightPink\">Pink</option>\n        <option value=\"Lavender\">Lavender</option>\n        <option value=\"LightGray\">Grey</option>\n        <option value=\"Coral\">Orange</option>\n      </select>\n    </form>\n\n    <br>\n\n    <form id=\"emoticoncolourform\" aria-label=\"Choose emoticon background colour\">\n      <label for=\"emoticon_colour_select\">Emoticon Colour:</label>\n      <select id=\"emoticon_colour_select\" selected=\"White\">\n        <option value=\"none\">None</option>\n        <option value=\"White\" selected=\"selected\">White</option>\n        <option value=\"Ivory\">Ivory</option>\n        <option value=\"Linen\">Linen</option>\n        <option value=\"Beige\">Beige</option>\n        <option value=\"Wheat\">Wheat</option>\n        <option value=\"BurlyWood\">Wood</option>\n        <option value=\"DarkSeaGreen\">Green</option>\n        <option value=\"PaleTurquoise\">Turquoise</option>\n        <option value=\"SkyBlue\">Blue</option>\n        <option value=\"LightPink\">Pink</option>\n        <option value=\"Lavender\">Lavender</option>\n        <option value=\"LightGray\">Grey</option>\n        <option value=\"Coral\">Orange</option>\n        <option value=\"Black\">Black</option>\n      </select>\n    </form>\n\n    <br>\n    <hr>\n    <h2>Share:</h2>\n    <p>\n      <a id=\"oj-share-link\" class=\"oj-share-link\" href=\"?empty\" rel=\"nofollow\" title=\"Base64 encoded!\">Go to shareable URL</a>\n    </p>\n  </div>\n</div>\n";

},{}],15:[function(require,module,exports){
module.exports = "\n<svg id=\"floating_editor\" x=\"0\" y=\"0\" width=\"370\" height=\"370\" visibility=\"collapse\">\n  <rect id=\"floating_editor_outline\" width=\"240\" height=\"130\" stroke=\"black\" stroke-width=\"0\" fill-opacity=\"0.0\" fill=\"Ivory\"/>\n\n  <svg id=\"empty_icon\" x=\"10\" y=\"110\">\n    <rect id=\"empty_icon_rect\" width=\"110\" height=\"110\" fill=\"LightGray\"/>\n    <foreignObject id=\"empty_icon_text\" width=\"100\" height=\"75\" x=\"5\" y=\"10\">\n      <p>1. What happened?</p>\n    </foreignObject>\n  </svg>\n\n  <foreignObject id=\"floating_icon\" y=85 x=5 width=\"110\" height=\"30\">\n    <form>\n    <select class=\"floating_icon_select\" id=\"floating_icon_select\" width=\"110\" aria-label=\"Select an event\" tabindex=\"0\">\n      <option value=\"none\">Select</option>\n\n      <optgroup label=\"Figuring things out\">\n        <option value=\"considerstudy\">Considering study</option>\n        <option value=\"information\">Finding information</option>\n        <option value=\"register\">Registering</option>\n        <option value=\"admin\">Admin and forms</option>\n        <option value=\"communication\">Communication</option>\n        <option value=\"studygoal\">Study goal</option>\n      </optgroup>\n      <optgroup label=\"Study\">\n        <option value=\"assessment\">Assessment</option>\n        <option value=\"duedates\">Due dates</option>\n        <option value=\"lowscores\">Low scores</option>\n        <option value=\"studymilestone\">Milestone</option>\n        <option value=\"studyexperience\">Study experience</option>\n        <option value=\"studysupport\">Study support</option>\n      </optgroup>\n      <optgroup label=\"Positives\">\n        <option value=\"achievement\">Achievement</option>\n        <option value=\"confidence\">Confidence boost</option>\n        <option value=\"peersupport\">Peer support</option>\n        <option value=\"studysuccess\">Study success</option>\n      </optgroup>\n      <optgroup label=\"Challenges\">\n        <option value=\"barrier\">Barrier</option>\n        <option value=\"helpneeded\">Help needed</option>\n        <option value=\"highpressure\">High pressure</option>\n        <option value=\"lostdirection\">Lost direction</option>\n        <option value=\"nosupport\">No support</option>\n        <option value=\"problem\">Problem</option>\n        <option value=\"timelost\">Time lost</option>\n      </optgroup>\n      <optgroup label=\"Life\">\n        <option value=\"studybreak\">Break from study</option>\n        <option value=\"finances\">Finances</option>\n        <option value=\"employment\">Jobs and employment</option>\n        <option value=\"lowenergy\">Low energy</option>\n        <option value=\"moving\">Moving home</option>\n        <option value=\"repetition\">Repetition</option>\n      </optgroup>\n\n    </select>\n    </form>\n  </foreignObject>\n\n  <foreignObject x=125 y=10 id=\"floating_desc\" width=\"110\" height=\"160\">\n    <textarea id=\"floating_event_desc\" rows=5 cols=12 tabindex=\"0\" maxlength=80 placeholder=\"2. Describe the event\"></textarea>\n  </foreignObject>\n\n  <svg id=\"empty_emoticon\" x=\"110\" y=\"250\">\n    <circle id=\"empty_emoticon_rect\" r=\"42\" cx=\"45\" cy=\"45\" fill=\"LightGray\"/>\n    <foreignObject id=\"empty_emoticon_text\" width=\"80\" height=\"75\" x=\"2\" y=\"30\">\n      <p>3. How did you feel?</p>\n    </foreignObject>\n  </svg>\n\n  <foreignObject id=\"floating_emoticon\" y=140 x=12 width=\"110\" height=\"30\">\n    <form>\n      <select class=\"floating_emoticon_select\" id=\"floating_emoticon_select\" width=\"110\" aria-label=\"How did you feel?\" tabindex=\"0\">\n        <option value=\"none\">Select</option>\n        <option value=\"angry\">Angry</option>\n        <option value=\"anxious\">Anxious</option>\n        <option value=\"bored\">Bored</option>\n        <option value=\"confident\">Confident</option>\n        <option value=\"confused\">Confused</option>\n        <option value=\"curious\">Curious</option>\n        <option value=\"embarrassed\">Embarrassed</option>\n        <option value=\"excited\">Excited</option>\n        <option value=\"happy\">Happy</option>\n        <option value=\"nervous\">Nervous</option>\n        <option value=\"proud\">Proud</option>\n        <option value=\"scared\">Scared</option>\n        <option value=\"stressed\">Stressed</option>\n        <option value=\"thinking\">Thinking</option>\n        <option value=\"tired\">Tired</option>\n        <option value=\"unhappy\">Unhappy</option>\n        <option value=\"unwell\">Unwell</option>\n        <option value=\"upset\">Upset</option>\n      </select>\n    </form>\n  </foreignObject>\n\n  <foreignObject x='245' y='10' id=\"floating_post\" width='95' height='100'>\n    <textarea class=\"floating_post\" id=\"floating_post_it_text\" rows=3 cols=9 maxlength=36 placeholder=\"4. Add an optional note\"></textarea>\n  </foreignObject>\n\n  <foreignObject x='0' y='220' id=\"floating_move\" width='70' height='30'>\n    <form>\n      <select id=\"floating_move_menu\" class=\"floating_move_menu\" width=\"80\" tabindex=\"0\" aria-label=\"Move card menu\">\n        <option value=\"Move\">Move</option>\n        <option value=\"SwapBack\">Swap card backwards</option>\n        <option value=\"SwapFwd\">Swap card forwards</option>\n        <option value=\"AddNew\">Add new card next</option>\n      </select>\n    </form>\n  </foreignObject>\n</svg>\n";

},{}],16:[function(require,module,exports){
/*!
  A sharing-link | © 2018 The Open University (IET-OU).
*/

module.exports = {
  createUrl: createShareUrl,
  createLink: createShareLink,
  loadLink: loadShareLink
};

const CORE = require('./core');
const UTIL = require('./util');

function createShareUrl (elements) {
  elements = elements || CORE.getElements();

  return 'j=base64:' + encodeURIComponent(b64EncodeUnicode(JSON.stringify(elements))) + '&zz';
}

function createShareLink (elements) {
  const shareLink = document.getElementById('oj-share-link');

  shareLink.setAttribute('href', '?' + createShareUrl(elements));

  const event = new window.CustomEvent('updatesharelink.ourjourney', { detail: { link: shareLink, journey: elements } });
  UTIL.container().dispatchEvent(event);

  UTIL.config('onUpdateShareLink')(shareLink, elements); // Was: UTIL.config('onRecreate')(shareLink, elements);
}

function loadShareLink (elements) {
  console.warn('loadShareLink - start');
  var loadedJourneyLength = 0;
  var qm = window.location.search.match(/[?&]j=base64:([\w%]+(%3D|=)*)/);
  if (qm) {
    var decoded;
    try {
      decoded = JSON.parse(b64DecodeUnicode(decodeURIComponent(qm[ 1 ])));
    } catch (ex) {
      console.error('---- ! ERROR in "loadShareLink()" function ! ----');
      console.error(qm);
      console.error(ex);
      window.alert('Sorry, the URL parameter "j" was wrongly encoded. I failed to load your Journey :(');
      return;
    }

    for (var i = 0; i < decoded.length; i++) {
      elements[ i ] = { eID: decoded[i].eID, description: decoded[i].description, emoticon: decoded[i].emoticon, icon: decoded[i].icon, postit: decoded[i].postit };
    }

    CORE.updateElements();
    loadedJourneyLength = decoded.length;
    console.warn('loadShareLink - load COMPLETE ;) !');
    return loadedJourneyLength;
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

},{"./core":5,"./util":18}],17:[function(require,module,exports){
/* User interface | ©The Open University.
*/

module.exports = {
  toggleEditor: toggleEditor,
  toggleOptions: toggleOptions,
  changeBackground: changeBackground,
  changeBackgroundElements: changeBackgroundElements,
  changeCardColour: changeCardColour,
  changeEmoticonColour: changeEmoticonColour,
  chooseEditor: chooseEditor,
  getEditor: getEditor,
  toggleFloatOptions: toggleFloatOptions,
  printJourney: printJourney
};

const ASSET = require('./assets');
const CORE = require('./core');
const UTIL = require('./util');

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
      // toggleOptions(1);
      floatElement.style.display = 'block';
    } else if (tog === 0 || tog === 'hide') {
      // toggleOptions(0);
      floatElement.style.display = 'none';
    }
  }
}

function printJourney () {
  var menuElement;
  if (editor === 'fixed') {
    menuElement = document.getElementById('editorbar');
    menuElement.style.display = 'none';
  } else if (editor === 'float') {
    menuElement = document.getElementById('float_bar');
    toggleOptions(0);
    menuElement.style.display = 'none';
    CORE.stopFloatingFocus();
    CORE.clearFocus();
    CORE.isPrinting();
  }
  window.scrollTo(0, 0);
  window.print();
  menuElement.style.display = 'block';
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
  if (tog === 0) {
    options.style.display = 'none';
    document.getElementById('optionsButton').value = 'Options';
    document.getElementById('float_optionsButton').value = 'Menu';
  } else if (options.style.display === 'none' || tog === 1) {
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
  const ELEM = UTIL.config('wholePage') ? document.body : UTIL.container();
  const background = bg || UTIL.qs('#background_select').value;
  ELEM.style.background = background; // Was: document.body.style.background = background;
  UTIL.qs('#background_select').value = background;
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

function changeEmoticonColour () {
  var colour = document.getElementById('emoticon_colour_select').value;
  CORE.setEmoticonColour(colour);
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

},{"./assets":2,"./core":5,"./util":18}],18:[function(require,module,exports){
/* Utility & configuration functions | ©The Open University.
*/

module.exports = {

  putConfig: putConfig,

  config: getConfig,

  container: getContainer,

  param: urlParam,

  qs: querySelector,

  replace: replaceObj
};

let CONFIG = {};

/** Set (all) configuration options.
 */
function putConfig (options) {
  module.exports.CFG = CONFIG = extend(require('./config').DEFAULTS, options);

  CONFIG.container = document.querySelector(CONFIG.containerSelector);

  return CONFIG;
}

/** Get one or all configuration options.
 */
function getConfig (key) {
  return key ? CONFIG[ key ] : CONFIG;
}

function getContainer () {
  return CONFIG.container;
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

// https://gist.github.com/pbojinov/8f3765b672efec122f66
function extend (defaults, options) {
  var extended = {};
  var prop;
  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }
  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }
  return extended;
}

function urlParam (regex, aDefault) {
  aDefault = aDefault || null;

  const M_URL = window.location.search.match(regex);
  return M_URL ? M_URL[ 1 ] : aDefault;
}

},{"./config":4}],19:[function(require,module,exports){
/* Create tool markup from HTML & SVG templates | ©The Open University.
*/

module.exports = {
  cardTemplate: require('./partials/card-template.svg'),

  getRedirectHtml: getRedirectHtml,

  setup: setup
};

const CORE = require('./core');
const SHARE = require('./share-link');
const UTIL = require('./util');

const LOC = window.location.href;
const UA = window.navigator.userAgent;

function setup () {
  const CONTAINER = UTIL.config('container');

  // We're using stringify.

  CONTAINER.innerHTML = UTIL.replace(require('./views/default-tool.html'), {
    '{assets}': UTIL.config('assetUrl'),
    '{zoom}': UTIL.config('zoom'),
    // '{helpUrl}': UTIL.config('helpUrl'),
    '{attribution partial}': partial(require('./partials/attribute.html')),
    '{background partial}': partial(require('./partials/background.svg')),
    '{editor bar partial}': partial(require('./partials/editor-bar.html')),
    '{floating editor partial}': partial(require('./partials/floating-editor.svg'))
  });

  CONTAINER.className += ' our-journey-js ok';
}

function partial (partialContent) {
  return UTIL.replace(partialContent, {
    '{assets}': UTIL.config('assetUrl'),
    '{privacyUrl}': UTIL.config('privacyUrl') || '',
    '{helpUrl}': UTIL.config('helpUrl')
  });
}

function getRedirectHtml () {
  const REDIRECT_URL = LOC.replace(/\?.+/, '') + '?utm_source=save&utm_medium=redirect&';
  const JOURNEY_DATA = {
    created: (new Date()).toISOString(),
    generator: 'our-journey/' + UTIL.config('version'),
    journey: CORE.getElements()
  };
  const HTML = UTIL.replace(require('./views/redirect.html'), {
    '{debug}': 'UA: ' + UA,
    '{json}': JSON.stringify(JOURNEY_DATA, null, 2),
    '{redirectUrl}': REDIRECT_URL + SHARE.createUrl(),
    '{version}': UTIL.config('version'),
    '{timestamp}': JOURNEY_DATA.created
  });

  return HTML;
}

},{"./core":5,"./partials/attribute.html":11,"./partials/background.svg":12,"./partials/card-template.svg":13,"./partials/editor-bar.html":14,"./partials/floating-editor.svg":15,"./share-link":16,"./util":18,"./views/default-tool.html":20,"./views/redirect.html":21}],20:[function(require,module,exports){
module.exports = "<style>\n.our-journey-js .editorbar,\n.our-journey-js .main { zoom: {zoom}%; } </style>\n\n{editor bar partial}\n\n<div class=\"main\" id=\"main\">\n\n  <svg width=\"1240\" height=\"1600\" class=\"journey-canvas\" id=\"journey-canvas\" aria-label=\"Journey canvas\" tabindex=\"-1\"\n    onload=\"ourJourneySvgLoad(typeof event=='undefined'?{time:Date.now()}:event) /* Directly attached */\">\n\n    {background partial}\n\n    <g class=\"card-holder\"></g>\n\n    {floating editor partial}\n\n  <svg id=\"add_more_card\" class=\"add_more_card\" width=\"130\" height=\"240\" y=\"1350\" x=\"990\" role='button' tabindex='0' aria-label='Add more cards'>\n        <title>Add more cards</title>\n        <rect fill=\"crimson\" id=\"add_more_rect\" width = \"130\" height = \"240\" stroke=\"black\" fill=\"crimson\" stroke-width=\"1\" fill-opacity=\"1.0\"/>\n        <image xlink:href = \"{assets}/add-more.png\" x = \"4\" y = \"30\" height=\"176\" width=\"121\" id=\"add_more_img\" class=\"add_more_img\"/>\n    </svg>\n\n  </svg>\n\n</div>\n\n{attribution partial}\n";

},{}],21:[function(require,module,exports){
module.exports = "<!--\n  Instructions: Open this file in your preferred browser, to load the journey!\n-->\n<!doctype html><html lang='en'>\n\n  <meta charset='utf-8'/>\n  <style>\n    body {font:1em sans-serif; margin:1em auto; max-width:32em}\n    [type] {display:none}\n  </style>\n\n  <title>Our Journey: saved journey</title> <h1>Our Journey: saved journey</h1>\n\n  <p>If you are not automatically redirected, <a id='journey-link' href=\n'{redirectUrl}'\n  >Go to the saved journey</a>.</p>\n\n  <p>File date: <time>{timestamp}</time>.</p>\n\n  <hr/>\n\n  <p role='contentinfo'><a href='https://ourjourney.ac.uk/v1/'>our-journey</a> v<i>{version}</i></p>\n\n  <script>\n    location.href = document.querySelector('#journey-link').getAttribute('href');\n  </script>\n\n  <i type='application/json'>{json}</i>\n\n  <!-- {debug} -->\n</html>\n";

},{}],"our-journey":[function(require,module,exports){
/*!
  Our Journey module | © 2018 The Open University (IET-OU) | License: GPL-3.0+
*/

module.exports = {

  app: require('./src/app'),

  config: require('./src/config'),

  core: require('./src/core'),

  layout: require('./src/layout'),

  events: require('./src/event'),

  file: require('./src/file'),

  share: require('./src/share-link'),

  ui: require('./src/user-interface'),

  util: require('./src/util'), // Was: config: require('./src/config'),

  views: require('./src/views')
};

},{"./src/app":1,"./src/config":4,"./src/core":5,"./src/event":7,"./src/file":8,"./src/layout":9,"./src/share-link":16,"./src/user-interface":17,"./src/util":18,"./src/views":19}]},{},[]);
