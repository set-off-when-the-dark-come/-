const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    userId:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconSeeSrc:"../../image/DecorationIcon/iconSee.png",
    iconArrowSrc:"../../image/SetIcon/arrow.png",
    iconSaySrc: "../../image/DecorationIcon/iconSay.png",
    iconSettingSrc: "../../image/DecorationIcon/iconSetting.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  jumpToSee:function()
  {
    if (app.globalData.userInfo)
    {
      wx: wx.navigateTo({
      url: '../Manage/ReplyHistory/ReplyHistory',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
  })
    }
  },
  jumpToSay: function () {
    if(app.globalData.userInfo)
    {
      wx: wx.navigateTo({
        url: '../Manage/History/History',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  jumpToSetting: function () {
    if(app.globalData.userInfo)
    {
      wx: wx.navigateTo({
        url: 'Setting/Setting',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  getUserInfo:function(){
    const _this = this;
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          console.log('获取用户信息');
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              _this.setData({
                userInfo: res.userInfo,
              })
              var userInfo = res.userInfo;
              wx.login({
                success: res => {
                  console.log(userInfo.nickName)
                  var logincode = res.code;
                  console.log(userInfo.nickName);
                  console.log(res.code);
                  wx.request({
                    url: 'https://whale.ringoer.com/api/login',
                    data: {
                      code: logincode,
                      nickname: userInfo.nickName
                    },
                    method:'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: res => {
                      app.globalData.userId = res.data.userId;
                      app.globalData.punches = res.data.punches;
                      console.log(app.globalData.punches);
                      wx.setStorageSync('punches', app.globalData.punches);
                    },
                    fail: res => {
                      console.log(res);
                    }
                  })
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: function (fail) {
        console.log(fail);
      },
      complete:function(){

      }
    })
  },
  onLoad: function () {
    const _this = this;
    if(app.globalData.userInfo)
    {
        _this.setData({
          userInfo:app.globalData.userInfo,
          userId:app.globalData.userId,
        })
    }

    //当网络延迟时 回调的处理 else if() app.userInfoReadyCallback

    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '个人',
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