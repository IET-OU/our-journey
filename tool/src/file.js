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
