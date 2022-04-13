import { GameBoard } from "../../core/GameBoard.js";
import { Point } from "../../structures/CartesianPlane.js";
import { GraphicsController } from "../GraphicsController.js";
import { CanvasPainter } from "./CanvasPainter.js";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config.js";
import { CanvasPlugin } from "./plugins/CanvasPlugin.js";
import { SelectedCells } from "./plugins/SelectedCells.js";
import { Draggable } from "./plugins/Draggable.js";

export class CanvasController extends GraphicsController {

    private painter: CanvasPainter;
    private plugins: CanvasPlugin[];

    protected canvas: HTMLCanvasElement;
    protected canvasContext: CanvasRenderingContext2D;
    protected config: CanvasConfig;

    protected selectedCells: Point[] = [];

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas.getContext("2d") || new CanvasRenderingContext2D();

        if (!this.canvas || !this.canvas.getContext("2d"))
            throw new Error("Canvas cannot be null");

        this.config = defaultCanvasConfig;
        
        this.painter = new CanvasPainter(canvas, this.canvasContext);
        this.plugins = [];

        this.initPlugins();
    }

    protected render(){
        this.painter.paint(this.config, this.aliveCells, this.selectedCells);
    }

    private initPlugins(){

        const draggable = new Draggable(
            this.canvas,
            () => this.getConfig(),
            (config) => this.setConfig(config)
        );

        const selectedCells = new SelectedCells(
            this.canvas,
            () => this.getConfig(),
            (config) => this.setConfig(config),
            () => this.selectedCells,
            (selectedCells) => this.setSelectedCells(selectedCells)
        );

        selectedCells.onCellClicked(point => {
            this.events.emitCellToggle(point);
        });

        this.plugins = [
            draggable,
            selectedCells
        ]
    }

    protected setSelectedCells(selectedCells: Point[]){
        this.selectedCells = selectedCells;
        this.render();
    }

    public getConfig(): CanvasConfig {
        const {board, cells, colors, grid} = this.config;
        return {
            board: {
                ...board
            },
            cells: {
                ...cells
            },
            colors: {
                ...colors
            },
            grid: {
                ...grid
            },
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
        window.requestAnimationFrame(() => this.render());
    }
}

declare global {
    interface CanvasRenderingContext2D { 
        reset(): void;
    }
}