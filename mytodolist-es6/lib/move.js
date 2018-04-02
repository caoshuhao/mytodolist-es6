"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
window.allowDrop = function (ev) {
    ev.preventDefault();
};
var srcdiv = null;
var k1 = null;
var k2 = null;
var k1class = null;
var k2class = null;

window.drag = function (ev, divdom) {
    srcdiv = divdom;
    ev.dataTransfer.setData("text/html", divdom.innerHTML);
    k1 = divdom.id;
    k1class = divdom.className;
};

window.drop = function (ev, divdom) {
    ev.preventDefault();
    if (srcdiv != divdom) {
        k2 = divdom.id;
        srcdiv.id = k2;
        divdom.id = k1;
        k2class = divdom.className;
        srcdiv.className = k2class;
        divdom.className = k1class;
        srcdiv.innerHTML = divdom.innerHTML;
        divdom.innerHTML = ev.dataTransfer.getData("text/html");

        var len1 = 0;
        var len2 = 0;
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        for (var i = 0, j = 0; i < data.length, j < data.length; i++, j++) {

            if (data[i].id == k1) {
                len1 = i;
            } else if (data[j].id == k2) {
                len2 = j;
            }
        }
        var tem = data[len1];
        data[len1] = data[len2];
        data[len2] = tem;

        var str = JSON.stringify(data);
        localStorage.setItem("myplan", str);
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
    }
};
exports.allowDrop = allowDrop;
exports.drag = drag;
exports.drop = drop;