const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userHeadSrc:"../../images/UI/userHead.png",
    userName:"唯心主义蠢货",
    userDetail:"我的资料",
    iconSeeSrc:"../../images/UI/iconSee.png",
    iconArrowSrc:"../../images/UI/iconArrow.png",
    iconSaySrc: "../../images/UI/iconSay.png",
    iconSettingSrc: "../../images/UI/iconSetting.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jumpToSee:function()
  {
    wx:wx.navigateTo({
      url: '../Manage/History/History',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jumpToSay: function () {
    wx: wx.navigateTo({
      url: '../Manage/History/History',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jumpToSetting: function () {
    wx: wx.navigateTo({
      url: 'Setting/Setting',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad: function () {
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '个人',
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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