export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const weak = async ( selector, callback, delay = 100) => {
  let layer = 0
  while (true) {
    let el = document.querySelector(selector)
    if (el) {
      callback(el)
      return
    }
    const passed = delay * layer
    if ( passed > 10000 && passed % 2000 === 0) {
      console.warn("Infinite yield possible")
    }
    await sleep(delay)
    ++layer;
  }
}

const strong_listeners = {}

export const strong = async ( name, selectors, callback ) => {
  const style = document.createElement("style")
  strong_listeners[name] = { "style": style, "selectors": selectors, "callback": callback }
  style.innerHTML =`
@keyframes ${name} { from { opacity: 0.99; } to { opacity: 1; } }
  ${selectors} { 
    animation-name: ${name}; 
    animation-duration: 0.001s; 
}`
  document.head.appendChild(style)
}

export const init_strong_global_listener = async () => {
  document.addEventListener("animationstart", (event) => {
    if ( event.animationName in strong_listeners && !event.target.dataset["strong-listened"] ) {
      event.target.dataset["stronglistenedGNT0wK"] = "true"
      strong_listeners[event.animationName].callback(event.target)
    }
  })
}


