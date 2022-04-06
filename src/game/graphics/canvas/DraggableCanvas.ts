interface DragState {
    isDragging: boolean;
    lastX: number;
    lastY: number;
    onDrag?: (x: number, y: number) => void;
}

export class DraggableCanvas {
    private canvas: HTMLCanvasElement;
    private state: DragState;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.state = {
            isDragging: false,
            lastX: 0,
            lastY: 0,
        }
    }

    public init(onDrag: (x: number, y: number) => void){
        const canvas = this.canvas;
        this.state.onDrag = onDrag;

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

            onDrag(x, y);

            this.state = {
                ...state,
                lastX: ev.x,
                lastY: ev.y,
            }
        }
    }
}