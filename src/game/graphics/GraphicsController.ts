import { GameBoard } from "../core/GameBoard.js";
import { Point } from "../structures/CartesianPlane.js";
import { GraphicsEvents } from "./GraphicsEvents.js";

export interface GraphicsConfig {
    cells: {
        size: number,
    },
    grid: {
        lineWidth: number,
        offset: number,
    }
    board: {
        height: number,
        width: number,
        offset_x: number,
        offset_y: number,
    },
    colors: {
        background: string,
        cell: string,
        grid: string
    }
}

export interface GraphicsConfigParams{
    cells?: {
        size?: number,
    },
    grid?: {
        lineWidth?: number,
        offset?: number,
    }
    board?: {
        height?: number,
        width?: number,
        offset_x?: number,
        offset_y?: number,
    },
    colors?: {
        background?: string,
        cell?: string,
        grid?: string
    }
}

export class GraphicsController{

    protected config: GraphicsConfig;
    protected aliveCells: Point[];
    public events: GraphicsEvents;

    constructor(){
        this.config = {
            cells: {
                size: 50,
            },
            grid: {
                lineWidth: 0.8,
                offset: 0.5,
            },
            board: {
                height: 900,
                width: 1900,
                offset_x: 0,
                offset_y: 0,
            },
            colors: {
                background: '#22272e',
                cell: '#ffffff',
                grid: '#626567'
            }
        }
        this.events = new GraphicsEvents();
        this.aliveCells = [];
    }

    public setConfig({board, cells, colors, grid}: GraphicsConfigParams){
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

    public setCells(cells: Point[]): void{
        this.aliveCells = cells;
        this.render();
    };

    public render(): void{
        console.log('render');
    }
}