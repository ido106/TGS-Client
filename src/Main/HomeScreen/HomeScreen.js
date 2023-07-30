import React, {useEffect, useRef, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeScreen.css';
import DrawingQ from "./DrawingSide/DrawingQ";
import WritingQ from "./WritingSide/WritingQ";
import {Col, Container, Row} from "react-bootstrap";


const HomeScreen = ({dataList, setDataList, handleSolveClick, handleSaveAnswer,
    setIsStarred}) => {
    useEffect(() => {
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }, [dataList]);


   const [svgRef,setSvgRef] = useState("");

    return (
        <Container className="homeScreen">
            <Row>
                <Col className="DrawingQ">
                    <DrawingQ
                        setSvgRef={setSvgRef}
                        dataList={dataList}
                        setDataList={setDataList}
                    />
                </Col>
                <Col className="WritingQ">
                    <WritingQ
                        dataList={dataList}
                        setDataList={setDataList}
                        handleSolveClick={handleSolveClick}
                        handleSaveAnswer={handleSaveAnswer}
                        setIsStarred={setIsStarred}
                        svgRef={svgRef}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default HomeScreen;
