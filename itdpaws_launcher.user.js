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
