import * as general from "./utils/general.js"

export default function(data) {
  const bundle_data = data.bundle_data
  const root = data.root
  const span = general.init_bundle("span", bundle_data)
  general.init_interrupter(span, bundle_data)
  span.classList.add("wall-post-form__toolbar-char_counter")
  let max = 5000 // 5000 (and 2000) also needs to be taken out as a separate constant !!!

  const on_input_c = () => {
    const char_count = typeof on_send === "undefined" ? root.value.length : 0
    span.textContent = (char_count).toString() + "/" + max.toString()
    if (char_count > max) {
      span.style.color = "#ff0000" // export colors to css !!!
    } else {
      span.style.color = "#3A3C3E"
    }
  }

  const submit = root.parentElement.parentElement.parentElement.querySelector(".create-post__submit, .wall-post-form__submit")
          ?? (max = 2000, /* comma operator is awesome :D */ root.parentElement)
  const attach_point = root.parentElement.parentElement.parentElement.querySelector(".create-post__attach, .wall-post-form__attach")
          ?? root.parentElement

  const on_send_c = (event) => {
    if (event.currentTarget.classList.contains("comment-input-field")
            && !event.target.classList.contains("comment-submit")) {
      return
    } 
    span.style.color = "#3A3C3E"
    span.textContent = "0/" + max.toString()
  }

  general.smart_event_listener("input", on_input_c, span, bundle_data, root)
  general.smart_event_listener(
    "click", on_send_c, span, bundle_data,
    submit)
  general.smart_interval(on_input_c, 300, span, bundle_data)
  attach_point.appendChild(span)

  on_input_c()
}

