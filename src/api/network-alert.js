import request from '@/utils/request'

/**
 * 获取网点预警的列表
 * @param {*}
 */
export function getWarningList(params) {
  return request({
    url: '/dotwarning/getWarningList',
    method: 'post',
    data: params
  })
}

/**
 * 获取网点预警车辆状态列表
 * @param {*}
 */
export function getDicts(params) {
  return request({
    url: '/dotwarning/getDicts',
    method: 'post',
    data: params
  })
}

/**
 * 查询网点的车辆列表
 * @param {*}
 */
export function getCarByDot(params) {
  return request({
    url: '/dotwarning/getCarByDot',
    method: 'post',
    data: params
  })
}

/**
 * 查获取工单任务类型
 * @param {*}
 */
export function selectWorkOrderTypeDicts(params) {
  return request({
    url: '/dict/selectWorkOrderTypeDicts',
    method: 'post',
    data: params
  })
}

/**
 * 查寻网点
 * @param {*}
 */
export function getBranchDotsByPage(params) {
  return request({
    url: '/branchDot/getBranchDotsByPage',
    method: 'post',
    data: params
  })
}

/**
 * 创建工单的效果
 * @param {*}
 */
export function addWorkOrder(params) {
  return request({
    url: '/workOrder/addWorkOrder',
    method: 'post',
    data: params
  })
}
