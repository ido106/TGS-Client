import Shape from "../Basic/Shape";
import React from "react";

class Triangle extends Shape {
    constructor( editAlphabetDots, dots, setCurrent, setIsDragging, index) {
        // const dots = [
        //     Point(200 , 100),
        //     Point(350, 350),
        //     Point(250,260)];
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index);
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;

    }

    moveOtherDots = (point) => {
        const before = (this.currentDotIndex + 2) % 3;
        const after = (this.currentDotIndex + 1) % 3;
        this.dots[before].x +=
            point.x - this.dots[this.currentDotIndex].x;
        this.dots[before].y +=
            point.y - this.dots[this.currentDotIndex].y;
        this.dots[after].x +=
            point.x - this.dots[this.currentDotIndex].x;
        this.dots[after].y +=
            point.y - this.dots[this.currentDotIndex].y;
    }
    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]} נתון משולש`;

    }
    updateDots = (newPoint) => {
        this.handleUpdateDots(newPoint);
    }
    handleRotate = () => {
        const rotationAmount = 15; // Set the desired rotation amount in degrees
        this.rotationAngle += rotationAmount;
        this.dots.map((dot,i)=> {
            //this.currentDotIndex = i;
                this.dots[i]=this.rotate(dot.x, dot.y, this.rotationAngle)});
        this.setRotationAngle(this.rotationAngle);

    };
    rotate(x, y, angle) {
        const centerX = (this.dots[0].x + this.dots[1].x + this.dots[2].x) / 3;
        const centerY = (this.dots[0].y + this.dots[1].y + this.dots[2].y) / 3;

        const radians = (angle * Math.PI) / 180;
        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);

        const translatedX = x - centerX;
        const translatedY = y - centerY;

        const rotatedX = translatedX * cosTheta - translatedY * sinTheta + centerX;
        const rotatedY = translatedX * sinTheta + translatedY * cosTheta + centerY;

        return { x: rotatedX, y: rotatedY };
    }

    render() {
        return (
            <g
                key={this.key}
               // transform={`rotate(${this.rotationAngle},
                ///${(this.dots[0].x + this.dots[1].x + this.dots[2].x) / 3},
                //${(this.dots[0].y + this.dots[1].y + this.dots[2].y) / 3})`}

            >
                {this.dots.map((dot, index) =>
                    <line
                        onClick={this.handleClickLine}
                        key={index}
                        x1={dot.x}
                        y1={dot.y}
                        x2={this.dots[(index + 1) % 3].x}
                        y2={this.dots[(index + 1) % 3].y}
                        stroke="black"
                        strokeWidth="2"/>)}
                {/*    4 dots*/}
                {this.isDragging ? this.dots.map((dot, index) => {

                        return (
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
                                        letter = window.prompt('האות '+letter+' כבר בשימוש במשולש. אנא הזן אות נוספת');
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
                            />);
                    })
                    : null}
                {this.renderTexts(this.alphabetDots)}
            </g>
        );
    }
}

export default Triangle;
