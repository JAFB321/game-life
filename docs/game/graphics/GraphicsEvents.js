var GraphicsEvents = /** @class */ (function () {
    function GraphicsEvents() {
        this.events = {
            onCellBorn: [],
            onCellKill: [],
            onCellToggle: []
        };
    }
    GraphicsEvents.prototype.on = function (event) {
        this.events[event.type].push(event.callback);
    };
    GraphicsEvents.prototype.emit = function (event, payload) {
        this.events[event].forEach(function (callback) { return callback(payload); });
    };
    GraphicsEvents.prototype.emitCellBorn = function (point) {
        this.emit("onCellBorn", point);
    };
    GraphicsEvents.prototype.emitCellKill = function (point) {
        this.emit("onCellKill", point);
    };
    GraphicsEvents.prototype.emitCellToggle = function (point) {
        this.emit("onCellToggle", point);
    };
    return GraphicsEvents;
}());
export { GraphicsEvents };
//# sourceMappingURL=GraphicsEvents.js.map