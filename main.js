import * as vars from "./src/vars.js"
import * as style from "./src/styles.js"
import * as network from "./src/network.js"
import * as waiter from "./src/waiter.js"
import * as bundles from "./src/bundles.js"
import * as highlight from "./src/highlight.js"
import * as ui from "./src/ui.js"

(function() {
  'use strict';
  
 
//
//   const wait_for_side_bar = () => { setTimeout(() => {
//
//     const side_bar = document.querySelector(".sidebar-nav")
//     if (!side_bar) {
//       wait_for_side_bar()
//       return
//     }
//     const button = document.createElement("button")
//     button.textContent = "🔐"
//     button.style.cssText = `
// border: 1px solid rgba(255, 255, 255, 0.1);
// width: 45px;
// height: 45px;
// border-radius: 9999px;
// background-color: rgba(255, 255, 255, 0.01);
// color: white;
// cursor: pointer;
// transition: background-color 0.3s;
// `;
//     button.onclick = () => {
//       // get_token()
//       //   .then( (result) => {
//       //     navigator.clipboard.writeText(result)
//       //   } )
//       //   .catch( (result) => {
//       //     console.log(result)
//       //   } )}
//       fresh_fetch("https://xn--d1ah4a.com/api/posts/user/fetry", {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json"
//         }
//       })
//         .then( (res) => { console.log(res) } )
//         .catch( (res) => { console.log(res) } )
//     }
//     side_bar.appendChild(button)
//   }, 20)
//   }
//   wait_for_side_bar()
//
//   const add_button = (post) => {
//     const button = document.createElement("button")
//     if (post.querySelector(".view-json-button")) {
//       return;
//     }
//     button.className = "view-json-button"
//     button.textContent = "Нажми меня"
//     button.style.cssText = `
// margin: 10px;
// padding: 8px 16px;
// background-color: #4CAF50;
// color: white;
// border: none;
// border-radius: 4px;
// cursor: pointer;
// transition: background-color 0.3s;
// `;
//     post.appendChild(button)
//   }
//
//   async function fresh_fetch(url, data, layer_ = 1) {
//     if (layer_ > FETCH_LAST_LAYER) {
//       throw new Error("Error retrieving authorization key (Reached last try)")
//     }
//     if (data.headers) {
//       data.headers.Authorization = `Bearer ${vars.token}`
//     }
//     const response = await fetch(url, data)
//     if (!response.ok) {
//       if (response.status === 401) {
//         const tmp = await get_token();
//         if (tmp) {
//           vars.token = tmp
//           return await fresh_fetch(url, data, ++layer_)
//         }
//       } else {
//         throw new Error("Invalid request")
//       }
//     }
//     return response
//   }
//   const content_child_added = (mutation_list, observer) => {
//     for (const mutation of mutation_list) {
//       if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
//         mutation.addedNodes.forEach( (node) => {
//           if (node.nodeType === 1 && node.classList.contains("post-container")) {
//             console.log("Added element : ", node)
//             add_button(node)
//           }
//         } )
//       }
//     }
//   }
//   const add_buttons_to_existing = (post_list) => {
//     post_list.querySelectorAll(".post-cohhntainer").forEach( (el) => {
//       add_button(el)
//     } )
//
//   }
//   const wait_for_post_list = () => {
//     const post_list = document.querySelector(".post-list")
//     if (!post_list) {
//       setTimeout(wait_for_post_list, 100)
//       return
//     }
//     add_buttons_to_existing(post_list)
//     const observer = new MutationObserver(content_child_added)
//     observer.observe(post_list, {childList: true, subtree: true})
//   }
  // wait_for_post_list()
  // Your code here...
  style.inject()
  waiter.init_strong_global_listener()
  // bundles.post_handler.init()

  highlight.load()

  console.log("ITDPaws!")
  new Promise((resolve, reject) => {
    ui.els.builder.create("button", (data) => {
      const btn = document.createElement("button")
      btn.style.width = "20px"
      btn.style.height = "20px"
      btn.style.backgroundColor = data.color ?? "#ffffff"
      if (data.on_click_c) {
        btn.onclick = data.on_click_c
      }
      return btn
    })
    resolve()
  })
    .then(() => {
      ui.els.location.create("navbar", ".sidebar-nav", ui.els.location.types.static)
      ui.els.location.create("actions", ".post-actions-right", ui.els.location.types.dynamic)
      ui.els.location.create("create_post", ".create-post, .wall-post-form", ui.els.location.types.dynamic)
      ui.els.location.create("post_menu_btn", ".post-menu-btn", ui.els.location.types.dynamic)
      ui.els.location.create("clans", ".clan-item", ui.els.location.types.dynamic)

      ui.els.bundle.create("test_btn", "navbar", { builder_name: "button", color: "#ff0000", on_click_c : () => { console.log(123)} })
      ui.els.bundle.create("test_btn", "actions", { builder_name: "button", color: "#00ff00", on_click_c : () => { console.log(321)} })
      ui.els.bundle.create("test_btn", "create_post", { builder_name: "button", color: "#ff00ff", on_click_c : () => { console.log(321)} })
      ui.els.bundle.create("test_btn", "post_menu_btn", { builder_name: "button", color: "#0000ff", on_click_c : () => { console.log(321)} })
      ui.els.bundle.create("test_btn", "clans", { builder_name: "button", color: "#ffffff", on_click_c : () => { console.log(321)} })
    })
  


  // ui.navbar_entity_t.init()
  //
  // ui.navbar_entity_t.new_button("get_new_token", () => {
  //   network.get_new_token().then(local_token => {
  //     navigator.clipboard.writeText(local_token)
  //   })
  // }, new ui.nav_bar_btn_data_t("🔐") )
  //
  // ui.navbar_entity_t.new_button("settings", (is_pressed) => {
  //   console.log(is_pressed)
  //   // Nothing yet, but the extension menu should open here :P
  // }, new ui.nav_bar_btn_data_t(["⚙", "✖"], ui.BTN_TYPE_E.TOGGLE))

  // ui.navbar_entity_t.new_button("test", (is_pressed) => {
  //   console.log("test")
  // }, new ui.nav_bar_btn_data_t(["💅", "😐"], ui.BTN_TYPE_E.TOGGLE, true))
  //
  // ui.navbar_entity_t.new_button("test2", (is_pressed) => {
  //   console.log("test2")
  // }, new ui.nav_bar_btn_data_t("😇", ui.BTN_TYPE_E.TOGGLE, false))
  
})();
