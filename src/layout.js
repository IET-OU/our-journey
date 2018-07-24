/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

//module.exports.reflow = reflow;
module.exports = { reflow: reflow, 
  getLayout: getLayout,
  getLayoutData: getLayoutData
}

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = document.querySelector('#oj-svg-card-template').innerText;
const HOLDER = document.querySelector('#journey-canvas .card-holder');
const CORE = require('./core');
const UI = require('./user-interface');

var set_layout = "default";

function reflow (layout) {
  layout = layout || 'default';

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ HOLDER);

  let cards = [];

  if(layout == "scol"){
    set_layout = "scol";
    UI.chooseEditor('float');
    scol_layout = [];
    for(i=0;i<CORE.getNumElements();i++){
      scol_layout.push({ "{j}": i,  "{x}": 0,   "{y}": i*130,  "{orient}": "horiz" });
    }
    scol_layout.forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
    document.getElementById('journey-canvas').setAttribute('height', '4700');
    document.getElementById('start_point').setAttribute('visibility','collapse');
  }
  else{
    LAYOUTS[ layout ].forEach(function (elem) {
      cards.push(replaceObj(SVG_TEMPLATE, elem));
    });
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

function getLayout(){
  return set_layout;
}

function getLayoutData(){
  return LAYOUTS;
}
