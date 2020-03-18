<template>
  <div id="all">
    <div class="topBox">
      <div style="position: absolute;width: 100%;height: 100%">
        <div style="display: flex;height: 50%;background-color: #409EFF;">
          <div class="userInfo" @click="drawer=true">
            <el-avatar  class="userLog" :size="30" style="font-size: 15px"> {{userInfo.userName}}</el-avatar>
          </div>
          <div class="videoTool">
            <div class ="iconStyle el-icon-search" @click="Search"></div>
            <div class ="iconStyle el-icon-view" @click="Loding"></div>
            <div class ="iconStyle el-icon-star-off" @click="toCollection"></div>


          </div>
        </div>
        <el-tabs style="height:50%;background-color: white;font-size: 30px!important;" :stretch="true" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="fuc in functionList" :label="fuc.name" :name="fuc.id" :key="fuc.id"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="contextBox">
      <keep-alive>

        <Hot-comic :activeName="activeName" />
      </keep-alive>
    </div>
    <el-drawer
      size="70%"
      append-to-body
      :visible.sync="drawer"
      direction="ltr"
      :show-close="false"
      :with-header="false"
      >
      <user-page :drawer="drawer" @func="closeDrawer"/>
<!--      <div class="headArea">-->
<!--        <div style="width:30%;height: auto;padding:20px 0" @click="toUserPage">-->
<!--          <el-avatar class="userLog" :size="50" > {{userInfo.userName}}</el-avatar>-->
<!--          <div style="color: white;text-align: center">{{userInfo.userName}}</div>-->
<!--        </div>-->

<!--      </div>-->
<!--      <div class="sysSetting">系统设置</div>-->
    </el-drawer>

  </div>

</template>

<script>
import HotComic from './HotComic/HotComic'
import store from  '../store'
import userPage from './UserInfo/userPage'
import {ipconfig2} from '../../static/js/url.config'
export default {
  name: 'HelloWorld',
  components: {HotComic,userPage},
  data () {
    return {
      drawer:false,
      activeName:'4',
      functionList:[
        {id:'4',name:'动漫'},
        {id:'1',name:'电影'},
        {id:'2',name:'电视剧'},
      ],
      userInfo:{}

    }
  },
  mounted () {
    // this.backBtn()
    this.userInfo = store.state.userInfo
    this.isVip()
  },
  methods:{
    isVip(){
      this.$http({
        url:ipconfig2+"/pay/isVip",
        method:"GET",
        params:{
          userId:store.state.userInfo.userId
        }
      }).then(response=>{
        if(response.data.flag==="1"){
          store.state.userInfo.state=true
        }
        else if(response.data.flag==="0"){
          store.state.userInfo.state=false
        }
      }).catch(error=>{
        console.log(error)
      })

    },
    closeDrawer(value){
      this.drawer = value
    },
    backBtn(){
      var clickNum = 0;
      mui.back = function(event) {
        clickNum++;
        if(clickNum > 1) {
          plus.runtime.quit();
        } else {
          mui.toast("再按一次退出应用");
        }
        setTimeout(function() {
          clickNum = 0
        }, 2000);
        return false;
      };
    },
    Loding(){
      this.$toast("功能开发中")

      // mui.toast("功能开发中");
    },
    toCollection(){
      if(store.state.userInfo.isLogin)
      this.$router.push({path:'/collectionList'})
      else
        this.$toast("请先登录")

      // mui.toast("请先登录");
    },
    toUserPage(){
      if(store.state.userInfo.isLogin){

        this.$router.push({path:'/userPage'})
      }
      else{
        this.$router.push({path:'/login'})
      }
    },
    Search(){
      this.$router.push({path:'/Search'})
    },
    handleClick(tab, event) {
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-tabs__item{
    height: 80px!important;
    font-size: 30px!important;
    line-height: 80px!important;
  }
</style>
<style scoped>
  .headArea{
    width:100%;
    height: 20%;
    background-color: #409EFF;
  }
  .
  #all{
    width:100%;
    height: 100%;

  }
  .contextBox{
    /*overflow: scroll;*/
    width: 100%;
    padding-top:180px;
    background-color: white;
  }
  .topBox{
    -webkit-transform: translateZ(0);
    position:fixed;
    top: 0;
    width:100%;
    height:180px;
    overflow-y:hidden;
    z-index:100
  }
  .userInfo{
    /*height: 100%;*/
    width: 30%;
    display: flex;
  }
  .userLog{
    margin:auto 30px
  }
  .videoTool{
    width: 70%;
    display: block;
    padding:24px
  }
  .iconStyle{
    float: right;
    margin-right: 30px;
    color:white;
    font-size: 40px;
  }
  .el-menu{
    height: 50%;
  }
  .el-menu-item{
    height: 100%;
    width: 50%;
    text-align: center;
  }


</style>
