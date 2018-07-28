const server = require("express")();
const line = require("@line/bot-sdk");

module.exports = class KimiTemplate {

    // ボタンテンプレートを使ってみる
    selectGameWithKimi(){
        var buttonTemp = [{
            "type": "template",
            "altText": "きみまろとあそぶ",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "/image/kimi_1.jpg",
                "imageAspectRatio": "rectangle",
                "imageSize": "cover",
                "imageBackgroundColor": "#FFFFFF",
                "title": "ゲームをえらんで。",
                "text": "何してあそぶ？",
                "actions": [
                    {
                      "type": "postback",
                      "label": "じゃんけん",
                      "data": "janken"
                    },
                    {
                      "type": "postback",
                      "label": "アキネーター",
                      "data": "akinator"
                    }
                ]
            }
        }];
        return buttonTemp;
    }
}