import { GameBoard } from "../../core/GameBoard.js";
import { Point } from "../../structures/CartesianPlane.js";
import { GraphicsController } from "../GraphicsController.js";
import { CanvasPainter, CanvasPainterComponent } from "./CanvasPainter.js";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config.js";
import { CanvasPlugin } from "./decorators/CanvasDecoratorBase.js";
import { Cells } from "./decorators/Cells.js";
import { Draggable } from "./decorators/Draggable.js";

export class CanvasController extends GraphicsController {

    private painter: CanvasPainter;

    protected canvas: HTMLCanvasElement;
    protected canvasContext: CanvasRenderingContext2D;
    protected config: CanvasConfig;

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();

        if (!this.canvas || !this.canvas.getContext("2d"))
            throw new Error("Canvas cannot be null");

        this.config = defaultCanvasConfig;
        
        this.painter = new CanvasPainterComponent(canvas, this.canvasContext);
    }

    protected render(){
        // this.applyTransforms();
        this.painter.paint(this.config, this.aliveCells);
    }



    // private applyTransforms(){
    //     const ctx = this.canvasContext;
    //     const {board} = this.config;
    //     const {offset_x, offset_y, zoom} = board;
        
    //     const newZoom = zoom/100;

    //     const currentTransform = ctx.getTransform();
    //     const zoomChanged = currentTransform.a !== newZoom;
    //     const offsetChanged = currentTransform.e !== offset_x || currentTransform.f !== offset_y;

    //     // Only transform if config changed
    //     if(zoomChanged || offsetChanged){
    //         ctx.reset();
    //         ctx.scale(newZoom, newZoom);
    //         ctx.translate(offset_x, offset_y);
    //     }
    // }

    // private initPlugins(){
    //     const {canvas, config} = this;
        
    //     // Draggable and Zoomable canvas
    //     const draggable = new Draggable(canvas, config);

    //     draggable.onDrag((offset_x, offset_y) => {
    //         // console.log(this.config.board);
            
    //         this.setConfig({
    //             board: {
    //                 offset_x,
    //                 offset_y
    //             }
    //         });
    //         window.requestAnimationFrame(() => this.render());
    //     });

    //     draggable.onZoom((zoom) => {
    //         const {board} = this.config;

    //         let newZoom = board.zoom-(zoom*board.zoom/20);
    //         newZoom = Math.min(newZoom, 200);
    //         newZoom = Math.max(newZoom, 50);
    //         newZoom = Math.round(newZoom);

    //         this.setConfig({
    //             board:{
    //                 zoom: newZoom,
    //             }
    //         });

    //         window.requestAnimationFrame(() => this.render());
    //     });

    //     // Cells born and died
    //     const cells = new Cells(canvas, config);
        
    //     cells.onCellHover(({x,y}) => {
    //         this.aliveCells = [...this.aliveCells, {x,y, type: "alive"}];
    //         this.render();
    //     })

    //     this.plugins.push(draggable);
    //     // this.plugins.push(cells);
    //     this.plugins.forEach(plugin => plugin.init());
    // }

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