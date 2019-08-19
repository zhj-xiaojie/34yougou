import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    // 商品列表数据
    goods: [],
    keyword: '',
    hasMore: true,
    // 当前页数
    pagenum: 1,
    // 页条数
    pagesize: 10,
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
    //  请求数据
    this.getData()
  },

  //  请求列表数据
  getData() {
    const { keyword, pagenum, pagesize } = this.data
    request({
      url: '/goods/search',
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
       const { goods } = res.data.message;
      //  console.log(goods)
      //  判断数据加载数量来显示hasMore
      if (goods.length < this.data.pagesize) {
        this.setData({
          hasMore: false
        })
      }
      //  循坏每个商品修改价格，保留2位小数
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        // 新旧数据合并
        goods: [...this.data.goods, ...newGoods]
      })
    })
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    // 判断是否还又数据
    if (!this.data.hasMore) {
      return
    }

    // 页数加1，不要让数据覆盖掉
    this.setData({
      pagenum: this.data.pagenum + 1
    })
    //  请求数据
    this.getData()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})