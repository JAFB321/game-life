import { GameBoard } from "../core/GameBoard.js";

export interface GraphicsConfig {
    cells: {
        size: number,
    },
    grid: {
        lineWidth: number,
    }
    board: {
        height: number,
        width: number,
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
    }
    board?: {
        height?: number,
        width?: number,
    },
    colors?: {
        background?: string,
        cell?: string,
        grid?: string
    }
}

export class GraphicsController{

    protected config: GraphicsConfig;

    constructor(){
        this.config = {
            cells: {
                size: 18,
            },
            grid: {
                lineWidth: 0.8,
            },
            board: {
                height: 1900,
                width: 900,
            },
            colors: {
                background: '#22272e',
                cell: '#ffffff',
                grid: '626567'
            }
        }
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

    public render(board: GameBoard): void{
        console.log(board);
    };
}