import Quadrilateral from "./Quadrilateral";
import LineFunctions from "../Basic/LineFunctions";

class Square extends Quadrilateral {
    constructor(editAlphabetDots, current, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, current, setCurrent, setIsDragging, index);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון ריבוע`;
    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון ריבוע`;


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


        const nextCurrentM = LineFunctions.getM(this.dots[this.currentDotIndex],
            this.dots[nextIndex]);
        this.dots[nextIndex] = LineFunctions.getCutPoint(newPoint,
            nextCurrentM,
            this.dots[nextNextIndex],
            LineFunctions.getVerticalM(nextCurrentM));
        const beforeCurrentM = LineFunctions.getM(this.dots[this.currentDotIndex],
            this.dots[beforeIndex]);
        this.dots[beforeIndex] = LineFunctions.getCutPoint(newPoint,
            beforeCurrentM,
            this.dots[nextNextIndex],
            LineFunctions.getVerticalM(beforeCurrentM));
        this.handleUpdateDots(newPoint);
    }
}

export default Square;
