<template>
  <div id="all">
    <div class="head">
      <div style="font-size:15px;width:100%;margin:auto;padding: 0 15px;text-align: center">
        <i class="el-icon-arrow-left arrow" @click="goback"/>
        <div class="toLogin" @click="toRegist">注册</div>
      </div>

    </div>
    <div>
      <div class="iptArea" >
        <el-form :model="userInfo" status-icon :rules="rules" ref="userInfo"  class="demo-ruleForm">
          <el-form-item prop="email" label="">
            <el-input  placeholder="电子邮箱" v-model="userInfo.email" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input  placeholder="请输入密码" type="password" v-model="userInfo.password" autocomplete="off"/>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="Login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--      <div style="margin-top: 15px;">-->
<!--        <el-input placeholder="请输入注册邮箱" v-model="email" class="input-with-select" />-->
<!--        <el-input placeholder="请输入密码" type="password" v-model="password" class="input-with-select" />-->
<!--        <el-button slot="append" @click="Login">登录</el-button>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'
  import qs from 'qs'

  export default {
    name: 'login',
    data(){
      return{
        rules:{
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },

        userInfo:{
          email:'',
          password:'',
        }

      }
    },
    mounted () {
      // mui.back = function() {
      //   window.history.go(-1);
      // }
    },
    methods:{
      goback(){
        this.$router.push({path:'/HotComic'})
      },
      toRegist(){
        this.$router.push({path:'/Regist'})
      },
      Login(){
        let data={
          email:this.userInfo.email,
          password:this.userInfo.password
        }
        this.$http({
          url:ipconfig2+'/user/login',
          method:'POST',
          data: qs.stringify(data),
        }).then((response)=>{

          if(response.data.success){
            this.$store.commit('saveUser', response.data.detail);
            this.$toast(response.data.msg)

            // mui.toast(response.data.msg);
            this.$router.push({path:'/HotComic'})
          }
          else if(!response.data.success){
            console.log("输出")
            this.$toast(response.data.msg)

            // mui.toast(response.data.msg);

          }
        }).catch(error=>{
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .iptArea{
    .el-form-item__content{
      margin:auto;
      width: 80%;
      /*margin:0!important;*/
    }
    .el-form-item{
      margin:40px auto
    }
    .el-input__inner{
      height: 60px!important;
      font-size: 30px;
    }
    .el-input{
      width: 100%;
      display: block;
      font-size: 20px;
      /*margin: 20px auto;*/
    }
    .el-form-item__error{
      font-size: 20px;
    }
    .el-button{
      width: 100%;
      height: 60px;
      font-size: 30px;
      background-color: #3a8ee6;
      margin: auto;
      color: white;
      display: block;
    }
  }
</style>

<style scoped>
  .head{
    margin-bottom: 20px;
    height: 80px;
    background-color: #409EFF;
    color: white;
    display: flex;
  }
  .arrow{
    font-size: 40px;
    float: left;
  }
  .toLogin{
    font-size: 30px;
    float: right;
  }
  .iptArea{
    margin-top: 30px;
  }

</style>
