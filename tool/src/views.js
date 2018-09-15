/* Create tool markup from HTML & SVG templates | ©The Open University.
*/

module.exports = {
  cardTemplate: require('./partials/card-template.svg'),

  // Was: replace: replaceObj,

  setup: setup
};

const UTIL = require('./util'); // Was: CONFIG = require('./config');

function setup () {
  const CONTAINER = UTIL.config('container'); // document.querySelector(CONFIG.get('containerSelector'));

  // We're using stringify.

  CONTAINER.innerHTML = UTIL.replace(require('./views/default-tool.html'), {
    '{assets}': UTIL.config('assetUrl'),
    '{attribution partial}': partial(require('./partials/attribute.html')),
    '{background partial}': partial(require('./partials/background.svg')),
    '{editor bar partial}': partial(require('./partials/editor-bar.html')),
    '{floating editor partial}': partial(require('./partials/floating-editor.svg'))
  });

  CONTAINER.className += ' our-journey-js ok';
}

function partial (partialContent) {
  return partialContent.replace(/\{assets\}/g, UTIL.config('assetUrl'));

  // return replaceObj(partialContent, { '{assets}': UTIL.config('assetUrl') });
}
