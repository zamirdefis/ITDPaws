import * as vars from "./vars.js"

const FETCH_LAST_LAYER = 5
const FETCH_ONE_TRY = FETCH_LAST_LAYER



export class interceptor {
  static #storage_ = new Map()
  static init = () => {
    window.original_fetch = window.fetch;

    window.fetch = async (...args) => { 
      if (!(args[0] instanceof Request)) {
        if (args.length > 0) {
          for (const [url, data] of this.#storage_) {
            if (data.regex.test(args[0])) {
              if (data.callback) {
                const response = data.callback(data.without_args_passing ? undefined : args)
                if (!data.self_control) {
                  return await window.original_fetch(...args)
                } else {
                  return response
                }
              }
              console.error(`Callback associated with regex_url_string: "${args[0]}" not found`)
              continue
            }
          }
        } else {
          console.log("This error should not exist, but if you see it, then for some reason itd decided to send an invalid request and this is not a problem on the part of the extension, lol")        
          return
        }
      } else if (vars.interceptor_inability_warn) {
        // Currently, the interceptor is not capable of processing Request objects | FIX !!!
        console.warn(`It seems that the interceptor cannot process the Request() object, huh ( obj : ${args[0]} )`)
      }
      return await window.original_fetch(...args)
    }
  }
  static exists = (regex_url_string) => {
    if (this.#storage_.has(regex_url_string)) {
      return true
    }
    return false
  }

  // data.self_control
  // data.callback
  // data.without_args_passing
  //
  // data.suppress_overwrite_warning
  //
  // USE INSIDE CALLBACKS : window.original_fetch !1!1!!1

  static set = (regex_url_string, data) => {
    if (!data.suppress_overwrite_warning && this.exists(regex_url_string)) {
      console.warn(`The association for the regex_url_string: "${regex_url_string}" already exists and will be overwritten!`)
    }
    data.suppress_overwrite_warning = undefined
    if (!data.callback) {
      return false
    }
    data.regex = new RegExp(regex_url_string)
    this.#storage_.set(regex_url_string, data)
    return true
  }
  static delete = (regex_url_string) => {
    if (!this.exists(regex_url_string)) {
      console.error(`Association for reference: "${regex_url_string}" does not exist`)
      return false
    }
    this.#storage_.delete(regex_url_string)
    return true
  }
}

export const get_new_token = async () => {
  const response = await fetch("https://xn--d1ah4a.com/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  if (!response.ok) {
    return false
  }
  const data = await response.json()
  const new_token = data.accessToken
  return new_token
}

export async function fresh_fetch(url, data, layer_ = 1) {
  if (layer_ > FETCH_LAST_LAYER) {
    throw new Error("Error retrieving authorization key (Reached last try)")
  }
  if (data.headers) {
    data.headers.Authorization = `Bearer ${vars.get_token()}`
  }
  const response = await fetch(url, data)
  if (!response.ok) {
    if (response.status === 401) {
      const tmp = await get_new_token();
      vars.set_token(tmp ?? "")
      return await fresh_fetch(url, data, layer_ + 1)
    } else {
      throw new Error("Invalid request")
    }
  }
  return response
}
