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
        delay: 1000
        
    });
    game.startEvolution();

    game.graphics.setConfig({
        board: {
            // zoom: 100,
            offset_x: 1,
            offset_y: 1
        }
    })
    window.gameStart = () => game.resumeEvolution();
    window.gameStop = () => game.pauseEvolution();
}

test();



declare global {
    interface Window { 
        gameStart: Function; 
        gameStop: Function; 
    }
}