import Shape from "../Basic/Shape";
import React from "react";
import LineFunctions from "../Basic/LineFunctions";
import Point from "../Basic/Point";

class Quadrilateral extends Shape {
    constructor(editAlphabetDots, current, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, current, setCurrent, setIsDragging, index);
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        // this.angle = 55; // angle of rotation in degrees
        // const middlePoint = LineFunctions.getMiddlePoint(this.dots[0], this.dots[2]);
        // const cx = middlePoint.x;// x-coordinate of center of rotation
        // const cy = middlePoint.y; // y-coordinate of center of rotation
        //
        // this.rotationMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix()
        //     .rotate(this.angle, cx, cy); // create transformation matrix for rotation
    }

    updateDots = (newPoint) => {
        this.handleUpdateDots(newPoint);
    }

    //
    // rotatedDots = () => {
    //     this.dots.map((dot, index) => {
    //         const x1 = dot.x;
    //         const y1 = dot.y;
    //         const x2 = this.dots[(index + 1) % 4].x;
    //         const y2 = this.dots[(index + 1) % 4].y;
    //         const rotatedX1 = this.rotationMatrix.a * x1 + this.rotationMatrix.c * y1 + this.rotationMatrix.e;
    //         const rotatedY1 = this.rotationMatrix.b * x1 + this.rotationMatrix.d * y1 + this.rotationMatrix.f;
    //         // const rotatedX2 = this.rotationMatrix.a * x2 + this.rotationMatrix.c * y2 + this.rotationMatrix.e;
    //         // const rotatedY2 = this.rotationMatrix.b * x2 + this.rotationMatrix.d * y2 + this.rotationMatrix.f;
    //         this.currentDotIndex = index;
    //         this.updateDots(Point(rotatedX1,rotatedY1));
    //         return dot;
    //     });
    // }

// Render the rotated line with the new coordinates


    render() {
        return (
            <g
                // transform={`rotate(55,${this.dots[0].x},${this.dots[0].y})`}
                key={this.key}
                // width="100%"
                // height="100%"
                // onMouseMove={this.handleMouseMove}
            >

                {this.dots.map((dot, index) =>
                    <line
                        onClick={this.handleClickLine}
                        key={index}
                        x1={dot.x}
                        y1={dot.y}
                        x2={this.dots[(index + 1) % 4].x}
                        y2={this.dots[(index + 1) % 4].y}
                        stroke="black"
                        strokeWidth="2"/>)}

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
                                const letter = window.prompt('Enter a capital letter:');
                                if (letter && letter.length === 1) {
                                    const uppercaseLetter = letter.toUpperCase();
                                    this.alphabetDots[index] = uppercaseLetter;
                                    this.setCurrent(this.dots);
                                    this.editAlphabetDots(this, this.dots, index, uppercaseLetter, false);

                                }
                            }}
                        />))
                    : null}
                {this.renderTexts(this.alphabetDots)}
            </g>
        )
    }

}

export default Quadrilateral;
