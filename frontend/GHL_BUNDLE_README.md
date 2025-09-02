# GoHighLevel React App Bundle Generator

This directory contains multiple approaches to bundle your React app into a single HTML file for GoHighLevel web builder.

## Quick Start (Recommended)

### Option 1: Simple Build Script

```bash
cd frontend
npm run build:ghl
```

This will create:

- `ghl-bundle.html` - Complete HTML file with all assets inlined
- `ghl-bundle-minified.html` - Minified version for production
- `ghl-embed-code.html` - Embed code for external hosting

### Option 2: Webpack Bundle (Most Optimized)

```bash
cd frontend
npm install --save-dev webpack webpack-cli html-webpack-plugin mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin ts-loader css-loader
npx webpack --config webpack.config.js
```

### Option 3: Vite Bundle (Modern & Fast)

```bash
cd frontend
npm install --save-dev vite @vitejs/plugin-react
npx vite build --config vite.config.js
```

## How to Use in GoHighLevel

### Method 1: Direct HTML Paste

1. Open your GoHighLevel web builder
2. Add an HTML element/widget
3. Copy the content from `ghl-bundle.html`
4. Paste it into the HTML editor
5. Save and publish

### Method 2: External Hosting + Embed

1. Upload `ghl-bundle.html` to your web server or CDN
2. Copy the embed code from `ghl-embed-code.html`
3. Paste the embed code into GoHighLevel HTML editor

### Method 3: Custom Container

```html
<!-- Custom container for GoHighLevel -->
<div id="developer-platform-container" style="width: 100%; height: 100vh;">
  <!-- Your React app will render here -->
</div>
<script>
  // Load your bundled app
  (function () {
    const script = document.createElement("script");
    script.src = "https://your-domain.com/ghl-bundle.html";
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
```

## File Structure After Build

```
frontend/
├── build-ghl-bundle.js          # Custom build script
├── webpack.config.js            # Webpack configuration
├── vite.config.js              # Vite configuration
├── ghl-bundle.html             # Generated single HTML file
├── ghl-bundle-minified.html    # Minified version
├── ghl-embed-code.html         # Embed code
└── dist-ghl/                   # Webpack/Vite output
    └── ghl-bundle.html
```

## Customization Options

### Modify the Build Script

Edit `build-ghl-bundle.js` to:

- Change the output filename
- Modify the HTML template
- Add custom meta tags
- Include external scripts/styles

### Custom Webpack Config

Edit `webpack.config.js` to:

- Add more loaders
- Configure optimization
- Include external dependencies
- Modify the HTML template

### Vite Configuration

Edit `vite.config.js` to:

- Configure build options
- Add plugins
- Optimize for your specific needs

## Troubleshooting

### Common Issues:

1. **Build fails**: Make sure all dependencies are installed

   ```bash
   npm install
   ```

2. **App doesn't load**: Check browser console for errors

   - Ensure JavaScript is enabled
   - Check for CORS issues if hosting externally

3. **Styling issues**: CSS might need adjustment for GoHighLevel's environment

   - Add `!important` to critical styles
   - Use inline styles for critical elements

4. **Routing issues**: React Router might not work in embedded context
   - Consider using hash routing
   - Or implement custom navigation

## Performance Tips

1. **Use the minified version** for production
2. **Host externally** if the bundle is large (>1MB)
3. **Optimize images** before building
4. **Remove unused dependencies** to reduce bundle size
5. **Consider code splitting** for large applications

## Security Considerations

1. **Sanitize user inputs** in your React app
2. **Use HTTPS** for external hosting
3. **Validate all data** before rendering
4. **Consider CSP headers** if hosting externally

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure your React app works in development mode
4. Test the bundle locally before deploying to GoHighLevel
