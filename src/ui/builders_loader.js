export async function load() {
  const modules = [ "navbar", "post_actions"]
  const builders = []
  for (const path of modules) {
    const module = await import("./builders/" + path + ".js")
    const builder_name = path.split('/').pop().replace('.js', '')
    if (typeof module.default === "function") {
      builders.push([builder_name, module.default])
    } else {
      throw new Error("Builder is not a function")
    }
  }
  return builders
}
