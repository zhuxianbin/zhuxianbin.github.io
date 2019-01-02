import request from '@/utils/request'
/**
 * 获取合伙人列表
 * @param {*}
 */
export function getPartnerInfoList(params) {
  return request({
    url: '/partnerInfo/getPartnerInfoList',
    method: 'post',
    data: params
  })
}
/**
 * 获取权限所属公司的列表
 * @param {*}
 */
export function getCompanyRelationListBySn(params) {
  return request({
    url: '/partnerInfo/getCompanyRelationListBySn',
    method: 'post',
    data: params
  })
}
/**
 * 获取城市的接口
 * @param {*}
 */
export function getAllAreasInfo(params) {
  return request({
    url: '/partner/activity/getAllAreasInfo',
    method: 'post',
    data: params
  })
}
/**
 * 获取权限所属公司的列表
 * @param {*}
 */
export function getCompanyRelationListAndSn(params) {
  return request({
    url: '/partnerInfo/getCompanyRelationListAndSn',
    method: 'post',
    data: params
  })
}
/**
 * 解禁
 * @param {*}
 */
export function enablePartnerInfo(params) {
  return request({
    url: '/partnerInfo/enablePartnerInfo',
    method: 'post',
    data: params
  })
}
/**
 * 禁用
 * @param {*}
 */
export function disablePartnerInfo(params) {
  return request({
    url: '/partnerInfo/disablePartnerInfo',
    method: 'post',
    data: params
  })
}
/**
 * 查询禁用记录列表
 * @param {*}
 */
export function getPartnerInfoChangeLogList(params) {
  return request({
    url: '/partnerInfo/getPartnerInfoChangeLogList',
    method: 'post',
    data: params
  })
}

/**
 * 编辑是否为员工
 * @param {*}
 */
export function isEmployee(params) {
  return request({
    url: '/partnerInfo/isEmployee',
    method: 'post',
    data: params
  })
}
/**
 * 获取合伙人权限 /authority/customLogin
 */
export function customLogin(params) {
  return request({
    url: '/authority/customLogin',
    method: 'post',
    data: params
  })
}
