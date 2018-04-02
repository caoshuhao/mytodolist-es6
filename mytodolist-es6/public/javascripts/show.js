import $ from './jquery';
import * as m from './move';
var showplan = function() {
    var data = localStorage.getItem("myplan");
    data = JSON.parse(data);
    $('<li id=' + data[data.length - 1].id + ' ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>' + data[data.length - 1].content + '</span></span><span class="del">X</span></li>').appendTo($(".todolist .list1>ul"))
}


var showplans = function() {
    var sHtml = '';
    var data = localStorage.getItem("myplan");
    data = JSON.parse(data);
    //console.time('add1000')
    for (var i = data.length - 1000; i < data.length; i++) {
        if (data[i].done == false) {
            sHtml += '<li id=' + data[i].id + ' ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>' + data[i].content + '</span></span><span class="del">X</span></li>'; // 构造需要添加元素的字符串  
        }
    };

    $('.todolist .list1>ul').append(sHtml);
    //console.timeEnd('add1000')
}


var showallplan = function() {

    var data = localStorage.getItem("myplan");

    data = JSON.parse(data);

    var txt = "";
    var txt2 = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].done == false) {
            if (data[i].listatus == true) {
                txt += '<li id=' + data[i].id + ' ' + 'class=liborder ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>';
                txt += data[i].content;
                txt += '</span></span><span class="del">X</span></li>';
            } else {
                txt += '<li id=' + data[i].id + '  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)"><span><span></span><input type="checkbox" style="zoom:200%"/><span>';
                txt += data[i].content;
                txt += '</span></span><span class="del">X</span></li>';
            }

        } else {
            if (data[i].listatus == true) {
                txt2 += '<li id=' + data[i].id + ' ' + 'class=liborder><span><span></span><input type="checkbox" checked="checked" style="zoom:200%"/><span>';
                txt2 += data[i].content;
                txt2 += '</span></span><span class="del">X</span></li>';
            } else {
                txt2 += '<li id=' + data[i].id + '><span><span></span><input type="checkbox" checked="checked" style="zoom:200%"/><span>';
                txt2 += data[i].content;
                txt2 += '</span></span><span class="del">X</span></li>';
            }

        }
    }
    $(".list2 ul").html(txt2);
    $(".list1 ul").html(txt);

}
export {
    showplan,
    showallplan,
    showplans
}