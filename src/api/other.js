import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/other/uploadimg',
    method: 'post',
    data
  })
}

