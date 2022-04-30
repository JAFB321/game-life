var GameBoard = /** @class */ (function () {
    function GameBoard() {
        this.board = new Map();
    }
    GameBoard.prototype.setCell = function (x, y, alive) {
        if (alive === void 0) { alive = true; }
        if (alive)
            this.board.set("".concat(x, ":").concat(y), { x: x, y: y });
        else
            this.board.delete("".concat(x, ":").concat(y));
    };
    GameBoard.prototype.getCell = function (x, y) {
        return this.board.has("".concat(x, ":").concat(y));
    };
    GameBoard.prototype.getCells = function () {
        return Array.from(this.board.values());
    };
    GameBoard.prototype.resetCells = function () {
        this.board.clear();
    };
    return GameBoard;
}());
export { GameBoard };
//# sourceMappingURL=GameBoard.js.map