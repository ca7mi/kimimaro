const server = require("express")();
const line = require("@line/bot-sdk");

module.exports = class KimiTemplate {

    // ボタンテンプレートを使ってみる
    selectGameWithKimi(){
        var response;
        var buttonTemp = [{
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "./image/kimi_1.jpg",
                "imageAspectRatio": "rectangle",
                "imageSize": "cover",
                "imageBackgroundColor": "#FFFFFF",
                "title": "Menu",
                "text": "Please select",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "./image/kimi_1.jpg"
                },
                "actions": [
                    {
                      "type": "postback",
                      "label": "Buy",
                      "data": "action=buy&itemid=123"
                    },
                    {
                      "type": "postback",
                      "label": "Add to cart",
                      "data": "action=add&itemid=123"
                    },
                    {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/123"
                    }
                ]
            }
        }]
        response = buttonTemp;
        return response;
    }
}