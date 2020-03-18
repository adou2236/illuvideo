<template>
    <div id="all">
      <div class="sortMethod">
        排序方式：
        <ul>
          <li v-for="value in sorttype" @click="choosesort(value.index)" :style="value.index===choosen?active:''">{{value.name}}&nbsp&nbsp</li>
        </ul>
      </div>
      <div style="display: inline-block;width: 100%">
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

      <div class="pagination">
        <el-pagination
          v-if="paginationshow"
          :pager-count="5"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="30"
          layout="total, prev, pager, next, jumper"
          :total="totalList">
        </el-pagination>
      </div>

    </div>

</template>

<script>
  import {ipconfig,ipconfig2} from '../../../static/js/url.config'
  export default {
    name: 'HotComic',
    data(){
      return{
        paginationshow:false,
        comicList:[],
        totalList:100,
        currentPage:1,
        choosen:'hotlevel',
        sorttype:[
          {index:'hotlevel',name:"综合↓"},
          {index:'score',name:"评分↓"},
          {index:'updatetime',name:"更新时间↓"}
          ],
        active:'color:#409EFF'
      }
    },
    props:{
      activeName:{
        type:String,
        default:'4'
      }
    },
    mounted(){

      this.type=this.$route.params.type;
      console.log(this.type)
      this.getComicList(this.currentPage,this.choosen)
    },
    watch:{
      'activeName':function(val){
        this.getComicList(this.currentPage,this.choosen)
      }
    },

    methods:{

      choosesort(value){
        this.paginationshow=false;
        this.choosen = value;
        this.currentPage = 1;
        this.getComicList(this.currentPage,value)
      },
      handleCurrentChange(value){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        console.log(value)
        this.getComicList(value,this.choosen)
      },
      goToDetail(comic){
        // this.$router.push({path:'/Search'})
        this.$router.push(
          {
            name:'ComicDetail',
            params:{
              'comic': comic,
              'from':'HotComic',
            }
          })
      },
     getComicList(page,sort) {
        this.$http({
          url:ipconfig2+'/video/videolist',
          method:'GET',
          params:{
            type:this.activeName,
            page:page,
            sortcondition:sort,//排序规则score评分，updatetime更新时间
          }
        }).then(response=>{
          console.log(response)
            this.paginationshow = true
            this.comicList=response.data.content
            this.totalList=response.data.totalElements
        }).catch(error=>{
          console.log(error)
        })

     }

    }
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
  .sortMethod{
    height: 50px;
    font-size: 30px;
    padding:0 20px
  }
  #all{
    /*overflow: scroll;*/
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
