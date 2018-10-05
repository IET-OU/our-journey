/* Default application | ©The Open University.
*/

module.exports.run = run;

const IS_COMPAT = require('./compat').check();

const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');
const UTIL = require('./util'); // Was: require('./config');
const VIEWS = require('./views');

function run (config) {
  const promise = new Promise(function (resolve, reject) {
    if (!IS_COMPAT) {
      // This should never be reached!
      reject(new Error('our-journey. Browser compatibility error'));

      return;
    }

    const CFG = UTIL.putConfig(config);

    console.warn('The our-journey API:', require('../index'), 'config:', CFG);

    VIEWS.setup();

    console.warn('qs test:', UTIL.qs('#journey-canvas'));

    if (CFG.layout === 'scol') { // Was: LOC.search.match(/[?&]layout=scol/)) {
      LAYOUT.setScol();
    } else {
      LAYOUT.reflow();
    }

    if (CFG.editor === 'fixed') { // Was: LOC.search.match(/[?&]edit=fixed/)) {
      UI.chooseEditor('fixed');
    /* else if (LOC.search.match(/[?&]edit=float/)) {
      UI.chooseEditor('float');
    } */
    } else {
      UI.chooseEditor('float');
    }

    CORE.initialiseElements(0);

    EVENTS.initialise();

    if (CFG.demo) { // Was: LOC.search.match(/[?&]demo=1/)) {
      CORE.demoFill();

      UTIL.container().className += ' demo-fill';
    }

    CORE.setFocusElement(0);
    CORE.changeFocus();

    UI.toggleOptions();
    UI.changeBackground('Wheat');

    SHARE.createLink(CORE.getElements());
    SHARE.loadLink(CORE.getElements());

    document.getElementById('group0').focus();
    CORE.editFocus();
    window.scrollTo(0, 0);

    resolve('our-journey: OK');
  });
  return promise;
}
