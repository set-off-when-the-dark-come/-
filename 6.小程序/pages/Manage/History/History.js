// pages/listenList/listenList.js
var msgList = [];
const app = getApp();

function initData(that) {

  msgList = [{
    userHeadSrc: "../../../images/UI/userHead.png",
    userName: "123123",
    dateLocation: "芙蓉隧道",
    id:1
  },
  {
    userHeadSrc: "../../../images/UI/userHead.png",
    userName: "name123123",
    dateLocation: "芙蓉隧道",
    id:2
  },
  ]
  that.setData({
    msgList,
  })
}
Page({
  jumpToDetail: function () {
    wx.navigateTo({
      url: '../../../MessageDetail/MessageDetail',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
     iconLocation: "../../../images/UI/iconLocation.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
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