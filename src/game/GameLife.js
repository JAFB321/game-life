import { GameBoard, Point, Rectangle } from "./GameBoard";

export class GameLife {
    
    gameBoard;

    constructor(){
        this.gameBoard = new GameBoard();
    }

    initGame(initialCells = [new Point(0, 0)]){
        initialCells.forEach(({x, y}) => this.gameBoard.setCell(x, y));
    }



}
