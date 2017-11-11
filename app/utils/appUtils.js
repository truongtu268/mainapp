import { Modal, message } from 'antd'

const WEBAPP_DOMAIN = process.env.NODE_ENV === 'production' ? 'perkfec.com' : 'localhost:3000'

/**
 * Helper mapping email -> other info
 */
export function userMap(suggestions, receiver) {
  return receiver.map((email) => suggestions.find(item => item.mail === email))
}

export function checkContent(content) {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return false
  }
  return true
}

/**
 * Return an array with the separator interspersed between
 * each element of the input array.
 */
export function intersperse(arr, sep = ', ') {
  if (arr.length === 0) {
    return []
  }
  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]])
}

/**
 * re-format invite link base on subDomain & web url
 */
export function formatInviteLink(subDomain, inviteCode) {
  return `//${subDomain}.${WEBAPP_DOMAIN}/linkinvitejointeam/${inviteCode}`
}

export function anonymousfeedbackUrl(subDomain, dataTemp) {
  // // TODO: rename url to feedbackCode in API
  const data = dataTemp
  data.feedbackCode = data.code
  delete data.code
  // // END
  return `//${subDomain}.${WEBAPP_DOMAIN}/anonymous/${data.feedbackCode}`
}

// export function feedbackUrl(dataTemp) {
//   return `${WWW_ROOT}/feedback/${data.feedbackCode}`;
// }

// Show Modal/Message to inform user
// about action
export function showModal(type, text, okFunction) {
  Modal[type]({
    title: text,
    okText: 'OK',
    afterClose: okFunction,
    confirmLoading: true,
  })
}

export function showMessage(type, text, delay = 3) {
  message[type](text, delay)
}


/**
 * Create custom Error handle for Redux
 */
export function ReduxError(...args) {
  this.has_error = false
  args.forEach((key) => {
    this[key] = {
      message: '',
    }
  })
}

ReduxError.prototype = {
  setError: function setError(key, text) {
    const proto = Object.getPrototypeOf(this)
    return Object.assign(Object.create(proto), this, {
      has_error: true,
      [key]: { message: text },
    })
  },

  clearError: function clearError(key) {
    const proto = Object.getPrototypeOf(this)
    const newOb = Object.assign({}, this, {
      [key]: { message: '' },
    })
    const hasError = Object.values(newOb).filter(item => item.message && item.message !== '').length
    return Object.assign(Object.create(proto), newOb, {
      has_error: hasError !== 0,
    })
  },
}

/**
 * Set uppercase for first letter of a string
 * ex: pham quan -> Pham Quan
 * @param  {string} str
 */
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}


/**
 * VALIDATOR
 *
 */
export function validatePhoneNumber(rule, value, callback) {
  const num = (value || '').toString().replace(/\D+/g, '')
  const error = Number.isNaN(Number.parseInt(num, 10)) ? 'Invalid number' : null
  if (typeof callback === 'function') callback(error)
}

/**
 * Render HTML inside React component
 * @param  {string} text
 * @return [return HTML markup]
 */
export function renderHTML(text) {
  return { __html: text }
}

/**
 * TADAA SOUND
 *
 */
export function tadaaBeep() {
  (new Audio('data:audio/wav;base64,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Od8b4Rbbn+iW6jKGuxFFCq7vBvk8ibFLuSKMGociowl33cmyJeWYxpuJnmuV7BNvk18FRYJdvcKo9ENF1UxBTUUzLjk5LjVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7ksStgRP+CPoHpNTCWTQe2GSZmVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQIBk4CudZHg1xYTyLWWjzTEmARZZgVyRaLgrwWi5ErTkfJyTJSxyTJG4aRZi0XRqjkpw6qSdyNNpsmo/mozlUclTHEiWuaRI1zSJGWOJEZ4zNqzN0KoUtQFVjMBFwCZqoVj6AqvhRKrGYUewEzVQoCeolVjBlUmZm6wpjqqJLVVWMwEWzM2qseqquyqvGZj2ZjqqAnqAqsYMKVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5LEhgPTMgreIxhzyAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uSxDkDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==')).play()
}
