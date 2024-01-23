const fs = require('fs');

const appBundleGradlePath = process.argv[2];
const appBundleGradle = fs.readFileSync(appBundleGradlePath, 'utf-8');

const result = appBundleGradle.match(/versionCode (\d+)/);
const versionNumber = result[1];

console.log(versionNumber);
