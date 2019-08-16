//app.js
import request from './utils/request.js'
App({
// 小程序创建运行时候会触发,用来初始化小程序的内容
  onLaunch () {
    request.defaults.baseURL ="https://api.zbztb.cn/api/public/v1";
  }

})