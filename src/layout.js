/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

module.exports = {
  reflow: reflow,
  getLayout: getLayout,
  getLayoutData: getLayoutData
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');
const CORE = require('./core');
const UI = require('./user-interface');

var setLayout = 'default';

function reflow (layout) {
  layout = layout || 'default';

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];

  if (layout === 'scol') {
    setLayout = 'scol';
    UI.chooseEditor('float');
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': i * 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('journey-canvas').setAttribute('height', '4700');
    document.getElementById('start_point').setAttribute('visibility', 'collapse');
    document.getElementById('scol_start_point').setAttribute('visibility', 'visible');
  } else {
    LAYOUTS[ layout ].forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('scol_bar').style.display = 'none';
    document.getElementById('scol_saveload').style.display = 'none';
    document.getElementById('scol_start_point').setAttribute('visibility', 'collapse');
  }

  HOLDER.innerHTML = cards.join('\n');
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}

function getLayout () {
  return setLayout;
}

function getLayoutData () {
  return LAYOUTS;
}
