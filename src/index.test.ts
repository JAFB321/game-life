import { GameOfLife } from "./game/GameOfLife";
import { CanvasController } from "./game/graphics/canvas/CanvasController";
import createGameOfLife from "./index";
const canvas = document.querySelector<HTMLCanvasElement>('#gameboard-main');
const info = document.querySelector('.floating-info');

describe('Game of life', () => {
    test('Instance a new game', () => {
        const canvas = document.createElement('canvas');

        const game = createGameOfLife(canvas);
        
        expect(game).toBeInstanceOf(GameOfLife)
        expect(game.graphics).toBeInstanceOf(CanvasController);
        expect(game.getCells().length).toBe(0);
    })

    test('Add a cell', () => {
        const canvas = document.createElement('canvas');

        const game = createGameOfLife(canvas);
        game.bornCell({x: 1, y: 1});
        expect(game.getCells().length).toBe(1);
        expect(game.getCells()).toContainEqual({x: 1, y: 1});
        
    })
})

function init(){   
    if(!info) return;
    if(!canvas) return;

    const game = createGameOfLife(canvas, {
        game: {
            delay: 200
        }
    });

    game.bornCell({x: 10,y: 10});
    game.bornCell({x: 10,y: 11});
    game.bornCell({x: 10,y: 12});
    game.bornCell({x: 10,y: 14});
    game.bornCell({x: 9,y: 14});
    game.bornCell({x: 11,y: 14});

    game.startEvolution();

    game.graphics.setConfig({
        board: {
            // width: 300,
            // height: 100
        },
        grid: {
            gap: 0.5
        },
        cells: {
            size: 20
        },
        colors:{
            background: '#222222'
        }
    });

    game.graphics.onConfigChange((newConfig) => {
        info.innerHTML = JSON.stringify(newConfig, null, 4);
    });

    window.gameStart = () => game.startEvolution();
    window.gameStop = () => game.stopEvolution();

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

init();



declare global {
    interface Window { 
        gameStart: Function; 
        gameStop: Function; 
    }
}