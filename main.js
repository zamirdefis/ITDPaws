// import * as vars from "./src/vars.js"
import * as network from "./src/network.js"
import * as waiter from "./src/waiter.js"
import * as ui from "./src/ui/ui.js"

(function() {
  'use strict';
  ui.style.inject()
  waiter.init_strong_global_listener()
  // bundles.post_handler.init()

  ui.highlight.load()
  ui.els.init_interrupt_manager()

  console.log("ITDPaws!")

  ui.builders_loader.load()
    .then((res) => {
      ui.els.location.create("post_actions_loc", ".post-actions-right", ui.els.location.types.dynamic).then( (res) => {
        ui.els.bundle.create("test_btn", "post_actions_loc", { 
          builder_name: "post_actions",
          on_click_c : (is_pressed, btn) => { 

            const create_code_block = (json) => {
              const data = JSON.stringify(json.data, null, 2)

              const pre = ui.createElement('pre')
              const code = ui.createElement('code')

              const wrapper = ui.createElement("div")
              wrapper.className = "code-block-wrapper"

              const copy_btn = ui.createElement("button")
              copy_btn.className = "code-copy-button"
              copy_btn.innerHTML = ui.icon_manager.get("copy") 


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
          builder_name: "post_actions",
          icon: "id",
          on_click_c : (is_pressed, btn) => {
            navigator.clipboard.writeText(btn.closest(".post-container").dataset.postId)
          }
        })
        ui.els.bundle.create("disable_test", "post_actions_loc", {
          builder_name: "post_actions",
          on_click_c : (is_pressed, btn) => {
            console.log("HJSDHFHDS")
          },
          disabled : true
        })
      })


      

      ui.els.location.create("navbar", ".sidebar-nav", ui.els.location.types.dynamic)
        .then( (result) => {
          // const leak_test = async () => {
          //   while (true) {
          //     waiter.sleep(100)
          //     if (teeest) {
          //       ui.els.bundle.enable("disable_test", "post_actions_loc") 
          //     } else {
          //       ui.els.bundle.disable("disable_test", "post_actions_loc") 
          //     }
          //     teeest = !teeest
          //   }
          //
          // }
          // leak_test()
          ui.els.bundle.create("test_btn", "navbar", { 
            builder_name: "navbar",
            on_click_c : (is_pressed) => { console.log(123)
              if (is_pressed) {
                ui.els.bundle.enable("disable_test", "post_actions_loc") 
              } else {
                ui.els.bundle.disable("disable_test", "post_actions_loc") 
              }
            },
            type: ui.els.btn_type_e.toggle
          })
          ui.els.bundle.create("test_btn2", "navbar", {
            builder_name: "navbar",
            on_click_c : (is_pressed) => { console.log("btn2 : ", is_pressed)
            },
            type : ui.els.btn_type_e.toggle,
            icon : ["🫣", "😑"]
          })
          ui.els.bundle.create("test_btn3", "navbar", {
            builder_name: "navbar",
            on_click_c : (is_pressed) => { console.log("btn3 : ", is_pressed)

            },
            type : ui.els.btn_type_e.toggle,
            icon : [ "🦊", "🐺" ],
            activated : true
          })
          ui.els.bundle.create("test_btn4", "navbar", {
            builder_name: "navbar",
            on_click_c : (is_pressed) => { console.log("btn4 : ", is_pressed)



            },
            type : ui.els.btn_type_e.single,
            icon : "🙄",
            activated : true
          })
        })

      
    })
    .catch((res) => {
      console.log(res)
    })

  
  
  
      // ui.els.location.create("create_post", ".create-post, .wall-post-form", ui.els.location.types.dynamic)
      // ui.els.location.create("post_menu_btn", ".post-menu-btn", ui.els.location.types.dynamic)
      // ui.els.location.create("clans", ".clan-item", ui.els.location.types.dynamic)
      //
      // ui.els.location.create("clans", ".clan-item", ui.els.location.types.dynamic)

      
      // ui.els.bundle.create("test_btn", "actions", { builder_name: "nvbar_btn", color: "#00ff00", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "create_post", { builder_name: "button", color: "#ff00ff", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "post_menu_btn", { builder_name: "button", color: "#0000ff", on_click_c : () => { console.log(321)} })
      // ui.els.bundle.create("test_btn", "clans", { builder_name: "button", color: "#ffffff", on_click_c : () => { console.log(321)} })
  

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
