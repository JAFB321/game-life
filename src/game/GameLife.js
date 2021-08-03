import { GameBoard, Point, Rectangle } from "./GameBoard";

export class GameLife {
    
    gameBoard;

    constructor(){
        this.gameBoard = new GameBoard();
    }

    initGame(initialCells = [new Point(0, 0)]){
        initialCells.forEach(({x, y}) => this.gameBoard.setCell(x, y, true));
    }

    getGameboard(size = new Rectangle(-100, 100, 100, -100)){
        for(let x_pos = size.point1.x; x_pos < size.point2.x; x_pos++){
            for(let y_pos = size.point1.y; y_pos < size.point2.y; y_pos++){
                
            }
        }
    }

}
