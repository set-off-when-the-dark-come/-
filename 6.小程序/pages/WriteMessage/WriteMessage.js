var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    centerImg:"block",
    focus1: false,
    focus2: false,
    postId:'',
    path:'/image/DecorationIcon/camera.jpg',
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
          path:res.tempFilePaths,//本次上传的临时路径
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
    var imagePath = this.data.path;
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
      wx.request({
        url: 'https://whale.ringoer.com:443/userloc/add',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userid: 'cw',
          locationName: '杭州',
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (fail) {
          console.log(fail);
        },
      }),


        wx.request({
        url: 'https://whale.ringoer.com:443/post/new',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          title: title,
          content: content,
          location: '南京',
          userId: 'cw',
        },
        success: function (res) {
          console.log(res.data);
          _this.setData({
            postId:res.data,
          }),
          upload(_this, imagePath, res.data);
          wx.navigateTo({
            url: '../SeeMessage/SeeMessage',
            success: function (res) {
              var myMessgae = {
                postId : res.data,
                nickname: this.globalData.nickname,
                title: _this.data.title,
                img: _this.data.imagePath,
                date: util.formatYMD(new Date())
              }
              wx.setStorageSync('myMessage', JSON.stringify(myMessgae));
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
    filePath: path[0],
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
