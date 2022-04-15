// pages/pay/pay.js
var app=getApp();
Page({
  data:{
    code:null
  },

  wxpay: function(){
    //console.log(app.globalData.username)
    wx.getStorage({
      key: 'userID',
      success:function(res){
        
        let userID=res.data
        console.log(userID)
        wx.request({
          method:"POST",
          url: 'http://localhost:7788/pay/wxpay', 
          data: {
            userID:userID,
            price:"10"
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            var data=res.data.data;
            console.log(data);
            wx.requestPayment({
              'timeStamp': data.timeStamp,
              'nonceStr': data.nonceStr,
              'package': data.package,
              'signType': 'MD5',
              'paySign': data.paySign,
              'success': function (res) {
                console.log("支付成功！")
              },
              'fail': function (res) {
              }
            })
          }
        })
      }
    })

    
  }
})