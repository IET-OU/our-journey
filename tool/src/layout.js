/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

module.exports = {
  reflow: reflow,
  getLayout: getLayout,
  getLayoutData: getLayoutData,
  addElementsToLayout: addElementsToLayout,
  setScol: setScol,
  getLayoutStyle
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');
const CORE = require('./core');
const UI = require('./user-interface');

var layoutStyle = 'default';
var setLayout = 'default';

function setScol () {
  layoutStyle = 'scol';
  setLayout = 'scol';
  document.getElementById('journey-canvas').setAttribute('height', '2400');
  document.getElementById('journey-canvas').setAttribute('width', '500');
  reflow(setLayout);
  UI.chooseEditor('float');
  UI.changeBackgroundElements('none');
  document.getElementById('journey_logo').setAttribute('visibility', 'collapse');
  document.getElementById('add_more_card').setAttribute('x', 55);
  document.getElementById('start_point').setAttribute('visibility', 'collapse');
  document.getElementById('scol_start_point').setAttribute('visibility', 'visible');
}

function reflow (layout) {
  layout = layout || 'default';
  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);
  let cards = [];
  if (layout === 'scol') {
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': (i * 130) + 70, '{w}': 240, '{h}': 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('add_more_card').setAttribute('y', (CORE.getNumElements() * 130) + 170);
  } else {
    LAYOUTS[ layout ].forEach(function (elem) {
      if (elem[ '{orient}' ] === 'vert') {
        elem[ '{w}' ] = 130;
        elem[ '{h}' ] = 240;
      } else {
        elem[ '{w}' ] = 240;
        elem[ '{h}' ] = 130;
      }
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('scol_start_point').setAttribute('visibility', 'collapse');
  }
  HOLDER.innerHTML = cards.join('\n');
}

function addElementsToLayout () {
  if (CORE.getNumElements() < CORE.getMaxElements()) {
    var numExistingElements = CORE.getNumElements();
    var newHeight;
    var newAddMoreY;
    CORE.addElements(10);
    if (layoutStyle === 'default') {
      setLayout = 'default' + CORE.getNumElements();
      reflow(setLayout);
      newHeight = parseInt(document.getElementById('journey-canvas').getAttribute('height')) + 720;
      if (CORE.getNumElements() < CORE.getMaxElements()) {
        newAddMoreY = parseInt(document.getElementById('add_more_card').getAttribute('y')) + 710;
        document.getElementById('add_more_card').setAttribute('y', newAddMoreY);
      } else {
        document.getElementById('add_more_card').setAttribute('visibility', 'collapse');
      }
    } else if (layoutStyle === 'scol') {
      reflow('scol');
      newHeight = parseInt(document.getElementById('journey-canvas').getAttribute('height')) + 1400;
      if (CORE.getNumElements() < CORE.getMaxElements()) {
        newAddMoreY = parseInt(document.getElementById('add_more_card').getAttribute('y'));
        document.getElementById('add_more_card').setAttribute('y', newAddMoreY);
      } else {
        document.getElementById('add_more_card').setAttribute('visibility', 'collapse');
      }
    }
    document.getElementById('journey-canvas').setAttribute('height', newHeight);
    CORE.initialiseElements(numExistingElements);
    CORE.setFocusElement(numExistingElements);
    CORE.changeFocus();
  }
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

function getLayoutStyle () {
  return layoutStyle;
}

function getLayoutData () {
  return LAYOUTS;
}
