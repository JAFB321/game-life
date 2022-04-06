import { GameBoard } from "../../core/GameBoard.js";
import { GraphicsController } from "../GraphicsController.js";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config.js";
import { DraggableCanvas } from "./DraggableCanvas.js";

export class CanvasController extends GraphicsController {

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private draggable: DraggableCanvas;
    protected config: CanvasConfig;

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();

        if(!this.canvas || !this.canvas.getContext("2d"))
          throw new Error("Canvas cannot be null");

        this.config = defaultCanvasConfig;
        this.draggable = new DraggableCanvas(this.canvas);

        this.initDrag();
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
        const {width, height, offset_x, offset_y} = board;
        const {lineWidth, gap} = grid;
        const {grid: gridColor} = colors;
        
        // Grid
        ctx.moveTo(gap,gap);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gridColor;

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

    private drawGrid(gap: number, ){
        
    }

    private renderCells(){
        const ctx = this.canvasContext;
        const {cells, colors, grid, board} = this.config;
        const {offset_x, offset_y} = board;
        const {gap} = grid;
        const {size} = cells;
        const {cell: color} = colors;

        const {aliveCells} = this;

        for (const point of aliveCells) {
            const {x, y} = point;

            const cell_x = (x)*(size+gap*4)+gap*3;
            const cell_y = (y)*(size+gap*4)+gap*3;

            ctx.fillStyle = color;
            ctx.fillRect(cell_x, cell_y, size, size);            
        }
            
    }

    private renderBackground(){
        const ctx = this.canvasContext;
        const {board, colors} = this.config;
        const {width, height, offset_x, offset_y} = board;
        const {background} = colors;

        ctx.fillStyle = background;
        ctx.fillRect(0-offset_x, 0-offset_y, width, height);
    }

    private applyTransforms(){
        const ctx = this.canvasContext;
        const {board} = this.config;
        const {offset_x, offset_y, zoom} = board;
        
        const currentTransform = ctx.getTransform();
        const zoomChanged = currentTransform.a !== zoom/100;
        const offsetChanged = currentTransform.e !== offset_x || currentTransform.f !== offset_y;

        // Only transform if config changed
        if(zoomChanged || offsetChanged){
            ctx.reset();
            ctx.scale(zoom/100, zoom/100);
            ctx.translate(offset_x, offset_y);
        }
    }

    private initDrag(){
        this.draggable.init((x, y) => {
            const { 
                board: {
                    offset_x,
                    offset_y
                }
            } = this.config;

            this.setConfig({
                board: {
                    offset_x: offset_x+x,
                    offset_y: offset_y+y,
                }
            });
            window.requestAnimationFrame(() => this.render());
        });
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