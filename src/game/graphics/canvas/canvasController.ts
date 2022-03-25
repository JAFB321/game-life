import { GameBoard } from "../../core/GameBoard.js";
import { GraphicsController } from "../GraphicsController.js";

export class CanvasController extends GraphicsController {

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement){
        super();
        this.canvas = canvas;
        this.canvasContext = canvas?.getContext("2d");

        if(!this.canvas || !this.canvasContext)
          throw new Error("Canvas cannot be null");
    }

    public render(board: GameBoard){
        
    }

    private renderGrid(){

    }

    private renderCells(){

    }
}