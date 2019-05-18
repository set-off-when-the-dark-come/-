
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Message: {
      img: "/image/smoke.jpg",
      title: "厦门印象",
      content: "我以为的厦门，小资，浪漫，浮华，又带一丝丝野性，但来到这里才发现，生活气永远是这里的主旋律，它可以很慢，它也可以很快, 但它始终是慵懒的，是晨起一杯茶的清新，是晚间漫步海边的温柔。",
      date: "2019.05.18"
    },
    commentList: [
      {
        img: "/image/smoke.jpg",
        nickname: "GenShen LI",
        comment: "I like your words,and I like XiaMen,I like your words,and I like XiaMen",
        date: "2019.04.17",
      },
      {
        img: "/image/smoke.jpg",
        nickname: "GenShen LI",
        comment: "I like your words,and I like XiaMen",
        date: "2019.04.17",
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  