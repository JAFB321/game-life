export class Point{
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

export class Rectangle{
    point1;
    point2;

    constructor(x1, y1, x2, y2){
        this.point1 = new Point(x1, y1);
        this.point2 = new Point(x2, y2);
    }
}

export class CartesianPlane {

    // Cartesian Plane quadrants
    quadrant1 = []; // x+ y+
    quadrant2 = []; // x- y+
    quadrant3 = []; // x- y-
    quadrant4 = []; // x+ y-

    // Default point value
    defaultValue = false;

    constructor(defaultValue = false){
        this.defaultValue = defaultValue;
    }

    setPoint(x, y, value) {
        if (x >= 0 && y >= 0) {
            this._verifyRow(x, this.quadrant1);
            this.quadrant1[x][y] = value;

        } else if (x < 0 && y >= 0) {
            this._verifyRow(x*-1, this.quadrant2);
            this.quadrant2[x*-1][y] = value;

        } else if (x < 0 && y < 0) {
            this._verifyRow(x*-1, this.quadrant3);
            this.quadrant3[x*-1][y*-1] = value;

        } else {
            this._verifyRow(x, this.quadrant4);
            this.quadrant4[x][y*-1] = value;
        }
    }

    getPoint(x, y){

        if (x >= 0 && y >= 0) {
            if(!this.quadrant1[x]) return this.defaultValue;
			return this.quadrant1[x][y] || this.defaultValue;

		} else if (x < 0 && y >= 0) {
            if(!this.quadrant2[x*-1]) return this.defaultValue;
			return this.quadrant2[x*-1][y] || this.defaultValue;

		} else if (x < 0 && y < 0) {
            if(!this.quadrant3[x*-1]) return this.defaultValue;
			return this.quadrant3[x*-1][y*-1] || this.defaultValue;

		} else {
            if(!this.quadrant4[x]) return this.defaultValue;
			return this.quadrant4[x][y*-1] || this.defaultValue;
		}
    }

    resetPlane(){
        this.quadrant1 = [];
        this.quadrant2 = [];
        this.quadrant3 = [];
        this.quadrant4 = [];
    }

    _verifyRow(x, quadrant){
        if(!quadrant[x]) quadrant[x] = [];
    }
}

export class GameBoard {

    // Gameboard
    board;

    // Min and max current values in the board
    limits = {
        x:{
            min: 0,
            max: 0
        },
        y:{
            min: 0,
            max: 0
        }
    }

	constructor() {
        this.board = new CartesianPlane(false);
    } 

	setCell(x, y, alive = true) {
        this._updateLimits(x, y);
		this.board.setPoint(x, y, alive);
	}

    getCell(x, y){
        return this.board.getPoint(x, y);
    }

    getBoard(size = new Rectangle(-100, -100, 100, 100)){
        const board = new CartesianPlane(false);

        for(let x_pos = size.point1.x; x_pos < size.point2.x; x_pos++){
            for(let y_pos = size.point1.y; y_pos < size.point2.y; y_pos++){
                const isAlive = this.board.getPoint(x_pos, y_pos);
                if(!!isAlive) board.setPoint(x_pos, y_pos, true);
            }
        }

        return{
            board,
            size: size
        }
    }

    resetCells(){
        this.board.resetPlane();
        this._resetLimits();
    }

    nextGeneration(){
        const newGeneration = this._getNextGeneration();
        this.board = newGeneration;
    }

    _getNextGeneration(){
        performance.mark("start-script")
        const newLimits = {
            x: {...this.limits.x},
            y: {...this.limits.y}
        };
        // newLimits.x.min--;
        // newLimits.x.max++;
        // newLimits.y.min--;
        // newLimits.y.max++;
        newLimits.x.min-= 2;
        newLimits.x.max+= 2;
        newLimits.y.min-= 2;
        newLimits.y.max+= 2;
        this._resetLimits();
        
        const newPlane = new CartesianPlane(false);

        for(let x_pos = newLimits.x.min; x_pos < newLimits.x.max; x_pos++){
            for(let y_pos = newLimits.y.min; y_pos < newLimits.y.max; y_pos++){
                
                // Current cell
                const isAlive = this.board.getPoint(x_pos, y_pos);

                // New Cell
                let newCell = false;

                // Count alive silbings
                let aliveSilbings = 0;
                aliveSilbings += this.board.getPoint(x_pos, y_pos+1);
                aliveSilbings += this.board.getPoint(x_pos+1, y_pos+1);
                aliveSilbings += this.board.getPoint(x_pos+1, y_pos)
                aliveSilbings += this.board.getPoint(x_pos+1, y_pos-1);
                aliveSilbings += this.board.getPoint(x_pos, y_pos-1);
                aliveSilbings += this.board.getPoint(x_pos-1, y_pos-1);
                aliveSilbings += this.board.getPoint(x_pos-1, y_pos);
                aliveSilbings += this.board.getPoint(x_pos-1, y_pos+1)

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
                    newPlane.setPoint(x_pos, y_pos, true);
                    this._updateLimits(x_pos, y_pos);
                }
            }
        }

        performance.mark("end-script")
        console.log(performance.measure("total-script-execution-time", "start-script", "end-script").duration / 1000);

        return newPlane;
    }

    _updateLimits(x, y){
        const {min: x_min, max: x_max} = this.limits.x;
        const {min: y_min, max: y_max} = this.limits.y;
        
        if(x < x_min) this.limits.x.min = x;
        if(x > x_max) this.limits.x.max = x;
        if(y < y_min) this.limits.y.min = y;
        if(y > y_max) this.limits.y.max = y;
    }
    
    _resetLimits(){
        this.limits.x.min = 0;
        this.limits.x.max = 0;
        this.limits.y.min = 0;
        this.limits.y.max = 0;
    }

}