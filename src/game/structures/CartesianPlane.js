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