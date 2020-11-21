<template>
<div class="bk">
<div class="changepsw">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item id='btn'>
    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>
<script>
  export default {
    data() {
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
        ruleForm: {
          pass: '',
          checkPass: '',
         
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],     
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$store.dispatch('user/changepsw', this.ruleForm.checkPass).then(res => {
              alert(res.msg)
              if(res.code == 1){
                // 失败
              }else{
                // 成功
                this.$router.push({path: '/login'});
              }     
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
    .bk{
      height: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .changepsw{
      border: 1px solid gainsboro;
      width: 400px;
      height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .demo-ruleForm{
      display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 50px;
    }
    #btn{
      margin-right: 60px;
    }
</style>