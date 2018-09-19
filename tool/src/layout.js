/* Layout the SVG journey cards | ©The Open University.
*/

module.exports = {
  reflow: reflow,
  getLayout: getLayout,
  getLayoutData: getLayoutData,
  addElementsToLayout: addElementsToLayout,
  setScol: setScol,
  getLayoutStyle: getLayoutStyle
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = require('./views').cardTemplate; // Was: document.querySelector('#oj-svg-card-template').innerText;
const HOLDER_SELECTOR = '#journey-canvas .card-holder';
const CORE = require('./core');
const UI = require('./user-interface');
const UTIL = require('./util'); // Was: require('./config');

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
  const HOLDER = UTIL.qs(HOLDER_SELECTOR); // Was: document.querySelector(HOLDER_SELECTOR);

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];
  if (layout === 'scol') {
    var scolLayout = [];
    for (var i = 0; i < CORE.getNumElements(); i++) {
      scolLayout.push({ '{j}': i, '{x}': 0, '{y}': (i * 130) + 70, '{w}': 240, '{h}': 130, '{orient}': 'horiz' });
    }
    scolLayout.forEach(function (elem) {
      elem[ '{assets}' ] = UTIL.config('assetUrl'); // Was: CONFIG.get('assetUrl');

      cards.push(UTIL.replace(SVG_TEMPLATE, elem)); // Was: VIEWS.replace();
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

      elem[ '{assets}' ] = UTIL.config('assetUrl');

      cards.push(UTIL.replace(SVG_TEMPLATE, elem));
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

function getLayout () {
  return setLayout;
}

function getLayoutStyle () {
  return layoutStyle;
}

function getLayoutData () {
  return LAYOUTS;
}
