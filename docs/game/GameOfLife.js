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
        this.initEvents();
    }
    GameOfLife.prototype.bornCell = function (_a) {
        var x = _a.x, y = _a.y;
        this.stopEvolution();
        this.gameBoard.setCell(x, y, true);
        this.updateGraphics();
    };
    GameOfLife.prototype.bornCells = function (points) {
        var _this = this;
        this.stopEvolution();
        points.forEach(function (point) { return _this.gameBoard.setCell(point.x, point.y, true); });
        this.updateGraphics();
    };
    GameOfLife.prototype.killCell = function (_a) {
        var x = _a.x, y = _a.y;
        this.stopEvolution();
        this.gameBoard.setCell(x, y, false);
        this.updateGraphics();
    };
    GameOfLife.prototype.toggleCell = function (_a) {
        var x = _a.x, y = _a.y;
        this.stopEvolution();
        this.gameBoard.setCell(x, y, !this.gameBoard.getCell(x, y));
        this.updateGraphics();
    };
    GameOfLife.prototype.exterminateCells = function () {
        this.stopEvolution();
        this.gameBoard.resetCells();
        this.updateGraphics();
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
        if (isEvolving)
            return;
        onNextGeneration(this.gameBoard.getCells());
        this.updateGraphics();
        var intervalID = window.setInterval(function () {
            _this.evolveGeneration();
            onNextGeneration(_this.gameBoard.getCells());
        }, delay);
        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;
    };
    GameOfLife.prototype.stopEvolution = function () {
        var _a = this.evolution, isEvolving = _a.isEvolving, intervalID = _a.intervalID;
        if (isEvolving && intervalID !== -1) {
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
        }
    };
    GameOfLife.prototype.evolveGeneration = function () {
        var newGeneration = this.engine.nextGeneration(this.gameBoard);
        this.gameBoard = newGeneration;
        this.updateGraphics();
    };
    GameOfLife.prototype.updateGraphics = function () {
        this.graphics.setCells(this.gameBoard.getCells());
    };
    GameOfLife.prototype.initEvents = function () {
        var _this = this;
        var events = this.graphics.events;
        events.on({
            type: "onCellBorn",
            callback: function (point) {
                _this.bornCell(point);
            }
        });
        events.on({
            type: "onCellKill",
            callback: function (point) {
                _this.killCell(point);
            }
        });
        events.on({
            type: "onCellToggle",
            callback: function (point) {
                console.log(point);
                _this.toggleCell(point);
                // this.gameBoard.toggleCell(point);
            }
        });
    };
    return GameOfLife;
}());
export { GameOfLife };
//# sourceMappingURL=GameOfLife.js.map