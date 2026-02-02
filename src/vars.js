let token = ""

// warn about the interceptor's inability to handle Request() objects !!!
//
// - Are you serious?! BRO??? Instead of fixing the mistake, you're WRITING THIS GARBAGE!?!?!?!
// - YUP. F U
// - You do realize that you're having a conversation with yourself, right? YOU ARE THE ONLY ONE WRITING THIS PROJECT!
// - And that prevents me from corresponding with you in the comments?
// - Okay, go ahead and lose your mind
// - But anyway, nobody gives a shit and nobody will look at the project files -_-
// - Fairly :/
export const interceptor_inability_warn = true

export const set_token = (new_val) => {
  token = new_val
}

export const get_token = () => {
  return token
}

export class navbar {
  static min_icon_size = "14px"
  static default_icon_size = "16px"
  static max_icon_size = "18px"
}

