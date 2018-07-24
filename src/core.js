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
    document.getElementById('event_desc').value = elements[focusElement].description;
    document.getElementById('icon_select').value = elements[focusElement].icon;
    document.getElementById('emoticon_select').value = elements[focusElement].emoticon;
    document.getElementById('post_it_text').value = elements[focusElement].postit;
    document.getElementById('title').innerHTML = 'Journey Editor: Card ' + focusElement;
  }
  else if(UI.getEditor()=='float'){
    stopFloatingFocus();
  }

  if(LAYOUT.getLayout()=='scol'){
    focusY = 130 * focusElement;
    window.scrollTo(0,focusY);
  }
  else if(LAYOUT.getLayout()=='default'){
    focus.scrollIntoView(true);
    focusY = LAYOUT.getLayoutData()['default'][focusElement]['{y}'];
    focusY = focusY - 100;
    window.scrollTo(0, focusY);
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
