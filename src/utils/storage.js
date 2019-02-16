/**
 * 设置本地存储
 * @param key
 * @param value
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 获取本地存储
 * @param key
 * @param value
 * @returns {any}
 */
export function getLocalStorage(key) {
  const value = localStorage.getItem(key)
  if (value === undefined || value === null) {
    return null
  }
  return JSON.parse(value)
}
