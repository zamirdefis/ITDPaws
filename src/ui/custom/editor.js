import * as elc from "../el_creator.js"
import * as icon_manager from "../icon_manager.js"

export const el_class_name_e = Object.freeze({
  button : 0,
  tab : 1
})

export class panel_t {
  #wrapper_
  #panel_
  #body_
  constructor(title, close_c) {
    this.#wrapper_ = elc.createElement("div")
    this.#wrapper_.classList.add("itd-paws-menu-wrapper")

    this.#panel_ = elc.createElement("div")
    this.#panel_.classList.add("itd-paws-menu")

    const header = elc.createElement("div")
    header.classList.add("menu-header")

    const head_spacer = elc.createElement("div")
    head_spacer.classList.add("spacer")
    header.appendChild(head_spacer)

    const menu_title = elc.createElement("h2")
    menu_title.classList.add("menu-title")
    menu_title.innerHTML = title
    head_spacer.appendChild(menu_title)

    const close_btn = elc.createElement("button")
    close_btn.classList.add("close-btn")
    close_btn.innerHTML = icon_manager.get("close")
    close_btn.onclick = close_c
    header.appendChild(close_btn)

    this.#body_ = elc.createElement("div")
    this.#body_.classList.add("menu-body")

    this.#panel_.appendChild(header)
    this.#panel_.appendChild(this.#body_)

    const tab_wrapper = elc.createElement("div")
    tab_wrapper.classList.add("tab-wrapper")
    this.#body_.appendChild(tab_wrapper)

    const tab_selector = elc.createElement("div")
    tab_selector.classList.add("tab-selector")
    tab_wrapper.appendChild(tab_selector)
    
    const ts_tabs = elc.createElement("div")
    ts_tabs.classList.add("ts-tabs")
    tab_selector.appendChild(ts_tabs)

    const tab_body = elc.createElement("div")
    tab_body.classList.add("tab-body")
    tab_wrapper.appendChild(tab_body)

    this.#wrapper_.appendChild(this.#panel_)
    document.body.appendChild(this.#wrapper_)
  }
  get_root = () => {
    return this.#panel_
  }
  // button class data :
  // class_list
  // desc
  //
  create_el = (el_name, el_class_name, data) => {
    if (el_class_name === el_class_name_e.tab) {
      const tab_btn = elc.createElement("button")
      tab_btn.classList.add("tab-btn")
      tab_btn.textContent = data.title ?? el_name ?? "NONE"
      tab_btn.onclick = () => {
        tab_btn.classList.toggle("active")
      }
      this.#body_.querySelector(".ts-tabs").appendChild(tab_btn)
      return
    }
    const el_wrapper = elc.createElement("div")
    el_wrapper.classList.add("el-wrapper")
    if (el_class_name === el_class_name_e.button) {

      const el_title_wrapper = elc.createElement("div")
      el_title_wrapper.classList.add("el-title-wrapper")
      el_wrapper.appendChild(el_title_wrapper)
      
      
      
      const btn_title = elc.createElement("div")
      btn_title.classList.add("btn-title")
      btn_title.textContent = data.title ?? "NONE"
      el_title_wrapper.appendChild(btn_title)

      const btn = elc.createElement("button")
      btn.classList.add("menu-btn", "cfg-member")
      btn.dataset.cfg_name = el_name
      el_title_wrapper.appendChild(btn)

      btn.onclick = () => {
        btn.classList.toggle("active");
        if (data.on_click_c) {
          data.on_click_c(btn.classList.contains("active"))
        }
      }

      if (data.activated) {
        btn.click()
      }
    }
    this.#body_.appendChild(el_wrapper)
  }
}

 
