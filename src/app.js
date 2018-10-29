/* Default application | ©The Open University.
*/

module.exports.run = run;

// Run 'check' when Javascript is included, not on 'run()'!
const IS_COMPAT = require('./compat').check();

const CORE = require('./core');
const LAYOUT = require('./layout');
const EVENTS = require('./event');
const SHARE = require('./share-link');
const UI = require('./user-interface');
const UTIL = require('./util');
const VIEWS = require('./views');

function run (config) {
  const T_START = Date.now();
  console.time('our-journey int');

  window.ourJourneySvgLoad = function (ev) {
    const T_END = Date.now();
    UTIL.config().times = { start: T_START, end: T_END };

    console.warn('Svg load, ms:', T_END - T_START, ev);
    console.timeLog && console.timeLog('our-journey int');
  };

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

    if (CFG.layout === 'scol') {
      LAYOUT.setScol();
    } else {
      LAYOUT.reflow();
    }

    if (CFG.editor === 'fixed') {
      UI.chooseEditor('fixed');
    } else {
      UI.chooseEditor('float');
    }

    CORE.initialiseElements(0);

    EVENTS.initialise();

    if (CFG.demo) {
      CORE.demoFill();

      UTIL.container().className += ' demo-fill';
    }

    if (CFG.wholePage) {
      document.body.className += ' our-journey-whole-page';
    }

    CORE.setFocusElement(0);
    CORE.changeFocus();

    UI.toggleOptions(0);
    UI.changeBackground(CFG.background); // Was: 'Wheat'

    SHARE.createLink(CORE.getElements());
    SHARE.loadLink(CORE.getElements());

    document.getElementById('group0').focus();
    CORE.editFocus();
    window.scrollTo(0, 0);

    resolve('our-journey: OK');
  });

  return promise;
}
