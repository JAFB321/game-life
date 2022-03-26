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
import { GraphicsEvents } from "./GraphicsEvents.js";
var GraphicsController = /** @class */ (function () {
    function GraphicsController() {
        this.config = {
            cells: {
                size: 20,
            },
            grid: {
                lineWidth: 0.8,
                offset: 0.5,
            },
            board: {
                height: 900,
                width: 1900,
                offset_x: 0,
                offset_y: 0,
            },
            colors: {
                background: '#22272e',
                cell: '#ffffff',
                grid: '#626567'
            }
        };
        this.events = new GraphicsEvents();
        this.aliveCells = [];
    }
    GraphicsController.prototype.setConfig = function (_a) {
        var board = _a.board, cells = _a.cells, colors = _a.colors, grid = _a.grid;
        this.config = {
            board: __assign(__assign({}, this.config.board), board),
            cells: __assign(__assign({}, this.config.cells), cells),
            colors: __assign(__assign({}, this.config.colors), colors),
            grid: __assign(__assign({}, this.config.grid), grid)
        };
    };
    GraphicsController.prototype.setCells = function (cells) {
        this.aliveCells = cells;
        this.render();
    };
    ;
    GraphicsController.prototype.render = function () {
        console.log('render');
    };
    return GraphicsController;
}());
export { GraphicsController };
//# sourceMappingURL=GraphicsController.js.map