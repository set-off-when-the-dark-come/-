Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityItem:{},
    ActivityList:[
      {
        activityImageSrc: "../../image/smoke.jpg",
        activityName: "芭蕾舞者的浪漫",
        activityTime:"2019.05.04——2019.05.06",
        activityNum:"20000153",
      },
      {
        activityImageSrc: "../../image/smoke.jpg",
        activityName: "芭蕾舞者的浪漫",
        activityTime: "2019.05.04——2019.05.06",
        activityNum: "20000153",
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
    wx.request({
      url: 'https://whale.ringoer.com/act/getact',
      method:"GET",
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        cityName: 'xm' 
      },
      success:function(res){
        console.log(res.data);
      },
      fail:function(){

      }
    })
=======
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '活动',
    });
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