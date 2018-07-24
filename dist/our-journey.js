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
  
  if (LOC.search.match(/[?&]layout=scol/)){
    LAYOUT.reflow("scol");
  }
  else {
      LAYOUT.reflow();
  }
  
  if (LOC.search.match(/[?&]edit=float/)){
    UI.chooseEditor('float');
  }

  CORE.initialiseElements();

  EVENTS.initialise();

  if (LOC.search.match(/[?&]demo=1/)) {
    CORE.demoFill();

    document.body.className += ' demo-fill';
  }

  CORE.setFocusElement(0);
  CORE.changeFocus();

  UI.toggleOptions();

  SHARE.createLink(CORE.getElements());
  SHARE.loadLink(CORE.getElements());
  document.getElementById("journey-canvas").focus();
}

},{"../index":"our-journey","./core":3,"./event":5,"./layout":7,"./share-link":9,"./user-interface":10}],2:[function(require,module,exports){
/*!
  Get paths to icon and emoji files. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  emoticonCount: emoticonCount,
  iconCount: iconCount,

  getEmoticonPath: getEmoticonPath,
  getIconPath: getIconPath,

  hasEmoticon: hasEmoticon,
  hasIcon: hasIcon
};

// Presentation variables
const iconFiles = [ {name: 'achievement', file: 'Achievement_card.png'}, {name: 'admin', file: 'Admin_card.png'}, {name: 'assessment', file: 'Assessments_card.png'}, {name: 'communication', file: 'Communication_card.png'}, {name: 'confidence', file: 'ConfidenceBoost_card.png'}, {name: 'duedates', file: 'DueDates_card.png'}, {name: 'helpneeded', file: 'HelpNeeded_card.png'}, {name: 'highpressure', file: 'HighPressure_card.png'}, {name: 'information', file: 'Information_card.png'}, {name: 'lostdirection', file: 'LostDirection_card.png'}, {name: 'lowenergy', file: 'LowEnergy_card.png'}, {name: 'lowscores', file: 'LowScores_card.png'}, {name: 'nosupport', file: 'NoSupport_card.png'}, {name: 'peersupport', file: 'PeerSupport_card.png'}, {name: 'problem', file: 'Problem_card.png'}, {name: 'register', file: 'Register_card.png'}, {name: 'studybreak', file: 'StudyBreak_card.png'}, {name: 'studyexperience', file: 'StudyExperience_card.png'}, {name: 'studygoal', file: 'StudyGoal_card.png'}, {name: 'studymilestone', file: 'StudyMilestone_card.png'}, {name: 'studysuccess', file: 'StudySuccess_card.png'}, {name: 'studysupport', file: 'StudySupport_card.png'}, {name: 'timelost', file: 'TimeLost_card.png'} ];
const emoticonFiles = [ {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'sick', file: 'Sick_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'} ];
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

function getIconPath (j) {
  return cardDir + iconFiles[ j ].file;
}

function hasEmoticon (j, element) {
  return emoticonFiles[ j ].name === element.emoticon;
}

function hasIcon (j, element) {
  return iconFiles[j].name === element.icon;
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
  stopFloatingFocus: stopFloatingFocus
};

const UI = require('./user-interface');
const ASSET = require('./assets');
const DIM = require('./dimension.json');
const LAYOUT = require('./layout');

// Semistandard -- these were NOT defined ;).
var $ = window.jQuery; // Missing dependency ??
var event;

// Status variables
var elements = [];
var focusElement = -1;
var canvasInFocus = false;
var float_editing = false;

// Number of card elements presented in page
var numElements = 35;

// These variables state which elements are vertical ones for the default layout presentation. On the left (vl) or the right (vr).
var vlElements = [ 0, 9, 10, 19, 20, 29, 30 ];
var vrElements = [ 4, 5, 14, 15, 24, 25, 34 ];

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  var shifted = false;
  if (canvasInFocus) {
    if (keyName === 'Shift') {
      shifted = true;
      return;
    }
    //alert("key " + keyName);
    switch (keyName) {
      /*case 'Tab':
        if (shifted) {
          cyclePrevFocus();
        } else {
          cycleNextFocus();
        }
        break;*/
      case 'ArrowUp':
        if(!float_editing){
          cyclePrevFocus();
        }
        break;
      case 'ArrowLeft':
        if(!float_editing){
          cyclePrevFocus();
        }
        break;
      case 'ArrowRight':
        if(!float_editing){  
          cycleNextFocus();
        }
        break;
      case 'ArrowDown':
        if(!float_editing){
          cycleNextFocus();
        }
        break;
      case 'Enter':
        var active = document.activeElement.getAttribute('id');
        if(active == "floating_backform"){
          moveBackElement();
        }
        else if(active == "floating_forwardform"){
          moveFwdElement();
        }
        else{
          editFocus();
        }
        break;
    }
  }
}, false);

