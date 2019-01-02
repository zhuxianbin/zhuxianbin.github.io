import request from '@/utils/request'

/**
 * 获取长短租奖金列表
 * @param {*}
 */
export function getPartnerBonusDetailLongList(params) {
  return request({
    url: '/partnerBonusDetail/getPartnerBonusDetailLongList',
    method: 'post',
    data: params
  })
}
/**
 * 查询长短租的策略详情
 * /strategy/getStrategyBaseLong
 */
export function getStrategyBaseLong(params) {
  return request({
    url: '/strategy/getStrategyBaseLong',
    method: 'post',
    data: params
  })
}
/**
 * 访问长短租的接口到账详情
 */
export function getPartnerBonusDetailList(params) {
  return request({
    url: '/partnerBonusDetail/getPartnerBonusDetailList',
    method: 'post',
    data: params
  })
}
/**
 * 访问长短租或整租的奖励发放明细设置
 */
export function getPartnerBonusSettingInstanceByOrdersNo(params) {
  return request({
    url: '/partnerBonusDetail/getPartnerBonusSettingInstanceByOrdersNo',
    method: 'post',
    data: params
  })
}
