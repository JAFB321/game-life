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
import { CanvasPlugin } from "./CanvasPlugin.js";
var Draggable = /** @class */ (function (_super) {
    __extends(Draggable, _super);
    function Draggable(canvas, getConfig, setConfig) {
        var _this = _super.call(this, canvas, getConfig, setConfig) || this;
        _this.state = {
            isDragging: false,
            lastX: 0,
            lastY: 0,
        };
        _this.init();
        return _this;
    }
    Draggable.prototype.init = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.onmousedown = function (ev) {
            var state = _this.state;
            if (state.isDragging)
                return;
            _this.state = __assign(__assign({}, state), { isDragging: true, lastX: ev.x, lastY: ev.y });
        };
        canvas.onmouseup = function (ev) {
            var state = _this.state;
            if (!state.isDragging)
                return;
            _this.state = __assign(__assign({}, state), { isDragging: false, lastX: 0, lastY: 0 });
        };
        canvas.onmousemove = function (ev) {
            var state = _this.state;
            if (!state.isDragging)
                return;
            var lastX = state.lastX, lastY = state.lastY;
            var board = _this.getConfig().board;
            var offset_x = board.offset_x, offset_y = board.offset_y, zoom = board.zoom;
            var x = ev.x - lastX;
            var y = ev.y - lastY;
            // Deprecated (used for canvas 2d scale)
            // const newOffset_x = Math.floor(offset_x+(x/(zoom/100)));
            // const newOffset_y = Math.floor(offset_y+(y/(zoom/100)));
            // Deprecated (used for canvas 2d scale)
            // const newOffset_x = offset_x+(x/(zoom/100));
            // const newOffset_y = offset_y+(y/(zoom/100));
            var newOffset_x = offset_x + x;
            var newOffset_y = offset_y + y;
            _this.setConfig({
                board: {
                    offset_x: newOffset_x,
                    offset_y: newOffset_y,
                }
            });
            _this.state = __assign(__assign({}, state), { lastX: ev.x, lastY: ev.y });
        };
        canvas.onwheel = function (ev) {
            ev.preventDefault();
            var zoom = Math.sign(ev.deltaY);
            var board = _this.getConfig().board;
            var newZoom = board.zoom - (zoom * board.zoom / 20);
            newZoom = Math.min(newZoom, 200);
            newZoom = Math.max(newZoom, 50);
            newZoom = Math.round(newZoom);
            _this.setConfig({
                board: {
                    zoom: newZoom,
                }
            });
        };
    };
    return Draggable;
}(CanvasPlugin));
export { Draggable };
//# sourceMappingURL=Draggable.js.map