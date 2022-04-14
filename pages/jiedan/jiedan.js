// pages/jiedan/jiedan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      userInfo:app.globalData.userInfo,
      userID:app.globalData.userID
  },


  jiedan:function(e)
  {
    var data=e.currentTarget.dataset
    console.log(data.id+app.globalData.userInfo+app.globalData.userID);
    wx.request({
      url: 'http://localhost:7788/receive',
      method:"POST",
      data:{
        id:data.id,
        name:app.globalData.nickName,
        userID:app.globalData.userID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res)
      {
        console.log(res.data);
        if (res.data.status==200)
         {wx.showToast({
          title: "接单成功",
          duration: 2000//持续的时间
          })}
          else if(res.data.status==202)
          {
            wx.showToast({
              title: '不能为自己跑腿哦！',
              icon: 'none',    
              duration: 2000//持续的时间
         
            })
          }

      }
    })


  },
  onShow()
  {
    var that = this;
    wx.request({
      url: 'http://localhost:7788/all',
      method:"GET",
      success:function(res)
      {
        console.log(res.data.data);
        that.setData({
          list:res.data.data.allorder
        })
        console.log(that.data.list)
      }
    })
  }

})