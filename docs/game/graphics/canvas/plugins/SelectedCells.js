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
import { CanvasPlugin } from "./CanvasPlugin.js";
var SelectedCells = /** @class */ (function (_super) {
    __extends(SelectedCells, _super);
    function SelectedCells(canvas, getConfig, setConfig, getSelectedCells, setSelectCells) {
        var _this = _super.call(this, canvas, getConfig, setConfig) || this;
        _this.getSelectedCells = getSelectedCells;
        _this.setSelectCells = setSelectCells;
        _this.listeners = {
            onCellClicked: []
        };
        _this.init();
        return _this;
    }
    SelectedCells.prototype.onCellClicked = function (callback) {
        this.listeners.onCellClicked.push(callback);
    };
    SelectedCells.prototype.emitCellSelected = function (point) {
        this.listeners.onCellClicked.forEach(function (callback) { return callback(point); });
    };
    SelectedCells.prototype.init = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.addEventListener('mousemove', function (ev) {
            var x = ev.offsetX, y = ev.offsetY;
            var _a = _this.getConfig(), board = _a.board, cells = _a.cells, grid = _a.grid;
            var width = board.width, height = board.height, offset_x = board.offset_x, offset_y = board.offset_y, zoom = board.zoom;
            var lineWidth = grid.lineWidth, gap = grid.gap;
            var size = cells.size;
            size = size * zoom / 100;
            size = Math.ceil(size);
            var cell_size = size + gap * 4;
            var pos_x = Math.floor(((x - offset_x) / cell_size));
            var pos_y = Math.floor(((y - offset_y) / cell_size));
            _this.setSelectCells([{ x: pos_x, y: pos_y }]);
        });
        canvas.addEventListener('dblclick', function (ev) {
            var cell = _this.getSelectedCells()[0];
            if (cell)
                _this.emitCellSelected(cell);
        });
    };
    return SelectedCells;
}(CanvasPlugin));
export { SelectedCells };
//# sourceMappingURL=SelectedCells.js.map