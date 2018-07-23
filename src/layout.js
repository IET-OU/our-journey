/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

module.exports.reflow = reflow;

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');

function reflow (layout) {
  layout = layout || 'default';

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];

  LAYOUTS[ layout ].forEach(function (elem) {
    cards.push(replaceObj(SVG_TEMPLATE, elem));
  });

  HOLDER.innerHTML = cards.join('\n');
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}
