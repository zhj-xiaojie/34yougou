
//  发起请求

const request = function (config = {}) {
  // console.log(config)
  // 判断url是否为空
  if (!config.url) {
    throw new Error('请输入url地址!')
    return
  }
  // 拼接 baseURL
  if (config.url.search(/^http/) === -1) {
    config.url = request.defaults.baseURL + config.url
  }


  //  返回一个promise。resolve是成功的回调。reject是失败
  return new Promise((resolve, reject) => {
    // 发起小程序请求
    wx.request({
      // 用调用传入的对象解构
      ...config,

      success(res) {
        // 成功之后发出then的回调函数
        resolve(res);
      },
      fail() { },
      
      // 后台接口可能会自定义错误，错误的处理函数放到complete来执行
      complete(res) {
        // 循坏调用错误的错误函数
        request.errors.forEach(fn => {
          fn(res)
        })
      }
    })
  })
}

// request的默认的属性
request.defaults = {
  // 基准路径
  baseURL: ""
};
// 保存错误函数
request.errors = [];

// 接收错误的触发函数
// @参数：callback 传入的错误函数
request.onError = function (callback) {
  request.errors.push(callback);
}

export default request;