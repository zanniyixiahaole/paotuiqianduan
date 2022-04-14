// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:app.globalData.hasUserInfo,
    userInfo: app.globalData.userInfo,
    userID: app.globalData.userID
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  
  getSession(){
    wx.checkSession({
      success: (res) => {},
      fail: (res) =>{
    var that = this
    wx.login({
      success:login_res=>{
        if(login_res.code){
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
                  code: login_res.code,
                  rawData: info_res.rawData, //用户非敏感信息
                  signature: info_res.signature, //签名
                  encrypteData: info_res.encryptedData, //用户敏感信息
                  iv: info_res.iv //解密算法的向量
                },
                
                success: function(res) {
                  console.log(res)
                  if (res.data.status == 200) {
                    
                    // 7.小程序存储skey（自定义登录状态）到本地
                    wx.setStorageSync('userInfo', info_res.userInfo);
                    wx.setStorageSync('skey', res.data.data.skey);
                    wx.setStorageSync('user', login_res.code);
                    wx.setStorageSync('userID', res.data.data.userID);

                    app.globalData.hasUserInfo= true;
                    app.globalData.userInfo= info_res.userInfo;
                    app.globalData.nickName= info_res.userInfo.nickName;
                    app.globalData.userID=res.data.data.userID;
                    
                    wx.switchTab({
                      url: '/pages/jiedan/jiedan',
                    })
                  } else{
                    console.log('服务器异常:'+res.data.code);
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
      }
    })
  }
})
  },

  bindGetUserInfo:function(e){
    if(app.globalData.hasUserInfo==false){
      this.getSession();
    }else{
      wx.switchTab({
        url: '/pages/jiedan/jiedan',
      })
    }
    // let userInfo=e.detail.userInfo
    // userInfo.openId=wx.getStorage({
    //   key: 'openId',
    // })
    // wx.request({
    //   method:"POST",
    //   url: 'http://101.35.150.191/user/wx/binding',
    //   data:{
    //     code:userInfo
    //   },
    //   success:res=>{
    //     app.globalData.userID=res.userID
    //   }
    // })
    // wx.setStorage({
    //   data: e.detail.userInfo,
    //   key: 'userInfo',
    // })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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