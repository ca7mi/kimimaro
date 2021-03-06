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

  // おみくじ
  playOmikuji(){
    var contents = new Array("スーパーゴッド大吉","神吉","特大吉","大吉","吉","中吉","末吉","微吉","ちょい吉",
                              "なんもない日","運勢とか気にするな","なんとかなる日","あめ降るかも","風に飛ばされる",
                              "ごはんは少なめ","お魚たべて","お肉がいいよ","おやつはバナナ","やさい足りてないよ？",
                              "とりぽねすオススメ","空とべる","一歩ひいてみる","あきらめが肝心","がんばってもいいかも","もうすぐおわる",
                              "大変なのはいまだけ","漢字にがて","お茶は玄米茶","納豆いいね","だしは昆布","だしはかつおぶし",
                              "コンポタ飲めば？","からあげたべな","酢豚はパイナップルぬきだよ",
                              "きみをいたわって","魔王がくるよ","きみは天使","ごはんおごると吉","アイスはがまん","神を信じよ",
                              "きみは王子","白いとこだけ","あお着てよ","赤がいい","白シャツさわやか","天使の笑顔で",
                              "おこ","激おこ","激おこぷんぷん丸","激おこインフェルノ","孤独",
                              "微凶","ちょい凶","凶","小凶","中凶","大凶","特大凶","鬼凶","激鬼凶",
                              "破滅","サル未満","虫以下","漆黒の世界","闇","奈落の底");

    var omikujiResult = contents[ Math.floor( Math.random() * contents.length)];
    return omikujiResult;
  };

  // 必殺技
  useDeathblows(feeling){
    var response;
    if(!feeling){
      feeling = this.getRandomNumber(1,3);
    };

    switch (feeling) {
      case 1 :
        var emotion = new Array("うわーん","たたくのいやー","うわぁぁーん","えーん");
        response = emotion[ Math.floor( Math.random() * emotion.length)];
        break;
      case 2:
        var attack = new Array("ていっ","あちょー","ほあちょぉ","ていやっ");
        response = attack[ Math.floor( Math.random() * attack.length) ];
        break;
      case 3:
        var skill = new Array("かめはめ波","ギャリック砲","スーパーどどん波","ファイナルフラッシュ","界王拳","気円斬","魔貫光殺砲","魔封波","魔封波返し","残像拳",
                              "元気玉","四妖拳","ローリングアタックサタンパンチ","ヘルズフラッシュ","ファイナルシャインアタック","アクマイト光線","百倍太陽拳","お菓子光線","リクームエルボー","フュージョン",
                              "よい子眠眠拳","ビッグバンアタック", // ここまでDB
                              "邪王炎殺剣","邪王炎殺黒龍波","邪王炎殺煉獄焦","霊丸","霊剣","斬空裂風陣","薔薇棘鞭刃(ローズ・ウィップ)","魔凍闘霊拳","裂蹴紫炎弾", // ここまで幽白
                              "天翔龍閃","双龍閃","龍槌閃","二重の極み","牙突","牙突零式","九頭龍閃","縮地","土龍閃","紫電連牙の太刀", // ここまで剣心
                              "一刀火葬","響転","虚閃","月牙天衝","終景・白帝剣","殲景・千本桜景厳","重奏虚閃","盾舜六花","卍解","豹王の爪",
                              "吭景・千本桜景厳","黒棺","鏡花水月・霞","大紅蓮氷輪丸","血霞の盾","雷霆の槍","氷天百華葬","六衣氷結陣","白漣","断空", // ここまでBLEACH
                              "大玉螺旋丸","仙法・熔遁螺旋手裏剣","風遁・螺旋手裏剣","ミスディレクションの術","須佐能乎","月読","万華鏡写輪眼","八坂ノ勾玉","炎遁・加具土命","炎遁ホノイカヅチ",
                              "火遁・豪火球の術","麒麟","草薙の剣・千鳥流し","獅子連弾","仙法・嵐遁光牙","無限月読","八十神空撃","砂漠層大葬","唐松の舞","早蕨の舞",
                              "鉄線花の舞・花","柳の舞","忍法・超獣戯画","起爆粘土","C4カルラ","千殺水翔","氷遁・氷岩堂無","神威雷切","雷切","八卦六十四掌",
                              "裏蓮華","表蓮華","千鳥", // ここまでナルト
                              "スタープラチナ","シルバーチャリオッツ","ザ・ワールド","クレイジー・ダイヤモンド","ヘブンズ・ドアー","シアーハートアタック","エコーズ・ＡＣＴ３","バイツァ・ダスト",
                              "パープル・ヘイズ","キング・クリムゾン","メタリカ","ウェザー・リポート","メイド・イン・ヘブン","D4C","ダイバー・ダウン",
                              "ゴールド・エクスペリエンス・レクイエム","ノトーリアス・B・I・G","ハイエロファントグリーン", // ここまでジョジョ
                              "ジャジャン拳","ゴンさん","雷掌(イズツシ)","落雷(ナルカミ)","神速(カンムル)","疾風迅雷","癒す親指の鎖","束縛する中指の鎖","導く薬指の鎖","律する小指の鎖","絶対時間","伸縮自在の愛",
                              "薄っぺらな嘘","龍頭戯画","龍星群","盗賊の極意","携帯する他人の運命","俺の両手は機関銃","百式観音","虎咬拳","分身(ダブル)","一握りの火薬","爆弾魔", // ここまでHxH
                              "神誅殺","熊の衝撃","氷河時代","威国","雷迎","ROOM","ウソップ輪ゴ〜ム","ゴムゴムの銃乱打","ゴムゴムの銃","ゴムゴムのダメだ","ゴムゴムのバズーカ","ゴムゴムの風車",
                              "ゴムゴムの巨人の銃","ギア2","ギア3","ギア4","しあわせパンチ","サイクロン＝テンポ","ノロノロビーム","悪魔風ムートンショット","砂漠の宝刀","三十六煩悩鳳","三千世界","獅子歌歌","神の裁き(エル・トール )",
                              "粗砕(コンカッセ )","必殺 タバスコ星","羊肉(ムートン)ショット","雷神(アマル)","煉獄鬼斬り","嵐脚 狼牙","雷雲＝ロッド","刀狼流し","千八十煩悩鳳","指銃","砂嵐(サーブルス)","刻蹄『桜』","刻蹄『十字架』", // ここまでワンピ
                              "時空流離","風魂","風守","鎌鼬","飛空爪","紅","翅炎","紙演舞","千鶴","芙蓉","六歌仙",
                              "重力結界","ブラックホール","小夜曲","葬送曲","鎮魂歌","忍法空蝉","砕羽","崩","焔群","刹那","円",
                              "塁","虚空","裂神","閻水乱舞","絶対零度","水成る蛇","つらら舞","狂雷","降御雷","雷刃","煉獄" // ここまで烈火
                            );
        response = skill[ Math.floor( Math.random() * skill.length)];
        break;
    }
    return response;
  };

};
