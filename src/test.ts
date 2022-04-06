import { GameOfLife } from './game/GameOfLife.js'
import { CanvasController } from './game/graphics/canvas/CanvasController.js';

const canvas = document.querySelector<HTMLCanvasElement>('#gameboard-main');


function test(){   
    if(!canvas) return;
    
    const graphics = new CanvasController(canvas);
    const game = new GameOfLife(graphics);

    game.bornCell({x: 10,y: 10});
    game.bornCell({x: 11,y: 11});
    game.bornCell({x: 12,y: 11});
    game.bornCell({x: 12,y: 10});
    game.bornCell({x: 12,y: 9});

    game.setConfig({
        onNextGeneration: () => {},
        delay: 50
        
    });
    game.startEvolution();
    
    // setTimeout(() => {
    //     game.pauseEvolution();
    // }, 10500);

    game.graphics.setConfig({
        board: {
 
        },
        colors:{
            background: '#222'
        }
    });


    window.gameStart = () => game.resumeEvolution();
    window.gameStop = () => game.pauseEvolution();

    // let n = 100;
    // setInterval(() => {
    //     n+= 0.8;
    //     game.graphics.setConfig({
    //         board: {
    //             offset_x: n,
    //             offset_y: n
    //         }
    //     });
    // }, 1000);
}

test();



declare global {
    interface Window { 
        gameStart: Function; 
        gameStop: Function; 
    }
}