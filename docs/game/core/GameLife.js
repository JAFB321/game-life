import { GameBoard } from "./GameBoard.js";
var GameLife = /** @class */ (function () {
    function GameLife() {
        this.evolution = {
            isEvolving: false,
            intervalID: -1,
            config: {
                onNextGeneration: function (board) { },
                delayDuration: 200
            }
        };
        this.gameBoard = new GameBoard();
    }
    GameLife.prototype.bornCell = function (point) {
        this.gameBoard.setCell(point, true);
    };
    GameLife.prototype.killCell = function (point) {
        this.gameBoard.setCell(point, false);
    };
    GameLife.prototype.exterminateCells = function () {
        this.gameBoard.resetCells();
    };
    GameLife.prototype.getBoard = function () {
        return this.gameBoard.getBoard();
    };
    GameLife.prototype.startEvolution = function (options) {
        var _this = this;
        if (options === void 0) { options = {
            onNextGeneration: function (board) { },
            delayDuration: 200
        }; }
        var onNextGeneration = options.onNextGeneration, delayDuration = options.delayDuration;
        var isEvolving = this.evolution.isEvolving;
        if (isEvolving) {
            this.pauseEvolution();
        }
        var board = this.gameBoard.getBoard().board;
        onNextGeneration(board);
        var intervalID = window.setInterval(function () {
            var nextGen = _this.gameBoard.nextGeneration();
            onNextGeneration(nextGen);
        }, delayDuration);
        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;
    };
    GameLife.prototype.pauseEvolution = function () {
        var _a = this.evolution, isEvolving = _a.isEvolving, intervalID = _a.intervalID;
        if (isEvolving && intervalID !== -1) {
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
        }
    };
    GameLife.prototype.resumeEvolution = function () {
        var _this = this;
        var _a = this.evolution, isEvolving = _a.isEvolving, config = _a.config;
        if (!isEvolving) {
            var delayDuration = config.delayDuration, onNextGeneration_1 = config.onNextGeneration;
            var intervalID = window.setInterval(function () {
                _this.gameBoard.nextGeneration();
                var board = _this.gameBoard.getBoard().board;
                onNextGeneration_1(board);
            }, delayDuration);
            this.evolution.isEvolving = true;
            this.evolution.intervalID = intervalID;
        }
    };
    return GameLife;
}());
export { GameLife };
//# sourceMappingURL=GameLife.js.map