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
  toggleFloatOptions: toggleFloatOptions
};

const ASSET = require('./assets');
const CORE = require('./core');

var editor = 'fixed';

function toggleEditor (tog) {
  var editorElement;
  if (editor === 'fixed') {
    editorElement = document.getElementById('editor');
  } else if (editor === 'float') {
    editorElement = document.getElementById('floating_editor');
  }
  if (tog === 1 || tog === 'show') {
    editorElement.style.display = 'block';
  } else if (tog === 0 || tog === 'hide') {
    editorElement.style.display = 'none';
  }
}

function toggleFloatOptions () {
  var saveload = document.getElementById('float_saveload');
  if ((saveload.style.display === 'none') || (!saveload.style.display)) {
    saveload.style.display = 'block';
  } else {
    saveload.style.display = 'none';
  }
}

function toggleOptions () {
  var options = document.getElementById('options');
  if (options.style.display === 'none') {
    options.style.display = 'block';
    document.getElementById('optionsButton').value = 'Hide Options';
  } else {
    options.style.display = 'none';
    document.getElementById('optionsButton').value = 'Options';
  }
}

function changeBackground (bg) {
  var background = bg || document.getElementById('background_select').value;
  document.body.style.background = background;
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
    document.getElementById('editor').style.display = 'none';
    editor = newEdit;
  } else if (newEdit === 'fixed') {
    document.getElementById('floating_editor').setAttribute('visibility', 'collapse');
  }
}

function getEditor () {
  return editor;
}
