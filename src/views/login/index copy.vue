<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: ljx</span>
        <span> password: 123456</span>
      </div>
      <!-- 注册 -->
      <el-button type="text" @click="showRegister">注册账号</el-button>


      <!-- <el-dialog
        title="账号注册"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <div class="container"> -->
          <!-- 注册表单 -->
          <!-- <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="Username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
          </el-form> -->
      

          <!-- <div class="input-c">
            <label>账号:</label><input class="bk" placeholder="账号" />
          </div>
          <div class="input-c">
            <label>密码:</label><input class="bk" placeholder="密码" />
          </div>
          <div class="input-c">
            <label>确认密码:</label><input class="bk" placeholder="确认密码" />
          </div>
          <div class="input-c">
            <label>验证码:</label><input class="bk1" placeholder="验证码" />
            <div class="yzm"> -->
              <!-- TD:刷新验证码 -->
              <!-- <img width="80px" height="30px" src="http://www.frypt.com/public/index.php/user/verify" />
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="registerSubmit">提 交</el-button>
        </span> -->
        <!-- </div>
      </el-dialog> -->
    </el-form>
      <!-- <div> -->
          <!-- 注册窗口 -->
      <!-- <Register :isShow="centerDialogVisible" @hide="noShow"/> -->
      <!-- </div> -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Message from 'element-ui'
//import axios from 'axios'
import Register from '@/views/register'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // 控制用户名只能是：admin editor
      // if (!validUsername(value)) {
      //   callback(new Error('Please enter the correct user name'))
      // } else {
      //   callback()
      // }

      // 非空判断
      if(!value.trim()){
        callback(new Error('Please enter the correct user name'));
      }else{
        callback() // 缺失导致validate()一直校验失败
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {    
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      centerDialogVisible:  true//false
    }
  },
  components:{Register},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showRegister: function () {
      //this.centerDialogVisible = true;
      this.$router.push({ path: '/register' }) 
    },
    noShow: function(val){
      this.centerDialogVisible = val;
    },
    registerSubmit: function(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            // 登录逻辑
            switch(res.code){
              case 0:   //登录成功
                //alert(res.msg);
                // Message({
                // message: res.msg,
                // type: 'info',
                // duration: 5 * 1000
                // });
                this.$router.push({ path: this.redirect || '/' }) 
                break;
              case 1:   //登录失败
              case 2:   //用户未注册
                alert(res.msg);
                break;
              default:
                break;
            }
          }).catch(() => {
            this.loading = false
          })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleLogin() {  
      /* 自定义ajax请求
      axios.post('http://www.frypt.com/public/index.php/user/login', {
      username: 'ljx',
      password: '123456'
      })
      .then(res => {
        // 请求成功，处理请求数据
        console.log(res);
      })
      .catch(error => {
        // 请求失败，执行错误操作
        console.log(error);
      });
      */
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            // 登录逻辑
            switch(res.code){
              case 0:   //登录成功
                //alert(res.msg);
                // Message({
                // message: res.msg,
                // type: 'info',
                // duration: 5 * 1000
                // });
                this.$router.push({ path: this.redirect || '/' }) 
                break;
              case 1:   //登录失败
              case 2:   //用户未注册
                alert(res.msg);
                break;
              default:
                break;
            }
          }).catch(() => {
            this.loading = false
          })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
