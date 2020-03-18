let HotWord=[]
let userInfo={
  userId:'0',
  userName: "请登录",
  email:'请登录',//用户邮箱
  state:false,//会员状态
  isLogin:false//登录状态
}
try {
  if (localStorage.getItem('HotWord')) {
    HotWord = JSON.parse(localStorage.getItem('HotWord'))
  }
  if (localStorage.getItem('userInfo')) {
    userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
} catch (e) {}


export default{
  HotWord: HotWord,    //导出搜索历史
  userInfo: userInfo
}
