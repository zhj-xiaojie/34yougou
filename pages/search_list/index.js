import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    // 商品列表数据
    goods: [],
    keyword:'',
    // 当前页数
    pagenum:1,
    // 页条数
    pagesize:10,
  },
  // 点击获取当前tab栏索引值
  getTab(event) {
    const { index } = event.currentTarget.dataset
    this.setData({
      tab: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     keyword: options.keyword
   })
   
    request({
      url: '/goods/search',
      data:{
        query: options.keyword
      }
    }).then(res => {
      // console.log(res)
      const { goods } = res.data.message;
      //  循坏每个商品修改价格，保留2位小数
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods: newGoods
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})