import * as vars from "../vars.js"

export const inject = async () => {
  const style_navbar = document.createElement("style")
  style_navbar.textContent = `

:root {
--main-color: color-mix(in srgb, var(--color-text), transparent 85%);
--tbg-color: color-mix(in srgb, var(--color-background), transparent 4%);
--bg-color: var(--color-background);
--el-bg-color: #1f1e21;
--menu-btn-active-color: #e7e7e7;
--menu-btn-bg-color: #100f11;
--menu-btn-hover-color: #7d7d7d; 
--menu-btn-hover-bg-color: rgba(255, 255, 255, 0.1);
--menu-btn-shadow-color: color-mix(in srgb, var(--menu-btn-active-color), transparent 4%);
--menu-btn-title-font-size: 20px;
--menu-btn-title-text-color: color-mix(in srgb, var(--color-text), transparent 60%);
}

.itd-paws.btn-title {
position: relative;
margin-left: auto;
font-size: var(--menu-btn-title-font-size);
color: var(--menu-btn-title-text-color);
}

.itd-paws.el-title-wrapper {
position: relative;
width: 100%;
display: flex;
flex-direction: rows;
align-items: center;
}

.itd-paws.menu-btn {
  position: relative;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  background-color: var(--menu-btn-bg-color);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.itd-paws.menu-btn:hover {
  background-color: var(--menu-btn-hover-color);
  transform: scale(1.05);
  box-shadow: 0 0px 10px var(--menu-btn-shadow-color);
}

.itd-paws.menu-btn:active {
  // transform: scale(0.95);
  background-color: var(--menu-btn-active-bg-color);
  box-shadow: 0px 0px 7px var(--menu-btn-shadow-color);
}

.itd-paws.menu-btn.active {
  background-color: var(--menu-btn-active-color);
  box-shadow: 0px 0px 10px 2px var(--menu-btn-shadow-color);
}

.menu-header {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05); /* Тонкая линия */
  position: relative;
}

.menu-title {
    color: var(--color-text);
}

.close-btn {
  position: absolute;
  right: 8px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;
    line-height: 1;
    width: 100%px;
  height: 100%;
}

.close-btn svg {
  width: 60%;
  height: 60%;
}

.close-btn:hover {
    color: #ff4d4d;
}


.menu-body {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-inline: 10px;
}

.menu-body > * {
  flex-shrink: 0;
  background-color: var(--el-bg-color);
  width: 100%;
  margin-top: 10px;
  position: relative;
  border-radius: 10px;
  padding: 10px;
}



.itd-paws-menu {
    position: relative;
    top: 0;
    left: 0;
    width: 42%;
    height: 95%;
    border: 2px solid color-mix(in srgb, var(--color-text), transparent 85%);
    background-color: color-mix(in srgb, var(--color-background), transparent 4%); 
    backdrop-filter: blur(10px); 
    display: flex;
    flex-direction: column;
    //justify-content: center;
    //align-items: center;
    z-index: 9999;
    
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.itd-paws-menu-wrapper {
  visibility: hidden;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

.itd-paws-menu.active {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
}


.post-views {
  flex-grow: 1
}
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
background-color: rgba(255, 255, 255, 0.21);
border-color: rgba(255, 255, 255, 0.40);
}

.navbar-custom-btn-is-pressed {
background-color: rgba(255, 255, 255, 0.2);
border: 2px solid rgba(255, 255, 255, 0.4);
}

.post-action-btn:hover {
background-color: rgba(255, 255, 255, 0.04);
border-color: rgba(255, 255, 255, 0.3);
color: rgba(255, 255, 255, 0.5)
}

.post-action-btn:active {
background-color: rgba(255, 255, 255, 0.1);
border-color: rgba(255, 255, 255, 0.40);
color: rgba(255, 255, 255, 0.6)
}

.post-action-btn-pressed {
background-color: rgba(255, 255, 255, 0.2);
border: 2px solid rgba(255, 255, 255, 0.4);
}

@keyframes font-bounce {
0% { font-size: ${vars.navbar.default_icon_size}; }
1% { font-size: ${vars.navbar.min_icon_size}; }   
40% { font-size: ${vars.navbar.max_icon_size}; }   
100% { font-size: ${vars.navbar.default_icon_size}; }  
}

.animate-font {
animation: font-bounce 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.post-action-btn {
background: none;
border: none;
padding: 0;
cursor: pointer;
display: inline-flex;
align-items: center;
justify-content: center;
width: 34px;
height: 34px;
border-radius: 50%; 
color: #656769;
transition: background-color 0.2s, color 0.2s;
outline: none;
vertical-align: middle;
// opacity: .4;
}

.post-action-btn svg {
width: 20px;
height: 20px;
fill: currentColor;
pointer-events: none;
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes svg-bounce {
0% { scale: ${parseInt(vars.navbar.default_icon_size) / parseInt(vars.navbar.default_icon_size) }, fill: currentColor; }
1% { scale: ${parseInt(vars.navbar.min_icon_size) / parseInt(vars.navbar.default_icon_size)}; }   
}

.animate-svg {
animation: svg-bounce 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
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


`
  document.head.appendChild(style_post_actions)
}
