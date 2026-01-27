const extension_prefix = "itd_paws__"
const prefix_for_cfgs = extension_prefix + "config__"
const initial_cfg_key = extension_prefix + "initial"

let cur_cfg = { /* ~RAWR~ >w< */ }



export function set_initial(cfg_name) {
  localStorage.setItem(initial_cfg_key, cfg_name)
}

export function get_initial() {
  return localStorage.getItem(initial_cfg_key) ?? "default"
}

function refresh() {
  const btns = document.querySelectorAll(".itd-paws.menu-btn.cfg-member")
  btns.forEach( (btn) => {
    if (Object.hasOwn(cur_cfg, btn.dataset.cfg_name)) {
      if (cur_cfg[btn.dataset.cfg_name]) {
        if (!btn.classList.contains("active")) {
          btn.click()
        }
      } else {
        if (btn.classList.contains("active")) {
          btn.click()
        }
      }
    }
  })
}

export function save_changes() {
  const btns = document.querySelectorAll(".itd-paws.menu-btn.cfg-member")
  btns.forEach( (btn) => {
    cur_cfg[btn.dataset.cfg_name] = btn.classList.contains("active")
  })
}

export function save(cfg_name, data) {
  const real_cfg_name = prefix_for_cfgs + cfg_name
  localStorage.setItem(real_cfg_name, JSON.stringify(data ?? cur_cfg))
}

export function reinstall_default() {
  save("default", {
    "post_json_viewer" : true,
    "bearer_token_extractor" : true,
    "post_id_copy_button": true
  })
}

export function load(cfg_name) {
  const real_cfg_name = prefix_for_cfgs + cfg_name
  const new_cur_cfg_str = localStorage.getItem(real_cfg_name)
  if (new_cur_cfg_str) {
    const new_cur_cfg = JSON.parse(new_cur_cfg_str)
    if (!new_cur_cfg) {
      console.error(`Config "${real_cfg_name}" is corrupted`)
      return false
    }
    cur_cfg = new_cur_cfg
    refresh()
    return true
  }
  console.error(`Config "${real_cfg_name}" not found`)
  return false
}

export function remove(cfg_name) {
  const real_cfg_name = prefix_for_cfgs + cfg_name
  localStorage.removeItem(real_cfg_name)
}

export function remove_all() {
  const cfgs_to_remove = []
  for (let i = 0; i < localStorage.length; ++i) {
    let key = localStorage.key(i)
    if (key.startsWith(prefix_for_cfgs)) {
      cfgs_to_remove.push(key)
    }
  }
  for (const cfg_name of cfgs_to_remove) {
    localStorage.removeItem(cfg_name)
  }
}

export function get_full() {
  return cur_cfg
}

export function get_field(name) {
  return cur_cfg[name];
}

export function set_field(name, value) {
  cur_cfg[name] = value
}

export function set_full(new_cfg_obj) {
  cur_cfg = new_cfg_obj
}

export function init() {
  reinstall_default()
  set_initial(get_initial() ?? "default")
  load(get_initial())
}
