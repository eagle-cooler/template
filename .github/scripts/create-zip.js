const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function createZip(type) {
  const pkgRules = JSON.parse(fs.readFileSync(path.join(process.env.PATH_TO_PACKAGE, '.github/configs/pkgRules.json'), 'utf8'));
  const manifestName = process.env.MANIFEST_NAME;
  const manifestVersion = process.env.MANIFEST_VERSION;
  
  // Create zip command based on includes
  let zipCmd = `zip -r "${manifestName}-${type}.eagleplugin"`;
  
  // Add each include pattern
  pkgRules.includes.forEach(pattern => {
    zipCmd += ` "${pattern}"`;
  });
  
  // Add manifest
  zipCmd += ` "manifest.${type === 'release' ? 'prod' : 'debug'}.json"`;
  
  // Execute zip command
  execSync(zipCmd);
  
  return `${manifestName}-${type}.eagleplugin`;
}

// Only run if this file is being executed directly
if (require.main === module) {
  const type = process.argv[2];
  const zipFile = createZip(type);
  console.log(zipFile);
}

module.exports = { createZip }; 