# ITDPaws

## Installation 📥

_This is not a release version. Therefore, the extension only runs in development mode (unless, of course, you write a normal implementation of importing modules directly from the repository yourself, lol)_

🛠️ To run the extension in development mode, start the HTTP server on port 8080 in the project folder using:

```./server_up.sh```

_Don't forget to set "Externals -> Update Interval -> always" in Tampermonkey settings_

📜 Add a new script to Tampermonkey and paste this code into it:

```js
// ==UserScript==
// @name         ITDPaws
// @namespace    http://tampermonkey.net/
// @version      2026-01-09
// @description  try to take over the world!
// @author       loksuf
// @match        *://*xn--d1ah4a.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xn--d1ah4a.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `http://localhost:8080/main.js?t=${Date.now()}`;
    document.head.appendChild(script);
})();
```

🗂️ Why is this necessary? Tampermonkey now has access to the project folder, and you can edit it in your IDE. When you reload the page, all changes will be applied to the script

_P.S. Yes, the extension works through Tampermonkey, but I also plan to make it a full-fledged browser extension_
## Current issues ⚠️

- The extension has critical memory leak issues due to poor architecture
- Unreachable code error in fresh_fetch() (too lazy to fix it for now)
- Removed method \#apply_overhead\_ in bundle_t (this bro needs to be returned)
