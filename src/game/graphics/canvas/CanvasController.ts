import { GameBoard } from "../../core/GameBoard.js";
import { GraphicsController } from "../GraphicsController.js";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config.js";

export class CanvasController extends GraphicsController {

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    protected config: CanvasConfig;

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();

        if(!this.canvas || !this.canvas.getContext("2d"))
          throw new Error("Canvas cannot be null");

        this.config = defaultCanvasConfig;
    }

    public render(){
        this.applyTransforms();
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
        const ctx = this.canvasContext;
        const {cells, colors, grid, board} = this.config;
        const {offset_x, offset_y} = board;
        const {offset} = grid;
        const {size} = cells;
        const {cell: color} = colors;

        const {aliveCells} = this;

        for (const point of aliveCells) {
            const {x, y} = point;

            const cell_x = (x+offset_x)*(size+offset*4)+offset*3;
            const cell_y = (y+offset_y)*(size+offset*4)+offset*3;

            ctx.fillStyle = color;
            ctx.fillRect(cell_x, cell_y, size, size);            
        }
            
    }

    private renderBackground(){
        const ctx = this.canvasContext;
        const {board, colors} = this.config;
        const {width, height} = board;
        const {background} = colors;

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
    }

    private applyTransforms(){
        const ctx = this.canvasContext;
        const {board} = this.config;
        const {offset_x, offset_y, zoom} = board;
        
        const currentTransform = ctx.getTransform();
        const zoomChanged = currentTransform.a !== zoom/100;
        // const offsetChanged = currentTransform.e !== offset_x || currentTransform.f !== offset_y;

        // Only transform if config changed
        if(zoomChanged /*|| offsetChanged*/){
            ctx.reset();
            ctx.scale(zoom/100, zoom/100);
            // ctx.translate(offset_x, offset_y);
        }
    }

    public setConfig({board, cells, colors, grid}: CanvasConfigParams){
        this.config = {
            board: {
                ...this.config.board,
                ...board,
            },
            cells: {
                ...this.config.cells,
                ...cells,
            },
            colors: {
                ...this.config.colors,
                ...colors,
            },
            grid: {
                ...this.config.grid,
                ...grid,
            }
        };
    }
}

declare global {
    interface CanvasRenderingContext2D { 
        reset(): void;
    }
}