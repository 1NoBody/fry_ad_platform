import request from '@/utils/request'

export function login(data) {
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/user/login',
    method: 'post',
    data
  })
}

// 验证码校验
export function checkCaptcha(captcha) {
  return request({
    url: '/user/verify',
    method: 'get',
    params: {
      captcha
    }
  })
}

// 注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 修改密码
export function changepsw(data) {
  return request({
    url: '/user/changePsw',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}
