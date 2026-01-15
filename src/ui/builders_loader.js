import * as els from "./els.js"

export async function load() {
  const modules = [ "navbar", "post_actions"]
  for (const path of modules) {
    const module = await import("./builders/" + path + ".js")
    const builder_name = path.split('/').pop().replace('.js', '')
    if (typeof module.default === "function") {
      els.builder.create(builder_name, module.default)
    } else {
      throw new Error("Builder is not a function")
    }
  }
}
