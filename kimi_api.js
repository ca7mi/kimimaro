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

  // ランダムな数字を取得
  getRandomNumber(min, max){
    var result = Math.floor( Math.random() * (max + 1 - min) ) + min;
    return result;
  };

  playOmikuji(){
    var contents = new Array("スーパーゴッド大吉","神吉","特大吉","大吉","吉","中吉","末吉","微吉","ちょい吉",
                              "なんもない日","運勢とか気にするな","なんとかなる日","あめ降るかも","風に飛ばされる",
                              "ごはんは少なめ","お魚たべて","お肉がいいよ","おやつはバナナ","やさい足りてないよ？",
                              "とりぽねすオススメ","空とべる","一歩ひいてみる","あきらめが肝心","がんばってもいいかも","もうすぐおわる",
                              "大変なのはいまだけ","漢字にがて","お茶は玄米茶","納豆いいね","だしは昆布","だしはかつおぶし",
                              "きみは王子","白いとこだけ","あお着てよ","赤がいい",
                              "微凶","ちょい凶","凶","小凶","中凶","大凶","特大凶","破滅","闇","奈落の底");

    var omikujiResult = contents[ Math.floor( Math.random() * contents.length) ];
    return omikujiResult;
  };
};
