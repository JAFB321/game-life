import { GameBoard, CartesianPlane, Rectangle } from "./GameBoard";

export class GameLife {

    gameBoard;

    constructor(){
        this.gameBoard = new GameBoard();
    }
    
    bornCell(x, y){
        this.gameBoard.setCell(x, y, true);
    }

    killCell(x, y){
        this.gameBoard.setCell(x, y, false);
    }

    getBoard(size = new Rectangle(-100, -100, 100, 100)){
        return this.gameBoard.getBoard(size);
    }

    initGame(options = {
         onNextGeneration: (board, size) => {},
         timeInterval: 1000,
         
        }){
        
    }



}
