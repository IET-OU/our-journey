/*!
  Setup our-journey from HTML + SVG templates. | © 2018 The Open University (IET-OU).
*/

module.exports = {
  card_template: require('./partials/card-template.svg'), // Stringify.
  // card_template: require('./partials/card-template.svg')({}), // hbsfy / Handlebars.

  replace: replaceObj,

  setup: setup
};

const CONFIG = require('./config');

function setup () {
  const CONTAINER = document.querySelector(CONFIG.get('container'));

  // Stringify.
  const ATTRIBUTE_HTML = replaceObj(require('./partials/attribute.html'), {
    '{assets}': CONFIG.get('assetUrl')
  });

  const BACKGROUND_SVG = replaceObj(require('./partials/background.svg'), {
    '{assets}': CONFIG.get('assetUrl')
  });

  CONTAINER.innerHTML = replaceObj(require('./views/default-tool.html'), {
    '{assets}': CONFIG.get('assetUrl'),
    '{attribution partial}': ATTRIBUTE_HTML,
    '{background partial}': BACKGROUND_SVG,
    '{editor bar partial}': require('./partials/editor-bar.html'),
    '{floating editor partial}': require('./partials/floating-editor.svg')
  });

  CONTAINER.className += ' our-journey-js ok';

  /* // hbsfy / Handlebars.
  document.querySelector(config.container).innerHTML = require('./views/default-tool.html')({
    assetUrl: config.assetUrl
  }); */
}

/* function setup_OLD () {
  document.querySelector('g.background-holder').innerHTML = require('./views/background.svg');

  document.querySelector('div#editorbar').innerHTML = require('./views/editor-bar.html');

  document.querySelector('svg#floating_editor').innerHTML = require('./views/floating-editor.html');
} */

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}
