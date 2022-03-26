import { GameBoard } from "../../core/GameBoard.js";
import { GraphicsController } from "../GraphicsController.js";

export class CanvasController extends GraphicsController {

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();

        if(!this.canvas || !this.canvas.getContext("2d"))
          throw new Error("Canvas cannot be null");
    }

    public render(){
        this.renderBackground();
        this.renderCells();
        this.renderGrid();
    }

    private renderGrid(){
        const ctx = this.canvasContext;
        const {board, grid, colors, cells} = this.config;
        const {size} = cells;
        const {width, height} = board;
        const {lineWidth, offset} = grid;
        const {grid: gridColor} = colors;
        
        // Grid
        ctx.moveTo(offset,offset);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gridColor;

        for (let x = offset; x < width; x+=size+offset*4) {
            ctx.moveTo(x,offset);
            ctx.lineTo(x, height);
        }
        for (let y = offset; y < height; y+=size+offset*4) {
            ctx.moveTo(offset, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
    }

    private renderCells(){
        const {cells, colors, grid} = this.config;
        const {offset} = grid;
        const {size} = cells;
        const {cell: color} = colors;

        const aliveCells = this.aliveCells;

        for (const point of aliveCells) {
            const {x, y} = point;

            const cell_x = x*(size+offset*4)+offset*3;
            const cell_y = y*(size+offset*4)+offset*3;

            this.canvasContext.fillStyle = color;
            this.canvasContext.fillRect(cell_x, cell_y, size, size);            
        }
            
    }

    private renderBackground(){
        const {board, colors} = this.config;
        const {width, height} = board;
        const {background} = colors;

        this.canvasContext.fillStyle = background;
        this.canvasContext.fillRect(0, 0, width, height);
    }
}
