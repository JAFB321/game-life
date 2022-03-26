import { GameBoard } from "./core/GameBoard.js";
import { GameEngine } from "./core/GameEngine.js";
var GameOfLife = /** @class */ (function () {
    function GameOfLife(graphics) {
        this.evolution = {
            isEvolving: false,
            intervalID: -1,
            config: {
                onNextGeneration: function (board) { },
                delay: 500
            }
        };
        this.gameBoard = new GameBoard();
        this.engine = new GameEngine();
        this.graphics = graphics;
    }
    GameOfLife.prototype.bornCell = function (point) {
        this.gameBoard.setCell(point, true);
    };
    GameOfLife.prototype.killCell = function (point) {
        this.gameBoard.setCell(point, false);
    };
    GameOfLife.prototype.exterminateCells = function () {
        this.gameBoard.resetCells();
    };
    /**
     * Deprecated
     */
    GameOfLife.prototype.getBoard = function () {
        return this.gameBoard.getBoard();
    };
    GameOfLife.prototype.getCells = function () {
        return this.gameBoard.getCells();
    };
    GameOfLife.prototype.setConfig = function (options) {
        var onNextGeneration = options.onNextGeneration, delay = options.delay;
        var config = this.evolution.config;
        config.onNextGeneration = onNextGeneration || config.onNextGeneration;
        config.delay = delay || config.delay;
    };
    GameOfLife.prototype.startEvolution = function () {
        var _this = this;
        var _a = this.evolution, isEvolving = _a.isEvolving, config = _a.config;
        var onNextGeneration = config.onNextGeneration, delay = config.delay;
        if (isEvolving) {
            this.pauseEvolution();
        }
        onNextGeneration(this.gameBoard);
        var intervalID = window.setInterval(function () {
            var nextGen = _this.evolveGeneration();
            _this.graphics.setCells(nextGen.getCells());
            onNextGeneration(nextGen);
        }, delay);
        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;
    };
    GameOfLife.prototype.pauseEvolution = function () {
        var _a = this.evolution, isEvolving = _a.isEvolving, intervalID = _a.intervalID;
        if (isEvolving && intervalID !== -1) {
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
        }
    };
    GameOfLife.prototype.resumeEvolution = function () {
        var _this = this;
        var _a = this.evolution, isEvolving = _a.isEvolving, config = _a.config;
        if (!isEvolving) {
            var delay = config.delay, onNextGeneration_1 = config.onNextGeneration;
            var intervalID = window.setInterval(function () {
                _this.evolveGeneration();
                var nextGen = _this.evolveGeneration();
                _this.graphics.setCells(nextGen.getCells());
                onNextGeneration_1(nextGen);
            }, delay);
            this.evolution.isEvolving = true;
            this.evolution.intervalID = intervalID;
        }
    };
    GameOfLife.prototype.evolveGeneration = function () {
        var newGeneration = this.engine.nextGeneration(this.gameBoard);
        return this.gameBoard = newGeneration;
    };
    return GameOfLife;
}());
export { GameOfLife };
//# sourceMappingURL=GameOfLife.js.map