var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"芙蓉隧道",
    date:'',
    cityCount:7,
    MainAnimationL:{},
  },
  jumpToMap:function(){
    wx.navigateTo({
      url: '../Maps/Maps',

    })
  },
  SeePs:function(){
    wx.navigateTo({
      url: '../SeeMessage/SeeMessage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  WritePs:function(){
    wx.navigateTo({
      url: '../WriteMessage/WriteMessage',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.app = getApp();

    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '主页',
    });
    var TIME = util.formatDate(new Date());
    this.setData({
      date:TIME,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.app.slideUpShow(this, "slide1", 600, -60, 1);
    this.app.slideUpShow(this, "slide2", 600, 60, 1);
    this.app.slideUpShow(this, "slide3", 800, 0, 1);
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