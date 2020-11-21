import request from '@/utils/request'

/**提交企业认证资料 */
export function auth(data) {
  return request({
    url: '/company/auth',
    method: 'post',
    data
  })
}

/**查询登记的企业信息 */
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

/**企业详情 */
export function findById(data) {
  return request({
    url: '/company/findById',
    method: 'get',
    params: {
      id: data
    }
  })
}

/**审核 */
export function audit(data) {
  return request({
    url: '/company/audit',
    method: 'post',
    data
  })
}

