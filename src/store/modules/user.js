import { login, checkCaptcha, register, changepsw, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    user_id: 0,
    role: 0, // 保存用户角色信息 0：普通用户 1：管理员
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, user_id) => {
    state.user_id = user_id
  },
  SET_ROLES: (state, role) => {
    state.role = role
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        //const { data } = response
        //commit('SET_TOKEN', data.token)
        //setToken(data.token)

        // 使用假数据token
        commit('SET_TOKEN', 'user_token')
        setToken('user_token');  
        commit('SET_NAME', response.username)
        commit('SET_ID', response.user_id)
        commit('SET_ROLES', response.role)   
        resolve(response) 
        //resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
  // check captcha
  checkCaptcha({ commit }, captcha) {
    return new Promise((resolve, reject) => {
      checkCaptcha(captcha.trim()).then(response => {    
        resolve(response) 
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
  // user register
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {   
        resolve(response) 
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
  // user changepsw
  changepsw({ commit }, newpsw) {
    return new Promise((resolve, reject) => {
      changepsw({ password: newpsw }).then(response => {   
        resolve(response) 
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

