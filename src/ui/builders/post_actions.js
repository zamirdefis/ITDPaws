import * as els from "../els.js"
import * as icon_manager from "../icon_manager.js"

export default function(data) {
  const btn = els.createElement("button")
  btn.classList.add("post-action-btn")
  btn.classList.add("builded-" + data.bundle_name)

  if (Object.hasOwn(data, "type")) {
    if (typeof data.type !== "number") {
      throw new Error(`"type" must be a number`)
    }
  } else {
    data.type = els.btn_type_e.single
  }

  if (Object.hasOwn(data, "icon")) {
    if (typeof data.icon !== "string") {
      if (!Array.isArray(data.icon) || (data.type !== els.btn_type_e.toggle && data.type !== els.btn_type_e.radio) || data.icon.length !== 2 || typeof data.icon[0] !== "string" || typeof data.icon[1] !== "string") {
        throw new Error("Incorrect icon! Must be a string or an array with two strings (for toggle)")
      } 
    }
  } else {
    data.icon = "unknown"
  }

  if (Object.hasOwn(data, "on_click_c")) {
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
    if (data.type === els.btn_type_e.toggle) {
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
}

