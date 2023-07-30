import Shape from "../Basic/Shape";
import React from "react";
import LineFunctions from "../Basic/LineFunctions";
import dot from "../Basic/Dot";
import Point from "../Basic/Point";

export class TwoLinesCut extends Shape {

    constructor(editAlphabetDots, dots, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index)
        const cutP = LineFunctions.getCutPoint(
            this.dots[0], LineFunctions.getM(this.dots[0], this.dots[1]),
            this.dots[2], LineFunctions.getM(this.dots[2], this.dots[3]));
        this.dots.push(cutP);
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון שני ישרים נחתכים`;

    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון שני ישרים נחתכים`;

    }
    updateDots = (newPoint) => {
        const copyDots = [Point(this.dots[0].x,this.dots[0].y),
            Point(this.dots[1].x,this.dots[1].y),
            Point(this.dots[2].x,this.dots[2].y),
            Point(this.dots[3].x,this.dots[3].y),];
        copyDots[this.currentDotIndex] = newPoint;
        const cutP = LineFunctions.getCutPoint(
            copyDots[0], LineFunctions.getM(copyDots[0], copyDots[1]),
            copyDots[2], LineFunctions.getM(copyDots[2], copyDots[3]));
        if (cutP.x >= Math.min(copyDots[0].x, copyDots[1].x) &&
            cutP.x <= Math.max(copyDots[0].x, copyDots[1].x) &&
            cutP.y >= Math.min(copyDots[0].y, copyDots[1].y) &&
            cutP.y <= Math.max(copyDots[0].y, copyDots[1].y) &&
            cutP.x >= Math.min(copyDots[2].x, copyDots[3].x) &&
            cutP.x <= Math.max(copyDots[2].x, copyDots[3].x) &&
            cutP.y >= Math.min(copyDots[2].y, copyDots[3].y) &&
            cutP.y <= Math.max(copyDots[2].y, copyDots[3].y))
        {
            this.dots[4] = cutP;
            this.handleUpdateDots(newPoint);
        }
    }

    render() {
        this.dots[4] = LineFunctions.getCutPoint(
            this.dots[0], LineFunctions.getM(this.dots[0], this.dots[1]),
            this.dots[2], LineFunctions.getM(this.dots[2], this.dots[3]));

        return (
            <g
                key={this.key}
                // width="100%"
                // height="100%"
                // onMouseMove={this.handleMouseMove}
            >
                <line
                    onClick={this.handleClickLine}
                    x1={this.dots[0].x}
                    y1={this.dots[0].y}
                    x2={this.dots[1].x}
                    y2={this.dots[1].y}
                    stroke="black"
                    strokeWidth="2"/>
                <line
                    onClick={this.handleClickLine}
                    x1={this.dots[2].x}
                    y1={this.dots[2].y}
                    x2={this.dots[3].x}
                    y2={this.dots[3].y}
                    stroke="black"
                    strokeWidth="2"/>

                {this.isDragging ? this.dots.map((dot, index) => (
                        <circle
                            key={index}
                            //bottom
                            cx={dot.x}
                            cy={dot.y}
                            r={7}
                            fill="lightblue"
                            stroke="black"
                            onMouseDown={() => this.handleMouseDown(index)}
                            onDoubleClick={() => {
                                let letter = window.prompt('הזן אות');
                                let uppercaseLetter = letter.toUpperCase();
                                while (letter && letter.length === 1 && this.alphabetDots.includes(uppercaseLetter)) {
                                    letter = window.prompt('האות '+letter+' כבר בשימוש בישרים הנחתכים. אנא הזן אות נוספת');
                                    if(letter!=null)
                                        uppercaseLetter = letter.toUpperCase();
                                }
                                if(uppercaseLetter){
                                    this.alphabetDots[index] = uppercaseLetter;
                                    this.setCurrent(this.dots);

                                    this.editAlphabetDots(this, this.dots, index, uppercaseLetter, false);
                                    this.handleMouseUp();
                                    //this.setCurrent(null);
                                    this.updateIsDragging(false);
                                }
                            }}
                        />))
                    : null}
                {this.renderTexts(this.alphabetDots)}
            </g>
        );
    }
}
