import request from '../../utils/request.js';
Page({
  data: {
    // 轮播图数据
    imgUrls: [],
    autoplay: true,
    interval: 5000,
    duration: 500,
    // 菜单数据
    menus: [],
    // 楼层数据
    floor: [],
  },
  onLoad() {
    // 获取楼层数据
    request({
      url: '/home/floordata'
    }).then(res => {
      const { message } = res.data;
      this.setData({
        floor: message
      })
    })
    //获取导航菜单数据
    request({
      url: '/home/catitems'
    }).then(res => {
      const { message } = res.data;
      this.setData({
        menus: message
      })
    })
    // 获取轮播图数据
    request({
      url: '/home/swiperdata'
    }).then(res => {
      const { message } = res.data;
      this.setData({
        imgUrls: message
      })
    })
  }
})
