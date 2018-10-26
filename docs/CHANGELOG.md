
# our-journey release notes

← [README][]

---

## [Latest][]

 * Add timing functionality (performance), #54;
 * Updated URLs in `test/example` HTML;
 * `CHANGELOG` now points to tagged releases, #45;

## v[1.4.10][]

 * Fixed menu and editor keyboard accessibility issues, #44;
 * Fixed scrolling to adapt (_accessibility?_);
 * Updated help page;
 * Privacy policy;

## v[1.4.2][]

 * _22 October 2018_;
 * "_temporary fix to web pages_" — tool pages.

## v[1.4.0][]

 * _22 October 2018_;
 * Add browser compatibility-checking Javascript _(error message in Internet Explorer)_, #7;
 * Add default configuration; extend configuration options, including callbacks, #43;
 * Switch the file-save function to create a redirecting HTML file, #42;
 * Add compress/minified version of Javascript _(100 → 70 kB)_, #41;
 * Fix — identify the '_Add more cards_' arrow button as a button, #47;
 * Add `?zoom=75` URL parameter to aid embedding, #17;
 * Add `?bg=wheat` URL parameter (`background-color`);
 * Swap the '_tool_' page back to GitHub Pages, #48;
 * Configurable privacy policy link, #51;
 * Start [JSDoc][] documentation, #49;
 * Add [browserslist][] / eslint test, #7 _(temp. disabled)_;
 * Favicon, #52;
 * Added `CHANGELOG`, #45;

## v[1.3.4][]

 * _2 October 2018;_
 * Fixed post-it display bug;
 * _.. Anything else ..?_

## v[1.3.3][]

 * _28 September 2018;_
 * Public release / open sourced, #15;
 * Portable code — HTML templates built with [stringify][], #24;
 * Floating editor fixes;
 * Further Firefox browser fix;
 * Initial contributing guide, #37;
 * [Travis-CI][] build/test operational;
 * Files re-arranged; GitHub pages site put in `/docs/` folder, #38;

## v[1.2.0][]

 * _24 August 2018;_
 * Single-column layout;
 * Initial floating editor;
 * First Firefox browser fix;

## v[1.1.1][]

 * _31 July 2018;_
 * First version published to [Npmjs.com][] _(technically, '1.1.0')_
 * Javascript built with Npm and [Browserify][], #6;
 * Reduce JS global variables; initial separation of our-journey _API_, #1;
 * Test / linting with `semistandard`, #1;
 * First GitHub Pages demo, #22;
 * Initial '_link-sharing_' functionality (Base64 encoded journey JSON in URL)

## v[0.8.0][]

 * Pre-release. _20 June 2018;_
 * "_1st upload: proof of concept_"
 * > index.html contains js and html. journeystyle.css contains styles other files are graphics

---

See [spreadsheet][gdoc].

← [README][]

[gdoc]: https://docs.google.com/spreadsheets/d/13pR4eFvzttsrsqdf4FEPa0hCbMNuTYNrJJl46pxyumw/#gid=0 "Spreadsheet — 'our-journey npm-view git-tag'"

[0.8.0]: https://github.com/IET-OU/our-journey/releases/tag/0.8.0 "1st upload. 2018-06-20 (78bc695)"
[1.1.0]:  https://github.com/IET-OU/our-journey/commits "(URL incomplete) 1st published to Npmjs.com. 2018-07-31"
[1.1.1]: https://github.com/IET-OU/our-journey/releases/tag/1.1.1 "2018-07-31 (5a25861)"
[1.1.11]: https://github.com/IET-OU/our-journey/commit/1e87e7493469122e "2018-08-17 (1e87e74)"
[1.2.0]: https://github.com/IET-OU/our-journey/releases/tag/1.2.0 "2018-08-24 (c753c30)"
[1.3.3]: https://github.com/IET-OU/our-journey/releases/tag/1.3.3 "Open sourced. 2018-09-28 (9fa2575)"
[1.3.4]: https://github.com/IET-OU/our-journey/releases/tag/1.3.4 "2018-10-02 (a64ab73)"
[1.4.0]: https://github.com/IET-OU/our-journey/releases/tag/1.4.0 "22nd October 2018 (eba90c1)"
[1.4.2]: https://github.com/IET-OU/our-journey/releases/tag/1.4.2 "22 October (4a48769)"
[1.4.7]:  https://github.com/IET-OU/our-journey/commit/97f197a37884408fb "25 October (97f197a)"
[1.4.10]: https://github.com/IET-OU/our-journey/commit/6b32aeebdd8f3ce3a "25 October (6b32aee)"

[latest]: https://github.com/IET-OU/our-journey/commits "Currently unreleased commits"
[changelog]: https://github.com/IET-OU/our-journey/blob/master/docs/CHANGELOG.md
[readme]: https://github.com/IET-OU/our-journey#readme
[gh]: https://iet-ou.github.io/our-journey/
[unpkg]: https://unpkg.com/our-journey/ "unpkg is a fast, global content delivery (CDN) network for everything on npm."
[npmjs.com]: https://npmjs.com/package/our-journey "our-journey on Npmjs.com"
[browserify]: http://browserify.org/
  "Browserify lets you require('modules') in the browser by bundling up all of your dependencies."
[stringify]: https://npmjs.com/package/stringify
  "Browserify plugin to require() text / HTML files ... inside your client-side JavaScript."
[browserslist]: https://browsersl.ist/?q=last+1+version%2C+%3E+1%25%2C+not+dead%2C+not+ie+%3C+99
  "A page to display compatible browsers from a browserslist string."
[travis-ci]: https://travis-ci.org/IET-OU/our-journey
[jsdoc]: http://usejsdoc.org/

[End]: //.
