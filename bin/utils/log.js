"use strict";
exports.__esModule = true;
var emoji = require("node-emoji");
exports.logSuccess = function (msg) {
    console.log(emoji.get("ship") + " " + msg);
};
exports.logError = function (msg) {
    console.error(emoji.get("exclamation") + " " + msg);
};
