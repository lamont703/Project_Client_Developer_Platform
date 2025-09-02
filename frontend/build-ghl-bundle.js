const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BUILD_DIR = path.join(__dirname, 'build');
const OUTPUT_FILE = path.join(__dirname, 'ghl-bundle.html');

async function buildReactApp() {
  console.log('Building React app...');
  
  try {
    // Change to frontend directory and run build
    process.chdir(__dirname);
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ React app built successfully');
  } catch (error) {
    console.error('❌ Failed to build React app:', error.message);
    process.exit(1);
  }
}

function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`⚠️ Could not read file: ${filePath}`);
    return '';
  }
}

function createGHLBundle() {
  console.log('Creating GoHighLevel bundle...');
  
  // Read the built index.html
  const indexHtmlPath = path.join(BUILD_DIR, 'index.html');
  let htmlContent = readFileContent(indexHtmlPath);
  
  if (!htmlContent) {
    console.error('❌ Could not find built index.html');
    process.exit(1);
  }
  
  // Read GHL-specific mobile fix CSS
  const ghlMobileFixPath = path.join(__dirname, 'src', 'ghl-mobile-fix.css');
  const ghlMobileFix = readFileContent(ghlMobileFixPath);
  
  // Find all CSS files in the build directory
  const cssFiles = [];
  const jsFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.css')) {
        cssFiles.push(fullPath);
      } else if (item.endsWith('.js')) {
        jsFiles.push(fullPath);
      }
    });
  }
  
  scanDirectory(BUILD_DIR);
  
  console.log(`Found ${cssFiles.length} CSS files and ${jsFiles.length} JS files`);
  
  // Inline all CSS
  let cssContent = '';
  
  // Add GHL mobile fix first (highest priority)
  if (ghlMobileFix) {
    cssContent += `\n/* GHL Mobile Fix - High Priority */\n${ghlMobileFix}\n`;
  }
  
  cssFiles.forEach(cssFile => {
    const css = readFileContent(cssFile);
    cssContent += `\n/* ${path.basename(cssFile)} */\n${css}\n`;
  });
  
  // Inline all JavaScript
  let jsContent = '';
  jsFiles.forEach(jsFile => {
    const js = readFileContent(jsFile);
    jsContent += `\n// ${path.basename(jsFile)}\n${js}\n`;
  });
  
  // Create the final HTML bundle
  const bundleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Developer Platform - Connect developers with opportunities" />
    <title>Developer Platform</title>
    <style>
${cssContent}
    </style>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>
${jsContent}
    </script>
</body>
</html>`;
  
  // Write the bundle
  fs.writeFileSync(OUTPUT_FILE, bundleHtml);
  console.log(`✅ GoHighLevel bundle created: ${OUTPUT_FILE}`);
  
  // Also create a minified version
  const minifiedOutput = path.join(__dirname, 'ghl-bundle-minified.html');
  const minifiedHtml = bundleHtml
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
  
  fs.writeFileSync(minifiedOutput, minifiedHtml);
  console.log(`✅ Minified bundle created: ${minifiedOutput}`);
  
  // Create a simple embed code
  const embedCode = `<!-- GoHighLevel Embed Code -->
<div id="developer-platform-root"></div>
<script>
(function() {
    const script = document.createElement('script');
    script.src = '${path.basename(OUTPUT_FILE)}';
    script.async = true;
    document.head.appendChild(script);
})();
</script>`;
  
  const embedFile = path.join(__dirname, 'ghl-embed-code.html');
  fs.writeFileSync(embedFile, embedCode);
  console.log(`✅ Embed code created: ${embedFile}`);
}

async function main() {
  try {
    await buildReactApp();
    createGHLBundle();
    console.log('\n🎉 Bundle creation complete!');
    console.log('\nFiles created:');
    console.log(`- ${OUTPUT_FILE} (Full bundle)`);
    console.log(`- ${path.join(__dirname, 'ghl-bundle-minified.html')} (Minified bundle)`);
    console.log(`- ${path.join(__dirname, 'ghl-embed-code.html')} (Embed code)`);
    console.log('\nTo use in GoHighLevel:');
    console.log('1. Copy the content of ghl-bundle.html');
    console.log('2. Paste it into your GoHighLevel web builder HTML editor');
    console.log('3. Or use the embed code for external hosting');
  } catch (error) {
    console.error('❌ Bundle creation failed:', error.message);
    process.exit(1);
  }
}

main(); 