import { GameOfLife } from './game/GameOfLife.js';
import { CanvasController } from './game/graphics/canvas/canvasController.js';
var canvas = document.querySelector('#gameboard-main');
function test() {
    if (!canvas)
        return;
    var graphics = new CanvasController(canvas);
    var game = new GameOfLife(graphics);
    game.bornCell({ x: 10, y: 10 });
    game.bornCell({ x: 11, y: 11 });
    game.bornCell({ x: 12, y: 11 });
    game.bornCell({ x: 12, y: 10 });
    game.bornCell({ x: 12, y: 9 });
    game.setConfig({
        onNextGeneration: function () { return console.log('next generation'); },
        delay: 100
    });
    game.startEvolution();
    window.gameStart = function () { return game.resumeEvolution(); };
    window.gameStop = function () { return game.pauseEvolution(); };
}
test();
//# sourceMappingURL=test.js.map