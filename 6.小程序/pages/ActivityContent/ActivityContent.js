Page({

  /**
  * 页面的初始数据
  */
  data: {
    // ActivityImageSrc:"../../image/smoke.jpg",
    ActivityImageSrc: "http://whale.ringoer.com/upload/act/dance.jpg",
    iconTimeSrc: "../../image/DecorationIcon/date.png",
    iconLocationSrc: "../../image/DecorationIcon/location.png",
    iconIntroductionSrc: "../../image/DecorationIcon/title.png",
<<<<<<< HEAD
    ActivityName: "芙蓉隧道留言精选活动",
    ActivityTime: "2019-5-23",
    ActivityLocation: "厦门大学",
    ActivityIntroduction: "该活动是厦门大学天黑再动手小组举办的一个关于厦大芙蓉隧道涂鸦精选留言的活动，在活动时间内，在芙蓉隧道定位点内发送留言即可参加活动，获得回复最多的留言可以获得刘旭写真一套",
    locationList: [
=======
    ActivityName:"芙蓉隧道留言精选活动",
    ActivityTime:"2019-5-23",
    ActivityLocation:"厦门大学",
    ActivityIntroduction:"该活动是厦门大学天黑再动手小组举办的一个关于厦大芙蓉隧道涂鸦精选留言的活动，在活动时间内，在芙蓉隧道定位点内发送留言即可参加活动，获得回复最多的留言可以获得刘旭写真一套",
   locationList:[
     {
       location:"芙蓉隧道",
       isChecked:true,
     },
      {
        location: "芙蓉湖",
        isChecked: false,
      }
   ],
    commentList: [
>>>>>>> bf4007f14ff9e2ce66c8d3e04e83e799fb8a641b
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

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
<<<<<<< HEAD
    var activityName = options.activityName;
=======
>>>>>>> bf4007f14ff9e2ce66c8d3e04e83e799fb8a641b
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '活动详情',
    });
<<<<<<< HEAD
    const _this = this;
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
        activityName: '跳舞',
      },
      success: function (res) {
        console.log("success in activityContent 内容");
        console.log(res.data);
        // _this.setDada({
        // ActivityName:res.actName,
        // ActivityTime:res.actTime,
        // ActivityIntroduction:res.actIntro,
        // });
      }
    });
    /**获取活动图片 */
    wx.request({
      url: 'https://whale.ringoer.com/act/getposter',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        activityName: activityName,
      },
      success: function (res) {
        console.log("success in activityContent 照片");
        console.log(res.data);
        // that.setDada({
        // ActivityImageSrc:res.data,
        // });
      }
    })
=======
>>>>>>> bf4007f14ff9e2ce66c8d3e04e83e799fb8a641b
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