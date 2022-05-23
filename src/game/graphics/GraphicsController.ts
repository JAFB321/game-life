import { GameBoard } from "../core/GameBoard";
import { Point } from "../structures/CartesianPlane";
import { GraphicsEvents } from "./GraphicsEvents";

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