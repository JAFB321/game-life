import { GameOfLife } from './game/GameOfLife.js';
import { CanvasController } from './game/graphics/canvas/CanvasController.js';
var canvas = document.querySelector('#gameboard-main');
var info = document.querySelector('.floating-info');
function test() {
    if (!info)
        return;
    if (!canvas)
        return;
    // performanceCanvas(canvas);
    var graphics = new CanvasController(canvas);
    var game = new GameOfLife(graphics);
    game.bornCell({ x: 10, y: 10 });
    game.bornCell({ x: 10, y: 11 });
    game.bornCell({ x: 10, y: 12 });
    game.bornCell({ x: 10, y: 14 });
    game.bornCell({ x: 9, y: 14 });
    game.bornCell({ x: 11, y: 14 });
    game.setConfig({
        onNextGeneration: function () { },
        delay: 200
    });
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
        colors: {
            background: '#222222'
        }
    });
    game.graphics.onConfigChange(function (newConfig) {
        info.innerHTML = JSON.stringify(newConfig, null, 4);
    });
    window.gameStart = function () { return game.startEvolution(); };
    window.gameStop = function () { return game.stopEvolution(); };
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
//# sourceMappingURL=test.js.map