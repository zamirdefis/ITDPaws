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
// @description  This is a free, open-source extension designed for "итд.com". It adds a variety of additional features that are not available to regular users
// @author       loksuf
// @homepageURL  https://github.com/zamirdefis/ITDPaws
// @social       Telegram: @loksifity; ИТД: @loksuf; Github: @zamirdefis
// @match        *://*xn--d1ah4a.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xn--d1ah4a.com
// @grant        none
// @license      MIT
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `http://localhost:8080/main.js?t=${Date.now()}`;
    document.head.appendChild(script);
})();
```

_Duplicated from [itdpaws_launcher.user.js](https://github.com/zamirdefis/ITDPaws/raw/main/itdpaws_launcher.user.js)_

🗂️ Why is this necessary? Tampermonkey now has access to the project folder, and you can edit it in your IDE. When you reload the page, all changes will be applied to the script

## Issues ⚠

All known errors/bugs are marked with "!!!" in the code. Read them before creating an issue

_P.S. Yes, the extension works through Tampermonkey, but I also plan to make it a full-fledged browser extension_
