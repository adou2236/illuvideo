<template>
  <div id="all">
    <div class="head">
      <div style="font-size:15px;width:100%;margin:auto;padding: 0 15px;text-align: center">
        <i class="el-icon-arrow-left arrow" @click="goback"/>收藏夹
      </div>

    </div>
    <div style="overflow: auto;display: inline-block;width: 100%">
      <div v-if="comicList.length===0">收藏夹为空</div>
      <div v-else-if="comicList.length>0">
        <div v-for="comic in comicList" :key="comic.id" class="comicBox">
          <div class="contextArea" @click="goToDetail(comic)">
            <el-image
              slot="error"
              style="width: 100%; height: 80%"
              :src="comic.cover"
              lazy
            ><div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span></div>
            </el-image>
            <div style="padding:0 8px;font-size:0.8rem;max-height: 30px;overflow:hidden">{{comic.title}} </div>
            <div style="padding:0 8px;font-size:0.5rem;color:#9c9c9c">更新到第{{comic.itemnumber}}集</div>
          </div>
        </div>
      </div>

    </div>
<!--    <div class="pagination">-->
<!--      <el-pagination-->
<!--        v-if="paginationshow"-->
<!--        small-->
<!--        :pager-count="5"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="currentPage"-->
<!--        :page-size="30"-->
<!--        layout="total, prev, pager, next, jumper"-->
<!--        :total="totalList">-->
<!--      </el-pagination>-->
<!--    </div>-->

  </div>

</template>

<script>
  import {ipconfig,ipconfig2} from '../../../static/js/url.config'
  import store from '../../store'
  export default {
    name: 'collectionList',
    data(){
      return{
        // paginationshow:false,
        comicList:[],
        totalList:100,
        currentPage:1,
      }
    },
    mounted(){
      // mui.back = function() {
      //   window.history.go(-1);
      // }
      this.getComicList(this.currentPage,this.choosen)
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goback, false);//false阻止默认事件
      }
    },
    watch:{
    },

    methods:{
      goback(){
        this.$router.push({name:'HotComic'})
      },
      choosesort(value){
        this.paginationshow=false;
        this.choosen = value;
        this.currentPage = 1;
        this.getComicList(this.currentPage,value)
      },
      // handleCurrentChange(value){
      //   document.body.scrollTop = 0;
      //   document.documentElement.scrollTop = 0;
      //   console.log(value)
      //   this.getComicList(value,this.choosen)
      // },
      goToDetail(comic){
        this.$router.push(
          {
            name:'ComicDetail',
            params:{
              'comic': comic,
              'from':'collectionList'
            },
          })
      },
      getComicList(page,sort) {
        this.$http({
          url:ipconfig2+'/video/collectionList',
          method:'GET',
          params:{
            userId:(store.state.userInfo.userId)
          }
        }).then(response=>{
          this.comicList=response.data
        }).catch(error=>{
          console.log(error)
        })

      }

    },
    destroyed () {
      window.removeEventListener('popstate', this.goback, false);//false阻止默认事件
    },
  }
</script>

<style lang="scss">

  .sortMethod{
    display: flex;
    ul{
      display: flex;
      margin:0;
      padding:0;
    }
    li{
      list-style-type:none
    }
  }
  .pagination{
    width: 100%;
    /*height: 30px;*/
    overflow-x:hidden;
    text-align: center;
    padding:40px 0;
    .el-pagination__total{
      font-size: 25px!important;
    }
    .number{
      font-size: 25px!important;
    }
    .el-pagination__jump{
      font-size: 25px!important;

    }
    .el-pagination{
      white-space: normal;
    }
  }
</style>

<style scoped>
  .arrow{
    font-size: 40px;
    float: left;
  }
  .head{
    margin-bottom: 20px;
    height: 80px;
    background-color: #409EFF;
    color: white;
    display: flex;
  }
  .sortMethod{
    height: 50px;
    font-size: 30px;
    padding:0 20px
  }
  #all{
    overflow-x:hidden;
    /*padding: 2px;*/
  }

  .comicBox{

    float: left;
    width:33.3%;
    height: 400px;
  }
  li{
    list-style-type:none
  }
  .contextArea{
    height: 90%;
    width: 90%;
    margin: 4px auto;
  }

</style>
