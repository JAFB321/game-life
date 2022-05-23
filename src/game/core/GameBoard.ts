import { Point } from "../structures/CartesianPlane";

export class GameBoard {

    private board: Map<string, Point>;

	constructor() {
        this.board = new Map();
    }

	public setCell(x: number, y: number, alive = true) {
        if(alive) this.board.set(`${x}:${y}`, {x, y});
        else this.board.delete(`${x}:${y}`);
	}

    public getCell(x: number, y: number){
        return this.board.has(`${x}:${y}`);
    }

    public getCells(){
        return Array.from(this.board.values());
    }

    resetCells(){
        this.board.clear();
    }
}