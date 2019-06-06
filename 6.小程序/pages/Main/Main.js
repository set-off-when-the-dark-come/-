var util = require('../../utils/util.js');
var userLocation = '';//存放用户所在的城市
var mylatitude = '';
var mylongitude = '';
var isOk;
//用于调用腾讯地图api获取用户的城市信息
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"杭州",
    date:'',
    cityCount:0,
    MainAnimationL:{},
  },
  jumpToMap:function(){
    wx.navigateTo({
      url: '../Maps/Maps',

    })
  },
  SeePs:function(){
      wx.navigateTo({
        url: '../SeeMessage/SeeMessage',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
  },
  WritePs:function(){
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '提示',
        content: '还没有登录哦！',
        confirmText: '去登录',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            console.log('跳转')
            wx.switchTab({
              url: '../Manage/Manage',
              success:function(res){
                console.log(res);
              },
              fail:function(fail){
                console.log(fail);
              }
            })
          }
          if (res.cancel) {
            console.log('取消了');
          }
        }
      })
    }
    else
    {
      wx.navigateTo({
        url: '../WriteMessage/WriteMessage',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  GetLocationAuth(that) {

    var isOk;
    console.log("inGetLocationAuth");
    wx.authorize({
      scope: 'scope.userLocation',
      //成功授权
      success() {
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          duration: 1000
        });
        //获取用户的地理位置
        that.GetLocation(that);
      },
      //授权失败
      fail() {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1000
        })
        isOk = false;
      },
    })
    console.log("isOk");
    console.log(isOk);
    return isOk;
  },
  //获取用户的经纬度
  GetLocation(that) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          wx.getLocation({
            success: res => {
              // console.log("getlocation Result:");
              // console.log(res);
              mylatitude = res.latitude;
              mylongitude = res.longitude;
              //将经纬度转换为城市名字
              that.GetLocationName(that);
            }
          })
        }
      }
    })

  },

  //通过调用api获取用户所在的城市名字
  GetLocationName(that) {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: mylatitude,
        longitude: mylongitude
      },
      success: function (res) {
        userLocation = res.result.address_component.city;//将用户的位置信息保存下来
        console.log(userLocation);
        wx.setStorageSync('userLocation', userLocation);
        wx.setStorage({
          key: 'street_number',
          data: res.result.address_component.street_number,
        });
      },
      fail: function (res) {

        console.log(res);
        console.log("fail!get the location name");
      },
      complete: function (res) {
        console.log(res);
        that.setData({
          address: res.result.address_component.city.slice(0,2)
        })
      }
    });
  },
  AskAgain() {
    wx.showModal({
      title: '请求授权当前位置',
      content: '需要获取您的地理位置，请确认授权',
      success: function (res) {
        if (res.cancel) {
          wx.showToast({
            title: '拒绝授权',
            icon: 'none',
            duration: 1000
          })
        } else if (res.confirm) {
          wx.openSetting({
            success: function (dataAu) {
              console.log("in OpenSetting");
              console.log(dataAu);
              dataAu.authSetting = {
                "scope.userInfo": true,
                "scope.userLocation": true
              }
              if (dataAu.authSetting["scope.userLocation"] == true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1000
                })
                //再次授权，调用wx.getLocation的API

              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  },
  //获取用户的地理信息包含函数
  GetLocationFunc(that) {
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.userLocation']);
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        //没有授权或第一次登陆
        if (res.authSetting['scope.userLocation'] == undefined) {
          console.log("have no priority");
          //获取授权并获取地址
          that.GetLocationAuth(that);
        }
        //拒绝过再进来
        else if (res.authSetting['scope.userLocation'] == false) {
          //重新询问是否需要进行授权
          that.AskAgain();
        }
        //有用户的权限
        else {
          console.log("have  auth");
          //获取用户的地理位置
          that.GetLocation(that);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: 'GJ6BZ-CG5WU-VZDV6-BZDA2-CTZAZ-A4FAB' //这里自己的key秘钥进行填充
    });
    var punches = wx.getStorageSync('punches');
    console.log(punches);
    var userLocation = wx.getStorageSync('userLocation');
    // if(userLocation)
    // {
    //     this.setData({
    //     address: userLocation.slice(0, 2)
    //   })
    // }
    // else{
    //   //绑定sdk
    that.GetLocationFunc(that);
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '主页',
    });
    var TIME = util.formatDate(new Date());
    this.setData({
      date:TIME,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
    var rpx = 0;
    var systemInfo = wx.getSystemInfoSync();
    var px = rpx / 750 * systemInfo.windowWidth;

    app.slideUpShow(this, "slide1", 600, -px, 1);
    app.slideUpShow(this, "slide2", 600, px, 1);
    app.slideUpShow(this, "slide3", 800, 0, 1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(punches);
    var punches = wx.getStorageSync('punches');
    if(!punches){
      punches = app.globalData.punches;
      this.setData({
        cityCount: punches,
      })
    }
    else{
      this.setData({
        cityCount: punches,
      })
    }
    console.log('show');
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