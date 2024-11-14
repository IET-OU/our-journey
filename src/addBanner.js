const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const banner = `/*!
 * ${pkg.name} | ${pkg.version}
 * © ${new Date().getFullYear()} The Open University (IET) | Tim Coughlan {lead}, Glen Darby, Nick Freear | ${pkg.license}.
 * Build: ${new Date().toISOString().replace(/:\d+\.\d+/, '')}
 * ${pkg.repository}
 */
`;

// Read the file and prepend the banner
fs.readFile(path.join(__dirname, '../', 'dist', 'our-journey.min.js'), 'utf8', (err, data) => {
    if (err) throw err;
    const updatedData = `${banner}\n${data}`;
    fs.writeFile(path.join(__dirname, '../', 'dist', 'our-journey.min.js'), updatedData, 'utf8', (err) => {
        if (err) throw err;
        console.log('Banner added successfully!');
    });
});

// Read the file and prepend the banner
fs.readFile(path.join(__dirname, '../', 'dist', 'our-journey.js'), 'utf8', (err, data) => {
  if (err) throw err;
  const updatedData = `${banner}\n${data}`;
  fs.writeFile(path.join(__dirname, '../', 'dist', 'our-journey.js'), updatedData, 'utf8', (err) => {
      if (err) throw err;
      console.log('Banner added successfully!');
  });
});
