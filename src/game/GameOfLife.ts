import { GameBoard } from "./core/GameBoard.js";
import { GameEngine } from "./core/GameEngine.js";
import { GraphicsController } from "./graphics/GraphicsController.js";
import { Point } from "./structures/CartesianPlane.js";

interface EvolutionState {
    isEvolving: boolean;
    intervalID: number;
    config: {
        onNextGeneration: (board: Point[]) => any,
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
            onNextGeneration: (board: Point[]) => {},
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
        this.stopEvolution();
        this.gameBoard.setCell(x, y, true);
        this.updateGraphics();
    }

    public bornCells(points: Point[]){
        this.stopEvolution();
        points.forEach(point => this.gameBoard.setCell(point.x, point.y, true));
        this.updateGraphics();
    }

    public killCell({x, y}: Point){
        this.stopEvolution();
        this.gameBoard.setCell(x, y, false);
        this.updateGraphics();
    }

    public toggleCell({x, y}: Point){
        this.stopEvolution();
        this.gameBoard.setCell(x, y, !this.gameBoard.getCell(x, y));
        this.updateGraphics();
    }

    public exterminateCells(){
        this.stopEvolution();
        this.gameBoard.resetCells();
        this.updateGraphics();
    }

    
    public getCells(){
        return this.gameBoard.getCells();
    }

    public setConfig(options: {
        onNextGeneration?: (board: Point[]) => void,
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
        
        if(isEvolving) return;
        
        
        onNextGeneration(this.gameBoard.getCells());
        this.updateGraphics();

        const intervalID = window.setInterval(() => {   
            this.evolveGeneration();
            onNextGeneration(this.gameBoard.getCells());
        }, delay);

        this.evolution.isEvolving = true;
        this.evolution.intervalID = intervalID;

    }

    public stopEvolution(){
        const { isEvolving, intervalID } = this.evolution;
         
        if(isEvolving && intervalID !== -1){
            clearInterval(intervalID);
            this.evolution.intervalID = -1;
            this.evolution.isEvolving = false;
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
                this.toggleCell(point);
            }
        })

        events.on({
            type: "onGameStartStop",
            callback: () => {
                if(this.evolution.isEvolving) this.stopEvolution()
                else this.startEvolution()
            }
        })
    }
}
