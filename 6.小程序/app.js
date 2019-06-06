//app.js

App({
  slideUpShow:function(that,params,durationTime,px,opacity){
    var animation = wx.createAnimation({
      duration:durationTime,
      timingFunction: 'ease-in-out'
    });
    animation.translateY(px).opacity(opacity).step();
    var json = '{"' + params + '":""}';
    json = JSON.parse(json);
    json[params] = animation.export();
    that.setData(json);
  },
  

  onLaunch: function () {

    wx.setEnableDebug({
      enableDebug: true
    })
    const _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)




    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          console.log('获取用户信息');
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              var userInfo = res.userInfo
              var session = wx.getStorageSync('session');
              // if (session)//判断是否有缓存  有缓存判断状态 监测重新登录 
              // {
              //   wx.login({
              //     success:res=>{
              //       var checkCode = res.code;
              //       wx.request({
              //       url: 'https://whale.ringoer.com/login/check',
              //       data: {
              //         code: checkCode
              //       },
              //       success: function (res) {
              //         console.log(res);
              //         _this.globalData.userId = res.data.openId;
              //       }
              //     });

              //     }
              //   })
              //   console.log('check session');
              // }

                console.log('login in');
                wx.login({
                  success: res => {
                    console.log(userInfo.nickName)
                    var logincode = res.code;
                    wx.request({
                      url: 'https://whale.ringoer.com/api/login',
                      data: {
                        code: logincode,
                        nickname: userInfo.nickName
                      },
                      method:'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success: res => {
                        console.log(res);
                        // wx.setStorage({
                        //   key: 'session',
                        //   data: res.data.checkState,
                        // });
                        _this.globalData.userId=res.data.userId;
                        _this.globalData.punches = res.data.punches;
                        console.log(_this.globalData.punches);
                        wx.setStorageSync('punches', _this.globalData.punches);
                        // _this.globalData.userId = 'cw'
                      },
                      fail: res => {
                        console.log(res);
                      }
                    })
                  }
                })
              
            }
          })
        }
      },
      fail: function (fail) {
        console.log(fail);
      },
      complete:function(){
        console.log('complete');
      }
    })

    
    // else
    // {
    //   wx.login({
    //     success: res => {
    //         var logincode = res.code;
    //         wx.request({
    //           url: 'https://whale.ringoer.com/user/isreg',//判断是否注册过
    //           data: {
    //             code: logincode,
    //           },
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           success:function(res){
    //               if(res.data){//如果注册过
    //                   wx.request({
    //                     url: 'https://whale.ringoer.com/login/getsess',
    //                     data: {
    //                       code: logincode
    //                     },
    //                     header: {
    //                       'content-type': 'application/x-www-form-urlencoded'
    //                     },
    //                     success: res => {
    //                       console.log(res);
    //                       console.log("success!");
                        
    //                       wx.setStorage({
    //                         key: 'session',
    //                         data: res.data.session,
    //                       })
    //                     },
    //                     fail: res => {
    //                       console.log(res);
    //                     }
    //                   })
    //               }
    //               else//如果没有注册过 进行注册
    //               {
    //                   wx.request({
    //                     url: 'https://whale.ringoer.com/user/register',
    //                     data: {
    //                       code: logincode,
    //                       nickname: 'cw'
    //                     },
    //                     header: {
    //                       'content-type': 'application/x-www-form-urlencoded'
    //                     },
    //                     success:function(res){
    //                       console.log(res);
    //                         wx.request({
    //                           url: 'https://whale.ringoer.com/login/getsess',
    //                           data: {
    //                             code: logincode
    //                           },
    //                           header: {
    //                             'content-type': 'application/x-www-form-urlencoded'
    //                           },
    //                           success: res => {
    //                             console.log(res);
    //                             console.log("success!");
    //                             //this.globalData.userId = res.code.openid;
    //                             wx.setStorage({
    //                               key: 'session',
    //                               data: res.data.session,
    //                             })
    //                           },
    //                           fail: res => {
    //                             console.log(res);
    //                           }
    //                         })
    //                     },
    //                     fail:function(fail){
    //                       console.log(fail);
    //                     }
    //                   })
    //               }
    //           },
    //           fail:function(fail){
    //             console.log(fail);
    //           }
    //       })

    //     }
    //   })
    // }

    // 登录
    
  },
  globalData: {
    userInfo: null,
    userId:null,
    punches:0
  }
})