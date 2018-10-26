/* Default configuration | ©The Open University.
*/

const UTIL = require('./util');

module.exports.DEFAULTS = {
  // CSS-style selector for the containing HTML element.
  containerSelector: '#our-journey-tool',
  // URL to load icons and emoticons from (Default: Unpkg CDN).
  assetUrl: 'https://unpkg.com/our-journey@^1/assets',
  // URL of the help page, to use in HTML links.
  helpUrl: 'https://iet-ou.github.io/our-journey/help.html',
  // @prop {string} privacyUrl Link to a privacy policy, and terms.
  privacyUrl: 'https://iet-ou.github.io/our-journey/privacy-ou-generic.html',
  // Load a demonstration journey (Default: false)
  demo: UTIL.param(/[?&]demo=(1)/, false),
  // Use the floating or fixed editor (Default: floating)
  editor: UTIL.param(/[?&]edit=(fixed|float)/, 'float'),
  // Load a journey. A null (default), base-64 encoded JSON, or an array of journey objects.
  journey: UTIL.param(/[?&]j=(base64:[\w%=]+)/),
  // Use a single-column or default layout (Default: 'default')
  layout: UTIL.param(/[?&]layout=(scol|default)/, 'default'),
  // @prop {string} background  Set the background colour-name (Default: 'wheat')
  // @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value}
  background: UTIL.param(/[?&]bg=([a-z]+)/, 'wheat'),
  // @prop {integer} zoom Set the zoom-level for embeds (50 ... 95)% (Default: 100).
  zoom: UTIL.param(/[?&]zoom=([5-9][05])/, 100),
  // @prop {boolean} wholePage  Does the our-journey tool occupy the whole page? (Default: true)
  wholePage: true,
  // @readonly {string} version  Version.
  version: '__VERSION__',
  // Experimental! Custom events (asynchronous) or callbacks (synchronous) ?
  events: [
    // Asynchronous custom event fired after each time the share link is re-generated.
    'updatesharelink.ourjourney'
  ],
  // Experimental! Synchronous callback fired after each time the share link is re-generated. (Was: 'onRecreate')
  onUpdateShareLink: function () {}
};
