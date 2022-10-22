# pbkit DevTools

pbkit DevTools is Chrome extension compatible with [pbkit](https://github.com/pbkit/pbkit) web client.

## Install via Chrome Web Store

https://chrome.google.com/webstore/detail/pbkit-devtools/fjacmiijeihblfhobghceofniolonhca

## Installation (Manual)

⚠️ Require Node v17+

0. Clone and build this project. (Installing from Chrome Web Store is under review.)
   ```bash
   yarn && yarn build
   ```
1. Open your Chrome browser
2. Open the Extension Management page by navigating to `chrome://extensions`.
   - Alternatively, open this page by clicking on the Extensions menu button and selecting **Manage Extensions** at the bottom of the menu.
   - Alternatively, open this page by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**
3. Enable Developer Mode by clicking the toggle switch next to **Developer Mode**.
4. Click the **Load unpacked** button and select `./dist` directory under your `pbkit-devtools` directory.

Now you can see the `pbkit-devtools` panel in your Chrome DevTools. If you can't, Refresh(Re-open) your Chrome DevTools.

## Contribution

Thank you for your contribution! You can find the opened issues in issues tab or our [Discord](https://discord.gg/fZ5WRmvsf6).  
If you find a bug or have suggestion, please create an issue or a pull request. Thank you :)
