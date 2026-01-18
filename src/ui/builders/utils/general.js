
const createElement = (name) => {
  const el = document.createElement(name)
  el.classList.add("itd-paws")
  return el
}

export function init_bundle(el_type, bundle_data) {
  const bundle = createElement("button")  
  bundle.classList.add("builded-" + bundle_data.bundle_name) // !!! remove
  bundle.dataset.bundle_name = bundle_data.bundle_name
  bundle.dataset.location_name = bundle_data.location_name
  return bundle
}

export function init_interrupter(bundle, bundle_data) {
  const controller = new AbortController()
  if (bundle_data.listener_interrupters.has(bundle)) {
    console.error(`Attempt to overwrite the interrupter in bundle`, bundle, bundle_data)
    return
  }
  bundle_data.listener_interrupters.set(bundle, controller)
}

export function smart_event_listener(type, callback, bundle, bundle_data) {
  bundle.addEventListener(type, callback, { "signal" : bundle_data.listener_interrupters.get(bundle).signal })
}
