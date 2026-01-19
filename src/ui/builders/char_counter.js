import * as general from "./utils/general.js"

export default function(data) {
  const bundle_data = data.bundle_data
  const root = data.root
  const span = general.init_bundle("span", bundle_data)

  general.init_interrupter(span, bundle_data)

  // export colors to css !!!
  span.classList.add("wall-post-form__toolbar-char_counter")

  const on_input_c = (event) => {
    const char_count = typeof on_send === "undefined" ? root.value.length : 0
    // 5000 also needs to be taken out as a separate constant !!!
    span.textContent = (char_count).toString() + "/5000"
    if (char_count > 5000) {
      span.style.color = "#ff0000"
    } else {
      span.style.color = "#3A3C3E"
    }
  }

  let submit
  let attach_point
  
  if (root.classList.contains("comment-input-field")) {
    submit = root.parentElement.querySelector(".comment-submit") // листенер не вешается на кнопку !!!
    attach_point = root.parentElement
  } else {
    submit = root.parentElement.parentElement.parentElement.querySelector(".create-post__submit, .wall-post-form__submit")
    attach_point = root.parentElement.parentElement.parentElement.querySelector(".create-post__attach, .wall-post-form__attach")
  }

  const on_send_c = () => {
    console.log("wkldfjsdklf")
    span.style.color = "#3A3C3E"
    span.textContent = "0/5000"
  }

  general.smart_event_listener("input", on_input_c, span, bundle_data, root)
  general.smart_event_listener(
    "click", on_send_c, span, bundle_data,
    submit)

  attach_point.appendChild(span)

  on_input_c()
  
}

