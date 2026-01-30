import * as elc from "../el_creator.js"
import * as icon_manager from "../icon_manager.js"
import * as cfg from "./config.js"

export const el_class_name_e = Object.freeze({
  button : 0,
  tab : 1,
  category : 2
})

export class panel_t {
  #wrapper_
  #panel_
  #body_
  #tabs_ = {}
  #tab_body_
  tab_exists = (tab_name, with_error) => {
    if (!Object.hasOwn(this.#tabs_, tab_name)) {
      if (with_error) {
        console.error(`Unknown tab : ${tab_name}`)
      }
      return false
    }
    return true
  }
  get_tab = (tab_name) => {
    if (!this.tab_exists(tab_name, true)) { return false; }
    return this.#tabs_[tab_name]
  }
  get_tab_btn = (tab_name) => {
    if (!this.tab_exists(tab_name, true)) { return false; }
    const tab_btn = this.#body_.querySelector(`.itd-paws.tab-btn[data-cfg_name="${tab_name}"]`)
    if (!tab_btn) {
      console.error(`It is impossible to obtain the “${tab_name}” tab switch button`)
      return false
    }
    return tab_btn
  }
  category_exists = (category_name, tab_name, with_error) => {
    const tab = this.get_tab(tab_name)
    if (!tab) { return false; }
    const category = tab.querySelector(`.itd-paws.category-body[data-cfg_name="${category_name}"]`)
    if (!category && with_error) {
      console.error(`Unknown category : "${category_name}", in tab : "${tab_name}"`)
    }
    return !!category
  }
  get_category = (category_name, tab_name) => {
    const tab = this.get_tab(tab_name)
    if (!tab) { return false; }
    const category = tab.querySelector(`.itd-paws.category-body[data-cfg_name="${category_name}"]`)
    if (!category) {
      console.error(`Unknown category : "${category_name}", in tab : "${tab_name}"`)
      return false;
    }
    return category
  }
  change_tab = (tab_name) => {
    const cur_tab_content = this.#tab_body_.querySelector(".itd-paws.tab-content")
    if (cur_tab_content) {
      this.#tab_body_.removeChild(cur_tab_content)
    }
    this.#body_.querySelectorAll(".tab-btn").forEach( (tab_btn) => {
      if (tab_btn.dataset.cfg_name === tab_name) {
        tab_btn.classList.add("active")
        if (!this.tab_exists(tab_name, true)) { return; }
        cfg.set_cur_tab(tab_name)
        this.#tab_body_.appendChild(this.#tabs_[tab_name])
        return
      }
      tab_btn.classList.remove("active")
    })
  }
  constructor(title, close_c) {
    this.#wrapper_ = elc.createElement("div")
    this.#wrapper_.classList.add("itd-paws-menu-wrapper")

    this.#panel_ = elc.createElement("div")
    this.#panel_.classList.add("itd-paws-menu", "no-transition")

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

    this.#tab_body_ = elc.createElement("div")
    this.#tab_body_.classList.add("tab-body")
    tab_wrapper.appendChild(this.#tab_body_)

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
    if (el_class_name === el_class_name_e.category) {
      if (!data.tab || !this.tab_exists(data.tab, true)) {
        console.error(`Invalid tab : "${data.tab}"`)
        return
      }
      const category_wrapper = elc.createElement("div")
      category_wrapper.classList.add("category-wrapper")

      const category_title = elc.createElement("span")
      category_title.classList.add("category-title")
      category_title.textContent = data.title ?? "NONE"
      category_wrapper.appendChild(category_title)

      const category_body = elc.createElement("div")
      category_body.classList.add("category-body")
      category_body.dataset.cfg_name = el_name
      category_wrapper.appendChild(category_body)

      // const test = elc.createElement("div")
      // test.textContent = "KLSDJFLKDSFJ"
      // category_body.appendChild(test)

      this.#tabs_[data.tab].appendChild(category_wrapper)
      return
    } else if (el_class_name === el_class_name_e.tab) {
      const tab_btn = elc.createElement("button")
      tab_btn.dataset.cfg_name = el_name
      tab_btn.classList.add("tab-btn")
      
      const tab_btn_icon_html = icon_manager.get(data.icon ?? "unknown")
      tab_btn.innerHTML = tab_btn_icon_html
      const tab_btn_icon = tab_btn.querySelector("svg")
      tab_btn_icon.classList.add("tab-btn-icon")

      const tab_btn_title = elc.createElement("span")
      tab_btn_title.classList.add("tab-btn-title")
      tab_btn_title.textContent = data.title ?? el_name ?? "NONE"
      tab_btn.appendChild(tab_btn_title)

      const tab_content = elc.createElement("div")
      tab_content.classList.add("tab-content")

      this.#tabs_[el_name] = tab_content
      tab_btn.onclick = () => {
        this.change_tab(el_name)
      }
      this.#body_.querySelector(".ts-tabs").appendChild(tab_btn)
      return
    }
    if (el_class_name === el_class_name_e.button) {
      const category = this.get_category(data.category, data.tab)
      if (!category) { return; }

      const btn_wrapper = elc.createElement("div")
      btn_wrapper.classList.add("btn-wrapper")
      category.appendChild(btn_wrapper)
      
      const btn_left_wrapper = elc.createElement("div")
      btn_left_wrapper.classList.add("btn-left-wrapper")
      btn_wrapper.appendChild(btn_left_wrapper)

      const btn_right_wrapper = elc.createElement("div")
      btn_right_wrapper.classList.add("btn-right-wrapper")
      btn_wrapper.appendChild(btn_right_wrapper)

      const btn = elc.createElement("button")
      btn.classList.add("menu-btn", "cfg-member")
      btn.dataset.cfg_name = el_name
      btn_left_wrapper.appendChild(btn)

      const btn_title = elc.createElement("div")
      btn_title.classList.add("btn-title")
      btn_title.textContent = data.title ?? "NONE"
      btn_left_wrapper.appendChild(btn_title)

      const test2 = elc.createElement("div")
      btn_right_wrapper.appendChild(test2)

      btn.onclick = () => {
        btn.classList.toggle("active");
        const state = btn.classList.contains("active")
        if (!data.no_cfg_auto_changer) {
          cfg.set_field(el_name, state)
        }
        if (data.on_click_c) {
          data.on_click_c(state)
        }
      }

      if (data.activated) {
        btn.click()
      }
    }
  }
}

 
