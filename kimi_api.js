const server = require("express")();
const line = require("@line/bot-sdk");


module.exports = class KimiApi {

  // 時間を所得する
  getNowDate(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var week = now.getDay();
    var youbi = new Array("にち","げつ","か","すい","もく","きん","ど");
    var hours = now.getHours();
    var minutes = now.getMinutes();

    var nowTime = new Array(year, month, day, youbi[week], hours, minutes);
    return nowTime;
  };
};
