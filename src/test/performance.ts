import { CanvasController } from "../game/graphics/canvas/CanvasController.js";

export const performanceCanvas = (canvas: HTMLCanvasElement) => {
    const con = new CanvasController(canvas);

    const reps = 1000
    
    performance.mark('start');
    for (let i = 0; i < reps; i++) {
        const config = con.getConfig();
    }
    performance.mark('end');

    const time = performance.measure('measure', 'start', 'end').duration;

    console.log('Config');
    console.log(time);
}
