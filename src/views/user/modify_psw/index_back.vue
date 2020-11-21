<template>

<div class="dialog">
<el-dialog
 
  :visible.sync="centerDialogVisible"
  :close-on-click-modal=false
  width="20%"
  center>
 <div class="infor">
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</el-dialog>
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
        centerDialogVisible:true,
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

<style>
 .dialog{
      height: 300px;
    }
    .infor{
        width: 300px;
        height: 230px;
        display: flex;
        justify-content: center;
        align-items: center;
    } 
</style>