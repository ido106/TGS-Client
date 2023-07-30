import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";

import './WritingQ.css'
import GetAnswer from "./GetAnswer";
import DataQ from "./DataQ";
import InputData from "./InputData";
import ArithmeticToolbar from "./ArithmeticToolbar";


const WritingQ = ({
                      dataList, setDataList, handleSolveClick, handleSaveAnswer,
                      setIsStarred,svgRef
                  }) => {
    const typeQ = {0: "נתון", 1: "צריך להוכיח/ למצוא"};
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };


    return (
        <Container className="writingContainer ">
            <Row>
                <Container className="data">
                    <Row>
                        <Col className="col-12">
                            <ButtonGroup className="WritingQ_bt Hebrew">
                                <Button variant="outline-dark"
                                        className={selectedButton === 0 ? "active" : ""}
                                        onClick={() => handleButtonClick(0)}>
                                    {typeQ[0]}
                                </Button>
                                <Button variant="outline-dark"
                                        className={selectedButton === 1 ? "active" : ""}
                                        onClick={() => handleButtonClick(1)}>
                                    {typeQ[1]}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>


                    <InputData
                        dataList={dataList}
                        setDataList={setDataList}
                        selectedButton={selectedButton}
                        typeQ={typeQ}
                        handleButtonClick={handleButtonClick}
                        />
                    <Row>
                        <Col className="col-12">
                            <DataQ dataList={dataList} setDataList={setDataList}/>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row className="writing_bottom">
                <Col className="col-12">
                    <ButtonGroup className="details Hebrew">
                        <GetAnswer dataList={dataList}
                                   setDataList={setDataList}
                                   handleSolveClick={handleSolveClick}
                                   handleSaveAnswer={handleSaveAnswer}
                                   setIsStarred={setIsStarred}
                                   svgRef={svgRef}/>
                    </ButtonGroup>

                </Col>
            </Row>
        </Container>

    )
        ;
}
export default WritingQ;
