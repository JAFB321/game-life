import { CartesianPlane } from "../structures/CartesianPlane.js";
var GameBoard = /** @class */ (function () {
    function GameBoard() {
        this.board = new CartesianPlane(false);
        this._limits = {
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
    Object.defineProperty(GameBoard.prototype, "limits", {
        get: function () {
            return this._limits;
        },
        enumerable: false,
        configurable: true
    });
    GameBoard.prototype.setCell = function (_a, alive) {
        var x = _a.x, y = _a.y;
        if (alive === void 0) { alive = true; }
        this.updateLimits(x, y);
        this.board.setPoint({ x: x, y: y }, alive);
    };
    GameBoard.prototype.getCell = function (point) {
        return this.board.getPoint(point);
    };
    /**
     * Deprecated
     */
    GameBoard.prototype.getBoard = function () {
        var board = new CartesianPlane(false);
        for (var x = this._limits.x.min; x < this._limits.x.max + 1; x++) {
            for (var y = this._limits.y.min; y < this._limits.y.max + 1; y++) {
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
    GameBoard.prototype.getCells = function () {
        var cells = [];
        for (var x = this._limits.x.min; x < this._limits.x.max + 1; x++) {
            for (var y = this._limits.y.min; y < this._limits.y.max + 1; y++) {
                var isAlive = this.board.getPoint({ x: x, y: y });
                if (!!isAlive) {
                    cells.push({ x: x, y: y });
                }
            }
        }
        return cells;
    };
    GameBoard.prototype.resetCells = function () {
        this.board.resetPlane();
        this.resetLimits();
    };
    GameBoard.prototype.updateLimits = function (x, y) {
        var _a = this._limits.x, x_min = _a.min, x_max = _a.max;
        var _b = this._limits.y, y_min = _b.min, y_max = _b.max;
        if (x < x_min)
            this._limits.x.min = x;
        if (x > x_max)
            this._limits.x.max = x;
        if (y < y_min)
            this._limits.y.min = y;
        if (y > y_max)
            this._limits.y.max = y;
    };
    GameBoard.prototype.resetLimits = function () {
        this._limits.x.min = 0;
        this._limits.x.max = 0;
        this._limits.y.min = 0;
        this._limits.y.max = 0;
    };
    return GameBoard;
}());
export { GameBoard };
//# sourceMappingURL=GameBoard.js.map