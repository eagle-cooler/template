const fs = require('fs');
const path = require('path');

function processManifest(devTools) {
  const manifestPath = path.join(process.env.PATH_TO_PACKAGE, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  manifest.devTools = devTools;
  
  const outputPath = path.join(process.env.PATH_TO_PACKAGE, `manifest.${devTools ? 'debug' : 'prod'}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  
  return devTools ? 'debug' : 'release';
}

// Only run if this file is being executed directly
if (require.main === module) {
  const devTools = process.argv[2] === 'true';
  const type = processManifest(devTools);
  console.log(type);
}

module.exports = { processManifest }; 