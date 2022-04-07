import { CanvasConfig } from "../config";

interface DragState {
    isDragging: boolean;
    lastX: number;
    lastY: number;
    onDrag?: (x: number, y: number) => any;
    onZoom?: (zoom: number) => any;
}

export class DraggableCanvas {
    private canvas: HTMLCanvasElement;
    private state: DragState;
    private readonly canvasConfig: CanvasConfig; 

    constructor(canvas: HTMLCanvasElement, canvasConfig: CanvasConfig) {
        this.canvas = canvas;
        this.canvasConfig = canvasConfig;
        this.state = {
            isDragging: false,
            lastX: 0,
            lastY: 0,
        }
    }

    public onDrag(callback: (x: number, y: number) => any){
        this.state.onDrag = callback;
    }

    public onZoom(callback: (zoom: number) => any){
        this.state.onZoom = callback;
    }

    public init(){
        const canvas = this.canvas;
        const {onDrag, onZoom} = this.state;

        canvas.onmousedown = (ev) => {
            const {state} = this;
            if(state.isDragging) return;

            this.state = {
                ...state,
                isDragging: true,
                lastX: ev.x,
                lastY: ev.y,
            }
            console.log("Mouse down: ",ev.x, ev.y);
        }

        canvas.onmouseup = (ev) => {
            const {state} = this;
            if(!state.isDragging) return;

            this.state = {
                ...state,
                isDragging: false,
                lastX: 0,
                lastY: 0,
            }

            console.log("Mouse up: ",ev.x, ev.y);
        }

        canvas.onmousemove = (ev) => {
            const {state} = this;
            const {lastX, lastY} = state;
            if(!state.isDragging) return;

            const x = ev.x - lastX;
            const y = ev.y - lastY;

            onDrag && onDrag(x, y);

            this.state = {
                ...state,
                lastX: ev.x,
                lastY: ev.y,
            }
        }

        canvas.onwheel = (ev) => {
            ev.preventDefault();
            const delta = Math.sign(ev.deltaY);
            onZoom && onZoom(delta);
        }
    }
}