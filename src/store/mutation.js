export default{
  saveUser (state, userInfo){
    state.userInfo = userInfo
    state.userInfo.isLogin = true
    try {
      localStorage.userInfo = JSON.stringify(state.userInfo)
    } catch (e) {}
  },

  logout (state){
    try{
      localStorage.removeItem("userInfo")
      state.userInfo={
        userId:'0',
        userName: "请登录",
        email:'请登录',//用户邮箱
        state:false,//会员状态
        isLogin:false//登录状态
      };
      return true
    }catch (e) {
      console.log(e)
      return false
    }
  },

  changeHotWord (state, HotWord) {
    if(!state.HotWord.includes(HotWord)){
      state.HotWord.push(HotWord);
      try {
        localStorage.HotWord = JSON.stringify(state.HotWord)
      } catch (e) {}

    }
  },
  clearHotWord(state){
    console.log(state)
    try{
      console.log(state)
      localStorage.removeItem("HotWord")
      state.HotWord=[];
      return true

    }catch (e) {
      console.log(e)
      return false
    }

  }

}
