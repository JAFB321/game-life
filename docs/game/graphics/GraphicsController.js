import { GraphicsEvents } from "./GraphicsEvents.js";
var GraphicsController = /** @class */ (function () {
    function GraphicsController() {
        this.events = new GraphicsEvents();
        this.aliveCells = [];
    }
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