function initialiseElements () {
  for (var i = 0; i < numElements; i++) {
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
  var e = this.id.substring(5);
  focusElement = parseInt(e);
  //alert('mouse down on ' + focusElement);
  changeFocus();
  editFocus();
  if(UI.getEditor()=='fixed'){
    UI.toggleEditor('show');
  }
}

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    var ePlace = document.getElementById('group' + i);
    ePlace.addEventListener('click', elementClick);
    var eRect = document.getElementById('place' + i);
    eRect.setAttribute('fill', 'Snow');
    eRect.setAttribute('fill-opacity', '1.0');
    if ((LAYOUT.getLayout() == "default") && vlElements.includes(i)){
      eRect.setAttribute('x', DIM.rectXV);
    } 
    else {
      eRect.setAttribute('y', DIM.rectY);
    }

    updateDescription(i);

    updateEmoticon(i);

    updateIcon(i);

    updatePostIt(i);
  }
}

function updateDescription (i) {
  var eText = document.getElementById('description' + i);
  var layout = LAYOUT.getLayout();
  // alert("changing text on description" + elementText + " to " + element.description);
  eText.textContent = getElement(i).description;
  if ((layout=="default") && vlElements.includes(i)) {
    eText.setAttribute('x', DIM.textXV);
    eText.setAttribute('y', DIM.textYV);
  } else if ((layout=="default") && vrElements.includes(i)) {
    eText.setAttribute('x', DIM.textXVR);
    eText.setAttribute('y', DIM.textYVR);
  } else {
    eText.setAttribute('x', DIM.textX);
    eText.setAttribute('y', DIM.textY);
  }
}

function updateEmoticon (i) {
  var eEmo = document.getElementById('emoticon' + i);
  var layout = LAYOUT.getLayout();
  if (getElement(i).emoticon !== 'none') {
    for (var j = 0; j < ASSET.emoticonCount(); j++) {
      if (ASSET.hasEmoticon(j, getElement(i))) {
        eEmo.setAttribute('height', DIM.emoticonHeight);
        eEmo.setAttribute('width', DIM.emoticonWidth);
        if ((layout=="default") && (vlElements.includes(i))) {
          eEmo.setAttribute('x', DIM.emoticonXV);
          eEmo.setAttribute('y', DIM.emoticonYV);
        } else if ((layout=="default") && (vrElements.includes(i))) {
          eEmo.setAttribute('x', DIM.emoticonXVR);
          eEmo.setAttribute('y', DIM.emoticonYVR);
        } else {
          eEmo.setAttribute('x', DIM.emoticonX);
          eEmo.setAttribute('y', DIM.emoticonY);
        }
        eEmo.setAttribute('display', 'inline');
        eEmo.setAttribute('href', ASSET.getEmoticonPath(j));
      }
    }
  } else {
    eEmo.setAttribute('display', 'none');
  }
}

function updateIcon (i) {
  var eIcon = document.getElementById('icon' + i);
  var layout = LAYOUT.getLayout();
  if (getElement(i).icon !== 'none') {
    for (var j = 0; j < ASSET.iconCount(); j++) {
      if (ASSET.hasIcon(j, getElement(i))) {
        eIcon.setAttribute('height', DIM.iconHeight);
        eIcon.setAttribute('width', DIM.iconWidth);
        if ((layout=="default") && (vlElements.includes(i))) {
          eIcon.setAttribute('x', DIM.iconXV);
          eIcon.setAttribute('y', DIM.iconYV);
        } else {
          eIcon.setAttribute('x', DIM.iconX);
          eIcon.setAttribute('y', DIM.iconY);
        }
        eIcon.setAttribute('display', 'inline');
        eIcon.setAttribute('href', ASSET.getIconPath(j));
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

    if (((layout=="default") && vlElements.includes(i))) {
      ePostIt.setAttribute('y', DIM.postitVY);
      ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVY);
      ePostItText.setAttribute('x', DIM.postitTextVX);
    } else if ((layout=="default") && vrElements.includes(i)) {
      ePostIt.setAttribute('x', DIM.postitVRX);
      ePostIt.setAttribute('y', DIM.postitVRY);
      ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVRY);
      ePostItText.setAttribute('x', DIM.postitTextVRX);
    }
    else if(layout=="scol"){
      ePostIt.setAttribute('x', DIM.postitScolX);
      ePostIt.setAttribute('y', DIM.postitScolY);
      ePostItText.setAttribute('y', DIM.postitTextScolY + DIM.postitScolY);
      ePostItText.setAttribute('x', DIM.postitTextScolX);
    } 
    else if(layout=="default") {
      ePostIt.setAttribute('x', DIM.postitX);
      ePostItText.setAttribute('x', DIM.postitTextX);
      ePostItText.setAttribute('y', DIM.postitTextY);
    }
    ePostItText.textContent = getElement(i).postit;
  } else {
    ePostIt.setAttribute('visibility', 'collapse');
    ePostItText.setAttribute('visibility', 'collapse');
  }
}

