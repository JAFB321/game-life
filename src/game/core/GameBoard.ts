import { CartesianPlane, Point } from "../structures/CartesianPlane.js";

export class GameBoard {

    private board: Map<string, Point>;

	constructor() {
        this.board = new Map();
    }

    // Deprecated
    public get limits(){
        return {}
    }

	public setCell({x,y}: Point, alive = true) {
        if(alive) this.board.set(`${x}:${y}`, {x, y});
        else this.board.delete(`${x}:${y}`);
	}

    public getCell({x,y}: Point){
        return this.board.has(`${x}:${y}`);
    }

    public getCells(){
        return Array.from(this.board.values());
    }

    resetCells(){
        this.board.clear();
    }

    private updateLimits(x: number, y: number){
        // const {min: x_min, max: x_max} = this._limits.x;
        // const {min: y_min, max: y_max} = this._limits.y;
        
        // if(x < x_min) this._limits.x.min = x;
        // if(x > x_max) this._limits.x.max = x;
        // if(y < y_min) this._limits.y.min = y;
        // if(y > y_max) this._limits.y.max = y;
    }
    
    private resetLimits(){
        // this._limits.x.min = 0;
        // this._limits.x.max = 0;
        // this._limits.y.min = 0;
        // this._limits.y.max = 0;
    }

}