var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { GraphicsController } from "../GraphicsController.js";
import { CanvasPainter } from "./CanvasPainter.js";
import { defaultCanvasConfig } from "./config.js";
import { SelectedCells } from "./plugins/SelectedCells.js";
import { Draggable } from "./plugins/Draggable.js";
var CanvasController = /** @class */ (function (_super) {
    __extends(CanvasController, _super);
    function CanvasController(canvas) {
        var _this = _super.call(this) || this;
        _this.selectedCells = [];
        _this.canvas = canvas;
        _this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();
        if (!_this.canvas || !_this.canvas.getContext("2d"))
            throw new Error("Canvas cannot be null");
        _this.config = defaultCanvasConfig;
        _this.painter = new CanvasPainter(canvas, _this.canvasContext);
        _this.plugins = [];
        _this.initPlugins();
        return _this;
    }
    CanvasController.prototype.render = function () {
        this.painter.paint(this.config, this.aliveCells, this.selectedCells);
    };
    CanvasController.prototype.initPlugins = function () {
        var _this = this;
        var draggable = new Draggable(this.canvas, function () { return _this.getConfig(); }, function (config) { return _this.setConfig(config); });
        var selectedCells = new SelectedCells(this.canvas, function () { return _this.getConfig(); }, function (config) { return _this.setConfig(config); }, function () { return _this.selectedCells; }, function (selectedCells) { return _this.setSelectedCells(selectedCells); });
        selectedCells.onCellClicked(function (point) {
            _this.events.emitCellToggle(point);
        });
        this.plugins = [
            draggable,
            selectedCells
        ];
    };
    CanvasController.prototype.setSelectedCells = function (selectedCells) {
        this.selectedCells = selectedCells;
        this.render();
    };
    CanvasController.prototype.getConfig = function () {
        var _a = this.config, board = _a.board, cells = _a.cells, colors = _a.colors, grid = _a.grid;
        return {
            board: __assign({}, board),
            cells: __assign({}, cells),
            colors: __assign({}, colors),
            grid: __assign({}, grid),
        };
    };
    CanvasController.prototype.setConfig = function (_a) {
        var _this = this;
        var board = _a.board, cells = _a.cells, colors = _a.colors, grid = _a.grid;
        this.config = {
            board: __assign(__assign({}, this.config.board), board),
            cells: __assign(__assign({}, this.config.cells), cells),
            colors: __assign(__assign({}, this.config.colors), colors),
            grid: __assign(__assign({}, this.config.grid), grid)
        };
        window.requestAnimationFrame(function () { return _this.render(); });
    };
    return CanvasController;
}(GraphicsController));
export { CanvasController };
//# sourceMappingURL=CanvasController.js.map