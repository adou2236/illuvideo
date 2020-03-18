<template>
    <div id="all">
      <div class="screenArea">
        <div class="goBack">
          <i class="preicon el-icon-arrow-left" @click="goHome" />
          <i :class="isCollection" class="afticon" @click="collectIt" />
        </div>
          <Inner-player :url="comicSrc" />
      </div>
      <div v-show="comic.itemnumber>1" class="fnBtn">
        <el-button-group>
          <el-button style="height: 30px;font-size: 15px" type="primary" icon="el-icon-arrow-left" @click="lastEspose" :disabled="disabled==='banlast'">上一集</el-button>
          <el-button style="height: 30px;font-size: 15px" type="primary" @click="nextEspose" :disabled="disabled==='bannext'">下一集<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </div>
      <div class="ComicInfo">
        <div class="ComicLame">
          <div class="part1">{{comic.title}}<span class="scoreStyle">评分:{{comic.score}}</span></div>
          <div class="part2">
            <el-select v-model="path">
            <el-option
              v-for="item in hackpath"
              :key="item.id"
              :label="item.lab"
              :value="item.url">
            </el-option>
          </el-select></div>
        </div>
        <ul class="ComicList" v-show="comic.itemnumber>1">
          <li v-show="index<20" :class="{'actived':index === serialNumber}" v-for="(value,index) in comic.itemnumber" @click="chooseEps(index)">{{value}}</li>
          <li v-if="comic.itemnumber>20" @click="drawer = true">
            ...
          </li>
        </ul>
        <el-drawer
          class="drawer"
          size="50%"
          :modal-append-to-body="true"
          direction="btt"
          :visible.sync="drawer"
          :with-header="false">
          <ul class="ComicList">
            <li :class="index === serialNumber ? 'actived' : ''" v-for="(value,index) in comic.itemnumber" @click="chooseEps(index)">{{value}}</li>
          </ul>
        </el-drawer>
      </div>
    </div>
</template>

<script>
  import {ipconfig2,hackipconfig} from '../../../static/js/url.config'
  import InnerPlayer from '../InnerPlayer'
  import store from '../../store'


  export default {
    name: 'ComicDetail',
    components: {InnerPlayer},
    data(){
      return{
        path:'',
        hackpath: [],
        isCollection:"el-icon-star-off",
        disabled:"banlast",
        drawer:false,
        comic : {},
        serialNumber:0,
        myPlayer:{},
        comicSrc:'',
        level:-1,
      }
    },
    mounted () {
      // mui.back = function() {
      //   window.history.back(-1);
      // }
      this.getHackPath();
      this.comic=this.$route.params.comic;
      this.initMessage(this.serialNumber);
      if(store.state.userInfo.isLogin){
        this.isInCollect()
      }
    },
    methods:{
      getHackPath(){
        this.$http({
          url:ipconfig2+'/hacklist',
          method:'GET',
        }).then(response=>{
          if(this.$route.params.comic.type==="4"||this.$route.params.comic.type==="2"){
            console.log("剧集")
            this.hackpath=response.data.filter((item)=>{return item.type==="0"||item.type==="1"})
          }
          else if(this.$route.params.comic.type==="1"){
            console.log("电影")
            this.hackpath=response.data.filter((item)=>{return item.type==="0"||item.type==="2"})
          }
          this.path=this.hackpath[0].url
      }).catch(error=>{
        })
      },
      isInCollect(){
        this.$http({
          url:ipconfig2+'/video/addToCollect',
          method:'GET',
          params:{
            userId:store.state.userInfo.userId,
            filmId:String(this.comic.id),
            option:"1"//判断条目是否在收藏夹中
          }
        }).then(response=>{
          if(response.data.flag==="1"){
            console.log("开灯")
            this.isCollection = "el-icon-star-on"
          }
          else{
            console.log("关灯")

            this.isCollection = "el-icon-star-off"
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      goHome(){
        // window.history.go(-1)
        this.$router.push({name:this.$route.params.from})

      },
      collectIt(){
        if(store.state.userInfo.isLogin){

          this.$http({
            url:ipconfig2+'/video/addToCollect',
            method:'GET',
            params:{
              userId:store.state.userInfo.userId,
              filmId:this.comic.id,
              option:"0"//将条目添加或移除收藏夹
            }
          }).then(response=>{
            if(response.data.success){
              this.$toast(response.data.msg)
              // mui.toast(response.data.msg);
              this.isInCollect()
            }
            else {
              this.$toast(response.data.msg)

              // mui.toast(response.data.msg);
            }

          }).catch(error=>{
            console.log(error)
          })
        }
        else{
          this.$toast("请先登录")

          // mui.toast("请先登录");
        }


      },

      chooseEps(value){
        this.serialNumber = value;
        this.drawer = false;
      },
      initMessage(serialNumber){
        this.$http({
          url:ipconfig2+'/videodetails',
          method:'GET',
          params:{
            filmId:this.comic.id,
            serialNumber:serialNumber
          }
        }).then(response=>{
          this.comicSrc = this.path+response.data.url;
        }).catch(error=>{
          console.log(error)
        })
      },
      nextEspose(){
        this.serialNumber++;

      },
      lastEspose(){
        this.serialNumber--;
      },

      getParams(){
        this.comic=this.$route.params.comic
      },

    },
    watch: {
      'path':function (val) {
        this.initMessage(this.serialNumber)

      },
      'serialNumber':function(val){
        console.log(val,this.comic.itemnumber)
        if(val+1===this.comic.itemnumber){
          this.disabled = "bannext"
        }
        else if(val+1===1){
          this.disabled = "banlast"
        }
        else
          this.disabled = ""
          this.initMessage(val)
      }
    },
  }
</script>

<style scoped>
  .preicon{
    font-size: 50px;
    padding:20px
  }
  .afticon{
    font-size: 50px;
    padding:20px;
    float: right;
  }
  .goBack{
    z-index:100;
    position: absolute;
    width: 100%;
  }
  .actived{
    color: white;
    background-color: rgb(68,158,255);
  }
  .scoreStyle {
    /*float:right;*/
    margin-left:40px;
    font-size: 0.5rem;

  }
  .video{
    width:100%
  }
  .screenArea{
    width: 100%;
    height: 420px;
  }
  .ComicLame{
    padding:20px 20px 20px 40px;
    font-size: 1rem;
    display: flex;
  }
  .part1{
    width: 70%;
  }
  .part2{
    width: 30%;
  }


</style>
<style lang="scss">
  .part2{
    .el-select{
      width: 60%;
      font-size: 0.6rem;
      color: black;

    }
  }
  .goBack{
    .el-icon-arrow-left{
      color:white;
    }
    .el-icon-star-off{
      color: white;
    }
    .el-icon-star-on{
      color: #E6A23C;
    }
  }
  .drawer{
    .el-drawer__body{
      overflow: scroll;
    }
  }
  .fnBtn{
    .el-button-group{
      width:100%
    }
    .el-button{
      border-radius: 0;
      width:50%!important;
    }
  }

  .ComicList{
    overflow: hidden;
    padding:0 30px;
    li{
      text-align: center;
      margin:10px;
      float: left;
      width: 40px;
      list-style: none;
      padding:10px;
      border: #9c9c9c 2px solid;
      border-radius: 10px;
      font-size:20px ;
    }
  }
</style>
