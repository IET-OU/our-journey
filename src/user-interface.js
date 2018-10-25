/* User interface | ©The Open University.
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
      //toggleOptions(1);
      floatElement.style.display = 'block';
    } else if (tog === 0 || tog === 'hide') {
      //toggleOptions(0);
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
