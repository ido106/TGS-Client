import React from 'react';
import Point from "./Point";


class Shape {
    constructor(editAlphabetDots,dots, setCurrent, setIsDragging,index) {
        this.setCurrent = setCurrent;
        this.setIsDragging = setIsDragging;
        this.dots = dots;
        this.isDragging = true;
        this.currentDotIndex = null;
        this.key = index;
        this.editAlphabetDots = editAlphabetDots;

    }
    renderTexts(alphabetDots) {
        const texts = [];
        for (let i = 0; i < this.dots.length; ++i) {
            // const text = String.fromCharCode(65 + i);// A B C D...
            texts.push(<text
                //transform={`rotate(${0}, ${this.dots[0].x}, ${this.dots[0].y})`}
                style={{pointerEvents: 'none'}}
                x={this.dots[i].x}
                y={this.dots[i].y}
                key={i}
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="75%">
                {alphabetDots[i]}

            </text>);
        }
        return texts;
    }
    changeIsDragging(bool) {
        this.isDragging = bool;
        if (bool)
            this.setCurrent(this.dots);
        this.setCurrent([]);
    }

    updateIsDragging(bool) {
        this.isDragging = bool;
        if (bool) {

            this.setIsDragging((prev) => {
                // create a copy of the previous array or initialize it as an empty array
                const newArr = prev ? [...prev] : [];
                // set all previous values to false
                for (let i = 0; i < newArr.length; i++) {
                    if (i !== this.key) {
                        newArr[i] = false;
                    }
                }
                // update the specific index
                newArr[this.key] = bool;
                return newArr;
            });
        } else {
            this.setIsDragging((prev) => {
                // create a copy of the previous array or initialize it as an empty array
                const newArr = prev ? [...prev] : [];
                // update the isDragging property of the specific index
                newArr[this.key] = bool;
                return newArr;
            });
        }
    }

    getIsDragging() {
        return this.isDragging;
    }

    handleClickLine = () => {
        this.updateIsDragging(true);
    };

    handleMouseDown = (dotIndex) => {
        this.currentDotIndex = dotIndex;
    }
    handleUpdateDots = (newDot) => {
        this.dots[this.currentDotIndex] = newDot;
        const len = this.dots.length;
        for (let i = 0; i < len; ++i) {
            this.editAlphabetDots(null, this.dots, i, this.alphabetDots[i], true);
        }
        this.setCurrent([this.dots[0],
            this.dots[1],
            this.dots[2],
            this.dots[3]]);
    }
    handleMouseMove = (e) => {
        if (this.currentDotIndex !== null)// && this.isDragging)
        {
            const newX = e.clientX;
            const newY = e.clientY;
            // update the position of the circle
            this.updateDots(Point(newX, newY));
        }
    };
getCurrentDotIndex(){
    return this.currentDotIndex;
}
    updateDots(point) {
        console.log("need to implement in subClass");
    }

    handleMouseUp() {
        this.currentDotIndex = null;
    };

}

export default Shape;
