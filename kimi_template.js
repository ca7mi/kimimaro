const server = require("express")();
const line = require("@line/bot-sdk");

module.exports = class KimiTemplate {

    // ボタンテンプレートを使ってみる
    selectGameWithKimi(){
        var buttonTemp = {
          "type": "template",
          "altText": "きみまろとあそぶ",
          "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://github.com/ca7mi/kimimaro/blob/use_template/image/kimi_1.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "何してあそぶ？",
            "text": "ゲームをえらんで。",
            "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": "http://example.com/page/123"
            },
            "actions": [
              {
                "type": "postback",
                "label": "じゃんけん",
                "data": "action=buy&itemid=123"
              },
              {
                "type": "postback",
                "label": "アキネーター",
                "data": "action=add&itemid=123"
              },
              {
                "type": "uri",
                "label": "なぞとき",
                "uri": "http://example.com/page/123"
              }
            ]
          }
        };
        return buttonTemp;
    }
}
