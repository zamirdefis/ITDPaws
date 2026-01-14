import * as vars from "./src/vars.js"
import * as style from "./src/ui/styles.js"
import * as network from "./src/network.js"
import * as waiter from "./src/waiter.js"
import * as bundles from "./src/bundles.js"
import * as highlight from "./src/ui/highlight.js"
import * as ui from "./src/ui/base.js"
import * as icon_manager from "./src/ui/icon_manager.js"


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

  const btn_type_e = Object.freeze({
    toggle: 0,
    single: 1
  })



  

  new Promise((resolve, reject) => {
    ui.els.builder.create("navbar_btn", (data) => {
      const btn = ui.createElement("button")
      btn.classList.add("navbar-custom-btn")

      if (data.hasOwnProperty("activated")) {
        if (typeof data.activated !== "boolean") {
          throw new Error(`"activated" must be a boolean`)
        }
      } else {
        data.activated = false
      }
      
      if (data.hasOwnProperty("type")) {
        if (typeof data.type !== "number") {
          throw new Error(`"type" must be a number`)
        }
      } else {
        data.type = btn_type_e.single
      }

      if (data.hasOwnProperty("icon")) {
        if (typeof data.icon !== "string") {
          if (!Array.isArray(data.icon) || (data.type !== btn_type_e.toggle && data.type !== btn_type_e.radio) || data.icon.length !== 2 || typeof data.icon[0] !== "string" || typeof data.icon[1] !== "string") {
            throw new Error("Incorrect icon! Must be a string or an array with two strings (for toggle/radio)")
          } 
        }
      } else {
        data.icon = '▧'
      }

      if (data.hasOwnProperty("on_click_c")) {
        if (typeof data.on_click_c !== "function") {
          throw new Error(`on_click_c" must be a function`)
        }
      } else {
        data.on_click_c = (status) => { console.warn("Unspecified callback on click") }
      }
      
      btn.textContent = Array.isArray(data.icon) ? data.icon[0] : data.icon
      btn.style.fontSize = vars.navbar.default_icon_size

      const bounce_anim = (btn_ref) => {
        if (btn_ref.classList.contains("animate-font")) {
          btn_ref.classList.remove("animate-font")
        }
        void btn_ref.offsetWidth;
        btn_ref.classList.add("animate-font")
      }     

      let is_pressed = false
      
      const onclick_extended_c = () => {
        if (data.type === btn_type_e.toggle) {
          if (!is_pressed) {
            btn.classList.add("navbar-custom-btn-is-pressed")
            // btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
            // btn.style.border = "2px solid rgba(255, 255, 255, 0.4)"
            btn.textContent = Array.isArray(data.icon) ? data.icon[1] : data.icon
            bounce_anim(btn)
          } else {
            btn.classList.remove("navbar-custom-btn-is-pressed")
            // btn.style.backgroundColor = "rgba(255, 255, 255, 0.01)"
            // btn.style.border = "1px solid rgba(255, 255, 255, 0.1)"
            btn.textContent = Array.isArray(data.icon) ? data.icon[0] : data.icon
            bounce_anim(btn)
          }
          is_pressed = !is_pressed
        } else {
          bounce_anim(btn)
        }
        data.on_click_c(is_pressed)
      }

      if (data.activated) {
        onclick_extended_c()
      }

      btn.onclick = onclick_extended_c
      
      return btn
    })
    resolve(true)
  })
    .then(() => {
      ui.els.location.create("navbar", ".sidebar-nav", ui.els.location.types.static)
        .then( (result) => {
          ui.els.bundle.create("test_btn", "navbar", { 
            builder_name: "navbar_btn",
            on_click_c : (is_pressed) => { console.log(123)} 
          })
          ui.els.bundle.create("test_btn2", "navbar", {
            builder_name: "navbar_btn",
            on_click_c : (is_pressed) => { console.log("btn2 : ", is_pressed) },
            type : btn_type_e.toggle,
            icon : ["🫣", "😑"]
          })
          ui.els.bundle.create("test_btn3", "navbar", {
            builder_name: "navbar_btn",
            on_click_c : (is_pressed) => { console.log("btn3 : ", is_pressed) },
            type : btn_type_e.toggle,
            icon : [ "🦊", "🐺" ],
            activated : true
          })
          ui.els.bundle.create("test_btn4", "navbar", {
            builder_name: "navbar_btn",
            on_click_c : (is_pressed) => { console.log("btn4 : ", is_pressed) },
            type : btn_type_e.single,
            icon : "🙄",
            activated : true
          })
        })
        .catch( (result) => {
          console.log(result) 
        })



      new Promise((resolve, reject) => {
        ui.els.builder.create("post_action_btn", (data) => {
          const btn = ui.createElement("button")
          btn.classList.add("post-action-btn")

          if (data.hasOwnProperty("type")) {
            if (typeof data.type !== "number") {
              throw new Error(`"type" must be a number`)
            }
          } else {
            data.type = btn_type_e.single
          }

          if (data.hasOwnProperty("icon")) {
            if (typeof data.icon !== "string") {
              if (!Array.isArray(data.icon) || (data.type !== btn_type_e.toggle && data.type !== btn_type_e.radio) || data.icon.length !== 2 || typeof data.icon[0] !== "string" || typeof data.icon[1] !== "string") {
                throw new Error("Incorrect icon! Must be a string or an array with two strings (for toggle)")
              } 
            }
          } else {
            data.icon = "unknown"
          }

          if (data.hasOwnProperty("on_click_c")) {
            if (typeof data.on_click_c !== "function") {
              throw new Error(`on_click_c" must be a function`)
            }
          } else {
            data.on_click_c = (status) => { console.warn("Unspecified callback on click") }
          }

          const bounce_anim = (btn_ref) => {
            if (btn_ref.classList.contains("animate-svg")) {
              btn_ref.classList.remove("animate-svg")
            }
            void btn_ref.offsetWidth;
            btn_ref.classList.add("animate-svg")
          }

          btn.innerHTML = icon_manager.get(data.icon)

          let is_pressed = false

          const onclick_extended_c = () => {
            if (data.type === btn_type_e.toggle) {
              if (!is_pressed) {
                // btn.classList.add("navbar-custom-btn-is-pressed")
                // btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                // btn.style.border = "2px solid rgba(255, 255, 255, 0.4)"
                btn.textContent = Array.isArray(data.icon) ? data.icon[1] : data.icon
                bounce_anim(btn)
              } else {
                // btn.classList.remove("navbar-custom-btn-is-pressed")
                // btn.style.backgroundColor = "rgba(255, 255, 255, 0.01)"
                // btn.style.border = "1px solid rgba(255, 255, 255, 0.1)"
                btn.textContent = Array.isArray(data.icon) ? data.icon[0] : data.icon
                bounce_anim(btn)
              }
              is_pressed = !is_pressed
            } else {
              bounce_anim(btn)
            }
            data.on_click_c(is_pressed, btn)
          }

          if (data.activated) {
            onclick_extended_c()
          }

          btn.onclick = onclick_extended_c

          return btn
        }) 
        resolve(true)
      })
        .then( (result) => {
          ui.els.location.create("post_actions_loc", ".post-actions-right", ui.els.location.types.dynamic)
          ui.els.bundle.create("test_btn", "post_actions_loc", { 
            builder_name: "post_action_btn",
            on_click_c : (is_pressed, btn) => { 

              const create_code_block = (json) => {
                const data = JSON.stringify(json.data, null, 2)

                const pre = ui.createElement('pre')
                const code = ui.createElement('code')

                const wrapper = ui.createElement("div")
                wrapper.className = "code-block-wrapper"

                const copy_btn = ui.createElement("button")
                copy_btn.className = "code-copy-button"
                copy_btn.innerHTML = icon_manager.get("copy") 


                pre.addEventListener("click", (event) => {
                  event.stopPropagation()
                }, true)

                copy_btn.onclick = () => {
                  navigator.clipboard.writeText(data)
                }

                const highlighted = window.hljs.highlight(data, { language: 'json' }).value

                code.className = "code-block-json-view language-js"
                pre.className = "code-block-json-view-pre"

                code.innerHTML = highlighted
                pre.appendChild(code);
                wrapper.appendChild(copy_btn);
                wrapper.appendChild(pre);
                return wrapper  
              }
              let code_block = false
              let code_block_toggle = false
              if (!code_block) {
                code_block = true
                network.fresh_fetch(`https://xn--d1ah4a.com/api/posts/${btn.closest(".post-container").dataset.postId}`, { 
                  method: "GET",
                  headers: {"Content-type": "application/json"}
                })
                  .then( (response) => {
                    response.json()
                      .then( (json) => {
                        code_block = create_code_block(json)

                        btn.closest(".post-container").appendChild(code_block)
                      })
                      .catch( (error) => { 
                        console.log(error)
                      })
                  })
                  .catch( (error) => {
                    console.log(error)
                  })} else {
                if (code_block_toggle) {
                  code_block.style.display = "none" 

                } if (code_block_toggle) {
                  code_block.style.display = "none"
                } else {
                  code_block.style.display = "block"
                }
                code_block_toggle = !code_block_toggle
              }
              },
            icon: "json"
          })
          ui.els.bundle.create("copy_post_id", "post_actions_loc", {
            builder_name: "post_action_btn",
            icon: "id",
            on_click_c : (is_pressed, btn) => {
              navigator.clipboard.writeText(btn.closest(".post-container").dataset.postId)
            }
          })
    })
    .catch( (result) => { 
      console.log(result) 
    })
      ui.els.location.create("create_post", ".create-post, .wall-post-form", ui.els.location.types.dynamic)
      ui.els.location.create("post_menu_btn", ".post-menu-btn", ui.els.location.types.dynamic)
      ui.els.location.create("clans", ".clan-item", ui.els.location.types.dynamic)

      ui.els.location.create("clans", ".clan-item", ui.els.location.types.dynamic)

      
      // ui.els.bundle.create("test_btn", "actions", { builder_name: "nvbar_btn", color: "#00ff00", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "create_post", { builder_name: "button", color: "#ff00ff", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "post_menu_btn", { builder_name: "button", color: "#0000ff", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "clans", { builder_name: "button", color: "#ffffff", on_click_c : () => { console.log(321)} })
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