function changeFocus () {
  for (var i = 0; i < elements.length; i++) {
    var element = document.getElementById(elements[i].eID);
    element.setAttribute('class', 'not-focussed');
  }
  var focus = document.getElementById(elements[focusElement].eID);
  focus.setAttribute('class', 'focussed');

  if(UI.getEditor()=='fixed'){
    focus.scrollIntoView(true);
    window.scrollBy(0, -300);

    document.getElementById('event_desc').value = elements[focusElement].description;
    document.getElementById('icon_select').value = elements[focusElement].icon;
    document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
    document.getElementById('post_it_text').value = elements[focusElement].postit;
    document.getElementById('title').innerHTML = 'Journey Editor: Card ' + focusElement;
  }
  else if(UI.getEditor()=='float'){
    stopFloatingFocus();
  }
}

function stopFloatingFocus(){
  document.getElementById('floating_editor').setAttribute('visibility','collapse');
  float_editing = false;
} 

function editFocus(){
  if(UI.getEditor()=='float'){
    if(float_editing){
      stopFloatingFocus();
      document.getElementById("journey-canvas").focus();
    }
    else{
      if(LAYOUT.getLayout()=='scol'){
        var newY = (focusElement * 130) + 100;
        document.getElementById('floating_editor').setAttribute('x','0');
        document.getElementById('floating_editor').setAttribute('y',newY);
        document.getElementById('floating_editor').setAttribute('visibility','visible');
      }
      else if(LAYOUT.getLayout()=='default'){
        layoutData = LAYOUT.getLayoutData();
        newX = layoutData['default'][focusElement]['{x}'];
        newY = layoutData['default'][focusElement]['{y}'];
        orient = layoutData['default'][focusElement]['{orient}'];
        newY = newY + DIM.rectY;
        document.getElementById('floating_editor').setAttribute('x',newX);
        document.getElementById('floating_editor').setAttribute('y',newY);
        document.getElementById('floating_editor').setAttribute('visibility','visible');
      }
      
      document.getElementById('floating_icon_select').value = elements[focusElement].icon;
      document.getElementById('floating_emoticon_select').value = elements[focusElement].emoticon;
      document.getElementById('floating_event_desc').value = elements[focusElement].description;
      document.getElementById('floating_post_it_text').value = elements[focusElement].postit;
      float_editing = true;
    }
    
  }
}

function canvasGotFocus () {
  // events when focus shifts to canvas?
  // alert("canvas got focus");
  canvasInFocus = true;
  focus.scrollIntoView(true);
  //window.scrollBy(0, -300);
  //focusElement = -1;
}

function canvasLostFocus () {
  // alert("canvas lost focus");
  canvasInFocus = false;
}

function cycleNextFocus () {
  // move to the next focus element, if no more elements, release focus outside of canvas
  // alert("last focus is " + focusElement);
  if ((elements.length - 1) > focusElement) {
    focusElement++;
    changeFocus();
  } else {
    // alert("leave canvas");
    // removeFocus();
  }
}

function cyclePrevFocus () {
  if (focusElement > 0) {
    focusElement--;
    changeFocus();
  } else {
    // alert("leave canvas backwards");
    // removeFocus();
  }
}

function keyResponse (k) {
  window.alert('key down');
  switch (k) {
    case 9:
      // cycleNextFocus();
      break;
    case 16:
      // alert("shift");
      break;
    case 38:
      cyclePrevFocus();
      break;
    case 37:
      cyclePrevFocus();
      break;
    case 39:
      cycleNextFocus();
      break;
    case 40:
      cycleNextFocus();
      break;
  }
  return false;
}

