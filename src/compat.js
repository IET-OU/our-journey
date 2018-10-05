/* Browser compatibility | ©The Open University.
*/

module.exports.check = checkAndHandle;

const UA = window.navigator.userAgent;
const DOC = window.document;
const LOC = window.location;
const NO_COMPAT_MSG = [
  '<div class="X-ojs-error alert alert-danger" role="alert">',
  '  <p>Sorry! <i>our-journey</i> does not work on Internet Explorer.</p>',
  '  <p><a href="https://browsehappy.com">Try a different browser — Browse Happy</a></p>',
  '</div>'
];
const COMPAT_REGEX = /(MSIE|Trident\/)/; // Live!
// const COMPAT_REGEX = /(MSIE|Trident\/|Chrome)/; // Test!

function checkAndHandle () {
  const IS_COMPAT = (!COMPAT_REGEX.test(UA) || /compatCheck=false/.test(LOC.href));

  if (IS_COMPAT) {
    console.warn('our-journey. Browser is compatible');
  } else {
    notCompatibleMessage();

    tryHideContainer();

    let err = new Error('our-journey. Browser NOT compatible (MSIE ?)');
    err.name = 'CompatError';
    throw err;
  }

  return IS_COMPAT;
}

function notCompatibleMessage () {
  const DIV = DOC.createElement('div');

  DIV.innerHTML = NO_COMPAT_MSG.join('\n');
  DIV.className = 'our-journey-js ojs-error ojs-no-compat ojs-msie';

  DOC.body.insertBefore(DIV, DOC.body.firstChild);
}

function tryHideContainer () {
  // We can't use UTIL.config('container') here, so guess!
  const TRY_CTR = DOC.querySelector('#our-journey-tool');

  if (TRY_CTR) {
    TRY_CTR.style.display = 'none';
  }
}
