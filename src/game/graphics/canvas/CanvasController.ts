import { GameBoard } from "../../core/GameBoard.js";
import { Point } from "../../structures/CartesianPlane.js";
import { GraphicsController } from "../GraphicsController.js";
import { CanvasPainter } from "./CanvasPainter.js";
import { CanvasConfig, CanvasConfigParams, defaultCanvasConfig } from "./config.js";
import { CanvasPlugin } from "./plugins/CanvasPlugin.js";
import { SelectedCells } from "./plugins/SelectedCells.js";
import { Draggable } from "./plugins/Draggable.js";
import { KeyControl } from "./plugins/KeyControl.js";

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
        
        const keyControls = new KeyControl(
            this.canvas,
            () => this.getConfig(),
            (config) => this.setConfig(config),
        )

        keyControls.onGameStartStop(() => {
            this.events.emitGameStartStop();
        })

        keyControls.onSpeedUp((factor) => {
            this.events.emitSpeedUp(factor);
        })

        keyControls.onSpeedDowm((factor) => {
            this.events.emitSpeedDown(factor);
        })

        this.plugins = [
            draggable,
            selectedCells,
            keyControls
        ]
    }

    private configDOMCanvas(){
        const {height, width} = this.config.board;
        const {width: canvasWidth, height: canvasHeight} = this.canvas;

        this.canvas.style.width = `${this.config.board.width}px`;
        this.canvas.style.height = `${this.config.board.height}px`;
        if(width !== canvasWidth) this.canvas.width = this.config.board.width;
        if(height !== canvasHeight) this.canvas.height = this.config.board.height;
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