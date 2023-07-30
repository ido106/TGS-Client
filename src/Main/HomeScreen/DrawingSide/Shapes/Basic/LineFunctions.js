import Point, {NaP} from "./Point";

class LineFunctions {
    static getM(p1, p2) {
        // (y1-y2)/(x1-x2)
        if (p1.x === p2.x) {
            return NaP;
        }
        if (p1.y === p2.y) {
            return 0;
        }
        return (p1.y - p2.y) / (p1.x - p2.x);
    }

    static getMiddlePoint(p1, p2) {
        return Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    static getVerticalM(m) {
        if (m === 0) {
            return NaN;
        }
        if (isNaN(m)) {
            return 0;
        }
        return -1 * (1 / m);
    }

    static getB(p, m) {
        // y1 - x1*m
        return p.y - (p.x * m);
    }

    static getDistance(p1, p2) {
        // sqrt((x1-x2)^2+(y1-y2)^2)
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    /**
     * return the y value with x value on the line with m and p
     * @param x
     * @param p
     * @param m
     * @returns number
     */
    static getY(x, p, m) {
        if (isNaN(m)) {
            return NaN;
        }
        return m * x + this.getB(p, m);
    }

    /**
     * return the result x1,x2 from the quadratic equation. or NaN.
     * @param a
     * @param b
     * @param c
     * @returns {{x1: number, x2: number}}
     */
    static quadraticEquation(a, b, c) {
        return {
            x1: (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
            x2: (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        };
    }

    /**
     * return the point that the distance between it and p is d
     * in the line with point p2 and m.
     * @param p2 is point {x,y}
     * @param d is the distance
     * @param m
     * @returns {{x, y}}
     */
    static getPoints(p2, d, m) {
        if (isNaN(m)) {
            return {
                point1: Point(p2.x, p2.y + d),
                point2: Point(p2.x, p2.y - d)
            };
        }
        const b = this.getB(p2, m);
        const xValues = this.quadraticEquation(m * m + 1,
            -2 * (p2.x + (p2.y - b) * m),
            p2.x * p2.x + (p2.y - b) * (p2.y - b) - d * d);
        const yValues = {
            y1: this.getY(xValues.x1, p2, m),
            y2: this.getY(xValues.x2, p2, m)
        };
        return {
            point1: Point(xValues.x1, yValues.y1),
            point2: Point(xValues.x2, yValues.y2)
        };
    }

    // static getCutPoint1(l1, l2) {
    //     const m1 = this.getM(Point(l1.x1, l1.y1),
    //         Point(l1.x2, l1.y2));
    //     const b1 = this.getB(Point(l1.x1, l1.y1),
    //         m1);
    //     const m2 = this.getM(Point(l2.x1, l2.y1),
    //         Point(l2.x2, l2.y2));
    //     const b2 = this.getB(Point(l2.x1, l2.y1),
    //         m2);
    //     const relX = (b2 - b1) / (m1 - m2);
    //     return Point(relX, m1 * relX + b1);
    // }

    static getCutPoint(p1, m1, p2, m2) {
        // parallel
        if (m1 === m2) {
            // return Point(p1.x, p2.y);
            return NaP;
        }
        if (isNaN(m2)) {
            return Point(p2.x, this.getY(p2.x, p1, m1));
        } else if (isNaN(m1)) {
            return Point(p1.x, this.getY(p1.x, p2, m2));
        }
        const b1 = this.getB(p1, m1);
        const b2 = this.getB(p2, m2);
        const relX = (b2 - b1) / (m1 - m2);
        return Point(relX, m1 * relX + b1);
    }

    static calculateAngle(dot1, dot2, dot3) {
        const dx1 = dot1.x - dot2.x;
        const dy1 = dot1.y - dot2.y;
        const dx2 = dot3.x - dot2.x;
        const dy2 = dot3.y - dot2.y;
        const angle1 = Math.atan2(dy1, dx1);
        const angle2 = Math.atan2(dy2, dx2);
        let angle = angle1 - angle2;
        if (angle > Math.PI) angle -= 2 * Math.PI;
        if (angle < -Math.PI) angle += 2 * Math.PI;
        angle = Math.abs(angle * 180 / Math.PI);
        return angle;
    }

    // static lineWithAngle(startPoint, endPoint) {
    //     // Calculate direction vector and magnitude of original line
    //     const directionVector = Point(endPoint.x - startPoint.x,
    //         endPoint.y - startPoint.y);
    //     const magnitude = Math.sqrt(directionVector.x ** 2 + directionVector.y ** 2);
    //
    //     // Calculate direction vector of new line with 60 degree angle
    //     const angleInRadians = (60 * Math.PI) / 180;
    //     const newDirectionVector = Point(magnitude * Math.cos(angleInRadians),
    //         magnitude * Math.sin(angleInRadians));
    //
    //     // Calculate end point of new line
    //     const newEndPoint = Point(endPoint.x + newDirectionVector.x,
    //         endPoint.y + newDirectionVector.y);
    //
    //     // Render the new line
    //     // return <line x1={endPoint.x} y1={endPoint.y} x2={newEndPoint.x} y2={newEndPoint.y} stroke="black" strokeWidth="2" />;
    //     return new Line(endPoint, newEndPoint);
    // }


}

export default LineFunctions;
