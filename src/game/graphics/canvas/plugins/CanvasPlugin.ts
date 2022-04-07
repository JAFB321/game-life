import { CanvasConfig } from "../config";

export class CanvasPlugin {
    protected canvas: HTMLCanvasElement;
    protected readonly canvasConfig: CanvasConfig; 

    constructor(canvas: HTMLCanvasElement, canvasConfig: CanvasConfig) {
        this.canvas = canvas;
        this.canvasConfig = canvasConfig;
    }
    public init(){}
    public dispose(){}
}