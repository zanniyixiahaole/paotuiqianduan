// pages/dingdan/dingdan.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    list1:[]
  },
      
  onShow()
  {
    //console.log(app.globalData.userInfo)
    var that = this;
    wx.request({
      url: 'http://139.224.113.73:7788/myrelease/mid',
      method:"POST",
      data:{
        name:app.globalData.nickName,
        userID:app.globalData.userID
      },
      success:function(res)
      {

        console.log(res.data);
        that.setData({
          list:res.data.inforlist1
        })
        console.log(that.data.list)
      }
    }),
    wx.request({
      url: 'http://139.224.113.73:7788/myrelease/end',
      method:"POST",
      data:{
        name:app.globalData.nickName,
        userID:app.globalData.userID
      },
      success:function(res)
      {

        console.log(res.data);
        that.setData({
          list1:res.data.inforlist2
        })
        console.log(that.data.list1)
      }
    })
  }
})