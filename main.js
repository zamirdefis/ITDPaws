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
  })

  menu.create_el("general", ui.editor.el_class_name_e.tab, { 
    "title": "General",
    "icon": "tab_general"
  })
  menu.create_el("visuals", ui.editor.el_class_name_e.tab, {
    "title": "Visuals",
    "icon": "tab_visuals"
  })
  menu.create_el("settings", ui.editor.el_class_name_e.tab, {
    "title": "Settings",
    "icon": "tab_settings"
  })
  menu.create_el("about", ui.editor.el_class_name_e.tab, {
    "title": "About",
    "icon": "tab_about"
  })



  menu.create_el("post_actions", ui.editor.el_class_name_e.category, {
    "title" : "Post actions",
    "tab" : "general"
  })
  menu.create_el("developing", ui.editor.el_class_name_e.category, {
    "title" : "Developing",
    "tab" : "general"
  })

  menu.create_el("info", ui.editor.el_class_name_e.category, {
    "title" : "Info",
    "tab" : "visuals"
  })

  // menu.create_el("test", ui.editor.el_class_name_e.button, {
  //   "title" : "test",
  //   "tab" : "visuals",
  //   "category" : "info",
  //   "on_click_c" : (state) => {
  //     network.fresh_fetch
  //   }
  // })
  
  cfg.init()
  menu.get_tab_btn(cfg.get_cur_tab()).click()
  
  console.log("ITDPaws!")

  ui.builders_loader.load()
    .then((res) => {
      ui.els.location.create("post_actions_loc", ".post-actions-right").then( (res) => {
        ui.els.bundle.create("view_json_bundle", "post_actions_loc", { 
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
          icon: "json",
          disabled: true
        })
        ui.els.bundle.create("copy_post_id_bundle", "post_actions_loc", {
          builder_name: "post_actions",
          icon: "id",
          on_click_c : (is_pressed, btn) => {
            navigator.clipboard.writeText(btn.closest(".post-container").dataset.postId)
          },
          disabled : true
        })


        menu.create_el("post_json_viewer", ui.editor.el_class_name_e.button, {
          on_click_c : (state) => {
            if (ui.els.bundle.get_state("view_json_bundle", "post_actions_loc") !== state) {
              ui.els.bundle.toggle_disabled("view_json_bundle", "post_actions_loc")
            }
          },
          title : "Json viewer",
          category : "post_actions",
          tab : "general",
          activated : cfg.get_field("post_json_viewer")
        })
        menu.create_el("post_id_copy_button", ui.editor.el_class_name_e.button, {
          on_click_c : (state) => {
            if (ui.els.bundle.get_state("copy_post_id_bundle", "post_actions_loc") !== state) {
              ui.els.bundle.toggle_disabled("copy_post_id_bundle", "post_actions_loc")
            }
          },
          title : "Id copy button",
          category : "post_actions",
          tab : "general",
          activated : cfg.get_field("post_id_copy_button")
        })
        //
        
      })

      ui.els.location.create("textarea_loc", ".create-post__textarea, .comment-input-field, .wall-post-form__textarea")
        .then( (res) => {
          ui.els.bundle.create("char_counter_bundle", "textarea_loc", {
            builder_name : "char_counter",
            disabled : true
          })
          menu.create_el("char_counter", ui.editor.el_class_name_e.button, {
            on_click_c : (state) => {
              if (ui.els.bundle.get_state("char_counter_bundle", "textarea_loc") !== state) {
                ui.els.bundle.toggle_disabled("char_counter_bundle", "textarea_loc")
              } 
            },
            title: "Char counter",
            activated : cfg.get_field("char_counter"),
            tab : "visuals",
            category : "info"
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
              document.querySelector(".itd-paws.itd-paws-menu").classList.remove("no-transition")
              menu.get_root().classList.toggle('active');
              if (cfg.get_initial() === "default") {
                cfg.set_initial("first")
              }
              cfg.save_changes()
              cfg.save("first")
            },
            type : ui.els.btn_type_e.toggle,
            icon : [ "🐺", "🦊" ],
          })

          menu.create_el("bearer_token_extractor", ui.editor.el_class_name_e.button, {
            on_click_c : (state) => {
              if (!ui.els.bundle.exists("bearer_token_extractor", "navbar_loc")) { return; }
              if (ui.els.bundle.get_state("bearer_token_extractor", "navbar_loc") !== state) {
                ui.els.bundle.toggle_disabled("bearer_token_extractor", "navbar_loc")
              }
            },
            activated : cfg.get_field("bearer_token_extractor"),
            title : "Bearer token extractor",
            tab : "general",
            category : "developing"
          })
        })
    })
    .catch((res) => {
      console.log(res)
    })
})();
