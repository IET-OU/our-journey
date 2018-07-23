
[![js-semistandard-style][semi-icon]][semi]

# Our Journeys interactive student journey creator

_Our Journeys_ is an interactive online tool to chart the highs and lows of student journeys. The aim is to produce a simple and accessible structure for students to represent the events that occurred in their study and their experience of these. It is being developed for use by all students and different institutions. The design is informed by research conducted to understand the challenges faced by disabled students at the Open University (see [Coughlan & Lister, 2018][ORO] and [Coughlan, Ullmann & Lister, 2017)][ORO2]).

 * [iet-ou.github.io/our-journey][web]

![Screenshot 1 - the editor.][img-rel]

A physical version of the tool has been developed by [Tim Coughlan][tim] and [Kate Lister][kate] of the Institute of Educational Technology (IET)
and Glen Darby in LTI Translation, with [HEIF funding][heif].

This prototype online version is being developed in the Institute of Educational Technology (IET),
at The Open University.

Author: [Tim Coughlan][tim], IET.

## Install .. serve .. test .. fix

Use [Node][] and npm to aid development:

```sh
npm install
npm start
npm test
npm run fix
npm run pa11y-ci
```

---
Copyright © 2018 [The Open University][ou]. All rights reserved. ([Institute of Educational Technology][iet])

[iet]: https://iet.open.ac.uk/
[ou]: http://www.open.ac.uk/
[web]: https://iet-ou.github.io/our-journey/?demo=1
[gh]: https://github.com/IET-OU/learningdesign
[tim]: https://iet.open.ac.uk/profiles/tim.coughlan
[kate]: http://www.open.ac.uk/people/kml322 
[node]: https://nodejs.org/en/
[Help: Relative Image URL]: https://github.com/mark-anders/relative-image-url
[img]: https://github.com/nfreear/our-journey/blob/nfreear/demo-fill/assets/screenshot-1.png?raw=true
[img-rel]: assets/screenshot-1.png "'Our Journeys' screenshot 1 - the editor."
[oro]: http://oro.open.ac.uk/54760/
  "The accessibility of administrative processes: Assessing the impacts on students in higher education. Tim Coughlan, Kate Lister, 2018"
[oro2]: http://oro.open.ac.uk/48991/
  "Understanding Accessibility as a Process through the Analysis of Feedback from Disabled Students. Tim Coughlan, Thomas Daniel Ullmann, & Kate Lister, 2017."
[heif]: https://re.ukri.org/knowledge-exchange/the-higher-education-innovation-fund-heif/
  "The Higher Education Innovation Fund (HEIF)"
[semi]: https://github.com/Flet/semistandard
[semi-icon]: https://nick.freear.org.uk/badge/semi.svg "Javascript coding style — semistandard"
[sem-i0]: https://img.shields.io/badge/code_style-semistandard-brightgreen.svg?_style=flat-square

[End]: //.
