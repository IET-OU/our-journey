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
