import request from '@/utils/request'

export function auth(data) {
  return request({
    url: '/company/auth',
    method: 'post',
    data
  })
}

export function findAll(data) {
  return request({
    url: '/company/findAll',
    method: 'get',
    params: {
      num: data.num,
      page: data.page
    }
  })
}

export function findById(data) {
  return request({
    url: '/company/findById',
    method: 'get',
    params: {
      id: data
    }
  })
}

export function audit(data) {
  return request({
    url: '/company/audit',
    method: 'post',
    data
  })
}

