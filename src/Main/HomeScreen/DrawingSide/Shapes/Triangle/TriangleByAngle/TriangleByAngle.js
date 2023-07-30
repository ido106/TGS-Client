import Triangle from "../Triangle";
import Point from "../../Basic/Point";
import LineFunctions from "../../Basic/LineFunctions";


export const AngleType = {
    ACUTE_ANGLE: "חד זווית", RIGHT_ANGLE: "ישר זווית", OBTUSE_ANGLE: "קהה זווית",
};

function createDots(angleType) {
    let dots = [];
    if (angleType === AngleType.ACUTE_ANGLE) {
        dots = [
            Point(100, 100),
            Point(150, 80),
            Point(150, 120)];
    } else if (angleType === AngleType.RIGHT_ANGLE) {
        dots = [Point(150, 100),
            Point(200, 100),
            Point(200, 150)];
    } else if (angleType === AngleType.OBTUSE_ANGLE) {
        dots = [Point(200, 100),
            Point(250, 260),
            Point(350, 350)];
    }
    return dots;
}

class TriangleByAngle extends Triangle {

    constructor(editAlphabetDots, angleType, setCurrent, setIsDragging, index) {
        const dots = createDots(angleType);
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index);
        this.angleType = angleType;
        this.type = `${angleType} ${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;
    }

    constructTypeString = () => {
        this.type = `${AngleType[this.angleType]}${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;
    }
    updateDots = (newPoint) => {
        let tempDots = this.dots.map((d) => {
            if (d === this.dots[this.currentDotIndex]) {
                return newPoint;
            }
            return d;
        });
        const angle1 = LineFunctions.calculateAngle(tempDots[2], tempDots[0], tempDots[1]);
        const angle2 = LineFunctions.calculateAngle(tempDots[0], tempDots[1], tempDots[2]);
        const angle3 = LineFunctions.calculateAngle(tempDots[1], tempDots[2], tempDots[0]);
        if (this.angleType === AngleType.ACUTE_ANGLE) {
            if (!(angle1 > 0 && angle1 < 90 && angle2 > 0 && angle2 < 90 && angle3 > 0 && angle3 < 90)) {
                this.moveOtherDots(newPoint);
            }
        } else if (this.angleType === AngleType.RIGHT_ANGLE) {
            if (this.currentDotIndex !== 1) {
                const m = LineFunctions.getM(this.dots[1], this.dots[this.currentDotIndex]);
                this.dots[1] = LineFunctions.getCutPoint(newPoint, m, this.dots[1], LineFunctions.getVerticalM(m));
            } else
                this.moveOtherDots(newPoint);


        } else if (this.angleType === AngleType.OBTUSE_ANGLE) {
            if (!(angle2 > 90 && angle2 < 180))
                this.moveOtherDots(newPoint);

        }
        this.handleUpdateDots(newPoint);
    }
}

export default TriangleByAngle;
