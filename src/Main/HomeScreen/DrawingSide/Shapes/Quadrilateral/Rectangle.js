import Quadrilateral from "./Quadrilateral";
import LineFunctions from "../Basic/LineFunctions";
class Rectangle extends Quadrilateral {
    constructor(editAlphabetDots,current, setCurrent, setIsDragging, index) {
        super(editAlphabetDots,current, setCurrent, setIsDragging,index);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון מלבן`;
    }

    constructTypeString= () =>{
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון מלבן`;

    }
    updateDots = (newPoint) => {
        const nextIndex = (this.currentDotIndex + 1) % 4;
        const nextNextIndex = (this.currentDotIndex + 2) % 4;
        const beforeIndex = (this.currentDotIndex + 3) % 4;


        this.dots[nextIndex] = LineFunctions.getCutPoint(newPoint,
            LineFunctions.getM(this.dots[this.currentDotIndex],
                this.dots[nextIndex]),
            this.dots[nextNextIndex],
            LineFunctions.getM(this.dots[nextIndex],
                this.dots[nextNextIndex])
        );
        this.dots[beforeIndex] = LineFunctions.getCutPoint(newPoint,
            LineFunctions.getM(this.dots[this.currentDotIndex],
                this.dots[beforeIndex]),
            this.dots[nextNextIndex],
            LineFunctions.getM(this.dots[beforeIndex],
                this.dots[nextNextIndex])
        );

        this.handleUpdateDots(newPoint);
    }
}

export default Rectangle;
