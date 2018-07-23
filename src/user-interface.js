/*!
  User interface. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  toggleEditor: toggleEditor,
  toggleOptions: toggleOptions,
  changeBackground: changeBackground,
  setSColLayout: setSColLayout,
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
    document.getElementById('floating_editor').setAttribute('visibility','visible');
    document.getElementById('editor').style.display = 'none';
    editor = newEdit;
  }
  else if(newEdit == 'fixed'){
    document.getElementById('floating_editor').setAttribute('visibility','collapse');
    
  }
}

function setSColLayout(){
  document.getElementById('start_point').setAttribute('visibility','collapse');
  chooseEditor('float');
}

function getEditor(){
  return editor;
}