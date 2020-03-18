<template>
  <div id="all">
    <input type="button" @click="pay"/>支付
    <a href="alipays://platformapi/startapp?appId=20000067&appClearTop=false&startMultApp=YES&showTitleBar=YES&showToolBar=NO&showLoading=YES&pullRefresh=YES&url=http%3A%2F%2F45.77.249.176%3A7001%2Falipay.html%3Fu%3D2088512665682102%26a%3D0.01">dianjizhifu</a>
  </div>
</template>

<script>
  import {ipconfig3} from '../../../static/js/url.config'
  import md5 from 'js-md5';

  export default {
    name: 'test',
    methods:{
      pay(){
        this.$http({
          url:ipconfig3+'/api/order',
          method:"POST",
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          data:{
            order_id:"1234",
            order_type:"wechat",
            order_price:"0.01",
            order_name:"幻视vip",
            sign:md5(md5("12340.01")+"adoujianfei"),
            redirect_url:"http://24073.cn01.ymcart.com/api-commonErp-goodsList.html",
            extension:"SSS"
          }
        }).then(response=>{
          console.log(response)
        }).catch(error=>{
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped>

</style>
