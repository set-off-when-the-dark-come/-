var siteUrl = "http://whale.ringoer.com/";
const app = getApp();

Page({

  /**
  * 页面的初始数据
  */
  data: {
    userInfo: null,
    openId: null,
    // ActivityImageSrc:"../../image/smoke.jpg",
    ActivityImageSrc: "http://whale.ringoer.com/upload/act/dance.jpg",
    iconTimeSrc: "../../image/DecorationIcon/date.png",
    iconLocationSrc: "../../image/DecorationIcon/location.png",
    iconIntroductionSrc: "../../image/DecorationIcon/title.png",
    ActivityName: "活动",
    ActivityTime: "2019-5-23",
    ActivityIntroduction: "该活动是厦门大学天黑再动手小组",
    locationList: [
      {
        location: "芙蓉隧道",
        isChecked: true,
      },
      {
        location: "芙蓉湖",
        isChecked: false,
      }
    ],
  },
  CompleteInput:function(){
    console.log('完成打卡');
    // wx.request({
    //   url: '',
    // })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    var MyactivityName = options.activityName;
    if (app.globalData.userInfo) {
      _this.setData({
        userInfo: app.globalData.userInfo,
        openId: app.globalData.openId,
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '还没有登录哦！',
      })
    }
    
    
    console.log(MyactivityName);
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '活动详情',
    });
    /* 获取活动信息*/
    wx.request({
      url: "https://whale.ringoer.com/act/getactinfo",
      method: "POST",
      header:
      {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data:
      {
        activityName: MyactivityName,
      },
      success: function (res) {
        console.log("success in activityContent 内容");
        console.log(res.data);
        that.setData({
          ActivityName: res.data.activityName,
          ActivityTime: res.data.activityTime,
          ActivityIntroduction: res.data.content,
          ActivityImageSrc: siteUrl + res.data.poster
        });
      }
    });

    /**获取活动地点 */
    wx.request({
      url: 'https://whale.ringoer.com/actloc/getallloc',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        activityName: MyactivityName,
      },
      success: function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          var activityLocation = "locationList[" + i + "].location";
          that.setData({
            [activityLocation]: res.data[i],
          });
        }
      }
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
})