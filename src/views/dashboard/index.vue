<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <p>您的账户资料信息尚未完善，请先完善账户信息，立即跳转至完善账户信息界面。</p>
    <button class="btn" @click="notarize">
      <p>确定</p>
      </button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
  },
  methods: {
        notarize() {
               localStorage.setItem('token', 'i_am_token')
            this.$router.push({ path: '/menu2' 
                    })
        },
}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  align-items: center;
}
.dashboard-container p{
  font-size: 20px;
}
.btn{
  background-color:rgb(2, 197, 209);
  border: 1px solid white;
  width: 240px;
  height: 50px;
  border-radius: 10px;
  margin-top: 30px;
  
}
.btn p{
  color: white;
  margin: 5px;
}
</style>
