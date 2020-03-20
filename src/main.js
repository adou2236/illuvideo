// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import 'video.js/dist/video-js.css'
import '../static/js/rem'
import toast from './components/tool/index'
// import {baseUrl} from '../static/js/url.config'
//后台服务上线想在本地使用将这两行代码打开
//
// axios.defaults.baseURL= baseUrl
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(toast)


// var testLocal = localStorage.getItem("test");

var $http = axios.create({
  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
});
Vue.prototype.$http = $http;


$http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

//进入新页面从顶端展示
router.afterEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  $http,
  toast,
  router,
  store,
  components: { App },
  template: '<App/>'
})
