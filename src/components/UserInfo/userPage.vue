<template>
  <div id="all">
    <div class="header">
      <div style="display:block;height:20px;margin:auto;padding: 10px 15px;text-align: center">
<!--        <i class="el-icon-arrow-left arrow"/>-->
      </div>
      <div style="display:grid" @click="toLogin">
        <el-avatar class="userLog" :size="60" style="font-size: 20px"> {{userInfo.userName}}</el-avatar>
        <div style="color: white;text-align: center">{{userInfo.userName}}</div>
      </div>
    </div>
    <div class="body">
      <div class="listArea" @click="toLogin">
        <i class="el-icon-message "/><span style="font-size: 12px">电子邮箱</span><br/>
        {{userInfo.email}}
      </div>
      <div class="listArea" @click="Loding">
        <i class="el-icon-user "/><span style="font-size: 12px">会员状态</span><br/>
        <span style="font-size: 15px">{{userInfo.state?"会员":"非会员"}}</span>
      </div>
      <div class="listArea" v-if="userInfo.isLogin" @click="changeCode">
        <i class="el-icon-edit "/>修改密码
      </div>
      <div class="listArea" @click="aboutMe">
        <i class="el-icon-reading "/>关于
      </div>
      <div class="listArea" @click="download">
        <i class="el-icon-menu "/>下载app
      </div>
<!--      <div class="listArea">-->
<!--        <i class="el-icon-present "/>捐赠-->
<!--      </div>-->
      <div style="width: 100%;display:flex;">
        <el-button :disabled="!this.userInfo.isLogin" @click="quit" class="quit" type="danger" style="height: 30px;font-size: 15px">退出账号</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'
  import store from '../../store'
  export default {
    data(){
      return{
        userInfo:store.state.userInfo,
      }
    },
    props:{
      drawer:{
        type:Boolean,
        // default:true
      }},
    name: 'userPage',
    mounted () {
      // this.backBtn()

    },
    methods:{

      backBtn(){
        mui.back = function() {
          this.$emit('func',false)
        }
      },
      aboutMe(){
        this.$router.push({path:'/aboutMe'})
      },
      Loding(){
        this.$router.push({path:'/chargeVip'})
      },
      changeCode(){
        this.$router.push({path:'/changeCode'})
      },
      toLogin(){
        if(this.userInfo.isLogin){

          console.log('已经登录')
        }
        else{
          this.$router.push({path:'/Login'})
        }
      },
      download(){
        this.$router.push({path:'/downloadApp'})
      },
      quit(){
        if(this.$store.commit('logout')!==false){
          this.userInfo={
            userName: "请登录",
            email:'请登录',//用户邮箱
            state:false,
            isLogin:false}
          this.$toast("退出成功")

          // mui.toast("退出成功");
        }
      }
    }
  }

</script>

<style scoped>

  #all{
    height: 100%;
    width: 100%;
  }
  .header {
    width: 100%;
    height: 25%;
    background-color: #409EFF;

  }
  .arrow{
    color: white;
    font-size: 40px;
    float: left;
  }
  .body{
    width: 100%;
    height: 75%;
    background-color: white;
  }
  .userLog{
    margin: 0 auto 20px auto
  }
  .listArea{
    font-size: 30px;
    /*width: 100%;*/
    /*height: 7%;*/
    padding:14px 0;
    margin:0 14px;
    border-bottom: 2px #9c9c9c solid;
  }
  .quit{
    width: 80%;
    margin:60px auto;
  }


</style>
