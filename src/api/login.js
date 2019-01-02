import request from '@/utils/request'

export function login(username, passwd) {
  return request({
    url: '/app/sys/groupinfo/sysLogin.action',
    method: 'post',
    data: {
      username,
      passwd
    },
    noToken: true
  })
}

export function getInfo() {
  return request({
    url: '/app/sys/groupinfo/getGroupInfoDetail.action',
    method: 'post',
    data: {}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 修改密码
 */
export function modifyPassword(params) {
  return request({
    url: '/app/sys/groupinfo/modifyPassword.action',
    method: 'post',
    data: params
  })
}

