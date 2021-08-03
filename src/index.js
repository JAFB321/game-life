const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// ctx.fillStyle = "rgb(200,0,0)";
// ctx.fillRect(10, 10, 200, 150);

// ctx.beginPath();
// ctx.moveTo(20,20);
// ctx.fillStyle = "rgb(35,200,10)";
// ctx.arc(10, 10, 3, 0,180, false);
// ctx.closePath();
// ctx.beginPath();

import {GameBoard, Point} from './game/GameBoard.js'

window.game = new GameBoard();
var game = window.game;

// game.setCell(new Point(100,100));
game.setCell(new Point(100,101));
game.setCell(new Point(101,100));
game.setCell(new Point(101,101));
game.setCell(new Point(-100,-100));
game.setCell(new Point(50,-50));
game.setCell(new Point(-100,100));

window.printBoard = () =>{
    for (let x = 0; x < 202; x++) {
        for (let y = 0; y < 202; y++) {
            const isAlive = game.getCell(new Point(x-100, y-100));
    
            if(isAlive){
                ctx.fillRect(x+x, y+y, 1, 1)
            }
        }
    }
}

window.cleanBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

