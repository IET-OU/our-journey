/*!
  User interface. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  toggleEditor: toggleEditor,
  toggleOptions: toggleOptions,
  changeBackground: changeBackground
};

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

function changeBackground () {
  document.body.style.background = document.getElementById('background_select').value;
}
