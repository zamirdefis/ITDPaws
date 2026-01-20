
function get_signal(bundle, bundle_data) {
  const signal = bundle_data.listener_interrupters.get(bundle).signal
  if (!signal) { console.error("Unable to receive interrupt signal at bundle : ", bundle) }
  return signal
}

export function smart_interval(callback, delay, bundle, bundle_data) {
  const signal = get_signal(bundle, bundle_data)
  if (signal?.aborted) return;

  const id = setInterval(callback, delay);

  signal?.addEventListener('abort', () => {
    clearInterval(id);
  }, { once: true });
}

const createElement = (name) => {
  const el = document.createElement(name)
  el.classList.add("itd-paws")
  return el
}

export function init_bundle(el_type, bundle_data) {
  const bundle = createElement(el_type)  
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

export function smart_event_listener(type, callback, bundle, bundle_data, attach_listener_to) {
  (attach_listener_to ?? bundle).addEventListener(type, callback, { "signal" : get_signal(bundle, bundle_data) })
}
