import { GameBoard } from "../../core/GameBoard";
import { Point } from "../../structures/CartesianPlane";
import { GraphicsController } from "../GraphicsController";
import { CanvasPainter } from "./CanvasPainter";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config";
import { CanvasPlugin } from "./plugins/CanvasPlugin";
import { SelectedCells } from "./plugins/SelectedCells";
import { Draggable } from "./plugins/Draggable";

export class CanvasController extends GraphicsController {

    private painter: CanvasPainter;
    private plugins: CanvasPlugin[];

    protected listeners: {
        onConfigChange: ((config: CanvasConfig) => any)[]
    }

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
        this.listeners = {
            onConfigChange: []
        }
        
        this.painter = new CanvasPainter(canvas, this.canvasContext);
        this.plugins = [];

        this.initPlugins();
        this.configDOMCanvas();
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

    private configDOMCanvas(){
        this.canvas.style.width = `${this.config.board.width}px`;
        this.canvas.style.height = `${this.config.board.height}px`;
        this.canvas.style.overflow = 'hidden';
        this.canvas.style.backgroundColor = this.config.colors.background;
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
        window.requestAnimationFrame(() => {
            this.render();
            this.configDOMCanvas();
            setTimeout(() => {
                this.listeners.onConfigChange.forEach(listener => listener(this.getConfig()));
            }, 1);
        });
    }

    public onConfigChange(listener: (config: CanvasConfig) => any){
        this.listeners.onConfigChange.push(listener);
    }
}

declare global {
    interface CanvasRenderingContext2D { 
        reset(): void;
    }
}