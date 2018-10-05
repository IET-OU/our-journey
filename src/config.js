/* Default configuration | ©The Open University.
*/

const UTIL = require('./util');

module.exports.DEFAULTS = {
  containerSelector: '#our-journey-tool', // CSS-style selector for the containing HTML element.
  assetUrl: 'https://unpkg.com/our-journey@^1/assets', // URL to load icons and emoticons from (Default: Unpkg CDN)
  helpUrl: 'https://iet-ou.github.io/our-journey/help.html', // URL of the help page, to use in HTML links.
  // Experimental!
  demo: UTIL.param(/[?&]demo=(1)/, false), // Load a demonstration journey (Default: false)
  editor: UTIL.param(/[?&]edit=(fixed|float)/, 'float'), // Use the floating or fixed editor (Default: floating)
  journey: UTIL.param(/[?&]j=(base64:[\w=]+)/), // Load a journey. Null (default), base-64 encoded JSON, or Array of journey objects.
  // loadFromUrl: true,                          // Whether to load a journey via URL parameter (if present), e.g. j=base64:...
  layout: UTIL.param(/[?&]layout=(scol|default)/, 'default'), // Use a single-column or default layout (Default: 'default')
  // Experimental! Custom events (asynchronous) or callbacks (synchronous) ?
  events: [
    // 'togglemenu.ourjourney'
    'updatesharelink.ourjourney' // Asynchronous custom event fired after each time the share link is re-generated.
  ],
  // onToggleMenu: function () {}   // Callback fired when the top options menu is opened or closed.
  onUpdateShareLink: function () {} // Synchronous callback fired after each time the share link is re-generated. (Was: 'onRecreate')
};
