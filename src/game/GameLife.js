import { GameBoard, Point } from "./GameBoard";

export class GameLife {
    
    gameBoard;

    constructor(){
        this.gameBoard = new GameBoard();
    }

    initGame(initialCells = [[0,0]]){
        initialCells.forEach(([x,y]) => this.gameBoard.setCell(x, y, true));
    }

    getGameboard(size = [100, 100]){
        
    }

}
