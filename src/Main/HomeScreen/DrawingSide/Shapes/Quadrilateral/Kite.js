import Quadrilateral from "./Quadrilateral";
import LineFunctions from "../Basic/LineFunctions";


class Kite extends Quadrilateral {
    constructor(editAlphabetDots, current, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, current, setCurrent, setIsDragging, index);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון דלתון`;
    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון דלתון`;
    }
    updateDots = (newPoint) => {
        //base: line(p0,p2)
        const nextNextIndex = (this.currentDotIndex + 2) % 4;
        if (this.currentDotIndex % 2 === 0) {
            const nextIndex = (this.currentDotIndex + 1) % 4;
            const beforeIndex = (this.currentDotIndex + 3) % 4;
            const baseM = LineFunctions.getM(
                this.dots[this.currentDotIndex],
                this.dots[nextNextIndex]
            );
            const baseMiddlePoint = LineFunctions.getMiddlePoint(
                this.dots[this.currentDotIndex],
                this.dots[nextNextIndex]);

            //init all dots
            this.dots[nextNextIndex] = LineFunctions.getCutPoint(
                newPoint, baseM,
                this.dots[nextNextIndex],
                LineFunctions.getVerticalM(baseM)
            );
            this.dots[beforeIndex] = LineFunctions.getCutPoint(
                baseMiddlePoint, LineFunctions.getVerticalM(baseM),
                this.dots[beforeIndex], baseM
            );
            this.dots[nextIndex] = LineFunctions.getCutPoint(
                baseMiddlePoint, LineFunctions.getVerticalM(baseM),
                this.dots[nextIndex], baseM
            );
        } else {
            const d = newPoint.x - this.dots[this.currentDotIndex].x;
            this.dots[0].x += d;
            this.dots[2].x += d;
            this.dots[nextNextIndex].x+=d;
        }
        this.handleUpdateDots(newPoint);
    }
}

// const nextNextIndex = (this.currentDotIndex + 2) % 4;
// const nextIndex = (this.currentDotIndex + 1) % 4;
// const beforeIndex = (this.currentDotIndex + 3) % 4;
// if (this.currentDotIndex % 2 === 0) {
//     const baseM = LineFunctions.getM(
//         this.dots[this.currentDotIndex],
//         this.dots[nextNextIndex]
//     );
//     const baseMiddlePoint = LineFunctions.getMiddlePoint(
//         this.dots[this.currentDotIndex],
//         this.dots[nextNextIndex]);
//
//     //init all dots
//     this.dots[nextNextIndex] = LineFunctions.getCutPoint(
//         newPoint, baseM,
//         this.dots[nextNextIndex],
//         LineFunctions.getVerticalM(baseM)
//     );
//     this.dots[beforeIndex] = LineFunctions.getCutPoint(
//         baseMiddlePoint, LineFunctions.getVerticalM(baseM),
//         this.dots[beforeIndex], baseM
//     );
//     this.dots[nextIndex] = LineFunctions.getCutPoint(
//         baseMiddlePoint, LineFunctions.getVerticalM(baseM),
//         this.dots[nextIndex], baseM
//     );
// } else {
//     // this.dots[this.currentDotIndex] = LineFunctions.getCutPoint(
//     //     newPoint, 0, this.dots[this.currentDotIndex],
//     //     LineFunctions.getM(this.dots[this.currentDotIndex],
//     //         this.dots[nextNextIndex]));
//     //init all dots
//     const d = newPoint.x - this.dots[this.currentDotIndex].x;
//     this.dots[nextNextIndex].x += d;
//     this.dots[beforeIndex].x += d;
//     this.dots[nextIndex] += d;
// }
// this.handleUpdateDots(newPoint);
export default Kite;
