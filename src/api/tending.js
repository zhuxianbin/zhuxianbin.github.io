import request from '@/utils/request'

/**
 * 获取保养列表的功能
 * @param {*}
 */
export function getVehicleMaintainList(params) {
  return request({
    url: '/vehicleMaintain/getVehicleMaintainList',
    method: 'post',
    data: params
  })
}

/**
 * 获取所属区域的接口
 * @param {*}
 */
export function getAreaList(params) {
  return request({
    url: '/vehicleMaintain/getAreaList',
    method: 'post',
    data: params
  })
}

/**
 * 获取车辆类型列表
 * @param {*}
 */
export function getVehicleType(params) {
  return request({
    url: '/vehicleMaintain/getVehicleType',
    method: 'post',
    data: params
  })
}

/**
 * 获取保期的接口
 * @param {*}
 */
export function getMaintainPeriod(params) {
  return request({
    url: '/vehicleMaintain/getMaintainPeriod',
    method: 'post',
    data: params
  })
}

/**
 * 获取维护项目的接口
 * @param {*}
 */
export function getMaintainItemList(params) {
  return request({
    url: '/vehicleMaintain/getMaintainItemList',
    method: 'post',
    data: params
  })
}

/**
 * 获取操作人员的接口
 * @param {*}
 */
export function initMaintainInfo(params) {
  return request({
    url: '/vehicleMaintain/initMaintainInfo',
    method: 'post',
    data: params
  })
}

/**
 * 新增车辆保养记录
 * @param {*}
 */
export function addVehicleMaintainRecord(params) {
  return request({
    url: '/vehicleMaintain/addVehicleMaintainRecord',
    method: 'post',
    data: params
  })
}

/**
 * 获取历史记录的接口
 * @param {*}
 */
export function getMaintainRecordListById(params) {
  return request({
    url: '/vehicleMaintain/getMaintainRecordListById',
    method: 'post',
    data: params
  })
}

/**
 * 删除历史记录的接口
 * @param {*}
 */
export function deleteVehicleMaintainRecord(params) {
  return request({
    url: '/vehicleMaintain/deleteVehicleMaintainRecord',
    method: 'post',
    data: params
  })
}

/**
 * 编辑历史记录的接口
 * @param {*}
 */
export function updateVehicleMaintainRecord(params) {
  return request({
    url: '/vehicleMaintain/updateVehicleMaintainRecord',
    method: 'post',
    data: params
  })
}

/**
 * 获取操作记录的接口
 * @param {*}
 */
export function getOperateLogList(params) {
  return request({
    url: '/vehicleMaintain/getOperateLogList',
    method: 'post',
    data: params
  })
}
