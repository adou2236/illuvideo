<template>
    <div id="all">
      <div class="head">
        <div style="font-size:15px;width:100%;margin:auto;padding: 0 15px;text-align: center">
          <i class="el-icon-arrow-left arrow" @click="goback"/>
          <div class="toLogin" @click="toLogin">登录</div>
        </div>

      </div>

      <div>
        <div class="iptArea" >
          <el-form :model="regiserInfo" status-icon :rules="rules" ref="regiserInfo"  class="demo-ruleForm">
            <el-form-item label="" prop="userName">
              <el-input size="small" placeholder="用户名" v-model="regiserInfo.userName"/>
            </el-form-item>
            <el-form-item prop="email" label="">
              <el-input size="small" placeholder="电子邮箱" v-model="regiserInfo.email" />
            </el-form-item>
            <el-form-item label="" prop="pass">
              <el-input size="small" maxlength="18" placeholder="请输入密码" type="password" v-model="regiserInfo.pass" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
              <el-input size="small"  placeholder="请确认密码" type="password" v-model="regiserInfo.checkPass" autocomplete="off"/>
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="primary" @click="Send">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'
  import qs from 'qs'

  export default {
    name: 'regist',

    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regiserInfo.checkPass !== '') {
            this.$refs.regiserInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regiserInfo.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        regiserInfo:{
          userName: '',
          email:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 0, max: 10, message: '不能超过10个字符', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 8, max: 18, message: '密码在8-10个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        select:'phone',
        input:'',
        userName:'',
        userCode:'',
        email:'',
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
      toLogin(){
        this.$router.push({path:'/Login'})
      },
      Send(){
        let data = {
          name:this.regiserInfo.userName,
          email:this.regiserInfo.email,
          password:this.regiserInfo.pass,
        }
        this.$http({
          url:ipconfig2+'/user/save',
          method:'GET',

          params:data,
        }).then((response)=>{
          if(response.data.success){
            // mui.toast(response.data.msg);
            this.$toast(response.data.msg)

            if(response.data.flag==="1"){
              return
            }
            else if(response.data.flag==="0"){
              this.$router.push({path:'/Login'})
            }
          }
          else{
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
