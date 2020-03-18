import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HotComic from '../components/HotComic/HotComic'
import Search from '../components/Search/Search'
import ComicDetail from '../components/ComicDetail/ComicDetail'
import Regist from '../components/UserInfo/regist'
import Login from '../components/UserInfo/login'
import userPage from '../components/UserInfo/userPage'
import collectionList from '../components/ComicList/collectionList'
import changeCode from '../components/UserInfo/changeCode'
import aboutMe from '../components/UserInfo/aboutMe'
import chargeVip from '../components/UserInfo/chargeVip'
// import wvpay from '../components/tool/wvpay'
import test from '../components/tool/test'
import downloadApp from '../components/tool/downloadApp'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/HotComic',
      children:[
        {
          path: '/HotComic',
          name: 'HotComic',
          component: HotComic,
        }
      ]
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
    },
    {
      path:'/ComicDetail',
      name:'ComicDetail',
      component:ComicDetail
    },
    {
      path:'/Regist',
      name:'Regist',
      component:Regist
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/userPage',
      name:'userPage',
      component:userPage
    },
    {
      path:'/collectionList',
      name:'collectionList',
      component:collectionList
    },
    {
      path:'/changeCode',
      name:'changeCode',
      component:changeCode
    },
    {
      path:'/aboutMe',
      name:'aboutMe',
      component:aboutMe
    },
    {
      path:'/chargeVip',
      name:'chargeVip',
      component:chargeVip
    },
   {
      path:'/test',
      name:'test',
      component:test
    },
    {
      path:'/downloadApp',
      name:'downloadApp',
      component:downloadApp
    },

  ],
})
