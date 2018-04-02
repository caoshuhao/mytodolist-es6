"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.count = undefined;

var _jquery = require("./jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = function count() {
    var data = localStorage.getItem("myplan");
    // console.time('countparse')
    data = JSON.parse(data);
    // console.timeEnd('countparse')
    var len1 = 0;
    var len2 = 0;
    for (var i = 0; i < data.length; i++) {

        if (data[i].done == false) {
            len1 += 1;
        } else {
            len2 += 1;
        }
    }
    (0, _jquery2.default)(".ongoing .listtop span:nth-child(2)").text(len1);
    (0, _jquery2.default)(".done .listtop span:nth-child(2)").text(len2);
};

exports.count = count;