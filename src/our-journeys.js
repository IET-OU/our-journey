/*!
  Our Journeys | © 2018 The Open University (IET-OU).
*/

// API.
window.our_journeys = /* module.exports = */ {
  // Functions.
  initialiseElements: initialiseElements,
  updateElements: updateElements,
  changeFocus: changeFocus,
  demoFill: demoFill,
  updateElement: updateElement,
  clearElement: clearElement,
  moveFwdElement: moveFwdElement,
  moveBackElement: moveBackElement,
  changeBackground: changeBackground,
  addKeyboardFocus: addKeyboardFocus, // Not used ?!
  canvasGotFocus: canvasGotFocus,
  canvasLostFocus: canvasLostFocus,
  toggleEditor: toggleEditor,
  toggleOptions: toggleOptions,
  saveJourney: saveJourney,
  loadJourney: loadJourney,
  // Properties.
  getElements: getElements,
  setFocusElement: setFocusElement
};

// Semistandard -- these were NOT defined ;).
var $ = window.jQuery; // Missing dependency ??
var element, event, focus;

// Status variables
var elements = [];
var focusElement = -1;
var canvasInFocus = false;

// Number of card elements presented in page
var numElements = 35;

// Presentation variables
var iconFiles = [ {name: 'achievement', file: 'Achievement_card.png'}, {name: 'admin', file: 'Admin_card.png'}, {name: 'assessment', file: 'Assessments_card.png'}, {name: 'communication', file: 'Communication_card.png'}, {name: 'confidence', file: 'ConfidenceBoost_card.png'}, {name: 'duedates', file: 'DueDates_card.png'}, {name: 'helpneeded', file: 'HelpNeeded_card.png'}, {name: 'highpressure', file: 'HighPressure_card.png'}, {name: 'information', file: 'Information_card.png'}, {name: 'lostdirection', file: 'LostDirection_card.png'}, {name: 'lowenergy', file: 'LowEnergy_card.png'}, {name: 'lowscores', file: 'LowScores_card.png'}, {name: 'nosupport', file: 'NoSupport_card.png'}, {name: 'peersupport', file: 'PeerSupport_card.png'}, {name: 'problem', file: 'Problem_card.png'}, {name: 'register', file: 'Register_card.png'}, {name: 'studybreak', file: 'StudyBreak_card.png'}, {name: 'studyexperience', file: 'StudyExperience_card.png'}, {name: 'studygoal', file: 'StudyGoal_card.png'}, {name: 'studymilestone', file: 'StudyMilestone_card.png'}, {name: 'studysuccess', file: 'StudySuccess_card.png'}, {name: 'studysupport', file: 'StudySupport_card.png'}, {name: 'timelost', file: 'TimeLost_card.png'} ];
var emoticonFiles = [ {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'bored', file: 'Bored_emoji.png'}, {name: 'confused', file: 'Confused_emoji.png'}, {name: 'excited', file: 'Excited_emoji.png'}, {name: 'happy', file: 'Happy_emoji.png'}, {name: 'nervous', file: 'Nervous_emoji.png'}, {name: 'sick', file: 'Sick_emoji.png'}, {name: 'angry', file: 'Angry_emoji.png'}, {name: 'achieve', file: 'Achieve_emoji.png'}, {name: 'unhappy', file: 'Unhappy_emoji.png'}, {name: 'upset', file: 'Upset_emoji.png'}, {name: 'thinking', file: 'Thinking_emoji.png'} ];
// var assetDir = 'assets/';
var emojiDir = 'assets/emoji/';
var cardDir = 'assets/card/';
var iconWidth = 110;
var iconHeight = 110;
var iconXV = 110;
var iconYV = 10;
var iconX = 10;
var iconY = 110;
var emoticonWidth = 72;
var emoticonHeight = 72;
var emoticonXV = 130;
var emoticonYV = 170;
var emoticonXVR = 30;
var emoticonYVR = 267;
var emoticonX = 140;
var emoticonY = 160;
var textXV = 110;
var textYV = 130;
var textXVR = 10;
var textYVR = 225;
var textX = 130;
var textY = 110;
var rectY = 100;
var rectXV = 100;
var postitX = 75;
var postitVY = 70;
var postitVRY = 160;
var postitVRX = 135;
var postitTextX = 80;
var postitTextVX = 5;
var postitTextVRX = 140;
var postitTextY = 15;
var postitTextWidth = 90;
// These variables state which elements are vertical ones for presentation. On the left (vl) or the right (vr).
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
    // alert("key " + keyName);
    switch (keyName) {
      case 'Tab':
        if (shifted) {
          cyclePrevFocus();
        } else {
          cycleNextFocus();
        }
        break;
      case 'ArrowUp':
        cyclePrevFocus();
        break;
      case 'ArrowLeft':
        cyclePrevFocus();
        break;
      case 'ArrowRight':
        cycleNextFocus();
        break;
      case 'ArrowDown':
        cycleNextFocus();
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

function saveJourney () {
  var filename = document.getElementById('filenamearea').value + '.json';
  // Pretty print JSON.
  var data = JSON.stringify(elements, null, 2);
  var a = document.createElement('a');

  a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(data));
  a.setAttribute('download', filename);
  a.click();
}

