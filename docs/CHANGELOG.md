
# our-journey release notes

←[README][]

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

## v[1.3.5][]

 * _~~ mid-October 2018_;
 * Add browser compatibility-checking Javascript _(error message in Internet Explorer)_;
 * _... Anything else ...?_
 * Added CHANGELOG;

## v[1.3.4][]

 * 2 October 2018;
 * Fixed post-it display bug;
 * _What else changed ...?_

## v[1.3.3][]

 * 28 September 2018;
 * Public release / open sourced;
 * Portable code — HTML templates built with [stringify][];
 * Floating editor fixes;
 * Further Firefox browser fix;
 * Initial contributing guide;
 * Travis-CI build/test operational;
 * Files re-arranged; GitHub pages site put in `/docs/` folder;

## v[1.2.0][]

 * 24 August 2018;
 * Single-column layout;
 * Initial floating editor;
 * First Firefox browser fix;

## v[1.1.1][]

 * 31 July 2018;
 * First version published to [Npmjs.com][] _(technically, '1.1.0')_
 * Javascript built with Npm and [Browserify][];
 * Reduce JS global variables; initial separation of our-journey _API_;
 * Test / linting with `semistandard`;
 * First GitHub Pages demo;
 * Initial '_link-sharing_' functionality (Base64 encoded journey JSON in URL)

## v[0.8.0][]

 * Pre-release. 20 June 2018.
 * "_1st upload: proof of concept_"
 * > index.html contains js and html. journeystyle.css contains styles other files are graphics

---

←[README][]

[gdoc]: https://docs.google.com/spreadsheets/d/13pR4eFvzttsrsqdf4FEPa0hCbMNuTYNrJJl46pxyumw/#gid=0 "Spreadsheet — 'our-journey npm-view git-tag'"

[0.8.0]:  https://github.com/IET-OU/our-journey/commit/78bc695de6ec8cb573 "1st upload: proof of concept. 20-Jun-2018"
[1.1.0]:  https://github.com/IET-OU/our-journey/commits "(URL incomplete) 1st published to Npmjs.com. 2018-07-31"
[1.1.1]:  https://github.com/IET-OU/our-journey/commit/5a258618728f5b97 "2018-07-31"
[1.1.11]: https://github.com/IET-OU/our-journey/commit/1e87e7493469122e "2018-08-17"
[1.2.0]:  https://github.com/IET-OU/our-journey/commit/c753c3070207965b "2018-08-24"
[1.3.3]:  https://github.com/IET-OU/our-journey/commit/9fa2575bc13158dd "Open sourced. 2018-09-28."
[1.3.4]: https://github.com/IET-OU/our-journey/commit/a64ab7340b733f755b06 "2018-10-02"
[1.3.5]: https://github.com/IET-OU/our-journey/commits "(URL incomplete)"

[changelog]: https://github.com/IET-OU/our-journey/blob/master/docs/CHANGELOG.md
[readme]: https://github.com/IET-OU/our-journey#readme
[gh]: https://iet-ou.github.io/our-journey/
[unpkg]: https://unpkg.com/our-journey/ "unpkg is a fast, global content delivery (CDN) network for everything on npm."
[npmjs.com]: https://npmjs.com/package/our-journey "our-journey on Npmjs.com"
[browserify]: http://browserify.org/
  "Browserify lets you require('modules') in the browser by bundling up all of your dependencies."
[stringify]: https://npmjs.com/package/stringify
  "Browserify plugin to require() text / HTML files ... inside your client-side JavaScript."

[End]: //.