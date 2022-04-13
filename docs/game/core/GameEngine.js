var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { GameBoard } from "./GameBoard.js";
var GameEngine = /** @class */ (function () {
    function GameEngine() {
    }
    GameEngine.prototype.nextGeneration = function (board) {
        var newGameboard = new GameBoard();
        // performance.mark("start-script")
        var newLimits = {
            x: __assign({}, board.limits.x),
            y: __assign({}, board.limits.y)
        };
        newLimits.x.min -= 2;
        newLimits.x.max += 2;
        newLimits.y.min -= 2;
        newLimits.y.max += 2;
        for (var x_pos = newLimits.x.min; x_pos < newLimits.x.max; x_pos++) {
            for (var y_pos = newLimits.y.min; y_pos < newLimits.y.max; y_pos++) {
                // Current cell
                var isAlive = board.getCell({ x: x_pos, y: y_pos });
                // New Cell
                var newCell = false;
                // Count alive silbings
                var aliveSilbings = 0;
                aliveSilbings += board.getCell({ x: x_pos, y: y_pos + 1 }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos + 1, y: y_pos + 1 }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos + 1, y: y_pos }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos + 1, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos - 1, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos - 1, y: y_pos }) ? 1 : 0;
                aliveSilbings += board.getCell({ x: x_pos - 1, y: y_pos + 1 }) ? 1 : 0;
                // Cell live rules
                if (isAlive) {
                    if (aliveSilbings < 2) {
                        newCell = false;
                    }
                    else if (aliveSilbings <= 3) {
                        newCell = true;
                    }
                    else {
                        newCell = false;
                    }
                }
                else {
                    if (aliveSilbings === 3) {
                        newCell = true;
                    }
                    else {
                        newCell = false;
                    }
                }
                if (newCell) {
                    newGameboard.setCell({ x: x_pos, y: y_pos }, true);
                }
            }
        }
        // performance.mark("end-script")
        // console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);
        return newGameboard;
    };
    return GameEngine;
}());
export { GameEngine };
//# sourceMappingURL=GameEngine.js.map