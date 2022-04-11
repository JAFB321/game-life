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
    game.bornCell({ x: 11, y: 11 });
    game.bornCell({ x: 12, y: 11 });
    game.bornCell({ x: 12, y: 10 });
    game.bornCell({ x: 12, y: 9 });
    game.setConfig({
        onNextGeneration: function () { },
        delay: 50
    });
    game.startEvolution();
    // setTimeout(() => {
    //     game.pauseEvolution();
    // }, 10500);
    game.graphics.setConfig({
        board: {
        // zoom: 150
        },
        grid: {
            gap: 0.5
        },
        cells: {
            size: 20
        },
        colors: {
            background: '#222'
        }
    });
    setInterval(function () {
        var newConfig = game.graphics.getConfig();
        info.innerHTML = JSON.stringify(newConfig, null, 4);
    }, 200);
    window.gameStart = function () { return game.resumeEvolution(); };
    window.gameStop = function () { return game.pauseEvolution(); };
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