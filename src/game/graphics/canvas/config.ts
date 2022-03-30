export interface CanvasConfig {
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
        zoom: number,
    },
    colors: {
        background: string,
        cell: string,
        grid: string
    }
}

export interface CanvasConfigParams{
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
        zoom?: number,
    },
    colors?: {
        background?: string,
        cell?: string,
        grid?: string
    }
}