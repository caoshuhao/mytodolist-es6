'use strict';

var _jquery = require('./jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _count = require('./count');

var count = _interopRequireWildcard(_count);

var _show = require('./show');

var show = _interopRequireWildcard(_show);

var _move = require('./move');

var m = _interopRequireWildcard(_move);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(function () {
    var num = 0;

    function guid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
    (0, _jquery2.default)('.addlist').on("click", function () {
        //console.time('addData')
        var old = localStorage.getItem("myplan");
        old = old ? JSON.parse(old) : [];
        for (var i = 0; i < 1000; i++) {
            if (old.length <= 0) {
                var obj = {};
                obj.content = num++;
                obj.done = false;
                obj.listatus = false;
                obj.id = guid();
                old.push(obj);
            } else {
                old.push({
                    "content": num++,
                    "done": false,
                    "listatus": false,
                    "id": guid()
                });
            }
        }
        localStorage.setItem("myplan", JSON.stringify(old));
        //console.timeEnd('addData')
        show.showplans();
        count.count();
    });

    function safeStr(str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    (0, _jquery2.default)("body").on("keydown", "#todoinput", function (e) {

        if (e.keyCode == 13) {
            var content = (0, _jquery2.default)('#todoinput').val();
            content = safeStr(content);
            if (content.length > 0) {
                var old = localStorage.getItem("myplan");
                old = old ? JSON.parse(old) : [];
                if (old.length <= 0) {
                    var obj = {};
                    obj.content = content;
                    obj.done = false;
                    obj.listatus = false;
                    obj.id = guid();
                    old.push(obj);
                } else {
                    old.push({
                        "content": content,
                        "done": false,
                        "listatus": false,
                        "id": guid()
                    });
                }
                localStorage.setItem("myplan", JSON.stringify(old));
                show.showplan();
                count.count();
            } else {
                alert("请输入数据");
            }
            (0, _jquery2.default)('#todoinput').val("");
        }
    });

    (0, _jquery2.default)('body').on('click', ".list ul li", function () {
        var key = (0, _jquery2.default)(this).prop('id');
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == key) {
                if (data[i].listatus == false) {
                    data[i].listatus = true;
                    (0, _jquery2.default)(this).addClass('liborder');
                } else {
                    data[i].listatus = false;
                    (0, _jquery2.default)(this).removeClass('liborder');
                }
            }
        }
        localStorage.setItem("myplan", JSON.stringify(data));
    });

    (0, _jquery2.default)('body').on('click', ".list ul li input", function (e) {
        e.stopPropagation();
    });

    (0, _jquery2.default)("body .todolist .list #ullist").on("click", "li input", function () {
        // 点击未完成计划列表input
        if ((0, _jquery2.default)(this).prop("checked") == true) {
            var key = (0, _jquery2.default)(this).parent().parent().prop("id");
            (0, _jquery2.default)("#" + key).fadeOut(function () {
                (0, _jquery2.default)("#" + key).remove();
            });
            var data = localStorage.getItem("myplan");
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == key) {
                    data[i].done = true;
                    if (data[i].listatus) {
                        (0, _jquery2.default)('<li id=' + data[i].id + ' ' + 'class=liborder><span><span></span><input type="checkbox"  style="zoom:200%" checked="checked"/><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo((0, _jquery2.default)(".todolist .list2>ul"));
                    } else {
                        (0, _jquery2.default)('<li id=' + data[i].id + '><span><span></span><input type="checkbox"  style="zoom:200%" checked="checked"/><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo((0, _jquery2.default)(".todolist .list2>ul"));
                    }
                    var datatem = data[i];
                    data.splice(i, 1);
                    data.push(datatem);
                    localStorage.setItem("myplan", JSON.stringify(data));
                    count.count();
                    return;
                }
            }
        }
    });
    // 点击已完成列表input
    (0, _jquery2.default)("body .todolist .list #donelist").on("click", "li input", function () {
        if ((0, _jquery2.default)(this).prop("checked") == false) {
            var key = (0, _jquery2.default)(this).parent().parent().prop("id");
            (0, _jquery2.default)("#" + key).remove();
            var data = localStorage.getItem("myplan");
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == key) {
                    data[i].done = false;
                    if (data[i].listatus) {
                        (0, _jquery2.default)('<li id=' + data[i].id + ' ' + 'class=liborder  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)" ><span><span></span><input type="checkbox" style="zoom:200%" /><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo((0, _jquery2.default)(".todolist .list1>ul"));
                    } else {
                        (0, _jquery2.default)('<li id=' + data[i].id + '  ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)" ><span><span></span><input type="checkbox" style="zoom:200%" /><span>' + data[i].content + '</span></span><span class="del">X</span></li>').appendTo((0, _jquery2.default)(".todolist .list1>ul"));
                    }
                    var datatem = data[i];
                    data.splice(i, 1);
                    data.push(datatem);
                    localStorage.setItem("myplan", JSON.stringify(data));
                    count.count();
                    return;
                }
            }
        }
    });
    // 点击删除按钮
    (0, _jquery2.default)("body").on("click", ".del", function () {
        var key = (0, _jquery2.default)(this).parent().prop("id");
        (0, _jquery2.default)("#" + key).fadeOut(function () {
            (0, _jquery2.default)("#" + key).remove();
        });
        var data = localStorage.getItem("myplan");
        data = JSON.parse(data);
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            if (key == data[i].id) {
                index = i;
                data.splice(index, 1);
            }
        }
        localStorage.setItem("myplan", JSON.stringify(data));
        count.count();
        return false;
    });
    count.count();
    show.showallplan();
});