function updateElement () {
  // change existing element according to form
  // alert("changing values of " + document.getElementById('event_desc').value);
  if(UI.getEditor() == 'fixed'){
    elements[focusElement].description = document.getElementById('event_desc').value;
    elements[focusElement].icon = document.getElementById('icon_select').value;
    elements[focusElement].emoticon = document.getElementById('emoticon_select').value;
    elements[focusElement].postit = document.getElementById('post_it_text').value;
  }
  else if(UI.getEditor() == 'float'){
    elements[focusElement].icon = document.getElementById('floating_icon_select').value;
    elements[focusElement].emoticon = document.getElementById('floating_emoticon_select').value;
    elements[focusElement].description = document.getElementById('floating_event_desc').value;
    elements[focusElement].postit = document.getElementById('floating_post_it_text').value;
  }
  updateElements();
}

function clearElement () {
  // clears the information contained in the focused on element.
  elements[focusElement] = { eID: 'place' + focusElement, text: '', emoticon: 'none', icon: 'none', postit: '' };
  updateElements();
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

function getNumElements(){
  return numElements;
}

},{"./assets":2,"./dimension.json":4,"./layout":7,"./user-interface":10}],4:[function(require,module,exports){
module.exports={
  "#": "Sizes & positions of card and Post-it components.",

  "iconWidth": 110,
  "iconHeight": 110,
  "iconXV": 110,
  "iconYV": 10,
  "iconX": 10,
  "iconY": 110,
  "emoticonWidth": 72,
  "emoticonHeight": 72,
  "emoticonXV": 130,
  "emoticonYV": 170,
  "emoticonXVR": 30,
  "emoticonYVR": 267,
  "emoticonX": 140,
  "emoticonY": 160,
  "textXV": 110,
  "textYV": 130,
  "textXVR": 10,
  "textYVR": 225,
  "textX": 130,
  "textY": 110,
  "rectY": 100,
  "rectXV": 100,
  "postitX": 75,
  "postitVY": 70,
  "postitVRY": 160,
  "postitVRX": 135,
  "postitTextX": 80,
  "postitTextVX": 5,
  "postitTextVRX": 140,
  "postitTextY": 15,
  "postitTextWidth": 90,
  "postitScolX": 245,
  "postitTextScolX": 250,
  "postitScolY": 100,
  "postitTextScolY": 15 

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

  attachEvent('#backgroundform', 'submit', function (e) {
    e.preventDefault();
    UI.changeBackground();
  });

  attachEvent('#hideeditorform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleEditor('hide');
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
}

function attachEvent (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, function (ev) {
    callback(ev);
  });
}

},{"./core":3,"./file":6,"./user-interface":10}],6:[function(require,module,exports){
/*!
  Save and load journeys to file, in the browser. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  saveJourney: saveJourney,
  loadJourney: loadJourney
};

const CORE = require('./core');
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
  // alert('file loaded');
  for (var i = 0; i < newArr.length; i++) {
    elements[i] = { eID: newArr[i].eID, description: newArr[i].description, emoticon: newArr[i].emoticon, icon: newArr[i].icon, postit: newArr[i].postit };
  }
  CORE.updateElements();
}

},{"./core":3}],7:[function(require,module,exports){
/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

//module.exports.reflow = reflow;
module.exports = { reflow: reflow, 
  getLayout: getLayout,
  getLayoutData: getLayoutData
}

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');
const CORE = require('./core');
const UI = require('./user-interface');

var set_layout = "default";

function reflow (layout) {
  layout = layout || 'default';

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];

  if(layout == "scol"){
    set_layout = "scol";
    UI.chooseEditor('float');
    scol_layout = [];
    for(i=0;i<CORE.getNumElements();i++){
      scol_layout.push({ "{j}": i,  "{x}": 0,   "{y}": i*130,  "{orient}": "horiz" });
    }
    scol_layout.forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
  }
  else{
    LAYOUTS[ layout ].forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
  }
  
  HOLDER.innerHTML = cards.join('\n');
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}

function getLayout(){
  return set_layout;
}

function getLayoutData(){
  return LAYOUTS;
}

},{"./core":3,"./layouts.json":8,"./user-interface":10}],8:[function(require,module,exports){
module.exports={
  "#": "Position data for the SVG cards. (240 * 130px)",

  "default": [
    { "{j}": 0,  "{x}": 20,   "{y}": 110,  "{orient}": "vert" },
    { "{j}": 1,  "{x}": 250,  "{y}": 120,  "{orient}": "horiz" },
    { "{j}": 2,  "{x}": 490,  "{y}": 120,  "{orient}": "horiz" },
    { "{j}": 3,  "{x}": 730,  "{y}": 120,  "{orient}": "horiz" },
    { "{j}": 4,  "{x}": 970,  "{y}": 120,  "{orient}": "vert" },
    { "{j}": 5,  "{x}": 970,  "{y}": 360,  "{orient}": "vert" },
    { "{j}": 6,  "{x}": 730,  "{y}": 470,  "{orient}": "horiz" },
    { "{j}": 7,  "{x}": 490,  "{y}": 470,  "{orient}": "horiz" },
    { "{j}": 8,  "{x}": 250,  "{y}": 470,  "{orient}": "horiz" },
    { "{j}": 9,   "{x}": 20,  "{y}": 570,  "{orient}": "vert" },
    { "{j}": 10,  "{x}": 20,  "{y}": 810,  "{orient}": "vert" },
    { "{j}": 11,  "{x}": 250,  "{y}": 820,  "{orient}": "horiz" },
    { "{j}": 12,  "{x}": 490,  "{y}": 820,  "{orient}": "horiz" },
    { "{j}": 13,  "{x}": 730,  "{y}": 820,  "{orient}": "horiz" },
    { "{j}": 14,  "{x}": 970,  "{y}": 820,  "{orient}": "vert" },
    { "{j}": 15,  "{x}": 970,  "{y}": 1060,  "{orient}": "vert" },
    { "{j}": 16,  "{x}": 730,  "{y}": 1170,  "{orient}": "horiz" },
    { "{j}": 17,  "{x}": 490,  "{y}": 1170,  "{orient}": "horiz" },
    { "{j}": 18,  "{x}": 250,  "{y}": 1170,  "{orient}": "horiz" },
    { "{j}": 19,  "{x}": 20,   "{y}": 1270,  "{orient}": "vert" },
    { "{j}": 20,  "{x}": 20,   "{y}": 1510,  "{orient}": "vert" },
    { "{j}": 21,  "{x}": 250,  "{y}": 1520,  "{orient}": "horiz" },
    { "{j}": 22,  "{x}": 490,  "{y}": 1520,  "{orient}": "horiz" },
    { "{j}": 23,  "{x}": 730,  "{y}": 1520,  "{orient}": "horiz" },
    { "{j}": 24,  "{x}": 970,  "{y}": 1520,  "{orient}": "vert" },
    { "{j}": 25,  "{x}": 970,  "{y}": 1760,  "{orient}": "vert" },
    { "{j}": 26,  "{x}": 730,  "{y}": 1870,  "{orient}": "horiz" },
    { "{j}": 27,  "{x}": 490,  "{y}": 1870,  "{orient}": "horiz" },
    { "{j}": 28,  "{x}": 250,  "{y}": 1870,  "{orient}": "horiz" },
    { "{j}": 29,  "{x}": 20,   "{y}": 1970,  "{orient}": "vert" },
    { "{j}": 30,  "{x}": 20,   "{y}": 2210,  "{orient}": "vert" },
    { "{j}": 31,  "{x}": 250,  "{y}": 2220,  "{orient}": "horiz" },
    { "{j}": 32,  "{x}": 490,  "{y}": 2220,  "{orient}": "horiz" },
    { "{j}": 33,  "{x}": 730,  "{y}": 2220,  "{orient}": "horiz" },
    { "{j}": 34,  "{x}": 970,  "{y}": 2220,  "{orient}": "vert"    }
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
  chooseEditor: chooseEditor,
  getEditor: getEditor
};

var editor = 'fixed';

function toggleEditor (tog) {
var editorElement;
  if(editor == 'fixed'){
    editorElement = document.getElementById('editor');
  }
  else if(editor == 'float'){
    editorElement = document.getElementById('floating_editor');
  }
  if (tog === 1 || tog === 'show') {
    editorElement.style.display = 'block';
  } else if (tog === 0 || tog === 'hide') {
    editorElement.style.display = 'none';
  }
}

function toggleOptions () {
  var options = document.getElementById('options');
  if (options.style.display === 'none') {
    options.style.display = 'block';
  } else {
    options.style.display = 'none';
  }
}

function changeBackground () {
  document.body.style.background = document.getElementById('background_select').value;
}

function chooseEditor(newEdit){
  if(newEdit == 'float'){
    //document.getElementById('floating_editor').setAttribute('visibility','visible');
    document.getElementById('editor').style.display = 'none';
    editor = newEdit;
    document.getElementById('journey-canvas').setAttribute('height', '4700');
    document.getElementById('start_point').setAttribute('visibility','collapse');
    
  }
  else if(newEdit == 'fixed'){
    document.getElementById('floating_editor').setAttribute('visibility','collapse');
  }
}

function getEditor(){
  return editor;
}
},{}],"our-journey":[function(require,module,exports){
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
