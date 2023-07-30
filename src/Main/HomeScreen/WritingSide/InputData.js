import {Button, Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import {optionInputGiven, optionInputProve, Template} from "../../../server/DataBase";
import ArithmeticToolbar from "./ArithmeticToolbar";

function InputData({dataList, setDataList, selectedButton, typeQ, handleButtonClick}) {
    const [input, setInput] = useState("");
    const [question, setQuestion] = useState("");
    const [letters, setLetters] = useState("");
    const handleChange = (e) => {
        const {value} = e.target;
        let newLetters = "";
        for (let val of value) {
            newLetters += val.toUpperCase();
        }

        setLetters(newLetters);
    }

    
      
    return (
        <div>
            <Row>
                <ArithmeticToolbar
                    setInput={setInput}
                    input={input}
                    setQuestion={setQuestion}
                    question={question}
                    handleButtonClick={handleButtonClick}
                    selectedButton={selectedButton}/>
            </Row>
            <Row>
                <Col className="addCol col-1">
                    <Button variant="outline-dark add_bt" onClick={() => {
                        window.InputId = null;

                        const templateElems = Array.from(document.querySelectorAll(".template")).sort((a, b) => {
                            const aIndex = parseInt(a.classList[1].split("-")[1]); // get the index from the class name
                            const bIndex = parseInt(b.classList[1].split("-")[1]); // get the index from the class name
                            return aIndex < bIndex;
                        });
                        const templateId = Array.from(document.querySelectorAll(".templateId"));

                        const values = {
                            id:templateId[0].classList[1].split("-")[1],
                            claim: templateElems.map(elem => elem.value || elem.innerText),
                            exp: typeQ[selectedButton]
                        };
                        setDataList([...dataList, values]);
                        setLetters("");
                        setInput("");
                        setQuestion('');
                    }}>
                        הוסף
                    </Button>
                </Col>
                {question !== "" ?
                    <Col>
                        {Template(question.id,question.template, letters, handleChange)}
                    </Col>
                    : <Col className='templates'>
                        <input
                            dir="rtl"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Col>}
                <Col className="clearAllCol col-1">

                <Button
                className="clearAll_bt"
                variant="outline-dark"
                onClick={() => {
                    window.InputId = null;
                    
                    setLetters("");
                    setInput("");
                    setQuestion("");
                }}
            >
                X
            </Button>
                </Col>
            </Row>
            {input !== "" ? (
                <div style={{height: "150px", overflowY: "scroll", overflowX: "hidden"}}>
                    {selectedButton === 0 ?
                        optionInputGiven.filter((opt) =>
                            opt.input.includes(input)).map((elm, index) =>
                            <Row>
                                <Col>
                                    <option
                                        key={index}
                                        className='border' value={elm.input} onClick={(event) => {
                                        setQuestion(elm);
                                        setInput("");
                                    }}
                                        style={{cursor: "pointer"}}>{elm.input}
                                    </option>
                                </Col>
                            </Row>
                        ) : optionInputProve.filter((opt) =>
                            opt.input.includes(input)).map((elm, index) =>
                            <Row>
                                <Col>
                                    <option
                                        key={index}
                                        className='border' value={elm.input} onClick={(event) => {
                                        setQuestion(elm);
                                        setInput("");
                                    }}
                                        style={{cursor: "pointer"}}>{elm.input}
                                    </option>
                                </Col>
                            </Row>
                        )}
                </div>
            ) : null}
        </div>);

}

export default InputData;
