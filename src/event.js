/*!
  Setup form event handlers | © 2018 The Open University (IET-OU).
*/

module.exports = {
  initialise: initialiseEventHandlers
};

const CORE = require('./our-journeys'); // TODO: rename to './core' !
const FILE = require('./file');
const UI = require('./user-interface');

// Initialises the event handlers for form submit buttons.
function initialiseEventHandlers () {
  document.getElementById('updateform').addEventListener('submit', function (e) {
    e.preventDefault();
    CORE.updateElement();
  });

  document.getElementById('deleteform').addEventListener('submit', function (e) {
    e.preventDefault();
    CORE.clearElement();
  });

  document.getElementById('backform').addEventListener('submit', function (e) {
    e.preventDefault();
    CORE.moveBackElement();
  });

  document.getElementById('forwardform').addEventListener('submit', function (e) {
    e.preventDefault();
    CORE.moveFwdElement();
  });

  document.getElementById('optionsform').addEventListener('submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();
  });

  document.getElementById('backgroundform').addEventListener('submit', function (e) {
    e.preventDefault();
    UI.changeBackground();
  });

  document.getElementById('hideeditorform').addEventListener('submit', function (e) {
    e.preventDefault();
    UI.toggleEditor('hide');
  });

  document.getElementById('loadform').addEventListener('submit', function (e) {
    e.preventDefault();
    FILE.loadJourney();
  });

  document.getElementById('saveform').addEventListener('submit', function (e) {
    e.preventDefault();
    FILE.saveJourney();
  });
}
