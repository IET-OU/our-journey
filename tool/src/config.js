
module.exports = {
  set: set,
  get: get
};

var CONFIG = {};

function set (config) {
  CONFIG = config;
}

function get (key) {
  return key ? CONFIG[ key ] : CONFIG;
}