function loadJourney () {
  var input, file, fr;
  var alert = window.alert;

  if (typeof window.FileReader !== 'function') {
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
    fr = new window.FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText (e) {
    let lines = e.target.result;
    var newArr = JSON.parse(lines);
    // alert('file loaded');
    for (var i = 0; i < newArr.length; i++) {
      elements[i] = { eID: newArr[i].eID, description: newArr[i].description, emoticon: newArr[i].emoticon, icon: newArr[i].icon, postit: newArr[i].postit };
    }
    updateElements();
  }
}

function elementClick () {
  var e = this.id.substring(5);
  focusElement = parseInt(e);
  // alert('mouse down on ' + focusElement);
  changeFocus();
  toggleEditor('show');
}

function toggleEditor (tog) {
  var editor = document.getElementById('editor');
  if (tog === 1 || tog === 'show') {
    editor.style.display = 'block';
  } else if (tog === 0 || tog === 'hide') {
    editor.style.display = 'none';
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

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    element = elements[i];
    // mouse event listener
    var ePlace = document.getElementById('group' + i);
    ePlace.addEventListener('click', elementClick);
    var eRect = document.getElementById('place' + i);
    eRect.setAttribute('fill', 'Snow');
    eRect.setAttribute('fill-opacity', '1.0');
    if (vlElements.includes(i)) {
      eRect.setAttribute('x', rectXV);
    } else if (vrElements.includes(i)) {
      eRect.setAttribute('y', rectY);
    } else {
      eRect.setAttribute('y', rectY);
    }
    // description
    var eText = document.getElementById('description' + i);
    // alert("changing text on description" + elementText + " to " + element.description);
    eText.textContent = element.description;
    if (vlElements.includes(i)) {
      eText.setAttribute('x', textXV);
      eText.setAttribute('y', textYV);
    } else if (vrElements.includes(i)) {
      eText.setAttribute('x', textXVR);
      eText.setAttribute('y', textYVR);
    } else {
      eText.setAttribute('x', textX);
      eText.setAttribute('y', textY);
    }
    // emoticon
    var eEmo = document.getElementById('emoticon' + i);
    if (element.emoticon !== 'none') {
      for (var j = 0; j < emoticonFiles.length; j++) {
        if (emoticonFiles[j].name === element.emoticon) {
          eEmo.setAttribute('height', emoticonHeight);
          eEmo.setAttribute('width', emoticonWidth);
          if (vlElements.includes(i)) {
            eEmo.setAttribute('x', emoticonXV);
            eEmo.setAttribute('y', emoticonYV);
          } else if (vrElements.includes(i)) {
            eEmo.setAttribute('x', emoticonXVR);
            eEmo.setAttribute('y', emoticonYVR);
          } else {
            eEmo.setAttribute('x', emoticonX);
            eEmo.setAttribute('y', emoticonY);
          }
          eEmo.setAttribute('display', 'inline');
          eEmo.setAttribute('href', emojiDir + emoticonFiles[j].file);
        }
      }
    } else {
      eEmo.setAttribute('display', 'none');
    }
    // icon
    var eIcon = document.getElementById('icon' + i);
    if (element.icon !== 'none') {
      for (j = 0; j < iconFiles.length; j++) {
        if (iconFiles[j].name === element.icon) {
          eIcon.setAttribute('height', iconHeight);
          eIcon.setAttribute('width', iconWidth);
          if (vlElements.includes(i)) {
            eIcon.setAttribute('x', iconXV);
            eIcon.setAttribute('y', iconYV);
          } else {
            eIcon.setAttribute('x', iconX);
            eIcon.setAttribute('y', iconY);
          }
          eIcon.setAttribute('display', 'inline');
          eIcon.setAttribute('href', cardDir + iconFiles[j].file);
        }
      }
    } else {
      eIcon.setAttribute('display', 'none');
    }
    // postit
    var ePostIt = document.getElementById('postit' + i);
    var ePostItText = document.getElementById('postittext' + i);
    if (element.postit !== '') {
      ePostIt.setAttribute('visibility', 'visible');
      ePostItText.setAttribute('visibility', 'visible');
      ePostItText.setAttribute('width', postitTextWidth);
      // ePostItText.setAttribute('y', postitTextY);

      if (vlElements.includes(i)) {
        ePostIt.setAttribute('y', postitVY);
        ePostItText.setAttribute('y', postitTextY + postitVY);
        ePostItText.setAttribute('x', postitTextVX);
      } else if (vrElements.includes(i)) {
        ePostIt.setAttribute('x', postitVRX);
        ePostItText.setAttribute('x', postitVRX);
        ePostIt.setAttribute('y', postitVRY);
        ePostItText.setAttribute('y', postitTextY + postitVRY);
        ePostItText.setAttribute('x', postitTextVRX);
      } else {
        ePostIt.setAttribute('x', postitX);
        ePostItText.setAttribute('x', postitTextX);
        ePostItText.setAttribute('y', postitTextY);
      }
      ePostItText.textContent = element.postit;
    } else {
      ePostIt.setAttribute('visibility', 'collapse');
      ePostItText.setAttribute('visibility', 'collapse');
    }
  }
}

function changeBackground () {
  document.body.style.background = document.getElementById('background_select').value;
}

function addKeyboardFocus () {
  $('#journey-canvas')
    // Add tab index to ensure the canvas retains focus
    .attr('tabindex', '0')
    .keydown(function () { keyResponse(event.which); });
  // Mouse down override to prevent default browser controls from appearing
  // .mousedown(function(){ $(this).focus(); return false; })
  // d3.select("body").on("keydown", function(){keyResponse(event.which)});
  document.addEventListener('keydown', function () { keyResponse(event.which); });
}

function changeFocus () {
  for (var i = 0; i < elements.length; i++) {
    element = document.getElementById(elements[i].eID);
    element.setAttribute('stroke', 'black');
    // focus.setAttribute("stroke-width", 1);
  }
  focus = document.getElementById(elements[focusElement].eID);
  focus.setAttribute('stroke', 'blue');
  focus.scrollIntoView(true);
  window.scrollBy(0, -300);

  // focus.setAttribute("stroke-width", 4);

  document.getElementById('event_desc').value = elements[focusElement].description;
  document.getElementById('icon_select').value = elements[focusElement].icon;
  document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
  document.getElementById('post_it_text').value = elements[focusElement].postit;
  document.getElementById('updateButton').removeAttribute('disabled');
  document.getElementById('backButton').removeAttribute('disabled');
  document.getElementById('fwdButton').removeAttribute('disabled');
  document.getElementById('deleteButton').removeAttribute('disabled');
}

function canvasGotFocus () {
  // events when focus shifts to canvas?
  // alert("canvas got focus");
  canvasInFocus = true;
  focusElement = -1;
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
  elements[focusElement].description = document.getElementById('event_desc').value;
  elements[focusElement].icon = document.getElementById('icon_select').value;
  elements[focusElement].emoticon = document.getElementById('emoticon_select').value;
  elements[focusElement].postit = document.getElementById('post_it_text').value;
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
