/**
 * 格式化时间
 * @param timestamp 时间戳
 * @returns {string} yyyy.mm.dd
 */
export function getParsedTime(timestamp) {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return y + '.' + (m < 10 ? '0' + m : m) + '.' + (d < 10 ? '0' + d : d)
}
