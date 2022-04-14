// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: null
  },

  onLoad: function() {
    // 页面加载时使用用户授权逻辑，弹出确认的框  
    this.userAuthorized()
  },
  
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo(e) {
   
    const userInfo = e.detail.userInfo
    if (userInfo) {
      // 1. 小程序通过wx.login()获取code
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
          wx.navigateTo({
            url: 'pages/jiedan/jiedan',
          })
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success: function(login_res) {
              //获取用户信息
              wx.getUserInfo({
                success: function(info_res) {
                  console.log(info_res),
                  console.log("code是"+login_res.code),
                  // 2. 小程序通过wx.request()发送code到开发者服务器
                  wx.request({
                    url: 'http://localhost:7788/wx/login',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      code: login_res.code, //临时登录凭证
                      rawData: info_res.rawData, //用户非敏感信息
                      signature: info_res.signature, //签名
                      encrypteData: info_res.encryptedData, //用户敏感信息
                      iv: info_res.iv //解密算法的向量
                    },
                    
                    success: function(res) {
                      if (res.data.status == 200) {
                        // 7.小程序存储skey（自定义登录状态）到本地
                        wx.setStorageSync('userInfo', userInfo);
                        wx.setStorageSync('skey', res.data.data);
                        console.log('sssss')
                        wx.navigateTo({
                          url: 'pages/jiedan/jiedan',
                        })
    
                      } else{
                        console.log('服务器异常:'+res.data.status);
                      }
                    },
                    fail: function(error) {
                      //调用服务端登录接口失败
                      console.log('调用服务端登录接口失败'+error);
                    }
                  })
                }
              })
            }
          })
          this.setData({
            hasUserInfo: true,
            userInfo: userInfo
          })
        }
      })
    }
  }
})