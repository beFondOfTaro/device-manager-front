/**
 * 设备状态
 */
export class DeviceStatus {
  constructor(code, value) {
    this.code = code
    this.value = value
  }
  static getByCode(code) {
    for (let key in DEVICE_STATUS) {
      let item = DEVICE_STATUS[key]
      if (item.code === code) {
        return item
      }
    }
    console.log(code)
    return null
  }
}

export const DEVICE_STATUS = {
  IN_STORAGE: new DeviceStatus(1, '入库'),
  USING: new DeviceStatus(2, '使用中'),
  DISCARDED: new DeviceStatus(3, '报废'),
  FIXING: new DeviceStatus(4, '维修中')
}
