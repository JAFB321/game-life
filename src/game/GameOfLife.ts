import { GameBoard } from "./core/GameBoard.js";
import { GameEngine } from "./core/GameEngine.js";
import { Point } from "./structures/CartesianPlane.js";

interface EvolutionState {
    isEvolving: boolean;
    intervalID: number;
    config: {
        onNextGeneration: (board: GameBoard) => void,
        delay: number
    }
}

export class GameOfLife {

    private gameBoard: GameBoard;
    private engine: GameEngine;

    private evolution: EvolutionState = {
        isEvolving: false,
        intervalID: -1,
        config: {
            onNextGeneration: (board: GameBoard) => {},
            delay: 500
        }
    }

    constructor(){
        this.gameBoard = new GameBoard();
        this.engine = new GameEngine();
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

    setConfig(options: {
        onNextGeneration?: (board: GameBoard) => void,
        delay?: number
    }){
        const { onNextGeneration, delay } = options;
        const { config } = this.evolution;
        
        config.onNextGeneration = onNextGeneration || config.onNextGeneration;
        config.delay = delay || config.delay;
    }

    startEvolution(){
        const { isEvolving, config } = this.evolution;
        const { onNextGeneration, delay } = config;
        
        if(isEvolving){
            this.pauseEvolution();
        }
        
        onNextGeneration(this.gameBoard);

        const intervalID = window.setInterval(() => {   
            const nextGen = this.evolveGeneration();
            onNextGeneration(nextGen);
        }, delay);

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
            const { delay, onNextGeneration } = config;
            
            const intervalID = window.setInterval(() => {
                this.evolveGeneration();
                onNextGeneration(this.gameBoard);
            }, delay);
            
            this.evolution.isEvolving = true;
            this.evolution.intervalID = intervalID;
        }
    }

    private evolveGeneration(){
        const newGeneration = this.engine.nextGeneration(this.gameBoard);
        return this.gameBoard = newGeneration;
    }

}
