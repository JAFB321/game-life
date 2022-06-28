import { CanvasConfig, CanvasConfigParams } from "../config.js";
import { CanvasPlugin } from "./CanvasPlugin.js";


export class KeyControl extends CanvasPlugin {

    private readonly listeners: {
        onGameStartStop :(() => any)[],
        onSpeedUp :((factor: number) => any)[],
        onSpeedDown :((factor: number) => any)[],
    }

    constructor(canvas: HTMLCanvasElement, getConfig: () => CanvasConfig, setConfig: (config: CanvasConfigParams) => any){
        super(canvas, getConfig, setConfig);

        this.listeners = {
            onGameStartStop: [],
            onSpeedDown: [],
            onSpeedUp: []
        }
        this.init();
    }

    public onGameStartStop(callback: () => any){
        this.listeners.onGameStartStop.push(callback);
    }

    public onSpeedUp(callback: (factor: number) => any){
        this.listeners.onSpeedUp.push(callback);
    }

    public onSpeedDowm(callback: (factor: number) => any){
        this.listeners.onSpeedDown.push(callback);
    }

    private emitGameStartStop() {
        this.listeners.onGameStartStop.forEach(callback => callback());
    }

    private emitSpeedUp(factor: number) {
        this.listeners.onSpeedUp.forEach(callback => callback(factor));
    }

    private emitSpeedDown(factor: number) {
        this.listeners.onSpeedDown.forEach(callback => callback(factor));
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
       
        switch (key) {
            case 'Enter':
                this.emitGameStartStop();
                break;
        
            case '+':
                this.emitSpeedUp(1.2);               
                break;

            case '-':
                this.emitSpeedDown(0.8);
                break;
        }
    }
}