// pages/dingdan/dingdan.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[],
    userID:app.globalData.userID
  },
      
  onShow()
  {
    //console.log(app.globalData.userInfo)
    var that = this;
    wx.request({
      url: 'http://localhost:7788/myrelease/mid',
      method:"POST",
      data:{
        name:app.globalData.nickName,
        userID:app.globalData.userID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res)
      {

        console.log(res.data);
        that.setData({
          list:res.data.data.myreleasemid
        })
        console.log(that.data.list)
      }
    }),
    wx.request({
      url: 'http://localhost:7788/myrelease/end',
      method:"POST",
      data:{
        name:app.globalData.nickName,
        userID:app.globalData.userID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res)
      {

        console.log(res.data);
        that.setData({
          list1:res.data.data.myreleaseend
        })
        console.log(that.data.list1)
      }
    })
  }
})