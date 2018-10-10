/*!
  Setup form & SVG 'canvas' event handlers | © 2018 The Open University (IET-OU).
*/

module.exports = {
  initialise: initialiseEventHandlers
};

const CORE = require('./core');
const FILE = require('./file');
const UI = require('./user-interface');
const LAYOUT = require('./layout');
const SHARE = require('./share-link');

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

  attachEvent('#floating_addform', 'submit', function (e) {
    e.preventDefault();
    CORE.addCard();
  });

  attachEvent('#optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();

    // SHARE.createLink();
  });

  attachEvent('#float_optionsform', 'submit', function (e) {
    e.preventDefault();
    UI.toggleOptions();

    SHARE.createLink();
  });

  attachEvent('#background_select', 'change', function (e) {
    e.preventDefault();
    UI.changeBackground();
  });

  attachEvent('#background_elements_select', 'change', function (e) {
    e.preventDefault();
    UI.changeBackgroundElements();
  });

  attachEvent('#card_colour_select', 'change', function (e) {
    e.preventDefault();
    UI.changeCardColour();
  });

  attachEvent('#printform', 'submit', function (e) {
    e.preventDefault();
    UI.printJourney();
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

  attachEvent('#icon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#emoticon_select', 'change', function (e) {
    CORE.updateElement();
  });

  attachEvent('#event_desc', 'keyup', function (e) {
    CORE.updateElement();
  });

  attachEvent('#post_it_text', 'keyup', function (e) {
    CORE.updateElement();
  });

  attachEvent('#add_more_rect', 'click', function (e) {
    LAYOUT.addElementsToLayout();
  });

  attachEvent('#add_more_img', 'click', function (e) {
    LAYOUT.addElementsToLayout();
  });

  attachEvent('#add_more_card', 'focusin', function (e) {
    CORE.addMoreCardFocus();
  });

  attachEvent('#journey-background', 'click', function (e) {
    CORE.stopFloatingFocus();
  });
}

function attachEvent (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, function (ev) {
    callback(ev);
  });
}
