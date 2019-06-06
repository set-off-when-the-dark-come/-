var siteUrl = "http://whale.ringoer.com/";

Page({

  /**
  * 页面的初始数据
  */
  data: {
    noActivity:true,
    activityItem: {},
    ActivityList: [
    ]
    // ActivityList:""
  },
  /**
  * 生命周期函数--监听页面加载
  */
  /** get user location func*/
  //获取用户权限
  onLoad: function (options) {
    const that = this;
    var userLocation = wx.getStorageSync('userLocation');
    wx.request({
      url: 'https://whale.ringoer.com/act/getact',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        cityName: userLocation,
      },
      success: function (res) {
        console.log(res.data);
        if(res.data.length>0)
        {
          that.setData({
            noActivity:false
          })
        }
        for (let i = 0; i < res.data.length; i++) {
          var activity = res.data[i];
          var activityName = "ActivityList[" + i + "].activityName";
          var activityDate = "ActivityList[" + i + "].activityTime";
          var activityNum = "ActivityList[" + i + "].activityNum";
          var activityUrl = "ActivityList[" + i + "].activityImageSrc";
          // console.log("the url is");
          // console.log(siteUrl + activity.poster);
          that.setData({
            [activityName]: activity.activityName,
            [activityDate]: activity.activityTime,
            [activityNum]: activity.activityId,
            [activityUrl]: siteUrl + activity.poster,
          });
        }
        //console.log(ActivityList);
      },
      fail: function () {

      }
    })
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '活动',
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