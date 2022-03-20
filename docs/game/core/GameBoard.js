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
import { CartesianPlane } from "../structures/CartesianPlane.js";
var GameBoard = /** @class */ (function () {
    function GameBoard() {
        this.board = new CartesianPlane(false);
        this.limits = {
            x: {
                max: 0,
                min: 0
            },
            y: {
                max: 0,
                min: 0
            }
        };
    }
    GameBoard.prototype.setCell = function (_a, alive) {
        var x = _a.x, y = _a.y;
        if (alive === void 0) { alive = true; }
        this.updateLimits(x, y);
        this.board.setPoint({ x: x, y: y }, alive);
    };
    GameBoard.prototype.getCell = function (point) {
        return this.board.getPoint(point);
    };
    GameBoard.prototype.getBoard = function () {
        var board = new CartesianPlane(false);
        for (var x = this.limits.x.min; x < this.limits.x.max + 1; x++) {
            for (var y = this.limits.y.min; y < this.limits.y.max + 1; y++) {
                var isAlive = this.board.getPoint({ x: x, y: y });
                if (!!isAlive) {
                    board.setPoint({ x: x, y: y }, true);
                }
            }
        }
        return {
            board: board
        };
    };
    GameBoard.prototype.resetCells = function () {
        this.board.resetPlane();
        this.resetLimits();
    };
    GameBoard.prototype.nextGeneration = function () {
        var newGeneration = this.getNextGeneration();
        return this.board = newGeneration;
    };
    GameBoard.prototype.getNextGeneration = function () {
        performance.mark("start-script");
        var newLimits = {
            x: __assign({}, this.limits.x),
            y: __assign({}, this.limits.y)
        };
        newLimits.x.min -= 2;
        newLimits.x.max += 2;
        newLimits.y.min -= 2;
        newLimits.y.max += 2;
        this.resetLimits();
        var newPlane = new CartesianPlane(false);
        for (var x_pos = newLimits.x.min; x_pos < newLimits.x.max; x_pos++) {
            for (var y_pos = newLimits.y.min; y_pos < newLimits.y.max; y_pos++) {
                // Current cell
                var isAlive = this.board.getPoint({ x: x_pos, y: y_pos });
                // New Cell
                var newCell = false;
                // Count alive silbings
                var aliveSilbings = 0;
                aliveSilbings += this.board.getPoint({ x: x_pos, y: y_pos + 1 }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos + 1, y: y_pos + 1 }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos + 1, y: y_pos }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos + 1, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos - 1, y: y_pos - 1 }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos - 1, y: y_pos }) ? 1 : 0;
                aliveSilbings += this.board.getPoint({ x: x_pos - 1, y: y_pos + 1 }) ? 1 : 0;
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
                    newPlane.setPoint({ x: x_pos, y: y_pos }, true);
                    this.updateLimits(x_pos, y_pos);
                }
            }
        }
        performance.mark("end-script");
        // console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);
        return newPlane;
    };
    GameBoard.prototype.updateLimits = function (x, y) {
        var _a = this.limits.x, x_min = _a.min, x_max = _a.max;
        var _b = this.limits.y, y_min = _b.min, y_max = _b.max;
        if (x < x_min)
            this.limits.x.min = x;
        if (x > x_max)
            this.limits.x.max = x;
        if (y < y_min)
            this.limits.y.min = y;
        if (y > y_max)
            this.limits.y.max = y;
    };
    GameBoard.prototype.resetLimits = function () {
        this.limits.x.min = 0;
        this.limits.x.max = 0;
        this.limits.y.min = 0;
        this.limits.y.max = 0;
    };
    return GameBoard;
}());
export { GameBoard };
//# sourceMappingURL=GameBoard.js.map