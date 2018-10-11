/* Create tool markup from HTML & SVG templates | ©The Open University.
*/

module.exports = {
  cardTemplate: require('./partials/card-template.svg'),

  getRedirectHtml: getRedirectHtml,

  setup: setup
};

const CORE = require('./core');
const SHARE = require('./share-link');
const UTIL = require('./util');

const LOC = window.location.href;
const UA = window.navigator.userAgent;

function setup () {
  const CONTAINER = UTIL.config('container');

  // We're using stringify.

  CONTAINER.innerHTML = UTIL.replace(require('./views/default-tool.html'), {
    '{assets}': UTIL.config('assetUrl'),
    '{zoom}': UTIL.config('zoom'),
    // '{helpUrl}': UTIL.config('helpUrl'),
    '{attribution partial}': partial(require('./partials/attribute.html')),
    '{background partial}': partial(require('./partials/background.svg')),
    '{editor bar partial}': partial(require('./partials/editor-bar.html')),
    '{floating editor partial}': partial(require('./partials/floating-editor.svg'))
  });

  CONTAINER.className += ' our-journey-js ok';
}

function partial (partialContent) {
  return UTIL.replace(partialContent, {
    '{assets}': UTIL.config('assetUrl'),
    '{helpUrl}': UTIL.config('helpUrl')
  });
}

function getRedirectHtml () {
  const REDIRECT_URL = LOC.replace(/\?.+/, '') + '?utm_source=save&utm_medium=redirect&';

  const HTML = UTIL.replace(require('./views/redirect.html'), {
    '{debug}': 'UA: ' + UA,
    '{json}': JSON.stringify(CORE.getElements(), null, 2),
    '{redirectUrl}': REDIRECT_URL + SHARE.createUrl(),
    '{version}': UTIL.config('version'),
    '{timestamp}': (new Date()).toISOString()
  });

  return HTML;
}
