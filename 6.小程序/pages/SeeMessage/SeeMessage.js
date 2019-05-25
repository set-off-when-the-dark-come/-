Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "芙蓉隧道",
    Messages:[],
    MessageList: [
      {
        img: "/image/test.jpg",
        title: "厦门印象",
        nickname: "唯心主义蠢货",
        date: "2019.05.17"
      },
      {
        img: "/image/smoke.jpg",
        title: "厦门印象",
        nickname: "唯心主义蠢货",
        date: "2019.05.17"

      },
      {
        img: "/image/smoke.jpg",
        title: "厦门印象",
        nickname: "唯心主义蠢货",
        date: "2019.05.17"

      }
    ]
  },
  ShowDetail: function () {
    //const Url = "../ShowDetail/ShowDetail?id = " + object.id;
    wx.navigateTo({
      url: "../ShowDetail/ShowDetail",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const  _this = this;
    wx.request({
      url: 'https://whale.ringoer.com/post/getbyloc',
      method:'GET',
      data:{
        loc:'厦门',
      },
      header:{
        'content-type': 'json'
      },
      success:function(res){
        console.log(res.data);
        _this.setData({
           Messages:res.data,
        })
      },
      fail:function(fail){
        console.log(fail);
        console.log('fail');
      }
    })
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '留言墙',
    });

    //初始加载状态 获取4条留言
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
    console.log('加载成功!');
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
    //四条留言看完上拉  
    //再刷新两条
    console.log("Refresh");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})