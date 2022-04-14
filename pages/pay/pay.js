// pages/pay/pay.js
var app=getApp();
Page({
  data:{
    code:null
  },

  wxpay: function(){
    //console.log(app.globalData.username)
    wx.getStorage({
      key: 'user',
      success:function(res){
        
        let code=res.data.openid
        console.log(code)
        wx.request({
          method:"POST",
          url: 'http://localhost:7788/pay/wxpay', 
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            var data=res.data;
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