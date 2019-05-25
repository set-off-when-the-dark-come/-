var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message: {
      title: "",
      content: "",
    },
  },

  ChooseImage() {
    var _this = this;

    wx.chooseImage({//选择文件
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;//本次上传的临时路径
        upload(_this, tempFilePaths);
      },
    })
  },
  CompleteInput: function () {
    var _this = this;
    wx.request({
      url: 'https://whale.ringoer.com/post/newparam',
      method:'POST',
      data:{
        title: _this.data.Message.title,
        content: _this.data.Message.content,
        location:'山东',
        userId:'123',
      },
      success:function(res){
        console.log(res.data);
      },
      fail:function(fail)
      {
        console.log(fail);
        wx.showModal({
          title: 'QAQ',
          content: '服务器开小差了，请重新上传',
        })
      }
    })
    console.log("输入完成!");
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
function upload(page, path) {
  wx.uploadFile({
    url: 'https://whale.ringoer.com/post/uploadparam',
    filePath: path[0],
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"
    },
    success(res) {
      console.log(res.data);
    },
    fail() {

    },
  })
}
