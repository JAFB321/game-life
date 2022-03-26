import { GameBoard } from "./GameBoard.js";

export class GameEngine {

    public nextGeneration(board: GameBoard){
        const newGameboard = new GameBoard();

        // performance.mark("start-script")
        const newLimits = {
            x: {...board.limits.x},
            y: {...board.limits.y}
        };
        newLimits.x.min-= 2;
        newLimits.x.max+= 2;
        newLimits.y.min-= 2;
        newLimits.y.max+= 2;

        for(let x_pos = newLimits.x.min; x_pos < newLimits.x.max; x_pos++){
            for(let y_pos = newLimits.y.min; y_pos < newLimits.y.max; y_pos++){
                
                // Current cell
                const isAlive = board.getCell({x: x_pos, y: y_pos});

                // New Cell
                let newCell = false;

                // Count alive silbings
                let aliveSilbings = 0;
                aliveSilbings += board.getCell({x: x_pos,   y: y_pos+1}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos+1, y: y_pos+1}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos+1, y: y_pos}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos+1, y: y_pos-1}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos,   y: y_pos-1}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos-1, y: y_pos-1}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos-1, y: y_pos}) ? 1 : 0;
                aliveSilbings += board.getCell({x: x_pos-1, y: y_pos+1}) ? 1 : 0;

                // Cell live rules
                if(isAlive){
                    if(aliveSilbings < 2) {
                        newCell = false;
                    }
                    else if(aliveSilbings <= 3) {
                        newCell = true;
                    }
                    else {
                        newCell = false;
                    }
                }
                else {
                    if(aliveSilbings === 3) {
                        newCell = true;
                    }
                    else {
                        newCell = false;
                    }
                }
            
                if(newCell){
                    newGameboard.setCell({x: x_pos, y: y_pos}, true);
                }
            }
        }

        // performance.mark("end-script")
        // console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);

        return newGameboard;
    }
}