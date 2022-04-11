import { CanvasConfig, CanvasConfigParams } from "../config";

export class CanvasPlugin {

    protected readonly canvas: HTMLCanvasElement;
    protected readonly getConfig: () => CanvasConfig;
    protected readonly setConfig: (config: CanvasConfigParams) => any;
    
    constructor(canvas: HTMLCanvasElement, getConfig: () => CanvasConfig, setConfig: (config: CanvasConfigParams) => any) {
        this.canvas = canvas;
        this.getConfig = getConfig;
        this.setConfig = setConfig;
    }
    
}