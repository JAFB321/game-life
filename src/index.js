// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext('2d');

// ctx.fillStyle = "rgb(200,0,0)";
// ctx.fillRect(10, 10, 200, 150);

// ctx.beginPath();
// ctx.moveTo(20,20);
// ctx.fillStyle = "rgb(35,200,10)";
// ctx.arc(10, 10, 3, 0,180, false);
// ctx.closePath();
// // ctx.beginPath();
import {GameBoard} from './game/GameBoard.js'

var game = new GameBoard();

game.setCell(-100,-100, true);
console.log(game.getCell(-100,-100));
console.log(game.getCell(100,101));