<template>
  <div id="all">
    <div class="head">
      <div style="font-size:15px;width:100%;margin:auto;padding: 0 15px;text-align: center">
        <i class="el-icon-arrow-left arrow" @click="goback"/>
        修改密码
      </div>

    </div>

    <div>
      <div class="iptArea" >
        <el-form :model="regiserInfo" status-icon :rules="rules" ref="regiserInfo"  class="demo-ruleForm">
          <el-form-item prop="oldpass" label="">
            <el-input size="small" placeholder="请输入旧密码" type="password" v-model="regiserInfo.oldpass" />
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input size="small" maxlength="18" placeholder="请输入新密码" type="password" v-model="regiserInfo.pass" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input size="small"  placeholder="请再次输入新密码" type="password" v-model="regiserInfo.checkPass" autocomplete="off"/>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="primary" @click="Send">修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'
  import store from '../../store'
  import qs from 'qs'

  export default {
    name: 'changeCode',

    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
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
        userId:store.state.userInfo.userId,
        regiserInfo:{
          oldpass:'',
          pass: '',
          checkPass: ''
        },
        rules: {
          oldpass:[
            { required: true, message: '请输入旧密码', trigger: 'blur' },
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
      Send(){
        if(this.regiserInfo.oldpass!==''&&this.regiserInfo.pass!==''&&this.regiserInfo.checkPass!==''&&(this.regiserInfo.pass===this.regiserInfo.checkPass)){
          let data = {
            userId:this.userId,
            oldpass:this.regiserInfo.oldpass,
            pass:this.regiserInfo.pass,
          }
          this.$http({
            url:ipconfig2+'/user/changeCode',
            method:'GET',
            params:data,
          }).then((response)=>{
            if(response.data.success){
              // mui.toast(response.data.msg);
              this.$toast(response.data.msg)
              if(response.data.flag==="0"){
                return
              }
              else if(response.data.flag==="1"){
                this.$router.go(-1)
              }
            }
            else{
              // mui.toast(response.data.msg);
              this.$toast(response.data.msg)

            }

          }).catch(error=>{
            console.log(error)
          })
        }
        else{
          this.$toast("请将信息填写完整")

          // mui.toast("请将信息填写完整");
        }

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
    .el-input{
      width: 100%;
      display: block;
      font-size: 20px;
      /*margin: 20px auto;*/
    }
    .el-input__inner{
      height: 60px!important;
      font-size: 30px;
    }
    .el-form-item__error{
      font-size: 20px;
    }
    .el-button{
      width: 100%;
      background-color: #3a8ee6;
      height: 60px;
      font-size: 30px;
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
  .iptArea{
    margin-top: 30px;
  }

</style>
