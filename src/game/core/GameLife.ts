import { GameBoard } from "./GameBoard";
import { CartesianPlane, Point } from "../structures/CartesianPlane";



export class GameLife {

    private gameBoard;

    private evolution = {
        isEvolving: false,
        intervalID: -1,
        config: {
            onNextGeneration: (board: CartesianPlane<boolean>) => {},
            delayDuration: 200
        }
    }

    constructor(){
        this.gameBoard = new GameBoard();
    }
    
    bornCell(point: Point){
        this.gameBoard.setCell(point, true);
    }

    killCell(point: Point){
        this.gameBoard.setCell(point, false);
    }

    exterminateCells(){
        this.gameBoard.resetCells();
    }

    getBoard(){
        return this.gameBoard.getBoard();
    }

    startEvolution(options = {
        onNextGeneration: (board: CartesianPlane<boolean>) => {},
        delayDuration: 200
    }){
        const { onNextGeneration, delayDuration } = options;
        const { isEvolving } = this.evolution;
        
        if(isEvolving){
            this.pauseEvolution();
        }
        
        const intervalID = window.setInterval(() => {
            this.gameBoard.nextGeneration();
            const { board } = this.gameBoard.getBoard();

            onNextGeneration(board);
        }, delayDuration);

        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;

    }

    pauseEvolution(){
        const { isEvolving, intervalID } = this.evolution;
         
        if(isEvolving && intervalID !== -1){
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
        }
    }

    resumeEvolution(){
        const { isEvolving, config } = this.evolution;
        
        if(!isEvolving){
            const { delayDuration, onNextGeneration } = config;
            
            const intervalID = window.setInterval(() => {
                this.gameBoard.nextGeneration();
                const { board } = this.gameBoard.getBoard();

                onNextGeneration(board);
            }, delayDuration);
            
            this.evolution.isEvolving = true;
            this.evolution.intervalID = intervalID;
        }
    }



}
