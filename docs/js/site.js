/*!
  our-journey site | © The Open University (IET).
*/

(function (W, D) {
  'use strict';

  const $FTR = D.querySelector('footer, #site-footer');
  const FOOTER = [
    '<p class="footer-copy">',
    '&copy; <a href="https://www.open.ac.uk/">The Open University</a>',
    // ' | <a rel="license" href="https://gnu.org/licenses/gpl-3.0.en.html" title="GNU General Public License [GPL-3.0+]">License</a>',
    ' | <a class="p" href="privacy-ou-generic.html" target="_blank" title="Privacy policy, and terms of service (opens in new window)">Privacy (opens in new window)</a>',
    '</p>',
    '<p class="footer-logos">',
    '<a href="https://iet.open.ac.uk/"><img src="assets/iet-logo.svg" alt="Institute of Educational Technology" title="Institute of Educational Technology" /></a>',
    '<a href="https://www.open.ac.uk/"><img src="assets/ou-logo.svg" alt="The Open University" title="The Open University" /></a>',
    '</p>',
    ''
  ];

  if ($FTR) {
    $FTR.innerHTML = FOOTER.join('\n');
  }
})(window, document);
