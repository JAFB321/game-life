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
        grid?: string
    }
}

export const defaultCanvasConfig: CanvasConfig = {
    cells: {
        size: 20,
    },
    grid: {
        lineWidth: 0.8,
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
        background: '#22272e',
        cell: '#ffffff',
        grid: '#626567'
    }
}