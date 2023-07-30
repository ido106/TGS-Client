import Triangle from "../Triangle";
import Point from "../../Basic/Point";
import LineFunctions from "../../Basic/LineFunctions";
import {getMessage} from "@testing-library/jest-dom/dist/utils";


export const SideType = {
    ISOSCELES: "שווה שוקיים",
    EQUILATERAL: "שווה צלעות",
};

function createDots(angleType) {
    let dots = [];
    if (angleType === SideType.ISOSCELES) {
        dots = [
            Point(100, 100),
            Point(150, 80),
            Point(200, 100)
        ];

    } else if (angleType === SideType.EQUILATERAL) {
        dots = [
            Point(100, 100),
            Point(200, 100),
            Point(150, 100 + (Math.sqrt(3) * 50))
        ];

    }
    return dots;
}

class TriangleByEdges extends Triangle {

    constructor(editAlphabetDots, sideType, setCurrent, setIsDragging, index) {
        const dots = createDots(sideType);
        console.log(LineFunctions.getDistance(dots[0], dots[1]));
        console.log(LineFunctions.getDistance(dots[2], dots[1]));
        console.log(LineFunctions.getDistance(dots[0], dots[2]));
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index);
        this.sideType = sideType;
        this.type = `${sideType} ${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;
    }

    constructTypeString = () => {
        this.type = `${SideType[this.sideType]} ${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;
    }
    updateDots = (newPoint) => {
        if (this.sideType === SideType.ISOSCELES) {
            if (this.currentDotIndex === 1) {
                this.moveOtherDots(newPoint);
            } else {
                let otherIndex;
                if (this.currentDotIndex === 0) {
                    otherIndex = 2
                } else {
                    otherIndex = 0;
                }
                const points = LineFunctions.getPoints(
                    this.dots[1],
                    LineFunctions.getDistance(
                        this.dots[1], newPoint),
                    LineFunctions.getM(this.dots[1], this.dots[otherIndex])
                )
                if (LineFunctions.getDistance(this.dots[otherIndex], points.point1) <
                    LineFunctions.getDistance(this.dots[otherIndex], points.point2)) {
                    this.dots[otherIndex] = points.point1;
                } else {
                    this.dots[otherIndex] = points.point2;
                }
            }
        }
        if (this.sideType === SideType.EQUILATERAL) {
            const beforeIndex = (this.currentDotIndex + 2) % 3;
            const afterIndex = (this.currentDotIndex + 1) % 3;
            const mBefore = LineFunctions.getM(this.dots[this.currentDotIndex], this.dots[beforeIndex]);
            const mAfter = LineFunctions.getM(this.dots[this.currentDotIndex], this.dots[afterIndex]);
            const m = LineFunctions.getM(this.dots[beforeIndex], this.dots[afterIndex]);
            this.dots[this.currentDotIndex].y = newPoint.y;
            this.dots[beforeIndex] = LineFunctions.getCutPoint(
                this.dots[this.currentDotIndex],
                mBefore,
                this.dots[beforeIndex],
                m);
            this.dots[afterIndex] = LineFunctions.getCutPoint(
                this.dots[this.currentDotIndex],
                mAfter,
                this.dots[afterIndex],
                m);
            this.moveOtherDots(newPoint);
        }
        this.handleUpdateDots(newPoint);
    }
}

export default TriangleByEdges;
