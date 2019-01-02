import request from '@/utils/request'

/**
 * 获取团队管理的下级列表
 * @param {*}
 */
export function inviteeGetList(params) {
  return request({
    url: '/partner/InvitedPeople/getList',
    method: 'post',
    data: params
  })
}

