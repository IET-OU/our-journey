
[![Build status — Travis-CI][travis-icon]][travis]
[![js-semistandard-style][semi-icon]][semi]
[![Browserify][br-icon]][browserify]
[![our-journey - on Npmjs][npm-icon]][npm]
[![License: GPL-3.+][lic-icon]][gpl]
<!--[![Husky Git hooks][hook-icon]][hook]-->

# Our Journey interactive student journey creator

_Our Journey_ is an interactive online tool to chart the highs and lows of student journeys.

The aim is to produce a simple and accessible structure for students to represent
the events that occurred in their study and their experience of these.
It is being developed for use by all students and different institutions.
The design is informed by research conducted to understand the challenges faced
by disabled students at the Open University (see [Coughlan & Lister, 2018][ORO]
and [Coughlan, Ullmann & Lister, 2017][ORO2]).

 * [ourjourney.ac.uk/v1][web]

[![Screenshot 1 - the editor.][img-rel]][web]

A physical version of the tool has been developed by [Tim Coughlan][tim] and
[Kate Lister][kate] of the Institute of Educational Technology (IET)
and Glen Darby in LTI Translation, with [HEIF funding][heif].

This prototype online version is being developed in the
Institute of Educational Technology (IET), at The Open University.

Author: [Tim Coughlan][tim], IET.

## Use

To integrate or extend `our-journey`:

```sh
npm i our-journey
```

## Install .. build .. test

Use [Node][] and npm to aid development:

```sh
npm install
npm run build
npm test
```

Other commands to serve and fix the code etc.:

```sh
npm run        # List lifecycle and other scripts.

npm start
npm run pa11y-ci
npm run fix
npm run jsdoc  # Generate documentation in /jsdoc/ directory.
npx eslint src # browserslist-based test.
```

## API

### URL parameters

 * `. . . . ?demo=1` — Load an empty demonstration journey;
 * `. .?layout=scol` — Display with a single-column layout;
 * `. . ?edit=float` — Use a _floating_ editor;
 * `. ?j=base64:...` — Load a journey represented in the URL parameter as Base64-encoded JSON;
 * `. . . .?zoom=75` — Zoom the display of the whole tool (_50 .. 95%_);
 * `. . . ?bg=wheat` — Set the background colour;

### Javascript

```js
console.log('Inspect:', require('our-journey'));

require('our-journey').app.run({ assetUrl: '..' /* ... */ });
```

### Example

Via [unpkg][] — [browse][] — production CDN:

```html
<link href="https://unpkg.com/our-journey@^1/style/journeystyle.css" rel="stylesheet" />

<div id="our-journey-tool">
  <p class="no-js"> Sorry! This tool requires Javascript. </p>
</div>

<script src="https://unpkg.com/our-journey@^1/dist/our-journey.js"></script>

<script>
  require('our-journey').app.run({
    containerSelector: '#our-journey-tool'

    // Other options ...
  })
  // Returns a Promise.
  .then(function (value) {
    console.warn('Loaded', value);
  });
</script>
```

See the [configuration options][config].

## Changelog

See the release notes in the [changelog][].

## Contributing

See the [contributing guide][contrib].

## GDPR

Details of GDPR / privacy actions can be found in [Bug #51][].

## License

Distributed under the [GNU General Public License, version 3 or later][gpl].

Copyright © 2018 [The Open University][ou]. All rights reserved. ([Institute of Educational Technology][iet])

[gpl]: https://github.com/IET-OU/our-journey/blob/master/LICENSE.txt
  "GNU General Public License, version 3 or later [GPL-3.0+]"
[gpl-orig]: https://gnu.org/licenses/gpl-3.0.txt

[iet]: https://iet.open.ac.uk/
[ou]: https://www.open.ac.uk/
[web]: https://ourjourney.ac.uk/v1/
[gh]: https://github.com/IET-OU/our-journey
[tim]: https://iet.open.ac.uk/profiles/tim.coughlan
[kate]: http://www.open.ac.uk/people/kml322 "Kate Lister"
[node]: https://nodejs.org/en/
[Help: Relative Image URL]: https://github.com/mark-anders/relative-image-url
[img]: https://github.com/nfreear/our-journey/blob/nfreear/demo-fill/assets/screenshot-1.png?raw=true
[img-rel]: assets/screenshot-1.png "'Our Journeys' screenshot 1 - the editor."
[oro]: https://oro.open.ac.uk/54760/
  "The accessibility of administrative processes: Assessing the impacts on students in higher education. Tim Coughlan, Kate Lister, 2018"
[oro2]: https://oro.open.ac.uk/48991/
  "Understanding Accessibility as a Process through the Analysis of Feedback from Disabled Students. Tim Coughlan, Thomas Daniel Ullmann, & Kate Lister, 2017."
[heif]: https://re.ukri.org/knowledge-exchange/the-higher-education-innovation-fund-heif/
  "The Higher Education Innovation Fund (HEIF)"
[unpkg]: https://unpkg.com/ "unpkg is a fast content delivery network (CDN) for everything on npm"
[browse]: https://unpkg.com/our-journey@^1/src/ "Browse the most recent version on Unpkg.com"
[semi]: https://github.com/Flet/semistandard "Javascript coding style — semistandard"
[semi-icon]: https://nick.freear.org.uk/badge/semi.svg
[sem-i0]: https://img.shields.io/badge/code_style-semistandard-brightgreen.svg
[browserify]: http://browserify.org/ "Built with Browserify"
[br-icon]: https://nick.freear.org.uk/badge/browserify.svg
[hook]: https://npmjs.com/package/husky "Git hooks made easy 🐶"
[hook-icon]: https://img.shields.io/badge/git--hook-husky-ff69b4.svg
[q-location]: https://github.com/IET-OU/our-journey/search?q=location&type=Code "GitHub search: 'location'"
[npm]: https://npmjs.com/package/our-journey
[npm-icon]: https://badge.fury.io/js/our-journey.svg
[travis]: https://travis-ci.org/IET-OU/our-journey "Build status – Travis-CI (NPM)"
[travis-icon]: https://api.travis-ci.org/IET-OU/our-journey.svg
[downl-icon]: https://img.shields.io/npm/dt/our-journey.svg "Count of total downloads ~ NPM"
[lic-icon]: https://img.shields.io/badge/license-GPL--3.0%2B-yellowgreen.svg
[lic0-icon]: https://img.shields.io/npm/l/our-journey.svg

[config]: src/config.js#L6 "Configuration options and defaults [config.JS]"
[changelog]: docs/CHANGELOG.md
[contrib]: docs/CONTRIBUTING.md
[contrib-x]: https://github.com/IET-OU/our-journey/blob/master/docs/CONTRIBUTING.md

[Bug #51]: https://github.com/IET-OU/our-journey/issues/51 "GDPR/privacy"

[End]: //.
