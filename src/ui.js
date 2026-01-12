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

  create(name, selector, type = this.types.dynamic, overhead_handler_c = () => {}) {
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
        for (const bundle_data of location["bundles"].values()) {
          const bundle = els.builder.build(bundle_data.builder_name, bundle_data)
          if (!bundle) {
            console.warn(`Broken builder : ${bundle_data.bundle_name}`)
            return
          }
          root.appendChild(bundle)
        }
      })
    } else if (type == this.types.dynamic) {
      waiter.strong(name, selector, (root) => {
        for (const bundle_data of location["bundles"].values()) {
          const bundle = els.builder.build(bundle_data.builder_name, bundle_data)
          if (!bundle) {
            console.warn(`Broken builder : ${bundle_data.bundle_name}`)
            return
          }
          root.appendChild(bundle)
        }
      })
    }
  }
}

class bundle_t {
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
  #process_new_bundle_ = (bundle_name, location_name, bundle_data) => {
    const location = els.location.get(location_name)
    location.bundles.set(bundle_name, bundle_data)
    // this.#apply_overhead_(location_name, bundle_template) fix it
    if (location.type == els.location.types.static && location.root) {
      const bundle = els.builder.build(bundle_data.builder_name, bundle_data)
      if (!bundle) {
        console.warn(`Broken builder : ${bundle_data.bundle_name}`)
        return
      }
    }
  }
  /**
   * @param {string} name - button name
   * @param {string} location_name - location name
   * @param {string} button_properties - content_type - text/svg
  */ 
  create = (bundle_name, location_name, data = {},) => {
    if (typeof data !== "object" || !data.builder_name || !els.builder.exist(data.builder_name)) {
      throw new Error("Unknown builder or data")
    }
    if (!storage.has(location_name)) {
      throw new Error(`Unknown location "${location_name}"`)
    }
    if (storage.get(location_name).bundles.get(name)) {
      throw new Error(`The button named "${location_name}" already exists`)
    }
    this.#process_new_bundle_(bundle_name, location_name, data)
  }
}

class builder_t {
  #builders_ = new Map()
  exist = (builder_name) => {
    return this.#builders_.has(builder_name) ? true : false
  }
  // build_c must returns a dom element
  create = (builder_name, build_c) => {
    if (typeof build_c !== "function") { throw new Error("Invalid callback"); }
    if (this.exist(builder_name)) {
      throw new Error(`The builder named "${builder_name}" already exists`)
    }
    this.#builders_.set(builder_name, build_c)
    return true;
  }
  build = (builder_name, data) => {
    if (!this.exist(builder_name)) {
      throw new Error("Unknown builder")
    }
    return this.#builders_.get(builder_name)(data)
  }
  
}

export class els {
  static builder = new builder_t()
  static location = new location_t()
  static bundle = new bundle_t()
}
