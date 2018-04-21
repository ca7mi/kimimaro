
// 時間を所得する
getNowDate(){
  var now = new Date();
  var week = now.getDay();

  var youbi= new Array("にち","げつ","か","すい","もく","きん","ど");
  return youbi[week];
};
