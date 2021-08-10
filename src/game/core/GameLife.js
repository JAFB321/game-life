import { GameBoard } from "./GameBoard.js";
import { CartesianPlane, Rectangle } from "./structures/CartesianPlane.js";

export class GameLife {

    gameBoard;

    _evolution = {
        isEvolving: false,
        intervalID: -1,
        config: {
            onNextGeneration: (size = new Rectangle(0,0,100,100), board = new CartesianPlane(false)) => {},
            delayDuration: 200,
            size: new Rectangle(0,0,100,100)
        }
    }

    constructor(){
        this.gameBoard = new GameBoard();
    }
    
    bornCell(x, y){
        this.gameBoard.setCell(x, y, true);
    }

    killCell(x, y){
        this.gameBoard.setCell(x, y, false);
    }

    exterminateCells(){
        this.gameBoard.resetCells();
    }

    getBoard(size = new Rectangle(-100, -100, 100, 100)){
        return this.gameBoard.getBoard(size);
    }

    startEvolution(options = {
        onNextGeneration: (size = new Rectangle(0,0,100,100), board = new CartesianPlane(false)) => {},
        delayDuration: 200,
        size: new Rectangle(0,0,100,100)
    }){
        const { onNextGeneration, delayDuration, size } = options;
        const { isEvolving } = this._evolution;
        
        if(isEvolving){
            this.pauseEvolution();
        }
        
        const intervalID = setInterval(() => {
            this.gameBoard.nextGeneration();
            const { board } = this.gameBoard.getBoard(size);

            onNextGeneration(size, board);
        }, delayDuration);

        this._evolution.isEvolving = true;
        this._evolution.intervalID = intervalID;


    }

    pauseEvolution(){
        const { isEvolving, intervalID } = this._evolution;
         
        if(isEvolving && intervalID !== -1){
            clearInterval(intervalID);
            this._evolution.intervalID = -1;
            this._evolution.isEvolving = false;
        }
    }

    resumeEvolution(){
        const { isEvolving, config } = this._evolution;
        
        if(!isEvolving){
            const { delayDuration, onNextGeneration, size } = config;
            
            const intervalID = setInterval(() => {
                this.gameBoard.nextGeneration();
                const { board } = this.gameBoard.getBoard(size);

                onNextGeneration(size, board);
            }, delayDuration);

            this._evolution.isEvolving = true;
            this._evolution.intervalID = intervalID;
        }
    }



}
