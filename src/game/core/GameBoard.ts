import { CartesianPlane, Point } from "../structures/CartesianPlane";

interface BoardLimits {
    x: {
        min: number,
        max: number
    }

    y: {
        min: number,
        max: number
    }
}

export class GameBoard {

    private board: CartesianPlane<boolean>;

    // Min and max current values in the board
    private limits: BoardLimits;

	constructor() {
        this.board = new CartesianPlane(false);

        this.limits = {
            x:{
                max: 0,
                min: 0
            },
            y: {
                max: 0,
                min: 0
            }
        }
    }

	public setCell({x,y}: Point, alive = true) {
        this.updateLimits(x, y);
		this.board.setPoint({x, y}, alive);
	}

    public getCell(point: Point){
        return this.board.getPoint(point);
    }

    public getBoard(){
        const board = new CartesianPlane(false);

        for(let x = this.limits.x.min; x < this.limits.x.max; x++){
            for(let y = this.limits.y.min; y < this.limits.y.min; y++){
                const isAlive = this.board.getPoint({x, y});
                if(!!isAlive) board.setPoint({x, y}, true);
            }
        }

        return{
            board
        }
    }

    resetCells(){
        this.board.resetPlane();
        this.resetLimits();
    }

    nextGeneration(){
        const newGeneration = this.getNextGeneration();
        return this.board = newGeneration;
    }

    private getNextGeneration(){
        performance.mark("start-script")
        const newLimits = {
            x: {...this.limits.x},
            y: {...this.limits.y}
        };
        newLimits.x.min-= 2;
        newLimits.x.max+= 2;
        newLimits.y.min-= 2;
        newLimits.y.max+= 2;
        this.resetLimits();
        
        const newPlane = new CartesianPlane(false);

        for(let x_pos = newLimits.x.min; x_pos < newLimits.x.max; x_pos++){
            for(let y_pos = newLimits.y.min; y_pos < newLimits.y.max; y_pos++){
                
                // Current cell
                const isAlive = this.board.getPoint({x: x_pos, y: y_pos});

                // New Cell
                let newCell = false;

                // Count alive silbings
                let aliveSilbings = 0;
                aliveSilbings += this.board.getPoint({x: x_pos,   y: y_pos+1}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos+1, y: y_pos+1}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos+1, y: y_pos}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos+1, y: y_pos-1}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos,   y: y_pos-1}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos-1, y: y_pos-1}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos-1, y: y_pos}) ? 1 : 0;
                aliveSilbings += this.board.getPoint({x: x_pos-1, y: y_pos+1}) ? 1 : 0;

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
                    newPlane.setPoint({x: x_pos, y: y_pos}, true);
                    this.updateLimits(x_pos, y_pos);
                }
            }
        }

        performance.mark("end-script")
        console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);

        return newPlane;
    }

    private updateLimits(x: number, y: number){
        const {min: x_min, max: x_max} = this.limits.x;
        const {min: y_min, max: y_max} = this.limits.y;
        
        if(x < x_min) this.limits.x.min = x;
        if(x > x_max) this.limits.x.max = x;
        if(y < y_min) this.limits.y.min = y;
        if(y > y_max) this.limits.y.max = y;
    }
    
    private resetLimits(){
        this.limits.x.min = 0;
        this.limits.x.max = 0;
        this.limits.y.min = 0;
        this.limits.y.max = 0;
    }

}