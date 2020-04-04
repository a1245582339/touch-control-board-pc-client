// Move the mouse across the screen as a sine wave.
import * as robot from "robotjs";
import * as socket from 'socket.io'
import getIPAdress from './utils/ip'

const createSocketServer = () => {
	const port = 3005
	const io = socket(port);
	const ip = getIPAdress()
	io.on('connection', function (socket) {
		console.log('connection')
		socket.emit('message', `ws://${ip}:${port}`)
		socket.on('message', data => {
			console.log(123)
		})
	});
}
export default createSocketServer


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