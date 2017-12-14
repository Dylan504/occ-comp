import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/getUsers',
    method: 'post',
    params
  })
}

export function getUserListByPage(params) {
  return request({
    url: '/getUserListByPage',
    method: 'get',
    params
  })
}

