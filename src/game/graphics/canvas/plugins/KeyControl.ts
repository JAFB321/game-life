import { CanvasConfig, CanvasConfigParams } from "../config.js";
import { CanvasPlugin } from "./CanvasPlugin.js";


export class KeyControl extends CanvasPlugin {

    private readonly listeners: {
        onGameStartStop :(() => any)[]
    }

    constructor(canvas: HTMLCanvasElement, getConfig: () => CanvasConfig, setConfig: (config: CanvasConfigParams) => any){
        super(canvas, getConfig, setConfig);

        this.listeners = {
            onGameStartStop: []
        }
        this.init();
    }

    public onGameStartStop(callback: () => any){
        this.listeners.onGameStartStop.push(callback);
    }

    private emitGameStartStop() {
        this.listeners.onGameStartStop.forEach(callback => callback());
    }

    private init(){   
        if(!!window){
            window.addEventListener('keydown', (evt) => this.onKey(evt));
        }else{
            this.canvas.ownerDocument.addEventListener('keydown', (evt) => this.onKey(evt));
        }
    }

    private onKey(evt: KeyboardEvent){
        const {key} = evt;
        if(key === 'Enter') this.emitGameStartStop();
    }
}