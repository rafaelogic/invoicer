# Boiler plate information

## Manifest Configuration (`manifest.json`)
- **Manifest Version:** 3

### Permissions

Lists the permissions required by the extension to function properly. In this case, it requires access to storage and tabs.

```json
"permissions": ["storage", "tabs"],
```

### Action

Specifies the default icons used by the extension for different sizes.

```json
"action": {
    "default_icon": {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
    }
},
```

### Background

Specifies the service worker script (background.js) that will run in the background, handling events and operations.

```json
"background": {
    "service_worker": "background.js"
},
```

### Web Accessible Resources

Lists resources that are accessible to web pages, including HTML files and font files, and specifies that they are accessible to all URLs.

```json
"web_accessible_resources": [
    {
        "resources": ["index.html", "fonts/*.woff"],
        "matches": ["<all_urls>"]
    }
],
```

### Icons

Specifies the icons used by the extension for different sizes.

```json
"icons": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
```

## Background Script (`background.js`)

The `background.js` script serves as the background service worker for the extension. It defines an event listener for the `chrome.action.onClicked` event, which is triggered when the user clicks on the extension's action in the browser toolbar.

```javascript
chrome.action.onClicked.addListener(function() {
    // This allows to open the the extension in full page mode
    chrome.tabs.create({ url: 'index.html' });
});
```

# Usage
Assuming you already know how to load it in the browser.

1. Change the information the `manifest.json`
2. Change the title in the `index.html`
3. Run the following:
```bash
npm install
npm run format
npm run build
```