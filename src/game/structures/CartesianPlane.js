class CartesianPlane {

	quadrant1 = [];
	quadrant2 = [];
	quadrant3 = [];
	quadrant4 = [];

    defaultValue;

	constructor(defaultValue) {
        this.defaultValue = defaultValue || false;
    }

	setPoint(x, y, value) {
		if (x >= 0 && y >= 0) {
			this.quadrant1[x][y] = value;
		} else if (x < 0 && y >= 0) {
			this.quadrant2[x*-1][y] = value;
		} else if (x < 0 && y < 0) {
			this.quadrant3[x*-1][y*-1] = value;
		} else {
			this.quadrant4[x][y*-1] = value;
		}
	}

    getPoint(x, y){
        if (x >= 0 && y >= 0) {
			return this.quadrant1[x][y] || false;
		} else if (x < 0 && y >= 0) {
			return this.quadrant2[x*-1][y] || false;
		} else if (x < 0 && y < 0) {
			return this.quadrant3[x*-1][y*-1] || false;
		} else {
			return this.quadrant4[x][y*-1] || false;
		}
    }
}
