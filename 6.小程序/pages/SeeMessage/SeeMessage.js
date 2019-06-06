var util = require('../../utils/util.js');
const _this = this;
Page({

  
  /*
   * 页面的初始数据
   */
  data: {
    postAddress: "芙蓉隧道",
    userLocation:'南京',
    postIdlist:[],
    requestNum:5,
    maxIndex:0,
    endIndex:0,
    currentIndex:0,
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

    //   },
    //   {
    //     img: "/image/smoke.jpg",
    //     title: "厦门印象",
    //     nickname: "唯心主义蠢货",
    //     date: "2019.05.17"

    //   }
    // ]

  },
  ShowDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    const Url = "../ShowDetail/ShowDetail?id = " + id;
    wx.navigateTo({
      url: "../ShowDetail/ShowDetail?id=" + id,
      success:function(res){
        console.log('success');
      },
      fail:function(fail){
        console.log('fail');
        console.log(fail);
      }
    })
  },
  addPost:function(){
    const _this = this;
    //四条留言看完上拉  
    //再刷新两条
    var returnList = this.data.postIdlist;
    var currentIndex = _this.data.currentIndex;
    console.log(returnList);
    console.log(this.data.postIdlist);
    console.log(this.data.requestNum);
    var endIndex = (currentIndex + this.data.requestNum) < this.data.maxIndex ? (currentIndex + this.data.requestNum) : this.data.maxIndex;
    //wx.setStorageSync('endIndex', endIndex)
    _this.setData({
      endIndex:endIndex
    })
    console.log('currentIndex:' + currentIndex);
    console.log('endIndex:' + endIndex);
    for (let i = currentIndex; i < endIndex; i++)//分别进行请求
    {
      wx.request({
        url: 'https://whale.ringoer.com/post/getbyid',
        data: {
          postId: returnList[i],
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function (res) {
          var USERID = res.data.userId;
          var POSTID = returnList[i];
          var TITLE = res.data.title;
          var IMG = "http://whale.ringoer.com" + res.data.picture;
          var NICKNAME;


          var postId = "Messages[" + i + "].postId";
          var img = "Messages[" + i + "].img";
          var title = "Messages[" + i + "].title";
          var nickname = "Messages[" + i + "].nickname";
          var date = "Messages[" + i + "].date";

          var time = res.data.postTime.split('-');
          var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];
          wx.request({
            url: 'https://whale.ringoer.com/user/getnickname',
            data: {
              userId: USERID
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
               NICKNAME = res.data;
              _this.setData({
                [postId]: POSTID,
                [img]: IMG,
                [title]: TITLE,
                [nickname]: NICKNAME,
                [date]: day
              });
            },
            fail: function () {

            }
          });
        },
        fail:function(fail){

        },
      })
    }
    currentIndex = endIndex;
    this.setData({
      currentIndex:currentIndex
    })
    console.log("Refresh");
    if (currentIndex >= this.data.maxIndex) {
      wx.showToast({
        title: '已经没有留言喽!',
        duration: 1000
      })
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const  _this = this;
    var postAddress = wx.getStorageSync('street_number');
    var userlocation
      _this.setData({
        postAddress: postAddress
      })
    console.log(postAddress);
    /*判断是否有留言的缓存  如果有则显示  如果无  则request
      ps:是否需要根据时间进行删除    
     */
    //获得Messages缓存
    // var oldMessage = wx.getStorageSync('Messages');
    // if (oldMessage != null)
    // {
    //   oldMessage = JSON.parse(oldMessage);
    //   var oldLength = oldMessage.length;
    //   console.log(oldLength);
    //   try{
    //     _this.setData({
    //       Messages: _this.data.Messages.concat(oldMessage),
    //       maxIndex: oldLength
    //     })
    //     console.log(_this.data.Messages);
    //   }
    //   catch(e){
    //     console.log(e); 
    //   }
    //   wx.setStorage({
    //     key: 'Message',
    //     data: null,
    //   })
    //   console.log(_this.data.Messages);
    // }
      wx.request({ // 根据城市请求postId
        url: 'https://whale.ringoer.com/post/getbyloc',
        method: 'GET',
        data: {
          loc: _this.data.postAddress,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var returnList = res.data;//获得postId数组
          _this.setData({
            postIdlist:returnList,
            maxIndex: _this.data.maxIndex+returnList.length
          })
          var REQUESTNUM = _this.data.requestNum;
          var CURRENTINDEX = _this.data.currentIndex;
          var ENDINDEX = _this.data.endIndex;
          ENDINDEX = (CURRENTINDEX + REQUESTNUM) < _this.data.maxIndex ? (CURRENTINDEX + REQUESTNUM) : _this.data.maxIndex;
          _this.setData({
            endIndex:ENDINDEX
          });

          console.log('currentIndex:'+CURRENTINDEX);
          console.log('endIndex:'+ENDINDEX);
          console.log(returnList);
          for (let i = CURRENTINDEX; i < ENDINDEX; i++)//分别进行请求
          {
            wx.request({
              url: 'https://whale.ringoer.com/post/getbyid',
              data: {
                postId: returnList[i],
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'GET',
              success: function (res) {
                console.log(res);
                var NICKNAME;
                
                var postId = "Messages[" + i + "].postId";
                var img = "Messages[" + i + "].img";
                var title = "Messages[" + i + "].title";
                var nickname = "Messages[" + i + "].nickname";
                var date = "Messages[" + i + "].date";

                var POSTID = returnList[i];
                var IMG = "http://whale.ringoer.com" + res.data.picture;
                var TITLE = res.data.title;
                var time = res.data.postTime.split('-');
                var DAY = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];
                wx.request({
                  url: 'https://whale.ringoer.com/user/getnickname',
                  data: {
                    userId: res.data.userId
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log(res.data);
                    NICKNAME = res.data;
                    _this.setData({
                      [postId]: POSTID,
                      [img]: IMG,
                      [title]: TITLE,
                      [nickname]: NICKNAME,
                      [date]: DAY
                    });
                  },
                  fail: function (fail) {
                    console.log(fail);
                  },
                  complete:function(){
                    
                  }
                })

              },
              fail: function (fail) { 
                console.log(fail)
              },
              complete: function (res) {
                
                // wx.setStorage({
                //   key: 'Messages',
                //   data: JSON.stringify(_this.data.Messages),
                // })
              },
            })
          }
          CURRENTINDEX = ENDINDEX;
          //wx.setStorageSync('currentIndex', currentIndex);
          _this.setData({
            currentIndex:CURRENTINDEX
          })
        },
        fail: function (fail) {
          console.log(fail);
        },
        complete: function () {
          
        }
      });

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

    const _this = this;
    //四条留言看完上拉  
    //再刷新两条
    var returnList = this.data.postIdlist;
    var currentIndex = wx.getStorageSync('currentIndex');

    var endIndex = (currentIndex + this.data.requestNum) < this.data.maxIndex ? (currentIndex + this.data.requestNum) : this.data.maxIndex;
    wx.setStorageSync('endIndex', endIndex);

    if (currentIndex >= this.data.maxIndex) {
      wx.showToast({
        title: '已经没有留言喽!',
        duration: 1000
      })
      return ;
    }
    console.log('currentIndex:' + currentIndex);
    console.log('endIndex:' + endIndex);

    for (let i = currentIndex; i < endIndex; i++)//分别进行请求
    {
      wx.request({
        url: 'https://whale.ringoer.com/post/getbyid',
        data: {
          postId: returnList[i],
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function (res) {
          var postId = "Messages[" + i + "].postId";
          var img = "Messages[" + i + "].img";
          var title = "Messages[" + i + "].title";
          var nickname = "Messages[" + i + "].nickname";
          var date = "Messages[" + i + "].date";

          var time = res.data.postTime.split('-');
          var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];
          _this.setData({
            [postId]: returnList[i],
            [img]: "http://whale.ringoer.com" + res.data.picture,
            [title]: res.data.title,
            [nickname]: res.data.userId,
            [date]: day
          });
        },
        fail: function (res) { },
        complete: function (res) {
          wx.setStorage({
            key: 'Messages',
            data: JSON.stringify(_this.data.Messages),
          })
        },
      })
    }
    currentIndex = endIndex;
    wx.setStorageSync('currentIndex', currentIndex);
    console.log("Refresh");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})