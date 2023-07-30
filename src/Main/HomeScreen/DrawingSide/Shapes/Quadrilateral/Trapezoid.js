
import Quadrilateral from "./Quadrilateral";
import LineFunctions from "../Basic/LineFunctions";


class Trapezoid extends Quadrilateral {
    constructor(editAlphabetDots,current, setCurrent, setIsDragging, index) {
        super(editAlphabetDots,current, setCurrent, setIsDragging, index);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון טרפז`;
    }
    constructTypeString= () =>{
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון טרפז`;


    }
    updateDots = (newPoint) => {
        //line(p0,p1) || line(p2,p3)
        const nextIndex = (this.currentDotIndex + 1) % 4;
        const nextNextIndex = (this.currentDotIndex + 2) % 4;
        const beforeIndex = (this.currentDotIndex + 3) % 4;


        if (this.currentDotIndex % 2 === 0) {
            this.dots[nextIndex].y =
                LineFunctions.getY(
                    this.dots[nextIndex].x,
                    newPoint,
                    LineFunctions.getM(this.dots[nextNextIndex],
                        this.dots[beforeIndex]));
        } else {
            this.dots[beforeIndex].y =
                LineFunctions.getY(
                    this.dots[beforeIndex].x,
                    newPoint,
                    LineFunctions.getM(this.dots[nextNextIndex],
                        this.dots[nextIndex]));
        }
        this.handleUpdateDots(newPoint);

    }
}

export default Trapezoid;
