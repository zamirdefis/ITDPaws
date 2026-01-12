import * as waiter from "./waiter.js"
import * as network from "./network.js"
import * as styles from "./styles.js"
import * as highlight from "./highlight.js"

// export class bundle_btn_data {
//   svg
//   type
//   style
//   constructor(svg = , )
// }
//
// export class post_handler {
//
//   static create_code_block = (json) => {
//     const data = JSON.stringify(json.data, null, 2)
//
//     const pre = document.createElement('pre')
//     const code = document.createElement('code')
//
//     const wrapper = document.createElement("div")
//     wrapper.className = "code-block-wrapper"
//
//     const copy_btn = document.createElement("button")
//     copy_btn.className = "code-copy-button"
//     copy_btn.innerHTML = styles.integrated.copy_svg
//
//
//     pre.addEventListener("click", (event) => {
//       event.stopPropagation()
//     }, true)
//
//     copy_btn.onclick = () => {
//       navigator.clipboard.writeText(data)
//     }
//
//     const highlighted = window.hljs.highlight(data, { language: 'json' }).value
//
//     code.className = "code-block-json-view language-js"
//     pre.className = "code-block-json-view-pre"
//
//     code.innerHTML = highlighted
//     pre.appendChild(code);
//     wrapper.appendChild(copy_btn);
//     wrapper.appendChild(pre);
//
//
//     return wrapper
//   }
//
//   #storage_ = {}
//
//   static new_button = async () => {
//     this.#storage_
//   }
//
//   static init = async () => {
//
//     // waiter.strong("postsListener", ".post-actions-right", (el) => {
//     //   const button = document.createElement("button")
//     //   button.className = "post-actions-custom"
//     //   const post_container = el.closest(".post-container")
//     //   if (!post_container) { return; }
//     //   const post_id = post_container.dataset["postId"]
//     //
//     //   button.innerHTML = styles.integrated.view_json_svg
//     //
//     //   let code_block = false
//     //
//     //   const bounce_anim = (svg) => {
//     //     if (svg.classList.contains("animate-svg")) {
//     //       svg.classList.remove("animate-svg")
//     //     }
//     //     svg.getBoundingClientRect()
//     //     svg.classList.add("animate-svg")
//     //   }
//     //
//     //   let code_block_toggle = false
//     //   button.onclick = function() { 
//     //     bounce_anim(button.querySelector("svg"))
//     //     if (!code_block) {
//     //       code_block_toggle = true
//     //       code_block = true
//     //       network.fresh_fetch(`https://xn--d1ah4a.com/api/posts/${post_id}`, { 
//     //         method: "GET",
//     //         headers: {"Content-type": "application/json"}
//     //       })
//     //         .then( (response) => {
//     //           response.json()
//     //             .then( (json) => {
//     //               console.log(json)
//     //               code_block = post_handler.create_code_block(json)
//     //
//     //               post_container.appendChild(code_block)
//     //             })
//     //             .catch( (error) => { 
//     //               console.log(error)
//     //               throw new Error("Error while parsing json") 
//     //             })
//     //         })
//     //         .catch( (error) => {
//     //           console.log(error)
//     //           throw new Error("Bad request")
//     //         })
//     //     } else {
//     //       if (code_block_toggle) {
//     //         code_block.style.display = "none"
//     //       } else {
//     //         code_block.style.display = "block"
//     //       }
//     //       code_block_toggle = !code_block_toggle
//     //     }
//     //   }
//     //   el.appendChild(button)
//     //   // 
//     //   // 
//     // })
//   }
// }

