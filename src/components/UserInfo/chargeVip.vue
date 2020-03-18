<template>
    <div id="all">
      <div class="head">
        <div style="padding: 10px">

          <i class="el-icon-arrow-left arrow" @click="goback"/>
        </div>
        <div style="padding:10px 30px;text-align: center">
          <i class="el-icon-present "/>
        </div>
        <div class="context">鼓励开发者，成为vip</div>
      </div>
      <div class="body">
        <div class="explain">
          请开发者喝杯可乐，你便能成为vip<br/>
          成为vip后，你的收藏夹数量将上升为50个
        </div>
        <div v-show="value==='wechat'" id="qrcode" ref="qrcode">
          <div style="text-align: center;padding: 10px">
            请截屏保存二维码，并使用微信扫一扫完成支付<br/>
            请在5分钟内完成支付
          </div>

        </div>
        <div class="Vbtn">
          <el-switch
            style="display: block;width:80%;margin:25px auto;height: 30px;"
            v-model="value"
            :width="50"
            active-color="#409EFF"
            inactive-color="#13ce66"
            :active-text="value==='alipay'?'支付宝支付':'微信支付(随机立减)'"
            active-value="alipay"
            inactive-value="wechat"
            >
          </el-switch>
          <el-button  :type="value==='alipay'?'primary':'success'" @click="neworder">支付3￥</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'
  import store from '../../store'
  import QRCode from 'qrcode2'
  export default {
    name: 'chargeVip',
    data(){
      return{
        value:'alipay',

      }
    },
    mounted () {
      // mui.back = function() {
      //   window.history.go(-1);
      // }
    },
    methods:{
      qrcode (url) {
        let qrcode = new QRCode('qrcode',{
          width: 150, // 设置宽度，单位像素
          height: 150, // 设置高度，单位像素
          text: url // 设置二维码内容或跳转地址
        })
      },
      goback(){
        window.history.go(-1)
      },
      neworder(){
        this.$http({
          url:ipconfig2+'/pay/newOrder',
          method:'GET',
          params:{
            userId:store.state.userInfo.userId,
            payMethod:this.value,
            price:"3.00"
          }
        }).then(response=>{
          if(response.data.code===-1){
            this.$toast(response.data.msg)

            // mui.toast(response.data.msg);
          }
          else{
            if(response.data.order_type==="wechat"){
              console.log("微信支付")
              this.$nextTick(() => {
                this.qrcode(response.data.qr_url)
              })
            }
            else if(response.data.order_type==="alipay"){
              console.log("支付宝支付")

              window.open(response.data.qr_url)
            }

          }
        }).catch(error=>{
          console.log(error)
        })
      }

    }
  }
</script>

<style lang="scss">
  .Vbtn{
    width: 100%;
    position: fixed;
     bottom: 80px;
    .el-button{
      width: 80%;
      height: 60px;
      font-size: 30px;
      margin: auto;
      color: white;
      display: block;

    }
    .el-button--success{
      background-color: #13ce66;
    }
    .el-switch__core{
      height: 1.625rem;
      border-radius:60px
    }
    .el-switch.is-checked .el-switch__core::after{
      left:100%;
      margin-left: -1.53125rem;
    }
    .el-switch__core:after{
      width:1.5rem;
      height: 1.5rem;

    }
    .el-switch__label * {
      line-height: 0;
      font-size: 30px;
    }

  }
  #qrcode{
    img{
      margin:auto
    }
    canvas{
      margin:auto;
      display:block;
    }
  }
</style>

<style scoped>
  #qrcode{
    margin:50px auto
  }
  .explain{
    padding: 20px;
    font-size: 30px;
    color: black;
  }
  #all {
    width: 100%;
    height: 100%;
  }
  .head{
    width: 100%;
    height: 30%;
    background-color: black;
  }
  .body{
    width: 100%;
    height: 70%;
  }
  .el-icon-present{
    text-align: center;
    color: white;
    font-size: 150px;
  }
  .context{
    color: white;
    text-align: center;
  }
  .arrow{
    font-size: 40px;
    color: white;
  }

</style>
