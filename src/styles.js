import * as vars from "./vars.js"

export const integrated = {
  view_json_svg : `
<svg viewBox="0 0 512 512" aria-hidden="true">
<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
  <g id="icon" fill="currentColor" transform="translate(37.333333, 128.141872)">
    <path d="M111.084954,16.7215774 L141.254831,46.8914721 L60.356556,127.806522 L141.254831,208.721577 L111.084954,238.891472 L7.10542736e-15,127.806522 L111.084954,16.7215774 Z M326.063211,16.758697 L295.893333,46.9285921 L376.791607,127.843642 L295.893333,208.758697 L326.063211,238.928592 L437.148163,127.843642 L326.063211,16.758697 Z M231.145356,3.69482223e-12 L272.358192,11.0429459 L206.100516,258.319957 L164.887681,247.277012 L231.145356,3.69482223e-12 Z" id="Combined-Shape">

    </path>
  </g>
</g>
</svg>
`,
  copy_svg : `
<svg fill="currentColor" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 12V2H4V0h12v12h-2zM0 4h12v12H0V4zm2 2v8h8V6H2z" fill-rule="evenodd"/>
</svg>
`,
  unknown_svg : `
<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="none" width="800px" height="800px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>unknown--filled</title><path d="M29.4163,14.5906,17.41,2.5842a1.9937,1.9937,0,0,0-2.8191,0L2.5837,14.5906a1.994,1.994,0,0,0,0,2.8193L14.5906,29.4163a1.9937,1.9937,0,0,0,2.8191,0L29.4163,17.41A1.994,1.994,0,0,0,29.4163,14.5906ZM16,24a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,24Zm1.125-6.7519v1.8769h-2.25V15H17a1.875,1.875,0,0,0,0-3.75H15a1.8771,1.8771,0,0,0-1.875,1.875v.5h-2.25v-.5A4.13,4.13,0,0,1,15,9h2a4.125,4.125,0,0,1,.125,8.2481Z"/><path id="inner-path" class="cls-1" d="M16,21a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,21Zm1.125-3.752A4.1249,4.1249,0,0,0,17,9H15a4.13,4.13,0,0,0-4.125,4.125v.5h2.25v-.5A1.8772,1.8772,0,0,1,15,11.25h2A1.875,1.875,0,0,1,17,15H14.875v4.125h2.25Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
`
}

export const inject = async () => {
  const style_navbar = document.createElement("style")
  style_navbar.textContent = `
.navbar-custom-btn {
border: 1px solid rgba(255, 255, 255, 0.1);
width: 45px;
height: 45px;
border-radius: 9999px;
background-color: rgba(255, 255, 255, 0.01);
color: white;
cursor: pointer;
transition: background-color 0.2s, border 0.2s, font-size 0.2s;
}

.navbar-custom-btn:hover {
background-color: rgba(255, 255, 255, 0.15);
border-color: rgba(255, 255, 255, 0.3);
}

.navbar-custom-btn:active {
background-color: rgba(255, 255, 255, 0);
}

@keyframes font-bounce {
0% { font-size: ${vars.navbar.default_icon_size}; }
1% { font-size: ${vars.navbar.min_icon_size}; }   
40% { font-size: ${vars.navbar.max_icon_size}; }   
100% { font-size: ${vars.navbar.default_icon_size}; }  
}

.animate-font {
animation: font-bounce 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}
 
`
  document.head.appendChild(style_navbar);

  const style_post_actions = document.createElement("style")
  style_post_actions.textContent = `
.post-actions-custom {
background: none;
border: none;
padding: 0;
margin: 0 8px;
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
width: 34px;
height: 34px;
border-radius: 50%; 
color: var(--color-text);
transition: background-color 0.2s, color 0.2s;
outline: none;
vertical-align: middle;
opacity: .4;
}

.post-actions-custom svg {
width: 20px;
height: 20px;
fill: currentColor;
pointer-events: none;
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.code-block-json-view-pre {
  background-color: #282c34;
  color: #abb2bf;           
  padding: 15px;            
  border-radius: 8px;       
  overflow: auto;           
  max-height: 400px;        
  font-size: 14px;          
  display: block;           
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.code-block-json-view {
}
.code-block-wrapper {
  margin: 10px 0;
  position: relative;
}
.code-copy-button {
  position: absolute;
  bottom: 11px;
  right: 11px;
  border: none;
  color: #676a6c;
}
.code-copy-button svg {
  width: 15px;
  height: 15px;
}
@keyframes svg-bounce {
0% { scale: ${parseInt(vars.navbar.default_icon_size) / parseInt(vars.navbar.default_icon_size) }, fill: currentColor; }
1% { scale: ${parseInt(vars.navbar.min_icon_size) / parseInt(vars.navbar.default_icon_size)}; }   
}

.animate-svg {
animation: svg-bounce 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
}
`
  document.head.appendChild(style_post_actions)
}
