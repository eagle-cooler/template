# Eagle Template

A template repository for creating Eagle plugins with automated build and release workflows.

## Features

- 🚀 Automated build and release process
- 📦 Flexible package configuration with pattern matching
- 🔧 Development and production builds
- 🎯 GitHub Actions integration
- 📝 Manifest management
- 🔍 Smart file inclusion patterns

## Getting Started

### Prerequisites

- Node.js 14 or higher
- Git
- Eagle application

### Installation

1. Clone this template:
   ```bash
   git clone https://github.com/your-username/eagle-template.git
   cd eagle-template
   ```

2. Update the manifest:
   - Edit `manifest.json` with your plugin details
   - Set your plugin name, version, and other required fields

3. Configure package rules:
   - Edit `.github/configs/pkgRules.json`
   - Add files and directories to include in your package
   - Use pattern matching for flexible file inclusion

## Project Structure

```
eagle-template/
├── .github/
│   ├── configs/
│   │   └── pkgRules.json    # Package inclusion rules
│   ├── scripts/
│   │   ├── process-manifest.js  # Manifest processing
│   │   └── create-zip.js        # Package creation
│   └── workflows/
│       └── eagle-plugin-pkg.yml # Build workflow
├── src/                    # Your plugin source code
└── manifest.json          # Plugin manifest
```

## Development

### Local Development

1. Set up your development environment:
   ```bash
   export PATH_TO_PACKAGE="."
   export MANIFEST_NAME="your-plugin-name"
   export MANIFEST_VERSION="1.0.0"
   ```

2. Test the build process:
   ```bash
   # Create debug version
   node .github/scripts/process-manifest.js true
   node .github/scripts/create-zip.js debug

   # Create production version
   node .github/scripts/process-manifest.js false
   node .github/scripts/create-zip.js release
   ```

### Building

The build process is automated through GitHub Actions. It will:
1. Create both debug and production versions
2. Package files according to pkgRules.json
3. Create a GitHub release with both versions

To trigger a build:
- Push changes to manifest.json
- Push changes to pkgRules.json
- Manually trigger the workflow from GitHub Actions

## Configuration

### Package Rules

Edit `.github/configs/pkgRules.json` to specify which files to include. The configuration supports pattern matching:

```json
{
    "includes": [
        "manifest.json",    // Exact match
        "*.js",            // All JavaScript files
        "src/*",           // All files in src directory
        "assets/*.png",    // All PNG files in assets
        "docs/*.md"        // All Markdown files in docs
    ]
}
```

Pattern matching supports:
- Exact matches: `"manifest.json"`
- Ends with: `"*.js"` (matches all .js files)
- Starts with: `"src/*"` (matches all files in src directory)

### Manifest

Your `manifest.json` should include:
- Plugin name
- Version
- Required permissions
- Other Eagle-specific configurations

Example manifest:
```json
{
    "name": "Your Plugin Name",
    "version": "1.0.0",
    "devTools": false,
    "permissions": [
        "storage",
        "activeTab"
    ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Eagle application team
- GitHub Actions
- All contributors

