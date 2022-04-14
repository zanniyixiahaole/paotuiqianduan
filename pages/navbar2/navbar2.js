const app = getApp()
var template = require('../../template/template.js');
Page({
  data: {  },

  onLoad: function () {
    template.tabbar("tabBar", 1, this)//1表示第二个tabbar
  },

})