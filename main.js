import * as network from "./src/network.js"
import * as waiter from "./src/waiter.js"
import * as ui from "./src/ui/ui.js"
import * as elc from "./src/ui/el_creator.js"
import * as cfg from "./src/ui/custom/config.js"

(function() {
  'use strict';
  ui.style.inject()
  ui.highlight.load()

  ui.els.init_interrupt_manager()
  waiter.init_strong_global_listener()


  const menu = new ui.editor.panel_t("ITDPaws", () => {
    document.querySelector(".itd-paws[data-bundle_name=\"menu_btn\"][data-location_name=\"navbar_loc\"]").click()
    if (cfg.get_initial() === "default") {
      cfg.set_initial("first")
    }
    cfg.save_changes()
    cfg.save("first")
  })
  
  cfg.init()
  
  console.log("ITDPaws!")

  ui.builders_loader.load()
    .then((res) => {
      ui.els.location.create("post_actions_loc", ".post-actions-right").then( (res) => {
        ui.els.bundle.create("test_btn", "post_actions_loc", { 
          builder_name: "post_actions",
          on_click_c : (is_pressed, btn) => { 

            const create_code_block = (json) => {
              const data = JSON.stringify(json.data, null, 2)

              const pre = elc.createElement('pre')
              const code = elc.createElement('code')

              const wrapper = elc.createElement("div")
              wrapper.className = "code-block-wrapper"

              const copy_btn = elc.createElement("button")
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

        // menu.create_el("post_json_viewer", ui.editor.el_class_name_e.button, {
        //   on_click_c : (state) => {console.log(state)},
        //   title: "Post JSON Viewer"
        // })
        // menu.create_el("post_id_copy_button", ui.editor.el_class_name_e.button, {
        //   on_click_c : (state) => {console.log(state)},
        //   title: "Post Id Copy Button"
        // })
        //
        // menu.create_el("char_counter", ui.editor.el_class_name_e.button, {
        //   on_click_c : (state) => {console.log(state)},
        //   title: "Char Counter"
        // })
      })

      ui.els.location.create("textarea_loc", ".create-post__textarea, .comment-input-field, .wall-post-form__textarea")
        .then( (res) => {
          ui.els.bundle.create("char_counter", "textarea_loc", {
            builder_name: "char_counter"
          })
        })
        .catch( (res) => {
          console.log(res)
        } )

      ui.els.location.create("navbar_loc", ".sidebar-nav")
        .then( (result) => {
          ui.els.bundle.create("bearer_token_extractor", "navbar_loc", {
            builder_name: "navbar",
            on_click_c : (is_pressed) => {
              network.get_new_token().then(local_token => {
                navigator.clipboard.writeText(local_token)
              })
            },
            type : ui.els.btn_type_e.single,
            disabled : !cfg.get_field("bearer_token_extractor"),
            icon : '🔐',
          })
          
          ui.els.bundle.create("menu_btn", "navbar_loc", {
            builder_name: "navbar",
            on_click_c : (is_pressed) => {
              menu.get_root().classList.toggle('active');
            },
            type : ui.els.btn_type_e.toggle,
            icon : [ "🐺", "🦊" ],
          })

          // menu.create_el("bearer_token_extractor", ui.editor.el_class_name_e.button, {
          //   on_click_c : (state) => {
          //     if (!ui.els.bundle.exists("bearer_token_extractor", "navbar_loc")) { return; }
          //     if (ui.els.bundle.get_state("bearer_token_extractor", "navbar_loc") !== state) {
          //       ui.els.bundle.toggle_disabled("bearer_token_extractor", "navbar_loc")
          //     }
          //   },
          //   activated : cfg.get_field("bearer_token_extractor"),
          //   title : "Bearer Token Extractor"
          // })
        })
    })
    .catch((res) => {
      console.log(res)
    })
})();
