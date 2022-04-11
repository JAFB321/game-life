import { Point } from "../../structures/CartesianPlane.js";
import { CanvasConfig } from "./config.js";

export class CanvasPainter{
    
    public canvas: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;
    
    constructor(canvas: HTMLCanvasElement, canvasContext: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.canvasContext = canvasContext;
    }

    paint(config: CanvasConfig, aliveCells: Point[], selectedCells: Point[]): void {
        this.applyTransforms(config);
        this.renderBackground(config);
        this.renderCells(config, aliveCells, selectedCells);
        this.renderGrid(config);
    }
    
    private renderGrid(config: CanvasConfig){
        const ctx = this.canvasContext;
        const {board, grid, colors, cells} = config;
        const {width, height, offset_x, offset_y, zoom} = board;
        const {grid: gridColor} = colors;
        
        // Scale grid to zoom
        let {size} = cells;
        let {lineWidth, gap} = grid;
        
        size = size * zoom/100;        
        size = Math.ceil(size);
        
        // Paint Grid
        ctx.lineWidth = (lineWidth);
        ctx.strokeStyle = gridColor;


        const cell_size = size+gap*4;
        
        for (let x = 0; x < width*2+(Math. abs(offset_x)); x+=cell_size) {
            ctx.moveTo(x,gap-height-offset_y);
            ctx.lineTo(x, height*2-offset_y);
            
            ctx.moveTo(-x+gap*2,gap-height-offset_y);
            ctx.lineTo(-x+gap*2, height*2-offset_y);
        }
        for (let y = 0; y < height*2+(Math. abs(offset_y)); y+=cell_size) {
            ctx.moveTo(gap-width-offset_x, y);
            ctx.lineTo(width*2-offset_x, y);

            ctx.moveTo(gap-width-offset_x, -y+gap*2);
            ctx.lineTo(width*2-offset_x, -y+gap*2);
        }
        ctx.stroke();
    }

    private renderCells(config: CanvasConfig, aliveCells: Point[], selectedCells: Point[]){
        const ctx = this.canvasContext;
        const {cells, colors, grid, board} = config;
        const {zoom} = board;
        const {cell: cell_color, selected_cell: selected_cell_color} = colors;
        
        // Scale cell size to zoom
        let {gap} = grid;
        let {size} = cells;

        size = size * zoom/100;
        size = Math.ceil(size);

        const cell_size = size+gap*4;

        ctx.fillStyle = cell_color;
        for (const point of aliveCells) {
            const {x, y} = point;

            const cell_x = (x)*(cell_size)+gap*2;
            const cell_y = (y)*(cell_size)+gap*2;

            ctx.fillRect(cell_x, cell_y, size, size);            
        }
        
        ctx.fillStyle = selected_cell_color;
        for (const point of selectedCells) {
            const {x, y} = point;

            const cell_x = (x)*(size+gap*4)+gap*3;
            const cell_y = (y)*(size+gap*4)+gap*3;

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

    private applyTransforms(config: CanvasConfig){
        const ctx = this.canvasContext;
        const {board} = config;
        const {offset_x, offset_y, zoom} = board;
        
        const newZoom = zoom/100;

        const currentTransform = ctx.getTransform();
        const zoomChanged = currentTransform.a !== newZoom;
        const offsetChanged = currentTransform.e !== offset_x || currentTransform.f !== offset_y;

        // Only transform if config changed
        if(zoomChanged || offsetChanged){
            ctx.reset();
            // ctx.scale(newZoom, newZoom); Deprecated
            ctx.translate(offset_x, offset_y);            
        }

        let startOffset = 0.5;
        ctx.translate(startOffset, startOffset);
    }
}