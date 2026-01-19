import * as els from "../els.js"
import * as icon_manager from "../icon_manager.js"
import * as general from "./utils/general.js"

export default function(data) {
  const bundle_data = data.bundle_data
  const btn = general.init_bundle("button", bundle_data)

  general.init_interrupter(btn, bundle_data)

  btn.classList.add("post-action-btn")


  if (Object.hasOwn(bundle_data, "type")) {
    if (typeof bundle_data.type !== "number") {
      throw new Error(`"type" must be a number`)
    }
  } else {
    bundle_data.type = els.btn_type_e.single
  }

  if (Object.hasOwn(bundle_data, "icon")) {
    if (typeof bundle_data.icon !== "string") {
      if (!Array.isArray(bundle_data.icon) || (bundle_data.type !== els.btn_type_e.toggle && bundle_data.type !== els.btn_type_e.radio) || bundle_data.icon.length !== 2 || typeof bundle_data.icon[0] !== "string" || typeof bundle_data.icon[1] !== "string") {
        throw new Error("Incorrect icon! Must be a string or an array with two strings (for toggle)")
      } 
    }
  } else {
    bundle_data.icon = "unknown"
  }

  if (Object.hasOwn(bundle_data, "on_click_c")) {
    if (typeof bundle_data.on_click_c !== "function") {
      throw new Error(`on_click_c" must be a function`)
    }
  } else {
    bundle_data.on_click_c = (status) => { console.warn("Unspecified callback on click") }
  }

  const bounce_anim = (btn_ref) => {
    if (btn_ref.classList.contains("animate-svg")) {
      btn_ref.classList.remove("animate-svg")
    }
    void btn_ref.offsetWidth;
    btn_ref.classList.add("animate-svg")
  }

  btn.innerHTML = icon_manager.get(bundle_data.icon)

  let is_pressed = false

  const onclick_extended_c = () => {
    if (bundle_data.type === els.btn_type_e.toggle) {
      if (!is_pressed) {
        // btn.classList.add("navbar-custom-btn-is-pressed")
        // btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
        // btn.style.border = "2px solid rgba(255, 255, 255, 0.4)"
        btn.textContent = Array.isArray(bundle_data.icon) ? bundle_data.icon[1] : bundle_data.icon
        bounce_anim(btn)
      } else {
        // btn.classList.remove("navbar-custom-btn-is-pressed")
        // btn.style.backgroundColor = "rgba(255, 255, 255, 0.01)"
        // btn.style.border = "1px solid rgba(255, 255, 255, 0.1)"
        btn.textContent = Array.isArray(bundle_data.icon) ? bundle_data.icon[0] : bundle_data.icon
        bounce_anim(btn)
      }
      is_pressed = !is_pressed
    } else {
      bounce_anim(btn)
    }
    bundle_data.on_click_c(is_pressed, btn)
  }

  if (bundle_data.activated) {
    onclick_extended_c()
  }
  general.smart_event_listener("click", onclick_extended_c, btn, bundle_data)

  data.root.appendChild(btn)
}

