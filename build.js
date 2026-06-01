const fs = require('fs');
const path = require('path');
const generateSchedule = require('./src/generate-schedule');
const { TALKS_DATA } = require('./src/data');

const DIST_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

// Generate the schedule
const fullSchedule = generateSchedule();

// Read HTML template
let htmlTemplate = fs.readFileSync(path.join(SRC_DIR, 'index.html'), 'utf8');

// Read CSS
const cssContent = fs.readFileSync(path.join(SRC_DIR, 'style.css'), 'utf8');

// Read JS
let jsContent = fs.readFileSync(path.join(SRC_DIR, 'script.js'), 'utf8');

// Inject data and schedule into the JS content
jsContent = jsContent.replace('const INJECTED_DATA = [];', `const INJECTED_DATA = ${JSON.stringify(TALKS_DATA)};`);
jsContent = jsContent.replace('const INJECTED_SCHEDULE = [];', `const INJECTED_SCHEDULE = ${JSON.stringify(fullSchedule)};`);

// Inject CSS and JS into the HTML
htmlTemplate = htmlTemplate.replace('<style id="injected-styles"></style>', `<style>${cssContent}</style>`);
htmlTemplate = htmlTemplate.replace('<script id="injected-script"></script>', `<script>${jsContent}</script>`);

// Write the final index.html
fs.writeFileSync(path.join(DIST_DIR, 'index.html'), htmlTemplate, 'utf8');

console.log('Website built successfully to dist/index.html');
