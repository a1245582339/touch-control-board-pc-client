import * as robot from "robotjs";
const screenSize = robot.getScreenSize();
const height = (screenSize.height / 2) - 10;
const width = screenSize.width;


// Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;


// for (var x = 0; x < width; x++) {
// 	let y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }