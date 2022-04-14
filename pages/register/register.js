// pages/register/register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    password2: ''
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  password2Input: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },
  // 登录 
  register: function () {
    var that = this;   
    if (that.data.username.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'loading',
        duration: 1000
      })
    } else if (that.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1000
      })
    }else if (that.data.password2.length == 0) {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'loading',
        duration: 1000
      })
    }else if (that.data.password2 != that.data.password) {
      wx.showToast({
        title: '两次密码不一致请重新输入',
        icon: 'loading',
        duration: 1000
      })
    }else {
      wx.request({
        url: 'http://101.35.150.191/user/register',
        method: "POST",
        data: {
          username: that.data.username,
          password: that.data.password
        },
        success: function(res)
        {
          console.log(res.data);
          if(res.data.code==400)
          {
            wx.showToast({
              title: '用户名已存在',
              icon: 'none',
              duration: 2000  //持续的时间
            })
          }
          if(res.data.code==200)
          {     // 调用globaldata
                app.globalData.userInfo=that.data.username;
                console.log(app.globalData.userInfo)
                wx.switchTab({
                  url: '/pages/jiedan/jiedan'
                })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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