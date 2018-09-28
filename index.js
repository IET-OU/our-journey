/*!
  Our Journey module | © 2018 The Open University (IET-OU) | License: GPL-3.0+
*/

module.exports = {

  version: '__VERSION__',

  app: require('./src/app'),

  core: require('./src/core'),

  layout: require('./src/layout'),

  events: require('./src/event'),

  file: require('./src/file'),

  share: require('./src/share-link'),

  ui: require('./src/user-interface'),

  util: require('./src/util'), // Was: config: require('./src/config'),

  views: require('./src/views')
};
