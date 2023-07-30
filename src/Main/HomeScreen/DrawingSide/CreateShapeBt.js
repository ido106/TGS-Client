// import {Button, ButtonGroup} from "react-bootstrap";
// import React, {useEffect, useState} from "react";
// import {Point} from "./Shapes/Line";
// import Rectangle from "./Shapes/Rectangle";
//
//
// function CreateShapeBt({shapes, setShapes,isDragging, setIsDragging}) {
//     // const [centerX, setCenterX] = useState(null);
//     // const [centerY, setCenterY] = useState(null);
//
//     // useEffect(() => {
//     //     const container = document.getElementById("svgContainer");
//     //     const rect = container.getBoundingClientRect();
//     //     console.log("rect.left:" + rect.left + "rect.width" + rect.width);
//     //     const centerX = rect.left + rect.width / 2;
//     //     const centerY = rect.top + rect.height / 2;
//     //     setCenterX(centerX);
//     //     setCenterY(centerY);
//     // }, []);
//
//
//
//
//     return (
//
//         <ButtonGroup className="shape_bt Hebrew">
//             <Button className="shape_bt"
//                     variant="outline-dark"
//                     onClick={() =>
//                         addShape(
//                             new Rectangle(
//                                 [
//                                     Point(100, 100),
//                                     Point(175, 175),
//                                     Point(200, 150),
//                                     Point(125, 75)
//                                 ],
//                                 setCurrent,
//                                 setIsDragging,
//                                 shapes.length
//                             )
//                         )}>
//                 מלבן
//             < /Button>
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark"*/}
//             {/*        onClick={() => addShape(*/}
//             {/*            new circle(*/}
//             {/*                centerX,*/}
//             {/*                centerY,*/}
//             {/*                60,*/}
//             {/*                setIsDragging))} style={{backgroundColor: 'white', border: '1px solid black'}}>*/}
//
//             {/*    עיגול*/}
//             {/*</Button>*/}
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark"*/}
//             {/*        onClick={() => addShape(*/}
//             {/*            new square(*/}
//             {/*                {x: centerX - 100, y: centerY - 50},*/}
//             {/*                100,*/}
//             {/*                setIsDragging))} style={{backgroundColor: 'white', border: '1px solid black'}}>*/}
//
//             {/*    ריבוע*/}
//             {/*</Button>*/}
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark"*/}
//             {/*        onClick={() => addShape(*/}
//             {/*            new rhombus(*/}
//             {/*                {x: centerX, y: centerY},*/}
//             {/*                {x: centerX + 50, y: centerY + 30},*/}
//             {/*                {x: centerX, y: centerY + 60},*/}
//             {/*                {x: centerX - 50, y: centerY + 30},*/}
//             {/*                setIsDragging))} style={{backgroundColor: 'white', border: '1px solid black'}}>*/}
//
//             {/*    מעויין*/}
//             {/*</Button>*/}
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark">*/}
//             {/*    טרפז*/}
//             {/*</Button>*/}
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark">*/}
//             {/*    דלתון*/}
//             {/*</Button>*/}
//             {/*<Button className="shape_bt"*/}
//             {/*        variant="outline-dark">*/}
//             {/*    משולש*/}
//             {/*</Button>*/}
//         </ButtonGroup>
//     );
// }
//
// export default CreateShapeBt;
