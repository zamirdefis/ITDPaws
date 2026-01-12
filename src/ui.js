import * as waiter from "./waiter.js"

const storage = new Map()

class location_t {

  types = Object.freeze({
    static : 0,
    dynamic: 1
  })

  get = (location_name) => {
    if (storage.has(location_name)) {
      return storage.get(location_name)
    }
    return false
  }

  create(name, selector, type = this.types.dynamic, overhead_handler_c = async () => {}) {
    if (storage.has(name)) {
      return new Error("Location with this name already exists")
    }
    const location = {
      "root" : false,
      "bundles" : new Map(),
      "selector" : selector,
      "type" : type,
      "overhead_handler_c" : overhead_handler_c
    }
    storage.set(name, location)
    if (type == this.types.static) {
      waiter.weak(selector, (root) => {
        location["root"] = root
        for (const bundle of location["bundles"].values()) {
          root.appendChild(bundle)
        }
      })
    } else if (type == this.types.dynamic) {
      waiter.strong(name, selector, (root) => {
        location["root"] = false
        for (const bundle of location["bundles"].values()) {
          root.appendChild(bundle.cloneNode(true))
        }
      })
    }
  }
}

class button_t {
  types = Object.freeze({
    single : 0,
    toggle : 1,
    radio : 2
  })
  #apply_overhead_ = (location_name, bundle_template) => {
    const ohh = els.location.get(location_name).overhead_handler_c
    if (!ohh) { return false }
    ohh(bundle_template)
    return true
  }
  #process_new_bundle_ = (bundle_name, location_name, bundle_template) => {
    const location = els.location.get(location_name)
    if (!location) { throw new Error(`Unknown location "${location_name}"`) }
    location.bundles.set(bundle_name, bundle_template)
    this.#apply_overhead_(location_name, bundle_template)
    if (location.type == els.location.types.static && location.root) {
      location.root.appendChild(bundle_template)
    }
  }
  /**
   * @param {string} name - button name
   * @param {string} location_name - location name
   * @param {string} button_properties - content_type - text/svg
  */ 
  create = async (name, location_name, button_properties = {
  on_click_c : undefined,
  constent : "?",
  content_type : "",
  activated : false,
  type : "single",
  radio_group : undefined,
  is_pressed : false, //fix
  }) => {
    if (!storage.has(location_name)) {
      throw new Error(`Unknown location "${location_name}"`)
    }
    if (storage.get(location_name).bundles.get(name)) {
      throw new Error(`The button named "${location_name}" already exists`)
    }
    const bundle_template = document.createElement("button")
    //for test:
    bundle_template.style.width = "20px"
    bundle_template.style.height = "20px"
    /*добавь стили. бубубу бебебе*/
    bundle_template.onclick = button_properties.on_click_c ?? bundle_template.onclick
    this.#process_new_bundle_(name, location_name, bundle_template)
    return bundle_template
  }
}

export class els {
  static location = new location_t()
  static button = new button_t()
}
