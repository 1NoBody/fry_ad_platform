<template>
  <div class="login-container">
      <el-dialog
        title="账号注册"
        :visible.sync="Visible"
        width="30%"
        center
      >
        <div class="container">
          <!-- <h3>{{centerDialogVisible}}</h3> -->
          <div class="input-c">
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
            <div class="yzm">
              <img width="80px" height="30px" src="@/assets/yzm.jpg" />
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="checkVisible">{{centerDialogVisible}}</el-button>
          <el-button type="primary" @click="Visible = false"
            >提 交</el-button
          >
        </span>
      </el-dialog>

      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: 123456</span>
      </div>
  </div>
</template>


 

<script>
  export default {
    name: 'Register',
    props:['Visible'],
    data() {
      return {
        centerDialogVisible: this.Visible
      };
    },
    methods:{
      checkVisible: function () {
        //this.props.Visible = false;
        //this.centerDialogVisible = false;
        this.$emit("zf",false);
      }
    }
  };
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
}
.input-c {
  margin: 10px;
}
.container label {
  float: left;
  width: 6em;
  margin-right: 1em;
  text-align: right;
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
