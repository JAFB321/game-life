import { CartesianPlane, Point } from "../structures/CartesianPlane.js";

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
    private _limits: BoardLimits;

	constructor() {
        this.board = new CartesianPlane(false);

        this._limits = {
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

    public get limits(){
        return this._limits;
    }

	public setCell({x,y}: Point, alive = true) {
        this.updateLimits(x, y);
		this.board.setPoint({x, y}, alive);
	}

    public getCell(point: Point){
        return this.board.getPoint(point);
    }
    /**
     * Deprecated
     */
    public getBoard(){
        const board = new CartesianPlane(false);

        for(let x = this._limits.x.min; x < this._limits.x.max+1; x++){
            for(let y = this._limits.y.min; y < this._limits.y.max+1; y++){
                const isAlive = this.board.getPoint({x, y});
                if(!!isAlive) {
                    board.setPoint({x, y}, true);
                }
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

    private updateLimits(x: number, y: number){
        const {min: x_min, max: x_max} = this._limits.x;
        const {min: y_min, max: y_max} = this._limits.y;
        
        if(x < x_min) this._limits.x.min = x;
        if(x > x_max) this._limits.x.max = x;
        if(y < y_min) this._limits.y.min = y;
        if(y > y_max) this._limits.y.max = y;
    }
    
    private resetLimits(){
        this._limits.x.min = 0;
        this._limits.x.max = 0;
        this._limits.y.min = 0;
        this._limits.y.max = 0;
    }

}