<template>
  <div class="infor">
    <div class="bgn">
      <div class="title">
        <h1>账号资料</h1>
      </div>
      <div class="bkn">
        <p>您的账户资料信息尚未完善，请先完善账户信息。</p>
      </div>
      <div class="inf">
        <label>
          企业名称:
        </label><input type="text" class="bk">
      </div>
      <div class="inf">
        <label> 联系人姓名:</label><input type="text" class="bk">
      </div>
      <div class="inf">
        <label>联系电话:</label><input type="text" class="bk">
      </div>
      <div class="inf">
        <label>联系人邮箱:</label><input type="text" class="bk">
      </div>
      <div class="inf">
        <label>微信:</label><input type="text" class="bk">
      </div>
      <div class="inf">
        <label>QQ:</label><input type="text" placeholder="( 选填 )" class="bk">
      </div>
      <div class="inf">
        <label>营业执照号:</label><input type="text" class="bk">
      </div>
     <div class="inf">
        <div class="inf1">
          <label>上传营业执照:</label>
        </div>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        
        <!-- <p>图片使用JPG格式,图片大小不能超过2M。</p> -->
        </div>
        <button class="btn" >
      <p>提交</p>
      </button>
      </div>
    </div>
</template>

<style>
  /* .el-button {   
  width: 400px;
  } */
</style>

<script>
export default {
    name: 'userinfo',
    data() {
        return {
        }
    },
    
}
</script>

<script>
  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
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
      
    }
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

<style scoped>
    .infor{
         display: flex;
        flex-direction: column;
        justify-content:center;
        align-content:flex-start;
        align-items: center;
        height: 800px;
    }
    .bkn{
      width: 600px;
      height: 80px;
      border: 1px solid gainsboro;
      margin-bottom: 20px;
    }
    .bkn p{
      color: red;
      margin: 20px;
    }
    .inf{
       display: flex;
        justify-content:center;
        align-items: center;
        margin: 10px;
    }
    .inf label{
          float: left; width: 6.5em; margin-right: 1em; text-align: right;
    }
    .bgn{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-content:flex-start;
        align-items: center;
        background-color: white;
        width: 1000px;
        height: 800px;
    }
    .bk{
        border: 1px solid gainsboro;
        height: 30px;
        width: 350px;
    }
    .inf1{
        margin-left:-170px ;
    }
    .tltle{
      margin-bottom: 50px;;
    }
    .btn{
  background-color:rgb(2, 197, 209);
  border: 1px solid white;
  width: 400px;
  height: 50px;
  border-radius: 10px;
}
.btn p{
  color: white;
  margin: 5px;
}
</style>

