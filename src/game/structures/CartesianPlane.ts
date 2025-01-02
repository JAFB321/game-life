export interface Point {
  x: number;
  y: number;
}

// export class Rectangle{
//     point1;
//     point2;

//     constructor(x1, y1, x2, y2){
//         this.point1 = new Point(x1, y1);
//         this.point2 = new Point(x2, y2);
//     }
// }

/**
 * Deprecated
 */
export class CartesianPlane<ValueType> {
  // Cartesian Plane quadrants
  private quadrant1: (ValueType | null)[][]; // x+ y+
  private quadrant2: (ValueType | null)[][]; // x- y+
  private quadrant3: (ValueType | null)[][]; // x- y-
  private quadrant4: (ValueType | null)[][]; // x+ y-

  // Default point value
  readonly defaultValue;

  constructor(defaultValue: ValueType | null) {
    this.defaultValue = defaultValue;
    this.quadrant1 = [[]];
    this.quadrant2 = [[]];
    this.quadrant3 = [[]];
    this.quadrant4 = [[]];
  }

  public setPoint({ x, y }: Point, value: ValueType) {
    if (x >= 0 && y >= 0) {
      this.verifyRow(x, this.quadrant1);
      this.quadrant1[x][y] = value;
    } else if (x < 0 && y >= 0) {
      this.verifyRow(x * -1, this.quadrant2);
      this.quadrant2[x * -1][y] = value;
    } else if (x < 0 && y < 0) {
      this.verifyRow(x * -1, this.quadrant3);
      this.quadrant3[x * -1][y * -1] = value;
    } else {
      this.verifyRow(x, this.quadrant4);
      this.quadrant4[x][y * -1] = value;
    }
  }

  public getPoint({ x, y }: Point) {
    if (x >= 0 && y >= 0) {
      if (!this.quadrant1[x]) return this.defaultValue;
      return this.quadrant1[x][y] || this.defaultValue;
    } else if (x < 0 && y >= 0) {
      if (!this.quadrant2[x * -1]) return this.defaultValue;
      return this.quadrant2[x * -1][y] || this.defaultValue;
    } else if (x < 0 && y < 0) {
      if (!this.quadrant3[x * -1]) return this.defaultValue;
      return this.quadrant3[x * -1][y * -1] || this.defaultValue;
    } else {
      if (!this.quadrant4[x]) return this.defaultValue;
      return this.quadrant4[x][y * -1] || this.defaultValue;
    }
  }

  public resetPlane() {
    this.quadrant1 = [];
    this.quadrant2 = [];
    this.quadrant3 = [];
    this.quadrant4 = [];
  }

  private verifyRow(x: number, quadrant: (ValueType | null)[][]) {
    if (!quadrant[x]) quadrant[x] = [];
  }
}
