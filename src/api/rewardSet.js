import request from '@/utils/request'

/**
 * 查询整租列表
 * @param {*}
 */
export function getStrategyBaseList(params) {
  return request({
    url: '/strategy/getStrategyBaseList',
    method: 'post',
    data: params
  })
}

/**
 * 查询长短租列表
 * @param {*}
 */
export function getStrategyBaseLongList(params) {
  return request({
    url: '/strategy/getStrategyBaseLongList',
    method: 'post',
    data: params
  })
}

/**
 * 新增奖励金设置
 * @param {*}
 */
export function addPartnerBonusSetting(params) {
  return request({
    url: '/partnerBonusSetting/addPartnerBonusSetting',
    method: 'post',
    data: params
  })
}

/**
 * 修改奖励金设置
 * @param {*}
 */

export function updatePartnerBonusSettingById(params) {
  return request({
    url: '/partnerBonusSetting/updatePartnerBonusSettingById',
    method: 'post',
    data: params
  })
}

/**
 * 获取操作记录
 * @param {*}
 */

export function getOperateLogList(params) {
  return request({
    url: '/partnerBonusSetting/getOperateLogList',
    method: 'post',
    data: params
  })
}

