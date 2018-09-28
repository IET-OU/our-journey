/* Utility & configuration functions | ©The Open University.
*/

module.exports = {

  putConfig: putConfig,

  config: getConfig,

  qs: querySelector,

  replace: replaceObj
};

let CONFIG = {};

/** Set (all) configuration options.
 */
function putConfig (config) {
  module.exports.CFG = CONFIG = config;

  CONFIG.container = document.querySelector(CONFIG.containerSelector);
}

/** Get one or all configuration options.
 */
function getConfig (key) {
  return key ? CONFIG[ key ] : CONFIG;
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
