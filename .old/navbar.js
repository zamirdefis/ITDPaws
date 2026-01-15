// import * as waiter from "./waiter.js"
// import * as vars from "./vars.js"
//
// const nav_bar_btn_css = 
// `
// border: 1px solid rgba(255, 255, 255, 0.1);
// width: 45px;
// height: 45px;
// border-radius: 9999px;
// background-color: rgba(255, 255, 255, 0.01);
// color: white;
// cursor: pointer;
// transition: background-color 0.3s;
// `
//
// export const BTN_TYPE_E = Object.freeze({
//   TOGGLE: 0,
//   SINGLE: 1
// })
//
// export class nav_bar_btn_data_t {
//   icon_char
//   icon_char_alt
//   type
//   is_pressed
//   applied_ = false
//   /**
//    * Ctor :D
//    * @param {string/array} icon_char - Symbol for button icon ('D' or ['D', 'A'] for toggle)
//    * @param {BTN_TYPE_E} type - Type of button
//    * @param {bool} clicked - Button press state
//    */
//   constructor(icon_char = '▧', type = BTN_TYPE_E.SINGLE, clicked = false) {
//     if (typeof clicked !== "boolean") {
//       throw new Error(`"clicked" must be a boolean`)
//     }
//     if (typeof type !== "number") {
//       throw new Error(`"type" must be a number`)
//     } else if (typeof icon_char === "object" && type === BTN_TYPE_E.TOGGLE 
//           && Array.isArray(icon_char) && icon_char.length === 2 &&
//           typeof icon_char[0] === "string" && typeof icon_char[1] === "string" ) {
//       this.icon_char = icon_char[0]
//       this.icon_char_alt = icon_char[1]
//     } else if (typeof icon_char !== "string") {
//       throw new Error("Incorrect icon_char! Must be a string or an array with two strings (for toggle)")
//     } else {
//       this.icon_char = icon_char
//       this.icon_char_alt = icon_char
//     }
//     this.type = type
//     this.clicked = clicked
//   }
//
//   to_obj_ = () => {
//     return {
//       "icon_char" : this.icon_char,
//       "icon_char_alt" : this.icon_char_alt,
//       "type" : this.type,
//       "clicked" : this.clicked,
//       "applied" : this.applied_
//     }
//   }
// }
//
// export class navbar_entity_t {
//   static #c_storage_ = {}
//   static #navbar_ref_
//
//   static #apply_button_ = (name) => {
//     if (!this.#navbar_ref_) { return }
//     this.#navbar_ref_.appendChild(this.#c_storage_[name].button_el)
//     this.#c_storage_[name].applied = true
//   }
//   static #apply_all_buttons_ = () => {
//     for (const [name, data] of Object.entries(this.#c_storage_)) {
//       if (data["applied"] === false) {
//         this.#apply_button_(name)
//       }
//     }
//   }
//
//   static #button_click_action_ = (btn_data, on_click_c) => {
//
//     const btn_ref = btn_data.button_el
//
//     const bounce_anim = (btn_ref) => {
//       if (btn_ref.classList.contains("animate-font")) {
//         btn_ref.classList.remove("animate-font")
//       }
//       void btn_ref.offsetWidth;
//       btn_ref.classList.add("animate-font")
//     }
//
//     if (btn_data.type === BTN_TYPE_E.TOGGLE) {
//       btn_data.is_pressed = !btn_data.is_pressed;
//       if (btn_data.is_pressed) {
//         btn_ref.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
//         btn_ref.style.border = "2px solid rgba(255, 255, 255, 0.4)"
//         btn_ref.textContent = btn_data.icon_char_alt ?? btn_data.icon_char
//         bounce_anim(btn_ref)
//       } else {
//         btn_ref.style.backgroundColor = "rgba(255, 255, 255, 0.01)"
//         btn_ref.style.border = "1px solid rgba(255, 255, 255, 0.1)"
//         btn_ref.textContent = btn_data.icon_char
//         bounce_anim(btn_ref)
//       }
//       on_click_c(btn_data.is_pressed);
//       return;
//     }
//
//     bounce_anim(btn_ref)
//     on_click_c(true);
//   }
//
//   /**
//    * Executed when a button is pressed
//    * @callback view_on_click_c
//    * @param {bool} status - (Is the button pressed?)
//    */
//   /**
//   * The function creates a new button in the navigation bar
//   * @param {string} name - The name that defines the button in the handler
//   * @param {view_on_click_c} on_click_c - Callback on click action
//   * @returns {Promise}
//   */
//
//
//   static new_button = async (name, on_click_c, data = new nav_bar_btn_data_t()) => {
//     if (!name || !on_click_c) {
//       throw new Error("Required : name, on_click_c")
//     } else if (this.#c_storage_[name] !== undefined) {
//       throw new Error(`Button "${name}" already exists`)
//     }
//
//     const btn_data = data.to_obj_()
//
//     // Creating button
//     btn_data.applied = false
//     btn_data.button_el = document.createElement("button")
//     const btn_ref = btn_data.button_el
//     btn_ref.className = "navbar-custom-btn"
//     btn_ref.textContent = btn_data.icon_char
//     btn_ref.style.fontSize = vars.navbar.default_icon_size
//     if (btn_data.clicked) {
//       this.#button_click_action_(btn_data, on_click_c)
//     }
//     btn_ref.onclick = () => this.#button_click_action_(btn_data, on_click_c)
//     //
//
//     navbar_entity_t.#c_storage_[name] = btn_data
//     this.#apply_button_(name)
//
//     return true
//   }
//   static hide_button = async () => {
//     // hide css itd
//   }
//   static init = async () => {
//     waiter.weak(".sidebar-nav", (navbar_el) => {
//       this.#navbar_ref_ = navbar_el
//       this.#apply_all_buttons_() 
//     })
//   }
// }
