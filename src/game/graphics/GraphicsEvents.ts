import { Point } from '../structures/CartesianPlane.js';
import {EventTypes, onCellBorn, onCellKill, onCellToggle} from './EventTypes.js';

export class GraphicsEvents {

    private events : {
        onCellBorn: Function[],
        onCellKill: Function[],
        onCellToggle: Function[]
    }

    constructor(){
        this.events = {
            onCellBorn: [],
            onCellKill: [],
            onCellToggle: []
        }
    }
    public on(event: onCellBorn | onCellKill | onCellToggle){
        this.events[event.type].push(event.callback);
    }

    private emit(event: EventTypes, payload: any){
        this.events[event].forEach(callback => callback(payload));
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
}