import { GameBoard } from "./core/GameBoard.js";
import { GameEngine } from "./core/GameEngine.js";
import { GraphicsController } from "./graphics/GraphicsController.js";
import { Point } from "./structures/CartesianPlane.js";

interface EvolutionState {
    isEvolving: boolean;
    intervalID: number;
    config: {
        onNextGeneration: (board: GameBoard) => void,
        delay: number
    }
}

export class GameOfLife<GraphicsType extends GraphicsController> {

    private gameBoard: GameBoard;
    private engine: GameEngine;
    public readonly graphics: GraphicsType;

    private evolution: EvolutionState = {
        isEvolving: false,
        intervalID: -1,
        config: {
            onNextGeneration: (board: GameBoard) => {},
            delay: 500
        }
    }

    constructor(graphics: GraphicsType){
        this.gameBoard = new GameBoard();
        this.engine = new GameEngine();
        this.graphics = graphics;
        this.initEvents();
    }
    
    public bornCell({x, y}: Point){
        this.pauseEvolution();
        this.gameBoard.setCell(x, y, true);
        this.updateGraphics();
    }

    public killCell({x, y}: Point){
        this.pauseEvolution();
        this.gameBoard.setCell(x, y, false);
        this.updateGraphics();
    }

    public toggleCell({x, y}: Point){
        this.pauseEvolution();
        this.gameBoard.setCell(x, y, !this.gameBoard.getCell(x, y));
        this.updateGraphics();
    }

    public exterminateCells(){
        this.gameBoard.resetCells();
    }

    
    public getCells(){
        return this.gameBoard.getCells();
    }

    public setConfig(options: {
        onNextGeneration?: (board: GameBoard) => void,
        delay?: number
    }){
        const { onNextGeneration, delay } = options;
        const { config } = this.evolution;
        
        config.onNextGeneration = onNextGeneration || config.onNextGeneration;
        config.delay = delay || config.delay;
    }

    public startEvolution(){
        const { isEvolving, config } = this.evolution;
        const { onNextGeneration, delay } = config;
        
        if(isEvolving){
            this.pauseEvolution();
        }
        
        onNextGeneration(this.gameBoard);
        this.updateGraphics();

        const intervalID = window.setInterval(() => {   
            this.evolveGeneration();
            onNextGeneration(this.gameBoard);
        }, delay);

        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;

    }

    public pauseEvolution(){
        const { isEvolving, intervalID } = this.evolution;
         
        if(isEvolving && intervalID !== -1){
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
        }
    }

    public resumeEvolution(){
        const { isEvolving, config } = this.evolution;
        
        if(!isEvolving){
            const { delay, onNextGeneration } = config;
            
            this.evolveGeneration();
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
        this.gameBoard = newGeneration;
        this.updateGraphics();
    }

    private updateGraphics(){
        this.graphics.setCells(this.gameBoard.getCells());
    }

    private initEvents(){
        const {events} = this.graphics;

        events.on({
            type:"onCellBorn",
            callback: (point: Point) => {
                this.bornCell(point);
            }
        });

        events.on({
            type:"onCellKill",
            callback: (point: Point) => {
                this.killCell(point);
            }
        });

        events.on({
            type:"onCellToggle",
            callback: (point: Point) => {
                console.log(point);
                this.toggleCell(point);
                // this.gameBoard.toggleCell(point);
            }
        })
    }
}
