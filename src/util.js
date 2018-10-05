/* Utility & configuration functions | ©The Open University.
*/

module.exports = {

  putConfig: putConfig,

  config: getConfig,

  container: container,

  param: urlParam,

  qs: querySelector,

  replace: replaceObj
};

let CONFIG = {};

/** Set (all) configuration options.
 */
function putConfig (options) {
  module.exports.CFG = CONFIG = extend(require('./config').DEFAULTS, options);

  CONFIG.container = document.querySelector(CONFIG.containerSelector);

  return CONFIG;
}

/** Get one or all configuration options.
 */
function getConfig (key) {
  return key ? CONFIG[ key ] : CONFIG;
}

function container () {
  return CONFIG.container;
}

/** qs: Select a HTML or SVG element, from within the Our-journey container element.
 *  Generally, "document.getElementById('my_id')" should be replaced with "UTIL.qs('#my_id')";
 */
function querySelector (selector) {
  return CONFIG.container.querySelector(selector);
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}

// https://gist.github.com/pbojinov/8f3765b672efec122f66
function extend (defaults, options) {
  var extended = {};
  var prop;
  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }
  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }
  return extended;
}

function urlParam (regex, aDefault) {
  aDefault = aDefault || null;

  const M_URL = window.location.search.match(regex);
  return M_URL ? M_URL[ 1 ] : aDefault;
}
