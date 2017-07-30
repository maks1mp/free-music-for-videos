export function debounce(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => callback.apply(context, callbackArgs)
  
  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }
  
  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}
