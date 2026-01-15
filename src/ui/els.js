import * as waiter from "../waiter.js"

export const btn_type_e = Object.freeze({
  toggle: 0,
  single: 1
})

const storage = new Map()

export const createElement = (name) => {
  const el = document.createElement(name)
  el.classList.add("itd-paws")
  return el
}

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

  create = async (name, selector, type = this.types.dynamic, overhead_handler_c = () => {}) => {
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
          const bundle = builder.build(bundle_data.builder_name, bundle_data)
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
          const bundle = builder.build(bundle_data.builder_name, bundle_data)
          if (!bundle) {
            console.warn(`Broken builder : ${bundle_data.bundle_name}`)
            return
          }
          root.appendChild(bundle)
        }
      })
    }
    return true
  }
}

class bundle_t {
  types = Object.freeze({
    single : 0,
    toggle : 1,
    radio : 2
  })
  // #apply_overhead_ = (location_name, bundle_template) => {
  //   const ohh = location.get(location_name).overhead_handler_c
  //   if (!ohh) { return false }
  //   ohh(bundle_template)
  //   return true
  // } // fix it
  #process_new_bundle_ = (bundle_name, location_name, bundle_data) => {
    const loc_ref = location.get(location_name)
    loc_ref.bundles.set(bundle_name, bundle_data)
    // this.#apply_overhead_(location_name, bundle_template) fix it
    if (loc_ref.type == location.types.static && loc_ref.root) {
      const bundle = builder.build(bundle_data.builder_name, bundle_data)
      if (!bundle) {
        console.warn(`Broken builder : ${bundle_data.bundle_name}`)
        return
      }
    }
  }
  
  create = (bundle_name, location_name, data = {},) => {
    if (typeof data !== "object" || !data.builder_name || !builder.exist(data.builder_name)) {
      throw new Error("Unknown builder or data")
    }
    if (!storage.has(location_name)) {
      throw new Error(`Unknown location "${location_name}"`)
    }
    if (storage.get(location_name).bundles.has(bundle_name)) {
      throw new Error(`The button named "${bundle_name}" already exists`)
    }
    this.#process_new_bundle_(bundle_name, location_name, data)
  }
}

class builder_t {
  builders_ = new Map()
  exist = (builder_name) => {
    return this.builders_.has(builder_name) ? true : false
  }
  // build_c must returns a dom element
  create = (builder_name, build_c) => {
    if (typeof build_c !== "function") { throw new Error("Invalid callback"); }
    if (this.exist(builder_name)) {
      throw new Error(`The builder named "${builder_name}" already exists`)
    }
    this.builders_.set(builder_name, build_c)
    return true;
  }
  build = (builder_name, data) => {
    if (!this.exist(builder_name)) {
      throw new Error("Unknown builder")
    }
    return this.builders_.get(builder_name)(data)
  }
  
}

// const builder_o = new builder_t()
//
// class builders_loader_t {
//   load = async () => { 
//     const builders = await builders_loader_.load()
//     for (const builder of builders) {
//       builder_o.create(builder[0], builder[1])
//     }
//   }
// }

export const builder = new builder_t()
export const location = new location_t()
export const bundle = new bundle_t()
