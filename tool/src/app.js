/*!
  Default application | © 2018 The Open University (IET-OU).
*/

module.exports.run = run;

const LOC = window.location;
const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');

function run () {
  console.warn('The our-journey API:', require('../index'));
  if (LOC.search.match(/[?&]layout=scol/)) {
    LAYOUT.setScol();
  } else {
    LAYOUT.reflow();
  }

  if (LOC.search.match(/[?&]edit=fixed/)) {
    UI.chooseEditor('fixed');
  } else if (LOC.search.match(/[?&]edit=float/)) {
    UI.chooseEditor('float');
  } else {
    UI.chooseEditor('float');
  }

  CORE.initialiseElements(0);

  EVENTS.initialise();

  if (LOC.search.match(/[?&]demo=1/)) {
    CORE.demoFill();

    document.body.className += ' demo-fill';
  }

  CORE.setFocusElement(0);

  CORE.changeFocus();

  UI.toggleOptions();
  UI.changeBackground('Wheat');

  SHARE.createLink(CORE.getElements());
  SHARE.loadLink(CORE.getElements());

  document.getElementById('journey-canvas').focus();
  window.scrollTo(0, 0);
}
