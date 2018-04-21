// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート
require("dotenv").config();

// 使うファイルと繋げる
const KimiApi = require(./kimi_api.js);

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
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
// ルーター設定
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
        /*  if(event.source.userId == "U376ef0f525ca673427e3a0494d394650"){
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "かなにゃんだー"
                }));
              } else if (event.source.userId == "Ubac5fd33503f7e37b0ef542ff1d662a2") {
                events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: "あ、おきじゃん！"
                }));
              }
          */
          // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
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
            } else if (event.message.text == "きみまろ"){
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
              var youbi = kimiApi.getNowDate();
              events_processed.push(bot.replyMessage(event.replyToken, {
                  type: "text",
                  text: youbi
              }));
            }
          }
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
