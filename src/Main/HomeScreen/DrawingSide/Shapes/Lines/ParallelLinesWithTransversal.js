import Shape from "../Basic/Shape";
import React from "react";
import LineFunctions from "../Basic/LineFunctions";
import dot from "../Basic/Dot";
import Point from "../Basic/Point";

export class ParallelLinesWithTransversal extends Shape {

    constructor(editAlphabetDots, dots, setCurrent, setIsDragging, index,viewBox) {
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index)
        const cutP1 = LineFunctions.getCutPoint(
            this.dots[0], LineFunctions.getM(this.dots[0], this.dots[1]),
            this.dots[4], LineFunctions.getM(this.dots[4], this.dots[5]));
        this.dots.push(cutP1);
        const cutP2 = LineFunctions.getCutPoint(
            this.dots[2], LineFunctions.getM(this.dots[2], this.dots[3]),
            this.dots[4], LineFunctions.getM(this.dots[4], this.dots[5]));
        this.dots.push(cutP2);
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון שני ישרים נחתכים`;
        this.viewBox = viewBox.split(" ").map(Number);
    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון שני ישרים נחתכים`;

    }
    updateDots = (newPoint) => {
        const copyDots = [Point(this.dots[0].x, this.dots[0].y),
            Point(this.dots[1].x, this.dots[1].y),
            Point(this.dots[2].x, this.dots[2].y),
            Point(this.dots[3].x, this.dots[3].y),
            Point(this.dots[4].x, this.dots[4].y),
            Point(this.dots[5].x, this.dots[5].y)];
        if (this.currentDotIndex < 4) {
            const dX = copyDots[this.currentDotIndex].x - newPoint.x;
            const dY = copyDots[this.currentDotIndex].y - newPoint.y;
            if (this.currentDotIndex % 2 === 0) {
                const index = (this.currentDotIndex + 3) % 4;
                copyDots[index].x -= dX;
                copyDots[index].y -= dY;
                if (this.viewBox[0] > copyDots[index].x ||
                    copyDots[index].x > this.viewBox[0] + this.viewBox[2] ||
                    this.viewBox[1] > copyDots[index].y ||
                    copyDots[index].y > this.viewBox[1] + this.viewBox[3]) {
                    console.log("here")
                    return;
                }

            } else {
                const index = (this.currentDotIndex + 1) % 4;
                copyDots[index].x -= dX;
                copyDots[index].y -= dY;
                if (this.viewBox[0] > copyDots[index].x ||
                    copyDots[index].x > this.viewBox[0] + this.viewBox[2] ||
                    this.viewBox[1] > copyDots[index].y ||
                    copyDots[index].y > this.viewBox[1] + this.viewBox[3]) {
                    return;
                }
            }
        }
        copyDots[this.currentDotIndex] = newPoint;
        const cutP1 = LineFunctions.getCutPoint(
            copyDots[0], LineFunctions.getM(copyDots[0], copyDots[1]),
            copyDots[4], LineFunctions.getM(copyDots[4], copyDots[5]));
        const cutP2 = LineFunctions.getCutPoint(
            copyDots[2], LineFunctions.getM(copyDots[2], copyDots[3]),
            copyDots[4], LineFunctions.getM(copyDots[4], copyDots[5]));

        if (cutP1.x >= Math.min(copyDots[0].x, copyDots[1].x) &&
            cutP1.x <= Math.max(copyDots[0].x, copyDots[1].x) &&
            cutP1.y >= Math.min(copyDots[0].y, copyDots[1].y) &&
            cutP1.y <= Math.max(copyDots[0].y, copyDots[1].y) &&
            cutP1.x >= Math.min(copyDots[4].x, copyDots[5].x) &&
            cutP1.x <= Math.max(copyDots[4].x, copyDots[5].x) &&
            cutP1.y >= Math.min(copyDots[4].y, copyDots[5].y) &&
            cutP1.y <= Math.max(copyDots[4].y, copyDots[5].y) &&

            cutP2.x >= Math.min(copyDots[2].x, copyDots[3].x) &&
            cutP2.x <= Math.max(copyDots[2].x, copyDots[3].x) &&
            cutP2.y >= Math.min(copyDots[2].y, copyDots[3].y) &&
            cutP2.y <= Math.max(copyDots[2].y, copyDots[3].y) &&
            cutP2.x >= Math.min(copyDots[4].x, copyDots[5].x) &&
            cutP2.x <= Math.max(copyDots[4].x, copyDots[5].x) &&
            cutP2.y >= Math.min(copyDots[4].y, copyDots[5].y) &&
            cutP2.y <= Math.max(copyDots[4].y, copyDots[5].y)) {

            this.dots[0] = copyDots[0];
            this.dots[1] = copyDots[1];
            this.dots[2] = copyDots[2];
            this.dots[3] = copyDots[3];

            this.dots[6] = cutP1;
            this.dots[7] = cutP2;


            this.handleUpdateDots(newPoint);
        }
    }

    render() {
        this.dots[6] = LineFunctions.getCutPoint(
            this.dots[0], LineFunctions.getM(this.dots[0], this.dots[1]),
            this.dots[4], LineFunctions.getM(this.dots[4], this.dots[5]));

        this.dots[7] = LineFunctions.getCutPoint(
            this.dots[2], LineFunctions.getM(this.dots[2], this.dots[3]),
            this.dots[4], LineFunctions.getM(this.dots[4], this.dots[5]));

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
                <line
                    onClick={this.handleClickLine}
                    x1={this.dots[4].x}
                    y1={this.dots[4].y}
                    x2={this.dots[5].x}
                    y2={this.dots[5].y}
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
                                    letter = window.prompt('האות '+letter+' כבר בשימוש במקבילים וישר חותך. אנא הזן אות נוספת');
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
