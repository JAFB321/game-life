export interface CanvasConfig {
    cells: {
        size: number,
    },
    grid: {
        lineWidth: number,
        gap: number,
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
        selected_cell: string,
        grid: string
    }
}

export interface CanvasConfigParams{
    cells?: {
        size?: number,
    },
    grid?: {
        lineWidth?: number,
        gap?: number,
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
        selected_cell?: string,
        grid?: string
    }
}

export const defaultCanvasConfig: CanvasConfig = {
    cells: {
        size: 20,
    },
    grid: {
        lineWidth: 1,
        gap: 0.5,
    },
    board: {
        height: 900,
        width: 1900,
        offset_x: 0,
        offset_y: 0,
        zoom: 100,
    },
    colors: {
        background: '#222222',
        cell: '#ffffff',
        selected_cell: 'rgba(255,255,255,0.2)',
        grid: '#626567'
    }
}