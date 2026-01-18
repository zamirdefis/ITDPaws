import * as waiter from "../waiter.js"



export const btn_type_e = Object.freeze({
  toggle: 0,
  single: 1
})

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
          if (bundle_data.disabled) { continue; }
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
  // потом крч перебираем все бандлы и apply к ним
  // при disable удаляем бандлы. при enable вызываем apply_to_existing
  // и надо еще параметр сделать в bundle_data типо disable/enable
  // не забудь в post_actions builder'е добавить класс
  apply_to_existing_ = async (location_name, bundle_name) => {
    const loc_ref = this.get(location_name)
    const bundle_data = loc_ref.bundles.get(bundle_name)
    if (bundle_data.disabled) {
      return;
    }
    document.querySelectorAll(loc_ref.selector).forEach( (root) => {
      if (root.querySelector(".builded-" + bundle_data.bundle_name)) {
        return;
      }
      const bundle = builder.build(bundle_data.builder_name, bundle_data)
      if (!bundle) {
        console.warn(`Broken builder : ${bundle_data.bundle_name}`)
        return
      }
      root.appendChild(bundle)
    })
  }
  static destruct = (location_name) => {
    const loc_ref = location.get(location_name)
    if (loc_ref) {
      waiter.stop_strong(location_name)
      storage.delete(location_name)
      return true
    }
    return false
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
    // auto params
    bundle_data.bundle_name = bundle_name
    bundle_data.listener_interrupters = new Map()
    bundle_data.location_name = location_name

    const loc_ref = location.get(location_name)
    loc_ref.bundles.set(bundle_name, bundle_data)
    // this.#apply_overhead_(location_name, bundle_template) fix it
    if (loc_ref.type == location.types.static && loc_ref.root) {
      const bundle = builder.build(bundle_data.builder_name, bundle_data)
      if (!bundle) {
        console.warn(`Broken builder : ${bundle_data.bundle_name}`)
        return
      }
    } else {
       location.apply_to_existing_(location_name, bundle_name)
    }
  }

  disable = (bundle_name, location_name) => {
    const bundle_data = location.get(location_name).bundles.get(bundle_name)
    if (bundle_data.disabled) { return }
    bundle_data.disabled = true
    document.querySelectorAll(".builded-" + bundle_name).forEach((bundle) => {
      // bundle.onclick = null
      bundle.remove()
      // for test: (remove it)
    })
  }
  enable = (bundle_name, location_name) => {
    const bundle_data = location.get(location_name).bundles.get(bundle_name)
    if (!bundle_data.disabled) { return }
    bundle_data.disabled = false
    location.apply_to_existing_(location_name, bundle_name)
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

export function init_interrupt_manager() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => m.removedNodes.forEach(node => {
      if (node.nodeType !== 1) return;

      const bundles = node.matches('[data-bundle_name]') ? [node] : node.querySelectorAll('[data-bundle_name]');

      bundles.forEach(bundle => {
        const bundle_name = bundle.dataset.bundle_name
        const loc_name = bundle.dataset.location_name
        if (bundle_name && loc_name) {
          const loc = location.get(loc_name)
          if (loc && loc.bundles.has(bundle_name) && loc.bundles.get(bundle_name).listener_interrupters.has(bundle)) {
            const controller = loc.bundles.get(bundle_name).listener_interrupters.get(bundle)
            controller.abort()
            loc.bundles.get(bundle_name).listener_interrupters.delete(bundle)
            return
          }
        }
        console.error("Corrupted bundle!", bundle)
      })
    }))
  })
  observer.observe(
    document.body,
    { 
      childList: true,
      subtree: true
    }
  )
}
