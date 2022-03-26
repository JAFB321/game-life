import { GameOfLife } from './game/GameOfLife.js'
import { CanvasController } from './game/graphics/canvas/canvasController.js';

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
        onNextGeneration: () => console.log('next generation'),
        delay: 100
        
    });
    game.startEvolution();

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