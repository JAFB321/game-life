import { Point } from '../structures/CartesianPlane.js';
import {EventTypes, onCellBorn, onCellKill, onCellToggle, onGameStartStop} from './EventTypes.js';

export class GraphicsEvents {

    private listeners : {
        onCellBorn: Function[],
        onCellKill: Function[],
        onCellToggle: Function[],
        onGameStartStop: Function[]
    }

    constructor(){
        this.listeners = {
            onCellBorn: [],
            onCellKill: [],
            onCellToggle: [],
            onGameStartStop: [],
        }
    }
    public on(event: onCellBorn | onCellKill | onCellToggle | onGameStartStop){
        this.listeners[event.type].push(event.callback);
    }

    private emit(event: EventTypes, payload: any){
        this.listeners[event].forEach(callback => callback(payload));
    }
    
    public emitCellBorn(point: Point){
        this.emit("onCellBorn", point);
    }

    public emitCellKill(point: Point){
        this.emit("onCellKill", point);
    }

    public emitCellToggle(point: Point){
        this.emit("onCellToggle", point);
    }

    public onGameStartStop(){
        this.emit("onGameStartStop", null);
    }
}