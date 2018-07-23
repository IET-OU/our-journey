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
  
  if (LOC.search.match(/[?&]layout=scol/)){
    LAYOUT.reflow("scol");
  }
  else {
      LAYOUT.reflow();
  }
  

  CORE.initialiseElements();

  EVENTS.initialise();

  if (LOC.search.match(/[?&]demo=1/)) {
    CORE.demoFill();

    document.body.className += ' demo-fill';
  }

  CORE.setFocusElement(0);
  CORE.changeFocus();

  UI.toggleOptions();

  SHARE.createLink(CORE.getElements());
  SHARE.loadLink(CORE.getElements());
}
