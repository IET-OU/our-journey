
# our-journey release notes

← [README][]

_A work-in-progress!_

We need to convert version URLs using [`git tag -a`](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

E.g.
```
git tag -a 1.1.1  5a258618728f5b97
  ...
git tag    # List tags
  ...
git push --tags
```

See [spreadsheet][gdoc].

## v[1.4.0][]

 * _approx. October 2018_;
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
 * Add [browserslist][] / eslint test, #7;
 * Favicon, #52;
 * Added `CHANGELOG`, #45;
 * _.. Anything else ..?_

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

← [README][]

[gdoc]: https://docs.google.com/spreadsheets/d/13pR4eFvzttsrsqdf4FEPa0hCbMNuTYNrJJl46pxyumw/#gid=0 "Spreadsheet — 'our-journey npm-view git-tag'"

[0.8.0]:  https://github.com/IET-OU/our-journey/commit/78bc695de6ec8cb573 "1st upload: proof of concept. 20-Jun-2018"
[1.1.0]:  https://github.com/IET-OU/our-journey/commits "(URL incomplete) 1st published to Npmjs.com. 2018-07-31"
[1.1.1]:  https://github.com/IET-OU/our-journey/commit/5a258618728f5b97 "2018-07-31"
[1.1.11]: https://github.com/IET-OU/our-journey/commit/1e87e7493469122e "2018-08-17"
[1.2.0]:  https://github.com/IET-OU/our-journey/commit/c753c3070207965b "2018-08-24"
[1.3.3]:  https://github.com/IET-OU/our-journey/commit/9fa2575bc13158dd "Open sourced. 2018-09-28."
[1.3.4]: https://github.com/IET-OU/our-journey/commit/a64ab7340b733f755b06 "2018-10-02"
[1.4.0]: https://github.com/IET-OU/our-journey/commits "(URL incomplete)"

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
