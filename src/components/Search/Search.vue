<template>
    <div id="all">
      <div class="topArea">
<!--        <div class="back el-icon-arrow-left" @click="goback"></div>-->
        <div class="iptArea">
          <form @submit.prevent action="#">
            <el-input
              id="sch"
              @keyup.enter.native="Search"
              v-model="keyWord"
              placeholder="请输入搜索内容"
              style="font-size: 17px">
              <i slot="prefix" class="el-input__icon el-icon-arrow-left" @click="goback"></i>
              <i slot="suffix" class="el-input__icon el-icon-time" @click="showhistory"></i>
              <i slot="suffix" class="el-input__icon el-icon-search" @click="Search"></i>
            </el-input>
          </form>
        </div>
      </div>
      <div class="serachRst">
        <div class="noresult" v-if="flag===1">
          <i style="font-size: 100px" class="el-icon-search"></i>
          <div>暂无查询结果</div>
        </div>
        <div v-if="flag===2">
          <div class="title">
            <div>查询结果如下</div>
            <div>共{{totalNum}}条数据</div>
          </div>
          <div style="overflow: hidden">
            <div v-for="comic in resultList" :key="comic.id" class="comicBox">
              <div class="contextArea" @click="goToDetail(comic)">
                <el-image
                  slot="error"
                  style="width: 100%; height: 80%"
                  :src="comic.cover"
                  lazy
                ><div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span></div>
                </el-image>
                <div style="padding:0 8px;font-size:10px;max-height: 30px;overflow:hidden">{{comic.title}} </div>
                <div style="padding:0 8px;font-size:6px;color:#9c9c9c">更新到第{{comic.itemnumber}}集</div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              v-if="totalNum>30"
              small
              :pager-count="5"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="30"
              layout="total, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>

        </div>
      </div>
      <el-drawer
        class="drawer"
        size="50%"
        :modal-append-to-body="false"
        direction="btt"
        :visible.sync="drawer"
        :show-close="false"
        :with-header="false"
      >
        <div class="el-drawer__header">搜索历史 <span style="text-align: right" @click="deleteHty">全部删除</span></div>
        <div v-if="searchHistory.length===0" style="text-align: center;font-weight: bolder">
          历史搜索记录为空
        </div>

        <ul style="display: block" v-if="searchHistory.length>0">
          <li v-for="his in searchHistory" @click="searchTip">{{his}}</li>
        </ul>
      </el-drawer>

    </div>
</template>

<script>
  import store from '../../store/index'
  import {ipconfig2} from '../../../static/js/url.config'
  export default {
    name: 'Search',
    data(){
      return{
        currentPage:1,
        drawer:false,
        searchHistory:store.state.HotWord,
        keyWord:'',
        page:1,
        resultList:[],
        flag:0,
        totalNum:0,
      }
    },
    mounted () {
      mui.back = function() {
        window.history.go(-1);
      };
    },
    methods:{
      deleteHty(){
        if(this.$store.commit('clearHotWord')!==false){
          this.drawer=false
          this.searchHistory=[]
          this.$toast("清除成功")
          // mui.toast("清除成功");
        }
        else{
          this.$toast("清除失败")
          // mui.toast("清除失败");
        }
      },
      goToDetail(comic){
        this.$router.push(
          {
            name:'ComicDetail',
            params:{
              'comic': comic,
              'from':'Search'
            },
          })
      },
      handleCurrentChange(value){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.searchit(value)
      },
      searchit(page){
        this.$http({
          url:ipconfig2+'/video/searchlist',
          method:'GET',
          params:{
            title:this.keyWord,
            page:page,
          }
        }).then(response=>{
          console.log(response)
          this.resultList = response.data.content
          if(response.data.empty){
            this.flag = 1
          }
          else{
            this.flag = 2
            this.totalNum = response.data.totalElements
          }
        }).catch(error=>{
          console.log(error)
        })

      },
      showhistory(){
        this.searchHistory = store.state.HotWord
        this.drawer=true
      },
      goback(){
        this.$router.go(-1)
      },
      Search(event){
        if (event.keyCode === 13) {
          event.preventDefault(); //禁止默认事件（默认是换行）
          this.keyWord = event.target.value;
          // this.selectedProd();
        }
        if(this.keyWord!==''){
          this.$store.commit('changeHotWord', this.keyWord);
          this.searchit(1)
        }
        else
          return
      },
      searchTip(e){
        this.keyWord = e.target.textContent;
        this.searchit(1)
        this.drawer=false
      }
    }
  }
</script>
<style lang="scss">
  .iptArea {
    .el-input__inner {
      height: 60px;
      padding:0 40px
    }
  }
    .drawer{
      .el-drawer__header{
        margin:0;
        padding:10px;
        outline:none;
        background-color: #409EFF;
        color: white;
      }
    }
    .pagination{
      width: 100%;
      height: 30px;
      text-align: center;
      padding-top: 10px;
      .el-pagination{
        white-space: normal;
      }
    }
    .serachRst{
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
        margin: 2px;
      }

    }

</style>

<style scoped>
  .noresult{
    text-align: center;
    padding-top: 50%;
    font-weight: bolder;

  }


  .el-input__icon{
    line-height: 60px;
    padding:0 20px 0 0


  }
  .topArea{
    height: 90px;
    width: 100%;
    background-color: #409EFF;
    display: flex;
    border: none;
  }
  .historyArea{
    width: 100%;
  }
  .back{
    padding-left: 10px;
    height: 100%;
    width: 10%;
    line-height: 50px;
    font-size: 20px;
    color: white;
    font-weight: bold;
  }
  .iptArea{
    width: 95%;
    margin:auto;
  }
  .searchBtn{
    width: 10%;
    height: 100%;
    line-height: 100px;
    color:white;
    font-weight:bolder;
    font-size: 40px;
    text-align: center;
  }
  ul{
    margin: 0;
    padding:0px 20px;
  }
  li{
    list-style: none;
    border: #9c9c9c 2px solid;
    border-radius: 10px;
    padding:10px;
    float:left;
    margin-right: 20px;
    margin-top: 20px;
  }
  .title{
    text-align: center;
    font-weight: bolder;
  }

</style>
