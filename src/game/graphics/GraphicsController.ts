import { GameBoard } from "../core/GameBoard.js";
import { Point } from "../structures/CartesianPlane.js";
import { GraphicsEvents } from "./GraphicsEvents.js";

export class GraphicsController{

    protected aliveCells: Point[];
    public events: GraphicsEvents;

    constructor(){
        this.events = new GraphicsEvents();
        this.aliveCells = [];
    }

    public setCells(cells: Point[]): void{
        this.aliveCells = cells;
        this.render();
    };

    protected render(): void{
        console.log('render');
    }
}