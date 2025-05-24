# Eagle Template

A template repository for creating Eagle plugins with automated build and release workflows.

## Features

- 🚀 Automated build and release process
- 📦 Flexible package configuration with pattern matching
- 🔧 Development and production builds
- 🎯 GitHub Actions integration
- 📝 Manifest management
- 🔍 Smart file inclusion patterns
- 🔄 Automatic template updates

## Getting Started

### Prerequisites

- Node.js 14 or higher
- Git
- Eagle application
- GitHub Personal Access Token (for template updates)

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

4. Set up template updates:
   - Create a GitHub Personal Access Token (PAT) with `repo` and `workflow` permissions
   - Go to your repository settings > Secrets and variables > Actions
   - Add a new secret named `GH_TOKEN` with your PAT value
   - Edit `.github/configs/templateTarget.json` to point to your template source:
     ```json
     {
         "source": "https://github.com/eagle-cooler/template.git",
         "branch": "main"
     }
     ```

## Project Structure

```
eagle-template/
├── .github/
│   ├── configs/
│   │   ├── pkgRules.json        # Package inclusion rules
│   │   └── templateTarget.json  # Template update configuration
│   ├── scripts/
│   │   ├── process-manifest.js  # Manifest processing
│   │   └── create-zip.js        # Package creation
│   └── workflows/
│       ├── eagle-plugin-pkg.yml # Build workflow
│       └── update-gitops.yml    # Template update workflow
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
   node .github/scripts/process-manifest.cjs true
   node .github/scripts/create-zip.cjs debug

   # Create production version
   node .github/scripts/process-manifest.cjs false
   node .github/scripts/create-zip.cjs release
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

### Template Updates

The repository includes an automated template update system that:
1. Keeps your plugin up to date with the latest template changes
2. Preserves your customizations while updating common files
3. Protects critical files from being overwritten

To update from the template:
1. Ensure your `GH_TOKEN` secret is properly configured
2. Go to Actions > Update Template Files
3. Click "Run workflow"

The update process will:
- Copy new workflow files (except protected ones)
- Update script files
- Preserve your customizations
- Create a commit with the changes

Protected files (never updated):
- `.github/workflows/update-gitops.yml`

#### Automatic Updates

The template includes an automatic update system that runs daily to keep your repository in sync with the template:

1. **Setup Required**: To enable automatic updates, you need to manually copy the `subscribable-gitops.yml` file:
   ```bash
   # Copy the workflow file to your repository's workflows directory
   cp subscribable-gitops.yml .github/workflows/update-template.yml
   ```

2. **Daily Updates**: The system automatically checks for updates at midnight every day
3. **Cron Control**: You can control automatic updates by setting `allowCron` in `.github/configs/templateTarget.json`:
   ```json
   {
       "source": "https://github.com/eagle-cooler/template.git",
       "branch": "main",
       "allowCron": true  // Set to false to disable automatic updates
   }
   ```
4. **Manual Triggers**: You can still manually trigger updates from the Actions tab
5. **Safe Updates**: The system preserves your customizations and protected files
6. **Change Detection**: Updates only occur when there are actual changes to apply

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

