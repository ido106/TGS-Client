import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Form, Modal} from "react-bootstrap";

import {optionInputGiven, optionInputProve} from "../../../server/DataBase";

function ArithmeticToolbar({ setInput, input,setQuestion,question, handleButtonClick,
    selectedButton}) {
    const getCurrentIndex = (inputElement) => {
        if (!inputElement) return -1; // Input element doesn't exist

        return inputElement.selectionStart; // Get the current index of the caret
      };


    return (
        <ButtonGroup className="shape_bt Hebrew">
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        handleButtonClick(1);
                        for (const opt of optionInputProve) {
                            if(opt.input === "משולשים חופפים"){
                                setQuestion(question=>opt);
                                break;
                            }
                        }
                    }}
            >
                ≅
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        handleButtonClick(0);
                        for (const opt of optionInputGiven) {
                            if(opt.input === "ישרים מאונכים"){
                                setQuestion(question=>opt);
                                break;
                            }
                        }
                    }}
            >
                ⊥
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        if(selectedButton == 0){
                            handleButtonClick(0);
                            for (const opt of optionInputGiven) {
                                if(opt.input === "ישרים מקבילים"){
                                    setQuestion(question=>opt);
                                    break;
                                }
                            }
                        }
                        else{
                            handleButtonClick(1);
                            for (const opt of optionInputProve) {
                                if(opt.input === "ישרים מקבילים"){
                                    setQuestion(question=>opt);
                                    break;
                                }
                            }
                        }
                    }}
            >
                ||
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        handleButtonClick(0);
                        for (const opt of optionInputGiven) {
                            if(opt.input === "זווית שווה לזווית / ביטוי"){
                                setQuestion(question=>opt);
                                break;
                            }
                        }
                    }}
            >
                ∢
            </Button>
            {/*<Button className="shape_bt"*/}
            {/*        variant="outline-dark"*/}
            {/*        onClick={() => {*/}
            {/*            const inputId = window.InputId; // Get the input ID stored in window.InputId*/}
            {/*            if (!inputId) {*/}
            {/*                // do nothing*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            const inputElement = document.getElementById(inputId); // Get the input element using the ID*/}
            {/*            const currentIndex = getCurrentIndex(inputElement); // Get the current index*/}
            {/*            */}
            {/*        */}
            {/*            if (inputElement && inputElement.tagName.toLowerCase() === 'input') {*/}
            {/*              // add the above value after currentIndex*/}
            {/*                inputElement.value = inputElement.value.slice(0, currentIndex) + '()²' + inputElement.value.slice(currentIndex);*/}
            {/*            }*/}
            {/*          }}*/}
            {/*>*/}
            {/*    ²*/}
            {/*</Button>*/}
            {/*<Button className="shape_bt"*/}
            {/*        variant="outline-dark"*/}
            {/*    onClick={() => {*/}
            {/*        const inputId = window.InputId; // Get the input ID stored in window.InputId*/}
            {/*        if (!inputId) {*/}
            {/*            // do nothing*/}
            {/*            return;*/}
            {/*        }*/}
            {/*        const inputElement = document.getElementById(inputId); // Get the input element using the ID*/}
            {/*        const currentIndex = getCurrentIndex(inputElement); // Get the current index*/}
            {/*    */}
            {/*        if (inputElement && inputElement.tagName.toLowerCase() === 'input') {*/}
            {/*            // add the above value after currentIndex*/}
            {/*            inputElement.value = inputElement.value.slice(0, currentIndex) + '√()' + inputElement.value.slice(currentIndex);*/}
            {/*        }*/}
            {/*      }}*/}
            {/*>*/}
            {/*    √*/}
            {/*</Button>*/}
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        const inputId = window.InputId; // Get the input ID stored in window.InputId
                        if (!inputId) {
                            // do nothing
                            return;
                        }
                        const inputElement = document.getElementById(inputId); // Get the input element using the ID
                        const currentIndex = getCurrentIndex(inputElement); // Get the current index

                        if (inputElement && inputElement.tagName.toLowerCase() === 'input') {
                            // add the above value after currentIndex
                            inputElement.value = inputElement.value.slice(0, currentIndex) + '/()' + inputElement.value.slice(currentIndex);
                        }
                      }}
            >
                /
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        const inputId = window.InputId; // Get the input ID stored in window.InputId
                        if (!inputId) {
                            // do nothing
                            return;
                        }
                        const inputElement = document.getElementById(inputId); // Get the input element using the ID
                        const currentIndex = getCurrentIndex(inputElement); // Get the current index

                        if (inputElement && inputElement.tagName.toLowerCase() === 'input') {
                            // add the above value after currentIndex
                            inputElement.value = inputElement.value.slice(0, currentIndex) + '*()' + inputElement.value.slice(currentIndex);
                        }
                      }}
            >
                *
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        const inputId = window.InputId; // Get the input ID stored in window.InputId
                        if (!inputId) {
                            // do nothing
                            return;
                        }
                        const inputElement = document.getElementById(inputId); // Get the input element using the ID
                        const currentIndex = getCurrentIndex(inputElement); // Get the current index

                        if (inputElement && inputElement.tagName.toLowerCase() === 'input') {
                            // add the above value after currentIndex
                            inputElement.value = inputElement.value.slice(0, currentIndex) + '-' + inputElement.value.slice(currentIndex);
                        }
                      }}
            >
                -
            </Button>
            <Button className="shape_bt"
                    variant="outline-dark"
                    onClick={() => {
                        const inputId = window.InputId; // Get the input ID stored in window.InputId
                        if (!inputId) {
                            // do nothing
                            return;
                        }
                        const inputElement = document.getElementById(inputId); // Get the input element using the ID
                        const currentIndex = getCurrentIndex(inputElement); // Get the current index

                        if (inputElement && inputElement.tagName.toLowerCase() === 'input') {
                            // add the above value after currentIndex
                            inputElement.value = inputElement.value.slice(0, currentIndex) + '+' + inputElement.value.slice(currentIndex);
                        }
                      }}
            >
                +
            </Button>


        </ButtonGroup>
    );
};

export default ArithmeticToolbar;
