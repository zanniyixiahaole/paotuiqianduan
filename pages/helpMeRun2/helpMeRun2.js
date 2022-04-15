// pages/helpMeRun2/helpMeRun2.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type1:"",
    type2:"",
    price:'',
    start:'',
    destination:'',
    deadline:new Date().toLocaleTimeString(),
    checknum:'',
    userID:app.globalData.userID
  },
  priceinput:function(e)
  {
    
    var price=e.currentTarget.dataset.name
   
    if(price=="5"){
      this.setData({
        price:price,
        type1:"primary",
        type2:"",
      })         
    }
    if(price=="10"){
      this.setData({
        price:price,
        type2:"primary",
        type1:"",
      })         
    }
  },
  pricein: function(e) {
    this.setData({
      price: e.detail.value
    })
  },
  startinput:function(e)
  {
    var that=this;
    app.globalData.startchoose=1;
    app.globalData.endchoose=0;
    console.log
    ("app.globalData.startchoose="+app.globalData.startchoose)
    console.log
    ("app.globalData.endchoose="+app.globalData.endchoose)
    //使用在腾讯位置服务申请的key（必填）
    const key ="HSJBZ-R5KWS-B7HOY-6QEQO-P7DQ6-ETBGX"; 
    //调用插件的app的名称（必填）
    const referer = "校园跑腿"; 
    wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    });
    
  },
  destinationinput:function(e)
  {
    var that=this;
    app.globalData.startchoose=0;
    app.globalData.endchoose=1;
    console.log
    ("app.globalData.startchoose="+app.globalData.startchoose)
    console.log
    ("app.globalData.endchoose="+app.globalData.endchoose)
    //使用在腾讯位置服务申请的key（必填）
    const key ="HSJBZ-R5KWS-B7HOY-6QEQO-P7DQ6-ETBGX"; 
    //调用插件的app的名称（必填）
    const referer = "校园跑腿"; 
    wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    });
  },
  ddl:function(e)
  {
    var time=e.currentTarget.dataset.name
    this.setData({
      deadline: time
    })
    if(time=="0.5"){
      this.setData({
        dtype1:"primary",
        dtype2:"",
        dtype3:"",
        dtype4:"",
      })         
    }
    if(time=="1"){
      this.setData({
        dtype1:"",
        dtype2:"primary",
        dtype3:"",
        dtype4:"",
      })         
    }
    if(time=="2"){
      this.setData({
        dtype1:"",
        dtype2:"",
        dtype3:"primary",
        dtype4:"",
      })         
    }
    if(time=="5"){
      this.setData({
        dtype1:"",
        dtype2:"",
        dtype3:"",
        dtype4:"primary",
      })         
    }
  },
  deadl:function(e){
    this.setData({
      deadline: e.detail.value
    })
    console.log(this.data.deadline)
  },
  checknum:function(e){
    this.setData({
      checknum: e.detail.value
    })
  },
  zhifu:function(e)
  {
    var that = this;
    wx.request({
      url: 'http://139.224.113.73:7788/information',
      method:"POST",
      data:{
        start:that.data.start,
        destination:that.data.destination,
        deadline:that.data.deadline,
        price:that.data.price,
        name:app.globalData.nickName,
        userID:app.globalData.userID,
        checknum:that.data.checknumS
      },
      success:function(res)
      {
        console.log(res.data);
        if (res.data.code==200)
        {wx.showToast({
         title: "信息发布成功",
         duration: 2000//持续的时间
         }),
         wx.switchTab({
          url: '/pages/jiedan/jiedan'
          })}
         else if(res.data.code==400)
         {
           wx.showToast({
             title: '信息发布失败！',
             icon: 'none',    
             duration: 2000//持续的时间
        
           })
         }
      }
    })
  },
  onShow: function(){
    var that=this;
    const chooseLocation = requirePlugin('chooseLocation');
    const location = chooseLocation.getLocation();
    if(location){
        if(app.globalData.startchoose==1){
          app.globalData.StartAddress=location.name;
        }
        if(app.globalData.endchoose==1){
          app.globalData.EndAddress=location.name;
        }
    }
    this.setData({
      start: app.globalData.StartAddress,
      destination: app.globalData.EndAddress,
    });
    
  },
  wxpay: function(){
    let that = this
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
            var data=res.data;
            wx.requestPayment({
              'timeStamp': data.timeStamp,
              'nonceStr': data.nonceStr,
              'package': data.package,
              'signType': 'MD5',
              'paySign': data.paySign,
              'success': function (res) {

                console.log("支付成功！");
                that.zhifu();
              },
              'fail': function (res) {
              }
            })
          }
        })
      }
    })

    
  }
  
  }
)
