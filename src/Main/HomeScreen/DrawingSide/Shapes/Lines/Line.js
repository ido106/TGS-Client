import React from 'react';
import Shape from "../Basic/Shape";


class Line extends Shape {
    constructor(editAlphabetDots, dots, setCurrent, setIsDragging, index) {
        super(editAlphabetDots, dots, setCurrent, setIsDragging, index)
        // this.start = dots[0];
        // this.end = dots[1];
        this.alphabetDots = this.editAlphabetDots(this, this.dots, null);
        this.type = `${this.alphabetDots[0]}${this.alphabetDots[1]} נתון ישר`;

    }

    constructTypeString = () => {
        return `${this.alphabetDots[0]}${this.alphabetDots[1]} נתון ישר`;
    }
    updateDots = (newPoint) => {
        this.handleUpdateDots(newPoint);
    }

    render() {
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
                                    letter = window.prompt('האות '+letter+' כבר בשימוש בישר. אנא הזן אות נוספת');
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
        )
    }
}

export default Line;
