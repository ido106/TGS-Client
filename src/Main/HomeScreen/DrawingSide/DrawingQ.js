import "./DrawingQ.css"
import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Form, Modal} from "react-bootstrap";
import Rectangle from "./Shapes/Quadrilateral/Rectangle";
import Square from "./Shapes/Quadrilateral/Square";
import Rhombus from "./Shapes/Quadrilateral/Rhombus";
import Trapezoid from "./Shapes/Quadrilateral/Trapezoid";
import Kite from "./Shapes/Quadrilateral/Kite";
import Point from "./Shapes/Basic/Point";
import Circle from "./Shapes/circle/Circle";
import TriangleByAngle, {AngleType} from "./Shapes/Triangle/TriangleByAngle/TriangleByAngle";
import TriangleByEdges, {SideType} from "./Shapes/Triangle/TriangleByAngle/TriangleByEdges";
import Triangle from "./Shapes/Triangle/Triangle";
import Line from "./Shapes/Lines/Line";
import {TwoLinesCut} from "./Shapes/Lines/TwoLinesCut";
import {ParallelLinesWithTransversal} from "./Shapes/Lines/ParallelLinesWithTransversal";


function DrawingQ({setSvgRef, dataList, setDataList}) {
    const [showModal, setShowModal] = useState(false);
    const handleCreateClick = () => {
        //close the modal
        setShowModal(false);
        let angle = angleType;
        // create the shape based on the selected options
        if (sideType === SideType.EQUILATERAL && angle === AngleType.ACUTE_ANGLE) {
            setAngleType(null);
            angle = null;
        }


        if (sideType !== null && angle !== null) {
            // addShape(new TriangleByEdgesAndAngle(
            //     editAlphabetDots,
            //     sideType,
            //     setCurrent,
            //     setIsDragging,
            //     shapes.length));
        } else if (sideType !== null) {
            addShape(new TriangleByEdges(
                editAlphabetDots,
                sideType,
                setCurrent,
                setIsDragging,
                shapes.length));
        } else if (angle !== null) {
            addShape(new TriangleByAngle(
                editAlphabetDots,
                angleType,
                setCurrent,
                setIsDragging,
                shapes.length));
        } else {
            console.log("regular");
            //default
            addShape(new Triangle(
                setRotationAngle,
                rotationAngle,
                editAlphabetDots,
                [
                    // Point(200, 100),
                    // Point(350, 350),
                    // Point(250, 260)
                    Point(centerPoint.x - 100, centerPoint.y - 50),
                    Point(centerPoint.x + 100, centerPoint.y - 50),
                    Point(centerPoint.x, centerPoint.y + 50)
                ],
                setCurrent,
                setIsDragging,
                shapes.length));
        }
        setSideType(null);
        setAngleType(null);
    }
    const [angleType, setAngleType] = useState(null);
    const [sideType, setSideType] = useState(null);

    const handleAngleTypeChange = (event) => {

        if (event.target.checked) {
            const type = event.target.value;
            setAngleType(type);
            if (sideType === SideType.EQUILATERAL && type !== AngleType.ACUTE_ANGLE) {
                setSideType(null);
            }
        } else {
            setAngleType(null);
        }
    };

    const handleSideTypeChange = (event) => {
        if (event.target.checked) {
            const type = event.target.value;
            setSideType(type);
            if (type === SideType.EQUILATERAL &&
                angleType !== AngleType.ACUTE_ANGLE) {
                setAngleType(null);
            }
        } else {
            setSideType(null);
        }

    };

    /****************************************/


    const [shapes, setShapes] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [current, setCurrent] = useState([]);
    const [alphabetDots, setAlphabetDots] = useState({
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
        F: null,
        G: null,
        H: null,
        I: null,
        J: null,
        K: null,
        L: null,
        M: null,
        N: null,
        O: null,
        P: null,
        Q: null,
        R: null,
        S: null,
        T: null,
        U: null,
        V: null,
        W: null,
        X: null,
        Y: null,
        Z: null,
    });


    const updateDot = (dot, letter) => {
        setAlphabetDots((prev) => {
            // Find the previous letter of the dot
            let prevLetter = null;
            for (const [key, value] of Object.entries(prev)) {
                if (value === dot) {
                    prevLetter = key;
                    break;
                }
            }
            // Set the previous letter to null
            if (prevLetter) {
                prev[prevLetter] = null;
            }
            // Set the new dot
            prev[letter] = dot;
            return prev;
        });
    }


    function editAlphabetDots(shape, dots, index, letter, update) {
        // init all dots
        if (index === null) {
            const result = [];
            dots.forEach((dot) => {
                let key = Object.keys(alphabetDots).find((k) => alphabetDots[k] === null && !result.includes(k));
                if (key) {
                    result.push(key);
                    updateDot(dot, key);
                }
            });
            return result;
        }
        //given a letter
        if (letter !== null) {
            if (update) {
                updateDot(dots[index], letter);
                return letter;
            }
            //the letter is not used
            if (!alphabetDots[letter]) {
                updateDot(dots[index], letter);
                // setDataList((prev) => {
                //     const filtered = [...prev].filter(e => e !== shape.type);
                //     shape.type = shape.constructTypeString();
                //     filtered.push(shape.type);
                //     return filtered;
                // });


            } else //the letter is already used for different dot
            {
                //error if the dot is used by another dot of this shape
                // if (shape.alphabetDots.includes(letter)){
                //     console.log("here")
                //     return null;
                // }
                //used by another shape's dot
                shape.currentDotIndex = index;
                shape.updateDots(alphabetDots[letter]);
            }

            return letter;
        }

        //find the first letter that null
        for (let key of Object.keys(alphabetDots)) {
            if (alphabetDots[key] === null) {
                setAlphabetDots((prevState) => {
                        prevState[key] = dots[index];
                        return prevState;
                    }
                );
            }
        }
        return null;
    }

    useEffect(() => {
        for (let i = 0; i < shapes.length; i++) {
            shapes[i].changeIsDragging(isDragging[i]);
        }
    }, [isDragging]);

    function addShape(shape) {
        // update isDragging to set all values to false, except for the newly added shape
        setIsDragging((prevIsDragging) => {
            const newIsDragging = new Array(prevIsDragging.length).fill(false);
            newIsDragging.push(true);
            return newIsDragging;
        });
        // add the new shape to shapes
        setShapes((prevShapes) => {
            const newShapes = prevShapes ? [...prevShapes] : []; // create a copy of the previous shapes array or initialize it as an empty array
            newShapes.forEach((s) => s.updateIsDragging(false)); // update the isDragging property of all existing shapes to false
            // add the new shape to the array
            newShapes.push(shape);
            return newShapes;
        });
        // const newData = dataList ? [...dataList] : [];
        // newData.push(shape.type);
        // setDataList(newData);
    }


    const handleMouseUp = () => {
        const shape = shapes.find(s => s.getIsDragging());
        if (shape) {
            shape.handleMouseUp();
        }
    };

    const handleMouseMove = (event) => {
        const shape = shapes.find(shape => shape.getIsDragging());

        if (shape != null) {
            //shape.handleMouseMove(event);

            if (shape.getCurrentDotIndex() != null) {

                const allShapes = [shape];

                for (const s of shapes) {
                    if (s !== shape) {
                        for (let i = 0; i < s.dots.length; ++i) {

                            if (s.alphabetDots[i] === shape.alphabetDots[shape.currentDotIndex]) {
                                s.currentDotIndex = i;
                                //s.isDragging = true;
                                allShapes.push(s);

                            }
                        }
                    }
                }

                for (const shapesElem of allShapes) {
                    shapesElem.handleMouseMove(event);
                    if (shapesElem !== shape) {
                        shapesElem.currentDotIndex = null;
                    }
                }


            }
        }


    }


    const [viewBox, setViewBox] = useState();
    const [point, setPoint] = useState(Point(0, 0));
    const svgRef = useRef(null);
    useEffect(() => {
        const updateViewBox = () => {
            const svgRect = svgRef.current.getBoundingClientRect();
            const newViewBox = `${svgRect.left} ${svgRect.top} ${svgRect.width} ${svgRect.height}`;
            setViewBox(newViewBox);
            setPoint(Point(svgRect.left, svgRect.top));
        };

        updateViewBox(); // call it initially to set the viewBox and point values

        window.addEventListener("resize", updateViewBox);
        window.addEventListener("orientationchange", updateViewBox); // add orientationchange event listener

        return () => {
            window.removeEventListener("resize", updateViewBox);
            window.removeEventListener("orientationchange", updateViewBox); // remove orientationchange event listener
        };
    }, []);

    const [centerPoint, setCenterPoint] = useState(Point(0, 0));

    useEffect(() => {
        const svgRect = svgRef.current.getBoundingClientRect();
        const gridCenterX = svgRect.left + svgRect.width / 2;
        const gridCenterY = svgRect.top + svgRect.height / 2;
        setCenterPoint(Point(gridCenterX, gridCenterY));
    }, []);

    //rotate:
    const [rotationAngle, setRotationAngle] = useState(0);

    function handleRotate() {
        const index = isDragging.findIndex(value => value === true);
        shapes[index].handleRotate();
    }

    useEffect(() => {
        if (shapes.length > 0) {
            setSvgRef(svgRef);
            console.log(svgRef);
        } else {
            setSvgRef("");
        }
    }, [setSvgRef, shapes.length]);


    return (
        <div>
            <svg
                className="border svgContainer"
                ref={svgRef} viewBox={viewBox}
                // xmlns="http://www.w3.org/2000/svg"
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <defs>
                    <pattern id="grid"
                             width="20"
                             height="20"
                             patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20"
                              fill="none"
                              stroke="gray"
                              strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect x={point.x}
                      y={point.y}
                      width="100%"
                      height="100%"
                      fill="url(#grid)"/>

                {shapes.map(s => s.render())}
            </svg>
            <ButtonGroup className="shape_bt Hebrew">
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() => addShape(*/}
                {/*            new Circle(*/}
                {/*                editAlphabetDots,*/}
                {/*                centerPoint.x,*/}
                {/*                centerPoint.y,*/}
                {/*                100,*/}
                {/*                setIsDragging,*/}
                {/*                setCurrent,*/}
                {/*                shapes.length))}>*/}

                {/*    עיגול*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() => addShape(*/}
                {/*            new Rhombus(editAlphabetDots,*/}
                {/*                [*/}
                {/*                    Point(centerPoint.x - 150, centerPoint.y),*/}
                {/*                    Point(centerPoint.x, centerPoint.y + 90),*/}
                {/*                    Point(centerPoint.x + 150, centerPoint.y),*/}
                {/*                    Point(centerPoint.x, centerPoint.y - 90)*/}
                {/*                ],*/}
                {/*                setCurrent,*/}
                {/*                setIsDragging,*/}
                {/*                shapes.length))}>*/}
                {/*    מעויין*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() =>*/}
                {/*            addShape(*/}
                {/*                new Trapezoid(editAlphabetDots,*/}
                {/*                    [*/}
                {/*                        // use centerPoint to center the shape*/}
                {/*                        Point(centerPoint.x - 100, centerPoint.y - 200),*/}
                {/*                        Point(centerPoint.x + 100, centerPoint.y - 200),*/}
                {/*                        Point(centerPoint.x + 50, centerPoint.y),*/}
                {/*                        Point(centerPoint.x - 50, centerPoint.y)*/}
                {/*                    ],*/}
                {/*                    setCurrent,*/}
                {/*                    setIsDragging,*/}
                {/*                    shapes.length*/}
                {/*                )*/}
                {/*            )}*/}
                {/*>*/}
                {/*    טרפז*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() => addShape(*/}
                {/*            new Kite(editAlphabetDots,*/}
                {/*                [*/}
                {/*                    Point(centerPoint.x, centerPoint.y - 200),*/}
                {/*                    Point(centerPoint.x + 100, centerPoint.y),*/}
                {/*                    Point(centerPoint.x, centerPoint.y + 100),*/}
                {/*                    Point(centerPoint.x - 100, centerPoint.y)*/}
                {/*                ],*/}
                {/*                setCurrent,*/}
                {/*                setIsDragging,*/}
                {/*                shapes.length))}>*/}
                {/*    דלתון*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() => addShape(*/}
                {/*            new Triangle(*/}
                {/*                editAlphabetDots,*/}
                {/*                setCurrent,*/}
                {/*                setIsDragging,*/}
                {/*                shapes.length))}>*/}
                {/*    משולש*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() => addShape(*/}
                {/*            new Square(*/}
                {/*                editAlphabetDots,*/}
                {/*                [ // use centerPoint to center the shape*/}
                {/*                    Point(centerPoint.x - 100, centerPoint.y - 100),*/}
                {/*                    Point(centerPoint.x + 100, centerPoint.y - 100),*/}
                {/*                    Point(centerPoint.x + 100, centerPoint.y + 100),*/}
                {/*                    Point(centerPoint.x - 100, centerPoint.y + 100)*/}
                {/*                ],*/}
                {/*                setCurrent,*/}
                {/*                setIsDragging,*/}
                {/*                shapes.length))} style={{backgroundColor: 'white', border: '1px solid black'}}>*/}

                {/*    ריבוע*/}
                {/*</Button>*/}
                {/*<Button className="shape_bt"*/}
                {/*        variant="outline-dark"*/}
                {/*        onClick={() =>*/}
                {/*            addShape(*/}
                {/*                new Rectangle(*/}
                {/*                    editAlphabetDots,*/}
                {/*                    [*/}
                {/*                        // use centerPoint to center the shape*/}
                {/*                        Point(centerPoint.x - 100, centerPoint.y - 50),*/}
                {/*                        Point(centerPoint.x + 100, centerPoint.y - 50),*/}
                {/*                        Point(centerPoint.x + 100, centerPoint.y + 50),*/}
                {/*                        Point(centerPoint.x - 100, centerPoint.y + 50)*/}
                {/*                    ],*/}
                {/*                    setCurrent,*/}
                {/*                    setIsDragging,*/}
                {/*                    shapes.length*/}
                {/*                )*/}
                {/*            )}>*/}
                {/*    מלבן*/}
                {/*</Button>*/}
                <Button className="shape_bt"
                        variant="outline-dark"
                        onClick={() =>
                            addShape(
                                new ParallelLinesWithTransversal(
                                    editAlphabetDots,
                                    [
                                        // use centerPoint to center the shape
                                        Point(centerPoint.x - 100, centerPoint.y - 50),
                                        Point(centerPoint.x + 100, centerPoint.y - 50),
                                        Point(centerPoint.x + 100, centerPoint.y + 50),
                                        Point(centerPoint.x - 100, centerPoint.y + 50),
                                        Point(centerPoint.x - 150, centerPoint.y - 150),
                                        Point(centerPoint.x + 150, centerPoint.y + 150)
                                    ],
                                    setCurrent,
                                    setIsDragging,
                                    shapes.length,
                                    viewBox
                                )
                            )}>
                    מקבילים וישר חותך
                </Button>
                <Button className="shape_bt"
                        variant="outline-dark"
                        onClick={() =>
                            addShape(
                                new TwoLinesCut(
                                    editAlphabetDots,
                                    [
                                        // use centerPoint to center the shape
                                        Point(centerPoint.x - 100, centerPoint.y - 50),
                                        Point(centerPoint.x + 100, centerPoint.y + 50),
                                        Point(centerPoint.x - 250, centerPoint.y - 200),
                                        Point(centerPoint.x + 250, centerPoint.y + 200)
                                    ],
                                    setCurrent,
                                    setIsDragging,
                                    shapes.length
                                )
                            )}>
                    ישרים נחתכים
                </Button>
                <Button className="shape_bt"
                        variant="outline-dark"
                        onClick={() =>
                            addShape(
                                new Line(
                                    editAlphabetDots,
                                    [
                                        // use centerPoint to center the shape
                                        Point(centerPoint.x - 100, centerPoint.y - 50),
                                        Point(centerPoint.x + 100, centerPoint.y + 50)
                                    ],
                                    setCurrent,
                                    setIsDragging,
                                    shapes.length
                                )
                            )}>
                    ישר
                </Button>
                <Button className="shape_bt"
                        variant="outline-dark"
                        onClick={() => addShape(new Triangle(
                            editAlphabetDots,
                            [
                                Point(centerPoint.x - 100, centerPoint.y - 50),
                                Point(centerPoint.x + 100, centerPoint.y - 50),
                                Point(centerPoint.x, centerPoint.y + 50)
                            ],
                            setCurrent,
                            setIsDragging,
                            shapes.length))}>
                    משולש
                </Button>
                {/*<Button*/}
                {/*    onClick={handleRotate}*/}
                {/*>*/}
                {/*    Rotate*/}
                {/*</Button>*/}
            </ButtonGroup>
            <Button
                className="delete_bt"
                onClick={() => {
                    console.log(isDragging);
                    const isDraggingCopy = isDragging.slice(0, isDragging.length - 1).map(() => false);
                    console.log(isDraggingCopy);
                    setIsDragging(isDraggingCopy);
                    const copyShape = [];
                    let index = 0;
                    let currentShape = null;
                    for (const s of shapes) {
                        if (!s.getIsDragging()) {
                            s.key = index;
                            s.setIsDragging = setIsDragging;
                            copyShape.push(s);
                            index++;
                        } else {
                            currentShape = s;
                            setCurrent(null);
                            //setIsDragging(false);
                        }

                    }
                    let letters = currentShape.alphabetDots
                    for (const s of shapes) {
                        if(s!==currentShape){
                            for (const l of s.alphabetDots) {
                                const index = letters.indexOf(l);
                                if (index !== -1) {
                                    letters.splice(index, 1);
                                }
                            }
                        }

                    }
                    setShapes(copyShape);
                    setAlphabetDots((prev) => {
                        console.log(letters)
                        for (const letter of letters) {
                            prev[letter] = null;
                        }
                        return prev;
                    });

                }}
            >
                מחק
            </Button>

            {/*<Modal show={showModal} onHide={() => setShowModal(false)}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>*/}
            {/*            בחר אפשרויות*/}
            {/*        </Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <Form className="Hebrew">*/}
            {/*            <Form.Check type="checkbox" label="חד זווית" value={AngleType.ACUTE_ANGLE}*/}
            {/*                        onChange={handleAngleTypeChange} checked={angleType === "חד זווית"}/>*/}
            {/*            <Form.Check type="checkbox" label="ישר זווית" value={AngleType.RIGHT_ANGLE}*/}
            {/*                        onChange={handleAngleTypeChange} checked={angleType === "ישר זווית"}/>*/}
            {/*            <Form.Check type="checkbox" label="קהה זווית" value={AngleType.OBTUSE_ANGLE}*/}
            {/*                        onChange={handleAngleTypeChange} checked={angleType === "קהה זווית"}/>*/}
            {/*            <Form.Check type="checkbox" label="רגיל" value={null} onChange={handleSideTypeChange}*/}
            {/*                        checked={sideType === null && angleType === null}/>*/}
            {/*            <Form.Check type="checkbox" label="שווה צלעות" value={SideType.EQUILATERAL}*/}
            {/*                        onChange={handleSideTypeChange} checked={sideType === "שווה צלעות"}/>*/}
            {/*            <Form.Check type="checkbox" label="שווה שוקיים" value={SideType.ISOSCELES}*/}
            {/*                        onChange={handleSideTypeChange} checked={sideType === "שווה שוקיים"}/>*/}
            {/*        </Form>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={() => setShowModal(false)}>*/}
            {/*            סגור*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={handleCreateClick}>*/}
            {/*            צור*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}


        </div>
    );

}

export default DrawingQ;
