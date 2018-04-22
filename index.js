// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
const dotenv = require('dotenv').config(); // TODO: 使いたいけどうまく反映されない

// 使うファイルと繋げる
const KimiApi = require("./kimi_api");

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセット
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセット
};

const user_id = {
    oki: process.env.USER_ID_OKI,
    ca7mi: process.env.USER_ID_CA7MI
};

const status = {
    wake : 1,
    sleep : 2,
    sleepingOut : 3
};

const kimiApi = new KimiApi();

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// -----------------------------------------------------------------------------
// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);
var kimiStatus;

// -----------------------------------------------------------------------------
// Botの反応
server.post('/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        console.log(`${event.source.userId}  : UserId`);

        if(!kimiStatus){
          kimiStatus = status.wake;
        }

        if(kimiStatus === status.wake){
          // イベントタイプがメッセージ&テキストタイプだった場合
          if (event.type == "message" && event.message.type == "text"){
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text == "おはぽねす"){
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                if(event.source.userId == process.env.USER_ID_OKI){
                  events_processed.push(bot.replyMessage(event.replyToken, {
                      type: "text",
                      text: "おきー！おはぽねす！"
                    }));
                } else if(event.source.userId == process.env.USER_ID_CA7MI){
                  events_processed.push(bot.replyMessage(event.replyToken, {
                      type: "text",
                      text: "かなにゃんっ♪おはぽねす！"
                    }));
                }
            } else if (event.message.text == "おやすみ"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "いい夢みろよっ"
                }));
            } else if (event.message.text == "かわいい"){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "こびてくるな！"
                }));
            } else if ((event.message.text == "きみまろ") || (event.message.text == "きみ") ){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "なぁにー？"
                }));
            } else if (event.message.text == "きみ眠い？"){
                kimiStatus = status.sleep;
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "...もうねるー"
                }));
            } else if (event.message.text == "なんようび？") {
              var now = kimiApi.getNowDate();
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: now[3]+ "ようびー"
              }));
            } else if (event.message.text == "おきにあやまろ？") {
              if(event.source.userId == process.env.USER_ID_OKI){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "やだ！あやまんない！"
                }));
              } else if(event.source.userId == process.env.USER_ID_CA7MI){
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "うー・・・おきごめんねー"
                }));
              };
            } else if(event.message.text == "あかんのんか？"){
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "あかんのん！！！"
              }));
            } else if (event.message.text == "つかれた") {
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "おちゅかれさまんさ"
              }));
            } else if (event.message.text == "仕事終わった") {
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "きょうもがんばったねっ！えらいー"
              }));
            } else if (event.message.text == "お家かえった") {
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "おかえりんごっ！"
              }));
            } else if (event.message.text == "うらなって！") {
              var result = kimiApi.playOmikuji();
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: result
              }));
            } else if (event.message.text.match(/ありが/)){
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "礼にはおよばんっ"
              }));
            };
          // スタンプの時はランダムでスタンプ返す
          } else if (event.type == "message" && event.message.type == "sticker") {
            var num = kimiApi.getRandomNumber(140, 179);
            console.log(`num : ${num}`);
            events_processed.push(bot.replyMessage(event.replyToken, {
                "type": "sticker",
                "packageId": "2",
                "stickerId": num
            }));
          };
      } else if (kimiStatus === status.sleep ) {
        if(event.message.text == "きみ起きる？"){
          kimiStatus = status.wake;
          events_processed.push(bot.replyMessage(event.replyToken, {
              type: "text",
              text: "おきたー"
          }));
        } else if(event.message.text){
          kimiStatus = status.sleepingOut;
          events_processed.push(bot.replyMessage(event.replyToken, {
              type: "text",
              text: "ねむいのーおはなししないー"
          }));
        };
      } else if (kimiStatus === status.sleepingOut) {
        if(event.message.text == "きみ起きる？"){
          events_processed.push(bot.replyMessage(event.replyToken, {
              type: "text",
              text: "まだねるのー"
          }));
        } else if (event.message.text == "きみ寝すぎ") {
          kimiStatus = status.wake;
          events_processed.push(bot.replyMessage(event.replyToken, {
              type: "text",
              text: "いま起きるとこだもん！"
          }));
        };
    };

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
  });
});
