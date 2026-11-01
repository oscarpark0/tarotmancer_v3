# Phoria 2 — vendored runtime

Version: **phoria2 1.2.0**, MIT, Kevin Roast.

- Official source: https://github.com/kevinroast/phoria2
- Tutorial: https://kevs3d.co.uk/phoria2/tutorial.html
- Package: https://registry.npmjs.org/phoria2/-/phoria2-1.2.0.tgz
- Published integrity: `sha512-2TJN+rGa83vOOPC/cFjT6MXGvTIqwtVPUHTNfx7SZ6WSBB5mlpT7EWbmrOEsFvYpZh8/LLiBKFyVeadwYo+fcg==`

The `.js` files are unmodified files from the package's `dist/` directory. `LICENSE` is the upstream license. `package.json` marks this directory as ES modules for the Node test runner; the application's Vercel functions keep their existing module configuration.

The runtime is served locally so no CDN or build step is required. To update, download a chosen release from npm, verify its published integrity, replace the runtime modules and license together, update this version record, then run the tests and check all three spreads, landing, picking, and the zoom view in a WebGL 2 browser.
