import Quadrilateral from "./Quadrilateral";
import LineFunctions from "../Basic/LineFunctions";
import {isPoint} from "../Basic/Point";


class Rhombus extends Quadrilateral {
    constructor(editAlphabetDots, dots, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index);
        this.type =
            `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון מעוין`;

    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון מעוין`;
    }
    updateDots = (newPoint) => {
        const nextIndex = (this.currentDotIndex + 1) % 4;
        const nextNextIndex = (this.currentDotIndex + 2) % 4;
        const beforeIndex = (this.currentDotIndex + 3) % 4;

        this.dots[nextNextIndex] = LineFunctions.getCutPoint(
            this.dots[nextNextIndex],
            LineFunctions.getM(this.dots[beforeIndex], this.dots[nextIndex]),
            newPoint,
            LineFunctions.getM(this.dots[nextNextIndex],
                this.dots[this.currentDotIndex]));

        const baseMiddlePoint = LineFunctions.getMiddlePoint(
            newPoint,
            this.dots[nextNextIndex]);
        const baseM = LineFunctions.getVerticalM(
            LineFunctions.getM(this.dots[nextNextIndex], newPoint)
        );
        const tempNextPoint = LineFunctions.getCutPoint(
            baseMiddlePoint, baseM,
            this.dots[nextIndex], 0);
        // not parallel to y
        if (isPoint(tempNextPoint)) {
            this.dots[nextIndex] = tempNextPoint;
        } else //parallel to y
        {
            this.dots[nextIndex] = LineFunctions.getCutPoint(
                baseMiddlePoint, baseM,
                this.dots[nextIndex], NaN);

        }
        const newPoints = LineFunctions.getPoints(baseMiddlePoint,
            LineFunctions.getDistance(
                baseMiddlePoint, this.dots[nextIndex]),
            baseM);

        if (newPoints.point1.x === this.dots[nextIndex].x
            && newPoints.point1.y === this.dots[nextIndex].y) {
            this.dots[beforeIndex] = newPoints.point2;
        } else {
            this.dots[beforeIndex] = newPoints.point1;
        }
        this.handleUpdateDots(newPoint);


    }

}

export default Rhombus;
