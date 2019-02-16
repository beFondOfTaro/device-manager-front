/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  return /.+/.test(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
