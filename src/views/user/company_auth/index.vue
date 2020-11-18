<template>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <div class="bkn">
        <p>您的账户资料信息尚未完善，请先完善账户信息。</p>
      </div>
  <el-form-item label="企业名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="联系人名字" prop="lxrname">
    <el-input v-model="ruleForm.lxrname"></el-input>
  </el-form-item>
   <el-form-item label="联系电话" prop="lxrphone">
    <el-input v-model.number="ruleForm.lxrphone" ></el-input>
  </el-form-item>
   <el-form-item label="联系人邮箱" prop="lxremail">
    <el-input v-model="ruleForm.lxremail"></el-input>
  </el-form-item>
   <el-form-item label="微信" prop="wechat">
    <el-input v-model="ruleForm.wechat"></el-input>
  </el-form-item>
   <el-form-item label="营业执照号" prop="number">
    <el-input v-model="ruleForm.number"></el-input>
  </el-form-item>
  <el-form-item label="上传营业执照" prop="picture">
   <el-upload
          class="avatar-uploader"
          action="http://www.frypt.com/public/index.php/other/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="ruleForm.picture"
          >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item id="btn">
    <el-button id="btn1" type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <!-- <el-button id="btn2" @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        imageUrl: '',
        ruleForm: {
          name: '',
          lxrname:'',
          lxrphone:'',
          lxremail:'',
          wechat:'',
          number:'',
          picture:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
           lxrname: [
            { required: true, message: '请输入联系人名字', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          lxrphone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
            { type: 'number', message: '电话必须为数字'}
          ],
          lxremail: [
            { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
            { pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message:'请输入正确的邮箱地址' }
          ],
          wechat: [
            { required: true, message: '请输入微信', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入营业执照号', trigger: 'blur' },
            { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
         
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
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>

    /* .el-form{
      display: flex;
      justify-content: center;
      align-items: center;
    } */
    .el-form-item{
        width: 600px;
        margin:30px auto;
        
    }
    #btn{
       display: flex;
      justify-content: center;
      align-items: center;
      
    }
    #btn1{
      margin-right: 100px;
      width: 200px;
    }
    .bkn{
      width: 600px;
      height: 80px;
      border: 1px solid gainsboro;
      margin: 20px auto;
    }
    .bkn p{
      color: red;
      margin: 20px;
    }
  
</style>