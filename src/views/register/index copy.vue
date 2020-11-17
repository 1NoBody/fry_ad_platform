<template>
<!-- isShow -->
    <el-dialog
        title="账号注册"
        :visible.sync="isShow" 
        width="30%"
        center
        >
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item  label="年龄" prop="age">
    <el-input id='age' v-model.number="ruleForm.age"></el-input>
    <img class="imgg" width="80px" height="30px" src="http://www.frypt.com/public/index.php/user/verify" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>


        <!-- <div class="container">
            <div class="input-c">
            <label>账号:</label><input class="bk" placeholder="账号" v-model="username"/>
            </div>
            <div class="input-c">
            <label>密码:</label><input class="bk" placeholder="密码" ref='psw'/>
            </div>
            <div class="input-c">
            <label>确认密码:</label><input class="bk" placeholder="确认密码" v-model="password"/>
            </div>
            <div class="input-c">
            <label>验证码:</label><input class="bk1" placeholder="验证码" v-model='captcha' @blur="checkCaptcha"/>
            <div class="yzm">
                <img width="80px" height="30px" src="http://www.frypt.com/public/index.php/user/verify" />
            </div>
            </div>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="hide">取 消</el-button>
            <el-button type="primary" @click="register">提 交</el-button>
        </span> -->
        </el-dialog>
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
          isShow: true,
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        //this.$refs[formName].resetFields();
        this.$router.push({ path: '/' }) 
      }
    }
  }
</script>

<!-- 
<script>
export default {
    name: "Register",
    props: ['isShow'],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } 
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.$refs.psw.data) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback(this.password = value);
            }
        };
        return {
            username: '',
            password: '',
            captcha: '',
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        } 
    },
    methods:{
        hide: function() {
            this.$emit('hide',false);
        },
        checkCaptcha: function() {
            this.$store.dispatch('user/checkCaptcha', this.captcha).then((res) => {
                alert(res.msg);  // TD:解析验证码
            })
        },
        register: function() {
            var data = {username: this.username, password: this.password};
            alert(data.username + ':' + data.password);
            die;
            this.$store.dispatch('user/register', data).then((res) => {
                alert(res.msg);  // TD:注册
            })
        }
    },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
}
.container label {
  float: left;
  width: 6em;
  margin-right: 1em;
  text-align: right;
}
.input-c {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
.bk {
  width: 220px;
  height: 30px;
  border: 1px solid gainsboro;
}
.bk1 {
  width: 120px;
  height: 30px;
  border: 1px solid gainsboro;
}
.yzm {
  border: 1px solid white;
  width: 80px;
  height: 30px;
  float: right;
  margin-left: 20px;
}
</style>
-->
<style>
  .el-input #age{
        width: 20px;
  }
</style>
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
  .imgg {
      width: 20px;
      height: 20px; 
  }
}
</style>