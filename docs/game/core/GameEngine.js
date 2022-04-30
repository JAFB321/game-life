import { GameBoard } from "./GameBoard.js";
var GameEngine = /** @class */ (function () {
    function GameEngine() {
    }
    GameEngine.prototype.nextGeneration = function (board) {
        var newGameboard = new GameBoard();
        // performance.mark("start-script")
        var cells = board.getCells();
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var _a = cells_1[_i], x = _a.x, y = _a.y;
            this.getCellLife(board, x, y) && newGameboard.setCell(x, y);
            this.getCellLife(board, x + 1, y) && newGameboard.setCell(x + 1, y);
            this.getCellLife(board, x + 1, y + 1) && newGameboard.setCell(x + 1, y + 1);
            this.getCellLife(board, x + 1, y - 1) && newGameboard.setCell(x + 1, y - 1);
            this.getCellLife(board, x - 1, y + 1) && newGameboard.setCell(x - 1, y + 1);
            this.getCellLife(board, x - 1, y - 1) && newGameboard.setCell(x - 1, y - 1);
            this.getCellLife(board, x - 1, y) && newGameboard.setCell(x - 1, y);
            this.getCellLife(board, x, y + 1) && newGameboard.setCell(x, y + 1);
            this.getCellLife(board, x, y - 1) && newGameboard.setCell(x, y - 1);
        }
        // performance.mark("end-script")
        // console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);
        return newGameboard;
    };
    GameEngine.prototype.getCellLife = function (board, x, y) {
        var aliveSilbings = 0;
        aliveSilbings += board.getCell(x, y + 1) ? 1 : 0;
        aliveSilbings += board.getCell(x + 1, y + 1) ? 1 : 0;
        aliveSilbings += board.getCell(x + 1, y) ? 1 : 0;
        aliveSilbings += board.getCell(x + 1, y - 1) ? 1 : 0;
        aliveSilbings += board.getCell(x, y - 1) ? 1 : 0;
        aliveSilbings += board.getCell(x - 1, y - 1) ? 1 : 0;
        aliveSilbings += board.getCell(x - 1, y) ? 1 : 0;
        aliveSilbings += board.getCell(x - 1, y + 1) ? 1 : 0;
        var isAlive = board.getCell(x, y);
        // Cell live rules
        if (isAlive) {
            if (aliveSilbings >= 2 && aliveSilbings <= 3)
                return true;
        }
        else if (aliveSilbings === 3)
            return true;
        return false;
    };
    return GameEngine;
}());
export { GameEngine };
//# sourceMappingURL=GameEngine.js.map