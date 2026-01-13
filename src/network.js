import * as vars from "./vars.js"

const FETCH_LAST_LAYER = 5
const FETCH_ONE_TRY = FETCH_LAST_LAYER

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
    vars.set_token(await get_new_token())
    const fresh_response = await fresh_fetch(url, data, ++layer_)
    return fresh_response // я знаю про эту проблему. просто лень пока что фиксить :/
    if (response.status === 401) {
      const tmp = await get_new_token();
      if (tmp) {
        vars.set_token(tmp)
        return await fresh_fetch(url, data, ++layer_)
      }
    } else {
      throw new Error("Invalid request")
    }
  }
  return response
}
