var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userId: null,
    date:"",
    userLocation:'杭州',
    postAddress:'',
    title: "",
    content: "",
    centerImg:"block",
    focus1: false,
    focus2: false,
    imagePath:'/image/DecorationIcon/camera.jpg'
  },
  changeFocus1:function(){
    this.setData({
      focus1:true,
      focus2:false,
    })
  },
  loseFocus1:function(){
    this.setData({
      focus1:false,
    })
  },
  changeFocus2:function(){
    this.setData(
      {
        focus1:false,
        focus2:true,
      }
    )
  },
  loseFocus2:function(){
    this.setData({
      focus2:false,
    })
  },
  getTitle:function(e){
    var val = e.detail.value;
    this.setData({
      title: val,
    })
  },
  getContent:function(e){
    var val = e.detail.value;
    this.setData({
      content:val,
    })
  },
  ChooseImage(e) {
    var _this = this;
    wx.chooseImage({//选择文件
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        _this.setData({
          imagePath:res.tempFilePaths,//本次上传的临时路径
        })
      },
      fail:function(fail){
        console.log(fail);
      },
    })
  },
  CompleteInput: function () {
    var _this = this;
    var content = this.data.content;
    var title = this.data.title;
    var imagePath = this.data.imagePath;
    var id;
    if(imagePath === '')
    {
      wx.showToast({
        title: '没有传照片哦!',
      })
    }
    else if( content === '' || title === ''){
      wx.showToast({
        title: '留言要写完整哦!',
      })
    }
    if(title!== '' && content !== '' && imagePath !== '')
    {
      console.log(imagePath);
      wx.request({
        url: 'https://whale.ringoer.com/userloc/add',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: _this.data.userId,
          locationName: _this.data.location,
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (fail) {
          console.log(fail);
        },
        complete:function(){
          wx.request({
            url: 'https://whale.ringoer.com/user/getnum',
            data:{
              userId:app.globalData.userId
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              wx.setStorageSync('punches', res.data)
            },
            fail:function(fail){

            },
          })


        }
      }),


        wx.request({
        url: 'https://whale.ringoer.com:443/post/new',//发帖子
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          title: title,//标题
          content: content,//内容
          location: _this.data.location,//用户所在地点
          userId: _this.data.userId,//用户ID
        },
        success: function (res) {
          console.log(res.data);
          _this.setData({
            postId:res.data,//返回POSTID
          }),
          upload(_this, imagePath[0], res.data);//上传路径和postid
          // var myMessgae = {
          //   nickname:app.globalData.userInfo.nickname,
          //   postId: res.data,
          //   img: imagePath[0],
          //   title: _this.data.title,
          //   date: util.formatYMD(new Date())
          //   }
          wx.navigateTo({
            url: '../SeeMessage/SeeMessage',//跳转上传postId
            success: function (res) {
              console.log('发送成功');
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (fail) {
          console.log(fail);
          wx.showModal({
            title: 'QAQ',
            content: '服务器开小差了，请重新上传',
          })
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    var userLocation = wx.getStorageSync('userLocation');
    var postAddress = wx.getStorageSync('street_number');
    if (app.globalData.userInfo) {
      console.log(app.globalData.userId);
      _this.setData({
        userInfo: app.globalData.userInfo,
        userId: app.globalData.userId,
        userLocation : userLocation,
        postAddress:postAddress
      })
    }


    var userLocation = wx.getStorageSync('street_number');
    var TIME = util.formatDate(new Date());
    this.setData({
      date: TIME,
      location: userLocation
    })
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '写留言',
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
function upload(page, path,postId) {
  console.log(postId);
  console.log(path[0]);
  wx.uploadFile({
    url: 'https://whale.ringoer.com/post/upload',
    formData:{
      'postId':postId
    },
    filePath: path,
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"
    },
    success(res) {
      console.log(res.data);
    },
    fail(fail) {
      console.log(fail);
    },
  })
}
