/*!
  our-journey site | © The Open University (IET).
*/

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
/* eslint-enable */

(function (W, D, ga) {
  'use strict';

  ga('create', 'UA-3845152-24', 'auto'); // Was: 'UA-124577463-1'
  ga('send', 'pageview');

  const $FTR = D.querySelector('footer, #site-footer');
  const FOOTER = [
    '<p class="footer-copy">',
    '&copy; <a href="https://www.open.ac.uk/">The Open University</a>',
    // ' | <a rel="license" href="https://gnu.org/licenses/gpl-3.0.en.html" title="GNU General Public License [GPL-3.0+]">License</a>',
    ' | <a class="p" href="privacy-ou-generic.html" target="_blank" title="Privacy policy, and terms of service (opens in new window)">Privacy<i> (opens in new window)</i></a>',
    ' | <a class="p" href="http://www.open.ac.uk/about/main/strategy-and-policies/policies-and-statements/website-accessibility-open-university" target="_blank" title="Accessibility statement">Accessibility</a>',
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
})(window, document, window.ga);
