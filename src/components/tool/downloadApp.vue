<template>
    <div id="all">
      <div class="head">
        <div style="padding: 10px">
          <i class="el-icon-arrow-left arrow" @click="goback"/>
        </div>
        <div class="iconArea">
          <div style="margin:auto">
            <el-image style="width:6rem; height:6rem" fit="fill" src="../../../static/img/illuvideo.ico"  />
            <div style="text-align: center;color: white">幻视</div>
          </div>
        </div>
        <div class="btnArea">
          <el-button type="button" type="primary" @click="download">立即下载</el-button>
          <el-button type="button" @click="backdownload">备用下载</el-button>
        </div>
      </div>
      <div class="body">
        <div style="text-align: center;font-size: 1rem">
          若您遇到下载问题，请与我联系<br/>
          adoujianfei@outlook.com

        </div>

      </div>
    </div>
</template>

<script>
  import {ipconfig2} from '../../../static/js/url.config'

  export default {
    name: 'downloadApp',
    methods:{
      goback(){
        window.history.go(-1)
      },
      download(){
        var newWindow = window.open("_blank");
        newWindow .location = ipconfig2+"/app/download"
      },
      backdownload(){
        window.open("https://www.lanzous.com/i9ilf9c")
      }
    }
  }
</script>

<style scoped>
  .el-button{
    width: 100%;
    font-size: 1rem;
    margin: 0.4rem 0!important;
  }
  .btnArea{
    width: auto;
    height: auto;
    padding:0 20%;
  }
  .iconArea{
    display: flex;
    width: 100%;
    height: 50%;

  }
  #all {
    height: 100%;
    width: 100%;
  }
  .head{
    /*position: relative;*/
    width: 100%;
    height: 50%;
    background-image: linear-gradient(45deg, #8F1DD0 0%, #17B3FF 100%);
  }
  .body{
    padding:1rem;
  }
  .arrow{
    font-size: 40px;
    color: white;
  }

</style>
