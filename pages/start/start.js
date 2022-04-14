// pages/start/start.js
var app = getApp()
Page({
  data: {
    username: '',
    password: ''
  },
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'username',
      success:function(res){
        app.globalData.username=res.data;
        console.log(app.globalData.username)
        wx.switchTab({
          url: '/pages/jiedan/jiedan'
        })
      }
    })
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
 
  // 登录 
  login: function () {
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
    }else {
      wx.request({
        url: 'http://101.35.150.191/user/login',
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
              title: '错误',
              icon: 'none',
              duration: 2000  //持续的时间
            })
          }
          if(res.data.code==200)
          {     
            wx.setStorage({
              data: that.data.username,
              key: 'username',
            })
            // 调用globaldata
            app.globalData.username=that.data.username;
            console.log(app.globalData.userInfo)
            wx.switchTab({
              url: '/pages/jiedan/jiedan'
            })
          }
    
      
        }
 
      })
 
 
 
    }
  },
  // 注册 
  register: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
 ,

  adminlogin:function()
  {
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
    }else {
      
      wx.request({
        url: 'http://127.0.0.1:5000/admin/login',
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
              title: '错误',
              icon: 'none',
              duration: 2000  //持续的时间
            })
          }
          else if(res.data.code==200)
        {
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000  //持续的时间
          })
          wx.switchTab({
            url: '/pages/jiedan/jiedan'
            })
        }
          
    
      
        }
 
      })
 
 
 
    }
  }
})