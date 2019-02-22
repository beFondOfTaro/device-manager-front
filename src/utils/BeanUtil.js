/**
 * 深拷贝对象
 * @param origin 原始对象
 * @returns {any} 新的对象
 */
export function deepCloneObject(origin) {
  return JSON.parse(JSON.stringify(origin))
}
