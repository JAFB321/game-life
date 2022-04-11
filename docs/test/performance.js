import { CanvasController } from "../game/graphics/canvas/CanvasController.js";
export var performanceCanvas = function (canvas) {
    var con = new CanvasController(canvas);
    var reps = 1000;
    performance.mark('start');
    for (var i = 0; i < reps; i++) {
        var config = con.getConfig();
    }
    performance.mark('end');
    var time = performance.measure('measure', 'start', 'end').duration;
    console.log('Config');
    console.log(time);
};
//# sourceMappingURL=performance.js.map