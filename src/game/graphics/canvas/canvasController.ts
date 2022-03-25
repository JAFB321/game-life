import { CartesianPlane } from "../../structures/CartesianPlane";

export interface GraphicsConfig {
    cells: {
        size: number,
    },
    grid: {
        lineWidth: number,
    }
    board: {
        height: number,
        width: number,
    },
    colors: {
        background: string,
        cell: string,
        grid: string
    }
}

export class CanvasController{

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D | null;
    private config: GraphicsConfig;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.canvasContext = canvas?.getContext("2d");

        if(!this.canvas || !this.canvasContext)
          throw new Error("Canvas cannot be null");

        this.config = {
            cells: {
                size: 18,
            },
            grid: {
                lineWidth: 0.8,
            },
            board: {
                height: canvas.height,
                width: canvas.width,
            },
            colors: {
                background: '#22272e',
                cell: '#ffffff',
                grid: '626567'
            }
        }
    }

    public render(board: CartesianPlane<boolean>){
        
    }

    private renderGrid(){

    }

    private renderCells(){

    }
}