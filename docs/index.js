import { GameOfLife } from './game/GameOfLife.js';
import { GraphicsController } from './game/graphics/GraphicsController.js';
var canvas = document.querySelector('#gameboard-main');
var ctx = (canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d')) || new CanvasRenderingContext2D();
// ---
var width = 1900.5;
var height = 900.5;
var drawGrid = function () {
    ctx.moveTo(0.5, 0.5);
    ctx.lineWidth = 0.8;
    var color = '#626567';
    ctx.strokeStyle = color;
    for (var x = 0.5; x < width; x += 20) {
        ctx.moveTo(x, 0.5);
        ctx.lineTo(x, height);
    }
    for (var y = 0.5; y < height; y += 20) {
        ctx.moveTo(0.5, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
};
var clearCells = function () {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
};
// ---
var game = new GameOfLife(new GraphicsController());
// // Testing patern
// game.bornCell(100-25,100-25);
// game.bornCell(50-25,50-25);
// game.bornCell(51-25,50-25);
game.bornCell({ x: 10, y: 10 });
game.bornCell({ x: 11, y: 11 });
game.bornCell({ x: 12, y: 11 });
game.bornCell({ x: 12, y: 10 });
game.bornCell({ x: 12, y: 9 });
drawGrid();
game.setConfig({
    onNextGeneration: function (board) {
        clearCells();
        ctx.fillStyle = '#ffffff';
        var size = {
            point1: {
                x: 0,
                y: 0
            },
            point2: {
                x: 200,
                y: 200
            }
        };
        // Offsets
        var x_offset = size.point1.x;
        var y_offset = size.point1.y;
        // Grid
        var row_gap = 0.5;
        var column_gap = 0.5;
        var row_size = 20;
        var column_size = 20;
        var cell_size = 18;
        for (var x = 0; x < size.point2.x; x++) {
            for (var y = 0; y < size.point2.y; y++) {
                var isAlive = board.getCell({ x: x, y: y });
                if (isAlive) {
                    var cell_x = row_size * x + row_gap + x_offset + 1;
                    var cell_y = column_size * y + column_gap + y_offset + 1;
                    ctx.fillRect(cell_x, cell_y, cell_size, cell_size);
                }
            }
        }
    },
    delay: 100
});
game.startEvolution();
window.gameStart = function () { return game.resumeEvolution(); };
window.gameStop = function () { return game.pauseEvolution(); };
//# sourceMappingURL=index.js.map