var util = require('../../utils/util.js');

Page({

  
  /*
   * 页面的初始数据
   */
  data: {
    address: "芙蓉隧道",
    location:'南京',
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

    /* 判断我是否留言 */
    var myMessage = {};
    if(wx.getStorageSync('myMessage'))//判断我是否留言
    {
      myMessage = JSON.parse(wx.getStorageSync('myMessage'));
      console.log(options);
      _this.data.Messages.push(myMessage);
    }//如果留言  则把我的留言压入


    /*判断是否有留言的缓存  如果有则显示  如果无  则request
      ps:是否需要根据时间进行删除    
     */
    var Messages  = wx.getStorageSync('Messsages');//获得Messages缓存
    wx.request({ // 根据城市请求postId
      url: 'https://whale.ringoer.com/post/getbyloc',
      method:'GET',
      data:{
        loc:_this.data.location,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data);
        var returnList = res.data;//获得postId数组
        for (let i = 0; i < returnList.length; i++)//分别进行请求
        {
          wx.request({
              url: 'https://whale.ringoer.com/post/getbyid',
              data: {
                postId:returnList[i],
              },
              header: {
              'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: function(res) {
                console.log(res.data);
                var img = "Messages[" + i + "].img";
                var title = "Messages[" + i + "].title";
                var nickname = "Messages[" + i + "].nickname";
                var date = "Messages[" + i + "].date";

                var time = res.data.postTime.split('-');
                var day = time[2][0]+time[2][1]

                console.log(time);
                  _this.setData({
                      [img]: "http://whale.ringoer.com" + res.data.picture,
                      [title]: res.data.title,
                      [nickname]: res.data.userId,
                      [date]: time[0]+'.'+time[1]+'.'+day
                  });
              },
                fail: function(res) {},
                complete: function(res) {
                  console.log(_this.data.Messages);
                  wx.setStorageSync('Messages', JSON.stringify(_this.data.Messages))
                },
          })
        }
        },
      fail:function(fail){
        console.log(fail);
        console.log('fail');
      },
      complete:function(){
        
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

