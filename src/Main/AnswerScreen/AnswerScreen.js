import React, {useEffect, useRef, useState} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./AnswerScreen.css";
import {Col, Container, Row} from "react-bootstrap";

function AnswerScreen({text, resetSolveScreen, isStarred, setIsStarred, IsNotFav}) {
    let claimAndReason;
    let ans_id;
    let question;
    let svg;

    if (text === "חזור לדף הבית") {
        claimAndReason = window.answer.claimAndReason;
        ans_id = window.answer.id;
        question = window.answer.quest;
        svg = window.answer.svg;
    } else if (text === "חזור להיסטוריה") {
        claimAndReason = window.FromHistoryAnswer.claimAndReason;
        ans_id = window.FromHistoryAnswer.id;
        question = window.FromHistoryAnswer.quest;
        svg = window.FromHistoryAnswer.svg;
    } else { // חזור למועדפים
        claimAndReason = window.FromSavedAnswer.claimAndReason;
        ans_id = window.FromSavedAnswer.id;
        question = window.FromSavedAnswer.quest;
        svg = window.FromSavedAnswer.svg;
    }


    const updatedQuestion = question.map(item => {
        const {first, second} = item;
        const reversedSecond = second.slice().reverse();
        const concatenated = reversedSecond.slice(0).join(" "); // Join elements with space

        return {
            first,
            second: concatenated
        };
    });

    question = updatedQuestion;

    const handleSave = () => {
        // Prepare the data
        const data = {
            user_id: window.UserID,
            answer_id: ans_id,
        };

        // Send the POST request
        fetch("http://localhost:7025/api/Solution/Star", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                setIsStarred(true);
            })
            .catch((error) => {
                // Handle any errors
                console.error("Error:", error);
            });
    };

    const handleUnsave = () => {
        // Prepare the data
        const data = {
            user_id: window.UserID,
            answer_id: ans_id,
        };

        // Send the POST request
        fetch("http://localhost:7025/api/Solution/RemoveStar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                setIsStarred(false);
            })
            .catch((error) => {
                // Handle any errors
                console.error("Error:", error);
            });
    };


    const handleBackToMenu = () => {
        if (text === "חזור לדף הבית") {
            setIsStarred(false)
            window.answer = null;
        } else if (text === "חזור להיסטוריה") {
            window.FromHistoryAnswer = null;
        } else { // חזור למועדפים
            window.FromSavedAnswer = null;
        }
        window.answer = null;
        resetSolveScreen();
    };


    return (
        <Container>
            <Row>

                {svg ? <Col className="svg-as-img">
                    <div dangerouslySetInnerHTML={{__html: svg}}/>
                </Col> : null}
                <Col>
                    <div className="question-data">

                        <div className="question-title">שאלה</div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th className="right-aligned">נתון / צריך להוכיח</th>
                                <th className="right-aligned">טענה</th>
                            </tr>
                            </thead>
                            <tbody>
                            {question.map((item, index) => (
                                <tr key={index}>
                                    <td className="right-aligned">{item.first}</td>
                                    <td className="right-aligned">{item.second}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>

                        <div className="solution-title">פתרון</div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th className="right-aligned">נימוק</th>
                                <th className="right-aligned">טענה</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(claimAndReason).map(([claim, explanation]) => (
                                <tr key={claim}>
                                    <td className="right-aligned">{explanation}</td>
                                    <td className="right-aligned">{claim}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="button-container buttons-data">

                        {IsNotFav && (
                            <>
                                {isStarred ? (
                                    <Button
                                        className="getAnswer_bt center green-button"
                                        variant="primary"
                                        onClick={handleUnsave}
                                    >
                                        נשמר
                                    </Button>
                                ) : (
                                    <Button
                                        className="getAnswer_bt center"
                                        variant="primary"
                                        onClick={handleSave}
                                    >
                                        שמור פתרון
                                    </Button>
                                )}
                            </>
                        )}
                        <Button
                            className="getAnswer_bt center"
                            variant="secondary"
                            onClick={handleBackToMenu}
                        >
                            {text}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AnswerScreen;
