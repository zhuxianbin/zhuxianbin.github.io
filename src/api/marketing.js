import request from '@/utils/request'

/**
 * 获取文字编辑
 * @param {*}
 */
export function artwordsSettingGetDetail(params) {
  return request({
    url: '/partner/artwordsSetting/getDetail',
    method: 'post',
    data: params
  })
}

/**
 * 修改文字编辑
 * @param {*}
 */
export function artwordsSettingUpdate(params) {
  return request({
    url: '/partner/artwordsSetting/update',
    method: 'post',
    data: params
  })
}

/**
 * 获取图片详情
 * @param {*}
 */
export function advertisingSettingGetAllDetail(params) {
  return request({
    url: '/partner/advertisingSetting/getAllDetail',
    method: 'post',
    data: params
  })
}

/**
 * 修改图片详情
 * @param {*}
 */
export function advertisingSettingUpdateAll(params) {
  return request({
    url: '/partner/advertisingSetting/updateAll',
    method: 'post',
    data: params
  })
}

/**
 * 获取微信分享
 * @param {*}
 */
export function ShareStyleSettingGetDetail(params) {
  return request({
    url: '/partner/ShareStyleSetting/getDetail',
    method: 'post',
    data: params
  })
}

/**
 * 保存微信设置信息
 * @param {*}
 */
export function ShareStyleSettingUpdate(params) {
  return request({
    url: '/partner/ShareStyleSetting/update',
    method: 'post',
    data: params
  })
}

/**
 * 获取奖励设置
 */
export function bonusConfigGet(params) {
  return request({
    url: 'partner/bonusConfig/get',
    method: 'post',
    data: params
  })
}

/**
 * 修改奖励设置
 */
export function bonusConfigUpdate(params) {
  return request({
    url: 'partner/bonusConfig/update',
    method: 'post',
    data: params
  })
}

/**
 * 获取奖励设置 /partner/signinConfig/update
 */
export function signinConfigGetDetail(params) {
  return request({
    url: '/partner/signinConfig/getDetail',
    method: 'post',
    data: params
  })
}

/**
 * 获取奖励设置
 */
export function signinConfigUpdate(params) {
  return request({
    url: '/partner/signinConfig/update',
    method: 'post',
    data: params
  })
}
