// pages/listenList/listenList.js
const site = 'http://whale.ringoer.com';
const app = getApp();
Page({
  jumpToDetail: function (e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../../ShowDetail/ShowDetail?id=' + id,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userId: null,
    isHave:false,
    replyList: [],
    scrollHeight: '100vh',
    iconLocation: "../../../image/DecorationIcon/location.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        userId: app.globalData.userId,
      })
    }

    wx.request({
      url: 'https://whale.ringoer.com/reply/getbyuser',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: _this.data.userId
      },
      success: function (res) {
        var returnList = res.data;
        if(res.data.length>0)
        {
          _this.setData({
            isHave:true
          })
        }
        for (let i = 0; i < returnList.length; i++) {
          var postId = "replyList[" + i + '].postId';
          var desUserID = "replyList[" + i + '].desUserID';
          var location = "replyList[" + i + '].dateLocation';
          var content = "replyList[" + i + '].content';

          var time = returnList[i].postTime.split('-');
          var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];
          _this.setData({
            [postId]: returnList[i].postId,
            [location]: returnList[i].location,
            [desUserID]: returnList[i].desUserID,
            [content]: returnList[i].replyContent,
            [date]: day
          })
        }
        console.log(res);
      },
      fail: function (fail) {
        console.log(fail);
      }
    })

    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '写过',
    });
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