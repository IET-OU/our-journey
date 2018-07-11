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
  addKeyboardFocus: addKeyboardFocus, // Not used ?!
  canvasGotFocus: canvasGotFocus,
  canvasLostFocus: canvasLostFocus,
  // Properties.
  getElements: getElements,
  setFocusElement: setFocusElement
};

const UI = require('./user-interface');
const ASSET = require('./assets');
const DIM = require('./dimension.json');

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
// ...

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

function elementClick () {
  var e = this.id.substring(5);
  focusElement = parseInt(e);
  // alert('mouse down on ' + focusElement);
  changeFocus();
  UI.toggleEditor('show');
}

function updateElements () {
  for (var i = 0; i < numElements; i++) {
    var element = elements[i];
    // mouse event listener
    var ePlace = document.getElementById('group' + i);
    ePlace.addEventListener('click', elementClick);
    var eRect = document.getElementById('place' + i);
    eRect.setAttribute('fill', 'Snow');
    eRect.setAttribute('fill-opacity', '1.0');
    if (vlElements.includes(i)) {
      eRect.setAttribute('x', DIM.rectXV);
    } else if (vrElements.includes(i)) {
      eRect.setAttribute('y', DIM.rectY);
    } else {
      eRect.setAttribute('y', DIM.rectY);
    }
    // description
    var eText = document.getElementById('description' + i);
    // alert("changing text on description" + elementText + " to " + element.description);
    eText.textContent = element.description;
    if (vlElements.includes(i)) {
      eText.setAttribute('x', DIM.textXV);
      eText.setAttribute('y', DIM.textYV);
    } else if (vrElements.includes(i)) {
      eText.setAttribute('x', DIM.textXVR);
      eText.setAttribute('y', DIM.textYVR);
    } else {
      eText.setAttribute('x', DIM.textX);
      eText.setAttribute('y', DIM.textY);
    }
    // emoticon
    var eEmo = document.getElementById('emoticon' + i);
    if (element.emoticon !== 'none') {
      for (var j = 0; j < ASSET.emoticonCount(); j++) {
        if (ASSET.hasEmoticon(j, element)) {
          eEmo.setAttribute('height', DIM.emoticonHeight);
          eEmo.setAttribute('width', DIM.emoticonWidth);
          if (vlElements.includes(i)) {
            eEmo.setAttribute('x', DIM.emoticonXV);
            eEmo.setAttribute('y', DIM.emoticonYV);
          } else if (vrElements.includes(i)) {
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
    // icon
    var eIcon = document.getElementById('icon' + i);
    if (element.icon !== 'none') {
      for (j = 0; j < ASSET.iconCount(); j++) {
        if (ASSET.hasIcon(j, element)) {
          eIcon.setAttribute('height', DIM.iconHeight);
          eIcon.setAttribute('width', DIM.iconWidth);
          if (vlElements.includes(i)) {
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
    // postit
    var ePostIt = document.getElementById('postit' + i);
    var ePostItText = document.getElementById('postittext' + i);
    if (element.postit !== '') {
      ePostIt.setAttribute('visibility', 'visible');
      ePostItText.setAttribute('visibility', 'visible');
      ePostItText.setAttribute('width', DIM.postitTextWidth);
      // ePostItText.setAttribute('y', DIM.postitTextY);

      if (vlElements.includes(i)) {
        ePostIt.setAttribute('y', DIM.postitVY);
        ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVY);
        ePostItText.setAttribute('x', DIM.postitTextVX);
      } else if (vrElements.includes(i)) {
        ePostIt.setAttribute('x', DIM.postitVRX);
        ePostItText.setAttribute('x', DIM.postitVRX);
        ePostIt.setAttribute('y', DIM.postitVRY);
        ePostItText.setAttribute('y', DIM.postitTextY + DIM.postitVRY);
        ePostItText.setAttribute('x', DIM.postitTextVRX);
      } else {
        ePostIt.setAttribute('x', DIM.postitX);
        ePostItText.setAttribute('x', DIM.postitTextX);
        ePostItText.setAttribute('y', DIM.postitTextY);
      }
      ePostItText.textContent = element.postit;
    } else {
      ePostIt.setAttribute('visibility', 'collapse');
      ePostItText.setAttribute('visibility', 'collapse');
    }
  }
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
    element.setAttribute('stroke-width', 1);
  }
  focus = document.getElementById(elements[focusElement].eID);
  focus.setAttribute('stroke', 'blue');
  focus.scrollIntoView(true);
  window.scrollBy(0, -300);
  focus.setAttribute('stroke-width', 3);

  document.getElementById('event_desc').value = elements[focusElement].description;
  document.getElementById('icon_select').value = elements[focusElement].icon;
  document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
  document.getElementById('post_it_text').value = elements[focusElement].postit;
  document.getElementById('updateButton').removeAttribute('disabled');
  document.getElementById('backButton').removeAttribute('disabled');
  document.getElementById('fwdButton').removeAttribute('disabled');
  document.getElementById('deleteButton').removeAttribute('disabled');

  document.getElementById('title').innerHTML = 'Journey Editor: Card ' + focusElement;
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
