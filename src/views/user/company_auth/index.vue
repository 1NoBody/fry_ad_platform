<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <div class="tip">
    <p v-model="text">{{text}}</p>
  </div>
  <el-form-item label="企业名称" prop="company">
    <el-input v-model="ruleForm.company"></el-input>
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
          :before-upload="beforeAvatarUpload"
          :http-request="upload"
          :auto-upload="true"
          >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
  <el-form-item id="el_btn">
        <el-button id="btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <!-- <el-button id="btn2" @click="resetForm('ruleForm')">重置</el-button> -->
  </el-form-item>
</el-form>
</template>

<script>
import store from '@/store'

  export default {
    data() {
      return {
        imageUrl: '',
        text: '您的账户资料信息尚未完善，请先完善账户信息。',
        ruleForm: {
          company: '',
          lxrname:'',
          lxrphone:'',
          lxremail:'',
          wechat:'',
          number:'',
          img_url:'',
        },
        rules: {
          company: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            // { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
           lxrname: [
            { required: true, message: '请输入联系人名字', trigger: 'blur' },
            // { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
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
            // { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入营业执照号', trigger: 'blur' },
            // { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('company/auth', this.ruleForm).then(res => {
                alert(res.msg);
            });
            this
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
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        var This = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
           // alert(this.result); //base64编码
            This.imageUrl = this.result;
        }
        return isJPG && isLt2M;
      },
      upload() {
          // 延时控制
          setTimeout(() => {
            this.$store.dispatch('other/uploadImg', this.imageUrl).then(res => {
                if(res.code == 0) {
                    this.img_url = res.img_url;
                }else if(res.code == 1) {
                    this.$message.error(res.msg);
                }
            });
          }, 200);
      }
    },
    mounted() {
      this.$store.dispatch('company/findById',this.$route.params.id > 0 ? this.$route.params.id : store.getters.user_id ).then((res) => {
        if(res.code == 0 && res.data != null){
          this.ruleForm.company = res.data.company;
          this.ruleForm.lxrname = res.data.name;
          this.ruleForm.lxrphone = res.data.telephone;
          this.ruleForm.lxremail = res.data.email;
          this.ruleForm.wechat = res.data.vx;
          this.ruleForm.number = res.data.license;
          this.ruleForm.img_url = res.data.license_img;
          // 显示图片
          this.imageUrl = res.data.license_img;
          // 提示语
          this.text = "提示信息：" + res.data.reason;
        }
      })
  }
}
</script>

<style scoped>
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
    /* 自定义 */
    .el-form-item{
        width: 600px;
        margin:30px auto;
        
    }
    #el_btn{
        display: flex;
        justify-content: center;
        align-items: center;
      
    }
    #btn{
      margin-right: 100px;
      width: 200px;
    }
    .tip{
      width: 600px;
      height: 80px;
      border: 1px solid gainsboro;
      margin: 20px auto;
    }
    .tip p{
      color: red;
      margin: 20px;
    }
  
</style>