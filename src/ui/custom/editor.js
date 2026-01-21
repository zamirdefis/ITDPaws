import * as elc from "../el_creator.js"
import * as icon_manager from "../icon_manager.js"

export const el_class_name_e = Object.freeze({
  button : 0 
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
    if (el_class_name === el_class_name_e.button) {
      const btn_wrapper = elc.createElement("div")
      btn_wrapper.classList.add("btn-wrapper")
      btn_wrapper.classList.add("in-body")
      this.#body_.appendChild(btn_wrapper)
      return
    }
  }
}

 
