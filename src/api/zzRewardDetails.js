import request from '@/utils/request'

/**
 * 获取整租奖金列表
 * @param {*}
 */
export function getPartnerBonusDetailStagList(params) {
  return request({
    url: '/partnerBonusDetail/getPartnerBonusDetailStagList',
    method: 'post',
    data: params
  })
}
/**
 * 查询整租策略详情
 * @param {*}
 */
export function getStrategyBase(params) {
  return request({
    url: '/strategy/getStrategyBase',
    method: 'post',
    data: params
  })
}
