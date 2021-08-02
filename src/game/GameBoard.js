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

    constructor(point1, point2){
        this.point1 = point1
        this.point2 = point2
    }
}

export class GameBoard {

    // Cells Cartesian Plane
	quadrant1 = []; // x+ y+
	quadrant2 = []; // x- y+
	quadrant3 = []; // x- y-
	quadrant4 = []; // x+ y-

    // Default dead cell value
    defaultValue = false;

    // Min and max current values in the plane
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

	constructor() {} 

	setCell(x, y, value) {
        this._updateLimits(x, y);

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

    getCell(x, y){
        if (x >= 0 && y >= 0) {
            this._verifyRow(x, this.quadrant1);
			return this.quadrant1[x][y] || this.defaultValue;

		} else if (x < 0 && y >= 0) {
            this._verifyRow(x*-1, this.quadrant2);
			return this.quadrant2[x*-1][y] || this.defaultValue;

		} else if (x < 0 && y < 0) {
            this._verifyRow(x*-1, this.quadrant3);
			return this.quadrant3[x*-1][y*-1] || this.defaultValue;

		} else {
            this._verifyRow(x, this.quadrant4);
			return this.quadrant4[x][y*-1] || this.defaultValue;
		}
    }

    resetCells(){
        this.quadrant1 = [];
        this.quadrant2 = [];
        this.quadrant3 = [];
        this.quadrant4 = [];
    }

    _verifyRow(x, quadrant){
        if(!quadrant[x]) quadrant[x] = [];
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