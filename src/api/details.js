import request from '@/utils/request'

/**
 * 获取团队管理的下级列表
 * @param {*}
 */
export function getTeamPartnerInfos(params) {
  return request({
    url: '/partnerInfo/getTeamPartnerInfos',
    method: 'post',
    data: params
  })
}

/**
 * 获取团队管理的上级列表
 * @param {*}
 */
export function getGrandparentPartnerInfos(params) {
  return request({
    url: '/partnerInfo/getGrandparentPartnerInfos',
    method: 'post',
    data: params
  })
}
/**
 * 获取收入明细的已到账列表
 * @param {*}
 */
export function getArrivedIncomeDetails(params) {
  return request({
    url: '/partnerInfo/getArrivedIncomeDetails',
    method: 'post',
    data: params
  })
}
/**
 * 获取收入明细的未到账列表
 * @param {*}
 */
export function getNotArrivedIncomeDetails(params) {
  return request({
    url: '/partnerInfo/getNotArrivedIncomeDetails',
    method: 'post',
    data: params
  })
}
/**
 * 分享记录
 * @param {*}
 */
export function getShareInfos(params) {
  return request({
    url: '/shareInfo/getInfo',
    method: 'post',
    data: params
  })
}

/**
 * 兑换记录
 * @param {*}
 */
export function getExchangeRecord(params) {
  return request({
    url: '/partnerInfo/getExchangeRecord',
    method: 'post',
    data: params
  })
}
