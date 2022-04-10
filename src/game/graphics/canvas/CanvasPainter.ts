import { Point } from "../../structures/CartesianPlane";
import { CanvasConfig } from "./config";

export interface CanvasPainter {
    readonly canvas: HTMLCanvasElement;
    readonly canvasContext: CanvasRenderingContext2D;

    paint(config: CanvasConfig, aliveCells: Point[]): void;   
}

export class CanvasPainterComponent implements CanvasPainter{
    
    public canvas: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;
    
    constructor(canvas: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
    }

    paint(config: CanvasConfig, aliveCells: Point[]): void {
        this.renderBackground(config);
        this.renderCells(config, aliveCells);
        this.renderGrid(config);
    }
    
    private renderGrid(config: CanvasConfig){
        const ctx = this.canvasContext;
        const {board, grid, colors, cells} = config;
        const {size} = cells;
        const {width, height, offset_x, offset_y, zoom} = board;
        const {lineWidth, gap} = grid;
        const {grid: gridColor} = colors;
        
        // Grid
        ctx.moveTo(gap,gap);
        // ctx.lineWidth = lineWidth;
        // ctx.lineWidth = lineWidth*(zoom/100) < 0.8 ? 0.8+0.8*(zoom/100) : lineWidth;
        ctx.lineWidth = (lineWidth);
        ctx.strokeStyle = gridColor;

        // console.log(ctx.lineWidth);
        // console.log(zoom);
        // console.log(ctx.getTransform());
        

        const cell_size = size+gap*4;

        for (let x = gap; x < width*2+(Math. abs(offset_x)); x+=cell_size) {
            ctx.moveTo(x,gap-height-offset_y);
            ctx.lineTo(x, height*2-offset_y);
            
            ctx.moveTo(-x+gap*2,gap-height-offset_y);
            ctx.lineTo(-x+gap*2, height*2-offset_y);
        }
        for (let y = gap; y < height*2+(Math. abs(offset_y)); y+=cell_size) {
            ctx.moveTo(gap-width-offset_x, y);
            ctx.lineTo(width*2-offset_x, y);

            ctx.moveTo(gap-width-offset_x, -y+gap*2);
            ctx.lineTo(width*2-offset_x, -y+gap*2);
        }
        ctx.stroke();
    }

    private renderCells(config: CanvasConfig, aliveCells: Point[]){
        const ctx = this.canvasContext;
        const {cells, colors, grid, board} = config;
        const {offset_x, offset_y} = board;
        const {gap} = grid;
        const {size} = cells;
        const {cell: color} = colors;

        for (const point of aliveCells) {
            const {x, y} = point;

            const cell_x = (x)*(size+gap*4)+gap*3;
            const cell_y = (y)*(size+gap*4)+gap*3;

            ctx.fillStyle = color;
            ctx.fillRect(cell_x, cell_y, size, size);            
        }
            
    }

    private renderBackground(config: CanvasConfig){
        const ctx = this.canvasContext;
        const {board, colors} = config;
        const {width, height, offset_x, offset_y} = board;
        const {background} = colors;

        ctx.fillStyle = background;
        ctx.fillRect(0-offset_x, 0-offset_y, width, height);
    }
}