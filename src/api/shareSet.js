import request from '@/utils/request'

/**
 * 添加分享设置
 * @param {*}
 */
export function insertShareConfigInfo(params) {
  return request({
    url: '/shareConfig/insertInfo',
    method: 'post',
    data: params
  })
}

/**
 * 分享设置列表
 * @param {*}
 */
export function getShareConfigInfo(params) {
  return request({
    url: '/shareConfig/getList',
    method: 'post',
    data: params
  })
}

/**
 * 修稿分享设置
 * @param {*}
 */
export function updateShareConfigInfo(params) {
  return request({
    url: '/shareConfig/updateInfo',
    method: 'post',
    data: params
  })
}

/**
 * 获取分享设置的内容
 */
export function shareConfigGetDetail(params) {
  return request({
    url: '/shareConfig/getDetail',
    method: 'post',
    data: params
  })
}

/**
 * 更新分享设置的内容
 */
export function shareConfigUpdate(params) {
  return request({
    url: '/shareConfig/update',
    method: 'post',
    data: params
  })
}

/**
 * 启用、停用的接口
 */
export function shareConfigIsEnable(params) {
  return request({
    url: '/shareConfig/isEnable',
    method: 'post',
    data: params
  })
}

/**
 * 新增分享任务
 */
export function shareConfigAdd(params) {
  return request({
    url: '/shareConfig/add',
    method: 'post',
    data: params
  })
}