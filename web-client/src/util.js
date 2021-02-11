
const debounce = function(func, wait, immediate) {
  let timeout
  return function() {
    const context = this, args = arguments
    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

const encrypt = (value, encryptKey) => value.split('')
  .map(char => (char.charCodeAt(0) ^ encryptKey).toString())
  .join(',')

const decrypt = (value, encryptKey) => value.split(',')
  .map(code => String.fromCharCode(parseInt(code) ^ encryptKey))
  .join('')

const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString()
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(encrypt(JSON.stringify(value), 13))

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey
    let optionValue = options[optionKey]
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue
    }
  }

  document.cookie = updatedCookie
}

const getCookie = (name) => {
  // eslint-disable-next-line no-useless-escape
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"))
  if(matches === null || !matches[1]) {
    return undefined
  }
  const decoded = decrypt(decodeURIComponent(matches[1]), 13)
  return matches ? JSON.parse(decoded) : undefined
}


module.exports = {
  debounce, getCookie, setCookie
}
