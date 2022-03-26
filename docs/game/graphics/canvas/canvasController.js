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
import { GraphicsController } from "../GraphicsController.js";
var CanvasController = /** @class */ (function (_super) {
    __extends(CanvasController, _super);
    function CanvasController(canvas) {
        var _this = _super.call(this) || this;
        _this.canvas = canvas;
        _this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();
        if (!_this.canvas || !_this.canvas.getContext("2d"))
            throw new Error("Canvas cannot be null");
        return _this;
    }
    CanvasController.prototype.render = function () {
        this.renderBackground();
        this.renderCells();
        this.renderGrid();
    };
    CanvasController.prototype.renderGrid = function () {
        var ctx = this.canvasContext;
        var _a = this.config, board = _a.board, grid = _a.grid, colors = _a.colors, cells = _a.cells;
        var size = cells.size;
        var width = board.width, height = board.height;
        var lineWidth = grid.lineWidth, offset = grid.offset;
        var gridColor = colors.grid;
        // Grid
        ctx.moveTo(offset, offset);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gridColor;
        for (var x = offset; x < width; x += size + offset * 4) {
            ctx.moveTo(x, offset);
            ctx.lineTo(x, height);
        }
        for (var y = offset; y < height; y += size + offset * 4) {
            ctx.moveTo(offset, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
    };
    CanvasController.prototype.renderCells = function () {
        var _a = this.config, cells = _a.cells, colors = _a.colors, grid = _a.grid;
        var offset = grid.offset;
        var size = cells.size;
        var color = colors.cell;
        var aliveCells = this.aliveCells;
        for (var _i = 0, aliveCells_1 = aliveCells; _i < aliveCells_1.length; _i++) {
            var point = aliveCells_1[_i];
            var x = point.x, y = point.y;
            var cell_x = x * (size + offset * 4) + offset * 3;
            var cell_y = y * (size + offset * 4) + offset * 3;
            this.canvasContext.fillStyle = color;
            this.canvasContext.fillRect(cell_x, cell_y, size, size);
        }
    };
    CanvasController.prototype.renderBackground = function () {
        var _a = this.config, board = _a.board, colors = _a.colors;
        var width = board.width, height = board.height;
        var background = colors.background;
        this.canvasContext.fillStyle = background;
        this.canvasContext.fillRect(0, 0, width, height);
    };
    return CanvasController;
}(GraphicsController));
export { CanvasController };
//# sourceMappingURL=canvasController.js.map