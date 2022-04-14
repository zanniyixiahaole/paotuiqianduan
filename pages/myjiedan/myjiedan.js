// pages/myjiedan/myjiedan.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check:'',
    list:[],
    list1:[]
  },

  check:function(e){
    this.setData({
      check: e.detail.value
    })
  },
  wancheng:function(e)
  {
    var data=e.currentTarget.dataset
    wx.request({
      url: 'http://139.224.113.73:7788/receiveend',
      method:"POST",
      data:{
        id:data.id
      },
      success:function(res)
      {
        console.log(res.data);
        if (res.data.code==200)
         {wx.showToast({
          title: "成功！",
          duration: 2000//持续的时间
          })}
          else if(res.data.code==202)
          {
            wx.showToast({
              title: '失败',
              icon: 'none',    
              duration: 2000//持续的时间
         
            })
          }

      },
      
    })


  },
  onShow()
  {
    //console.log(app.globalData.userInfo)
    var that = this;
    wx.request({
      url: 'http://139.224.113.73:7788/myreceive/mid',
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
      url: 'http://localhost:7788/myreceive/end',
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