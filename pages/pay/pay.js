// pages/pay/pay.js
var app=getApp();
Page({
  data:{
    code:null
  },

  wxpay: function(){
    //console.log(app.globalData.username)
    // wx.getStorage({
    //   key: 'userID',
    //   success:function(res){
        
    //     let userID=res.data
    //     console.log(userID)
    //     wx.request({
    //       method:"POST",
    //       url: 'http://localhost:7788/pay/wxpay', 
    //       data: {
    //         userID:userID,
    //         price:"10"
    //       },
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       success: function (res) {
    //         console.log(res.data);
    //         var data=res.data.data;
    //         console.log(data);
    //         wx.requestPayment({
    //           'timeStamp': data.timeStamp,
    //           'nonceStr': data.nonceStr,
    //           'package': data.package,
    //           'signType': 'MD5',
    //           'paySign': data.paySign,
    //           'success': function (res) {
    //             console.log("支付成功！")
    //           },
    //           'fail': function (res) {
    //           }
    //         })
    //       }
    //     })
    //   }
    // })

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        //上传文件
        wx.uploadFile({
          url: 'http://localhost:7788/upload/picture',//请求接口地址
          filePath: tempFilePaths[0],//图片路径，如tempFilePaths[0] 为第一张图片
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {

          }
        })
      }
    })

    
  }
})