import request from '@/utils/request'

/*
*获取五期系统的优惠券数据
*bonusExchangeSetting/getCoupons?token=eca7c9324f8b4cd9a0e999226c7b5b6f&companyId=31&type=mj&isEnable=1&keyName=租售
*/

export function getFiveCoupons(params) {
  return request({
    url: '/bonusExchangeSetting/getCoupons',
    method: 'post',
    data: params
  })
}
/*
*提交插入五期优惠券的功能
*bonusExchangeSetting/batchInsertBonusExchangeSetting
*/
export function batchInsertBonusExchangeSetting(params) {
  return request({
    url: 'bonusExchangeSetting/batchInsertBonusExchangeSetting',
    method: 'post',
    data: params
  })
}

/*
*获取合伙人优惠券的接口
*bonusExchangeSetting/getBonusExchangeSetting
*/
export function getBonusExchangeSetting(params) {
  return request({
    url: '/bonusExchangeSetting/getBonusExchangeSetting',
    method: 'post',
    data: params
  })
}

/*
*更新消耗金额设置
*bonusExchangeSetting/updateBonusExchangeSetting
*/
export function updateBonusExchangeSetting(params) {
  return request({
    url: '/bonusExchangeSetting/updateBonusExchangeSetting',
    method: 'post',
    data: params
  })
}

/*
*获取优惠券详情的接口
*bonusExchangeSetting/updateBonusExchangeSetting
*/
export function getCouponsDetail(params) {
  return request({
    url: '/bonusExchangeSetting/getCouponsById',
    method: 'post',
    data: params
  })
}
