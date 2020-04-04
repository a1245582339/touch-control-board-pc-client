"use strict";
exports.__esModule = true;
var socket = require("socket.io");
var ip_1 = require("./utils/ip");
var createSocketServer = function () {
    var io = socket(3001);
    var ip = ip_1["default"]();
    io.on('connection', function (socket) {
        console.log('connection');
        socket.emit('message', ip);
        socket.on('message', function (data) {
            console.log(123);
        });
    });
};
exports["default"] = createSocketServer;
// Speed up the mouse.
// robot.setMouseDelay(2);
// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;
// for (var x = 0; x < width; x++) {
// 	let y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }
