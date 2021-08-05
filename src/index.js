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

import { GameLife } from './game/GameLife.js'
import { Rectangle } from './game/GameBoard.js'


var game = new GameLife();

// Testing patern
game.bornCell(100,100);
game.bornCell(50,50);
game.bornCell(51,50);
game.bornCell(52,50);
game.bornCell(51,49);
game.bornCell(50,50);
game.bornCell(51,51);
game.bornCell(51,52);
game.bornCell(50,52);
game.bornCell(49,52);
game.bornCell(100+3,10+30);
game.bornCell(50+3,50+3);
game.bornCell(51+3,50+3);
game.bornCell(52+3,50+3);
game.bornCell(51+3,49+3);
game.bornCell(50+3,50+3);
game.bornCell(51+3,51+3);
game.bornCell(51+3,52+3);
game.bornCell(50+3,52+3);
game.bornCell(49+3,52+3);

// game.setCell(50,50);
// game.setCell(51,51);
// game.setCell(52,51);
// game.setCell(51,52);
// game.setCell(50,52);

window.cleanBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

game.startEvolution({
    onNextGeneration: (size, board) => {

        window.cleanBoard();
        for (let x = 0; x < 202; x++) {
            for (let y = 0; y < 202; y++) {
                const isAlive = board.getPoint(x-100, y-100);
        
                if(isAlive){
                    ctx.fillRect(x+x, y+y, 1, 1)
                }
            }
        }
    },
    delayDuration: 100,
    size: new Rectangle(-100, -100, 200, 200)
})

