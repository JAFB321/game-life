var GraphicsEventsObservable = /** @class */ (function () {
    function GraphicsEventsObservable() {
        this.observers = [];
        // public notify(a, payload?: any){
        //     this.observers.forEach(o => o.onGraphicsEvent(event));
        // }
    }
    GraphicsEventsObservable.prototype.subscribe = function (obs) {
        console.log(this.observers);
        this.observers.push(obs);
    };
    GraphicsEventsObservable.prototype.unsubscribe = function (obs) {
        this.observers = this.observers.filter(function (o) { return o !== obs; });
    };
    return GraphicsEventsObservable;
}());
export { GraphicsEventsObservable };
new GraphicsEventsObservable().subscribe({ a: "" });
//# sourceMappingURL=a.js.map