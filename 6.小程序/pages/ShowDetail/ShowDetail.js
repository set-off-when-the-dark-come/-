var util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focustext:false,
    Message: {
      userId:'cw',
      postId:'12',
      nickName : '唯心主义蠢货',
      img: "/image/smoke.jpg",
      title: "厦门印象",
      content: "我以为的厦门，小资，浪漫，浮华，又带一丝丝野性，但来到这里才发现，生活气永远是这里的主旋律，它可以很慢，它也可以很快, 但它始终是慵懒的，是晨起一杯茶的清新，是晚间漫步海边的温柔。",
      date: "2019.05.18"
    },
    commentList: [
    ],
    myReply:{
      content:""
    }
  },
  changeFocus:function(){
    this.setData({
      focustext: true,
    })
  },
  changeValue:function(e){
    var content = e.detail.value;
    this.setData({
      ['myReply.content']:content
    })
  },
  reply:function(){
    const _this = this;
    console.log('reply');
      wx.request({
        url: 'https://whale.ringoer.com/reply/new',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          src: _this.data.userId,
          dest:'test',
          content: _this.data.myReply.content,
          postId: _this.data.Message.postId,
          
        },
        success:function(res){
          var i = _this.data.commentList.length;
          var src = 'commentList[' + i + '].nickname';
          var date = 'commentList[' + i + '].date';
          var content = 'commentList[' + i + '].content';

          var time = new Date().split('-');
          var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];

          _this.setData({
            [src]: _this.data.userId,
            [date]: day,
            [content]: _this.data.myReply.content,
          })
          console.log(res);
        },
        fail:function(fail){
          console.log(fail);
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    var id = options.id;
    //根据option 获得传入id  根据id获得留言内容 回复 
    this.setData({
      userId: app.globalData.userId
    })
    wx.request({
      url: 'https://whale.ringoer.com/post/getbyid',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        postId: id
      },
      success: function (res) {
        console.log(res);
        console.log(res);
        var userId = 'Message.userId';
        var postId = 'Message.postId';
        var img = 'Message.img';
        var content = 'Message.content';
        var title = 'Message.title';
        var date = 'Message.date';
        var nickName = 'Message.nickName';

        var time = res.data.postTime.split('-');
        var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];

        _this.setData({
          [userId]:res.data.userId,
          [postId]: id,
          [img]: "http://whale.ringoer.com"+res.data.picture,
          [content]: res.data.contents,
          [title]: res.data.title,
          [nickName]: res.data.userId,
          [date]: day
        })
      },
      fail: function (fail) {
        console.log(fail);
      }
    })


    //获得回复内容
    wx.request({
      url: 'https://whale.ringoer.com/reply/getbypost',
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        postId:id
      },
      success:function(res){
        console.log(res.data);
        var returnList = res.data;
        for(let i = 0;i < returnList.length;i++)
        {
          var src = 'commentList[' + i +'].nickname';
          var date = 'commentList['+ i + '].date';
          var content = 'commentList[' + i + '].content';
          
          var time = returnList[i].replyTime.split('-');
          var day = time[0] + '.' + time[1] + '.' + time[2][0] + time[2][1];

          _this.setData({
            [src]:returnList[i].srcUserId,
            [date]:day,
            [content]:returnList[i].replyContent
          })
        }
      },
      fail:function(fail){
        console.log(fail);
      }
    })
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '留言',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();

  },
})

  