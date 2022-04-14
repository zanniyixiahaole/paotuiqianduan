
//初始化数据
function tabbarinit() {
  return [
       { "current":0,
         "pagePath": "/pages/navbar/navbar",
         "text": "订的单"
       },
       {
         "current": 0,
         "pagePath": "/pages/navbar2/navbar2",
         "text": "接的单"
 
       }
     ]
 
 }
 //tabbar 主入口
 function tabbarmain(bindName = "tabdata", id, target) {
   var that = target;
   var bindData = {};
   var otabbar = tabbarinit();
   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
   otabbar[id]['current'] = 1;
   bindData[bindName] = otabbar
   that.setData({ bindData });
 }
 
 module.exports = {
   tabbar: tabbarmain
 }