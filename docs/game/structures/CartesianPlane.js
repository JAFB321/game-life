// export class Rectangle{
//     point1;
//     point2;
//     constructor(x1, y1, x2, y2){
//         this.point1 = new Point(x1, y1);
//         this.point2 = new Point(x2, y2);
//     }
// }
var CartesianPlane = /** @class */ (function () {
    function CartesianPlane(defaultValue) {
        this.defaultValue = defaultValue;
        this.quadrant1 = [[]];
        this.quadrant2 = [[]];
        this.quadrant3 = [[]];
        this.quadrant4 = [[]];
    }
    CartesianPlane.prototype.setPoint = function (_a, value) {
        var x = _a.x, y = _a.y;
        if (x >= 0 && y >= 0) {
            this.verifyRow(x, this.quadrant1);
            this.quadrant1[x][y] = value;
        }
        else if (x < 0 && y >= 0) {
            this.verifyRow(x * -1, this.quadrant2);
            this.quadrant2[x * -1][y] = value;
        }
        else if (x < 0 && y < 0) {
            this.verifyRow(x * -1, this.quadrant3);
            this.quadrant3[x * -1][y * -1] = value;
        }
        else {
            this.verifyRow(x, this.quadrant4);
            this.quadrant4[x][y * -1] = value;
        }
    };
    CartesianPlane.prototype.getPoint = function (_a) {
        var x = _a.x, y = _a.y;
        if (x >= 0 && y >= 0) {
            if (!this.quadrant1[x])
                return this.defaultValue;
            return this.quadrant1[x][y] || this.defaultValue;
        }
        else if (x < 0 && y >= 0) {
            if (!this.quadrant2[x * -1])
                return this.defaultValue;
            return this.quadrant2[x * -1][y] || this.defaultValue;
        }
        else if (x < 0 && y < 0) {
            if (!this.quadrant3[x * -1])
                return this.defaultValue;
            return this.quadrant3[x * -1][y * -1] || this.defaultValue;
        }
        else {
            if (!this.quadrant4[x])
                return this.defaultValue;
            return this.quadrant4[x][y * -1] || this.defaultValue;
        }
    };
    CartesianPlane.prototype.resetPlane = function () {
        this.quadrant1 = [];
        this.quadrant2 = [];
        this.quadrant3 = [];
        this.quadrant4 = [];
    };
    CartesianPlane.prototype.verifyRow = function (x, quadrant) {
        if (!quadrant[x])
            quadrant[x] = [];
    };
    return CartesianPlane;
}());
export { CartesianPlane };
//# sourceMappingURL=CartesianPlane.js.map