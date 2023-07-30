import React from 'react';

import Shape from "../Basic/Shape";
import Point from "../Basic/Point";


class Circle extends Shape {
    constructor(editAlphabetDots, cx, cy, r, setIsDragging, setCurrent, index) {
        const dots = [
            Point(cx - r, cy),
            Point(cx, cy - r),
            Point(cx + r, cy),
            Point(cx, cy + r)];
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index);
        this.cx = cx;
        this.cy = cy;
        this.radius = r;
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון עיגול`;
    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]}${this.alphabetDots[2]}${this.alphabetDots[3]} נתון עיגול`;

    }
    updateDots = (newPoint) => {
        const nextIndex = (this.currentDotIndex + 1) % 4;
        const nextNextIndex = (this.currentDotIndex + 2) % 4;
        const beforeIndex = (this.currentDotIndex + 3) % 4;

        if (this.currentDotIndex % 2 === 0)//p0,p2
        {
            // this.dots[this.currentDotIndex].x = newPoint.x;
            const d = newPoint.y - this.dots[this.currentDotIndex].y;
            this.cy += d;
            this.radius = (this.dots[2].x - this.dots[0].x) / 2;
            this.cx = this.dots[0].x + this.radius;
            this.dots[1] = Point(this.cx, this.cy - this.radius);
            this.dots[3] = Point(this.cx, this.cy + this.radius);
            this.dots[nextNextIndex].y = newPoint.y;
        } else//p1,p3
        {
            const d = newPoint.x - this.dots[this.currentDotIndex].x;
            // this.dots[this.currentDotIndex].y = newPoint.y;
            this.radius = (this.dots[3].y - this.dots[1].y) / 2;
            this.cy = this.dots[1].y + this.radius;
            this.cx += d;
            this.dots[2] = Point(this.cx + this.radius, this.cy);
            this.dots[0] = Point(this.cx - this.radius, this.cy);
            this.dots[nextNextIndex].x = newPoint.x;
        }

        this.handleUpdateDots(newPoint);
    }

    render() {
        return (
            <g>
                <circle
                    cx={this.cx}
                    cy={this.cy}
                    r={this.radius}
                    fill="transparent"
                    stroke="black"
                    strokeWidth="2"
                    onClick={this.handleClickLine}/>

                {/*    4 dots*/}
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
        );
    }

}

export default Circle;
