import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import "./GetAnswer.css";
// import clock loader from react spinners
import {BeatLoader} from "react-spinners";

const GetAnswer = ({dataList, setDataList, handleSolveClick, setIsStarred,svgRef}) => {

    const [showModal, setShowModal] = useState(false);
    const [answerName, setAnswerName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showTrygoModal, setShowTrygoModal] = useState(false);
    const [isTrygo, setIsTrygo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMissingInfo, setIsMissingInfo] = useState(false);

    const switchSquareRoot = (string) => {
        const regex = /√/g; // Regular expression to match the square root symbol
        return string.replace(regex, "sqrt");
    };

    function switchPow(string) {
        const regexSquaredExpression = /\((.*?)\)(?=\s*²)/g; // Regular expression to match expressions in parentheses before the ² symbol
        return string.replace(regexSquaredExpression, (match) => {
            const expression = match.substring(1, match.length - 1); // Remove the parentheses from the matched expression
            return `(${expression})*(${expression})`; // Replace the expression with (x)*(x)
        }).replace(/²/g, ''); // Remove the ² symbol
    }


    const handleSolve = () => {
        if (answerName === "") {
            setErrorMessage("הכנס שם תקין"); // Set the error message
            return;
        }
        setIsLoading(true); // Loading animation

        var list0 = []; // נתונים
        var list1 = []; // צריך להוכיח/ למצוא
        var list2 = [];

        var ansList = []; // השאלה

        //for each element in the dataList
        for (let i = 0; i < dataList.length; i++) {
            const data = dataList[i];

            if (parseInt(data.id) >= 1 && parseInt(data.id) <= 100) {
                // make a pair ("נתון", data.claim)
                const tup = {"first": "נתון", "second": data.claim};
                ansList.push(tup);
            } else {
                // make a pair ("צריך להוכיח / למצוא", data.claim)
                const tup = {"first": "צריך להוכיח / למצוא", "second": data.claim};
                ansList.push(tup);
            }

            let claim_list = []
            // Given - 0
            if (data.id == "1") { // משולש
                claim_list.push(data.claim[data.claim.length - 1]);
                claim_list.push(data.claim[data.claim.length - 2]);
                claim_list.push(data.claim[data.claim.length - 3]);
                // make a pair ("Triangle", claim_list)
                const tuple = {"first": "Triangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "2") { // זווית שווה לזווית / ביטוי
                let first_val = switchSquareRoot(data.claim[2]);
                first_val = switchPow(first_val)
                claim_list.push(first_val);

                let val = switchSquareRoot(data.claim[0]);
                val = switchPow(val)
                claim_list.push(val);

                // make a key:value pair ("Equation_Angle_Expr", claim_list)
                const tuple = {"first": "Equation_Angle_Expr", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "3") { // ישרים נחתכים
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[5]);

                // make a key:value pair ("TwoLinesCut", claim_list)
                const tuple = {"first": "TwoLinesCut", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "4") { // שני ישרים מקבילים הנחתכים על ידי ישר שלישי
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[5]);
                claim_list.push(data.claim[7]);
                claim_list.push(data.claim[9]);

                // make a key:value pair ("ParallelLinesWithTransversal", claim_list)
                const tuple = {"first": "ParallelLinesWithTransversal", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "5") { // משולש ישר זווית
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[2]);
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[5]);

                // make a key:value pair ("RightTriangle", claim_list)
                const tuple = {"first": "RightTriangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "6") { // משולש שווה שוקיים
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[2]);
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[5]);

                // make a key:value pair ("IsoscelesTriangle", claim_list)
                const tuple = {"first": "IsoscelesTriangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "7") { // משולש שווה צלעות
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[2]);
                claim_list.push(data.claim[1]);

                // make a key:value pair ("EquilateralTriangle", claim_list)
                const tuple = {"first": "EquilateralTriangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "8") { // גובה במשולש
                claim_list.push(data.claim[1][0]);
                claim_list.push(data.claim[1][1]);
                claim_list.push(data.claim[5]);
                claim_list.push(data.claim[4]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("Height_Triangle", claim_list)
                const tuple = {"first": "Height_Triangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "9") { // תיכון במשולש
                claim_list.push(data.claim[1][0]);
                claim_list.push(data.claim[1][1]);
                claim_list.push(data.claim[5]);
                claim_list.push(data.claim[4]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("Median_Triangle", claim_list)
                const tuple = {"first": "Median_Triangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "10") { // חוצה זווית
                claim_list.push(data.claim[1][0]);
                claim_list.push(data.claim[1][1]);
                claim_list.push(data.claim[5]);
                claim_list.push(data.claim[4]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("AngleBisector_Triangle", claim_list)
                const tuple = {"first": "AngleBisector_Triangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "11") { // זווית חיצונית למשולש
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[7]);
                claim_list.push(data.claim[6]);
                claim_list.push(data.claim[5]);

                // make a key:value pair ("ExternAngle_Triangle", claim_list)
                const tuple = {"first": "ExternAngle_Triangle", "second": claim_list};
                list0.push(tuple);
            } else if (data.id == "12") { // "ישר שווה לישר / ביטוי"
                let first_val = switchSquareRoot(data.claim[2]);
                first_val = switchPow(first_val)
                claim_list.push(first_val);

                let val = switchSquareRoot(data.claim[0]);
                val = switchPow(val)
                claim_list.push(val);

                // make a key:value pair ("Equation_Line_Expr", claim_list)
                const tuple = {"first": "Equation_Line_Expr", "second": claim_list};
                list0.push(tuple);
            }
            else if (data.id == "15") { // ישרים מאונכים
                // 3, 1
                claim_list.push(data.claim[3]);
                claim_list.push(data.claim[1]);

                // make a key:value pair ("Equation_Angle_Expr", claim_list)
                const tuple = {"first": "Equation_Angle_Expr", "second": claim_list};
                list0.push(tuple);
            }
            else if (data.id == "16") { // ישרים מקבילים
                // 1, 3
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("ParallelLines", claim_list)
                const tuple = {"first": "ParallelLines", "second": claim_list};
                list0.push(tuple);
            }
            // Prove - 2
            else if (data.id == "101") { // "ישר שווה לישר / ביטוי"
                // 0, 2
                let first_val = switchSquareRoot(data.claim[2]);
                first_val = switchPow(first_val)
                claim_list.push(first_val);

                let val = switchSquareRoot(data.claim[0]);
                val = switchPow(val)
                claim_list.push(val);

                // make a key:value pair ("Equation_Line_Expr", claim_list)
                const tuple = {"first": "Equation_Line_Expr", "second": claim_list};
                list2.push(tuple);
                console.log(tuple)
            } else if (data.id == "102") { // משולש ישר זווית
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("RightTriangle", claim_list)
                const tuple = {"first": "RightTriangle", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "103") { // משולש שווה שוקיים
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("IsoscelesTriangle", claim_list)
                const tuple = {"first": "IsoscelesTriangle", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "104") { // משולש שווה צלעות
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("EquilateralTriangle", claim_list)
                const tuple = {"first": "EquilateralTriangle", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "105") { // זוויות שוות
                // 3, 0
                let first_val = switchSquareRoot(data.claim[3]);
                first_val = switchPow(first_val)
                claim_list.push(first_val);

                let val = switchSquareRoot(data.claim[0]);
                val = switchPow(val)
                claim_list.push(val);

                // make a key:value pair ("Equation_Angle_Expr", claim_list)
                const tuple = {"first": "Equation_Angle_Expr", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "106") { // שטח משולש
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("Area_Triangle", claim_list)
                const tuple = {"first": "Area_Triangle", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "107") { // היקף משולש
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("Perimeter_Triangle", claim_list)
                const tuple = {"first": "Perimeter_Triangle", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "108") { // משולשים חופפים
                // 1, 3
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("TrianglesCongruent", claim_list)
                const tuple = {"first": "TrianglesCongruent", "second": claim_list};
                list2.push(tuple);
            } else if (data.id == "109") { // דמיון משולשים
                // 1, 3
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("TriangleSimilarity", claim_list)
                const tuple = {"first": "TriangleSimilarity", "second": claim_list};
                list2.push(tuple);
            }
            else if (data.id == "110") { // ישרים מקבילים
                // 1, 3
                claim_list.push(data.claim[1]);
                claim_list.push(data.claim[3]);

                // make a key:value pair ("ParallelLines", claim_list)
                const tuple = {"first": "ParallelLines", "second": claim_list};
                list2.push(tuple);
            }
            // Find - 1
            else if (data.id == "201") { // חישוב אורך ישר / קטע
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("Line", claim_list)
                const tuple = {"first": "Line", "second": claim_list};
                list1.push(tuple);
            } else if (data.id == "202") { // חישוב גודל זווית
                // 1
                claim_list.push(data.claim[1]);

                // make a key:value pair ("Angle", claim_list)
                const tuple = {"first": "Angle", "second": claim_list};
                list1.push(tuple);
            }
        }

        // make a dictionary with "0":list0 and "1":list1 and "2":list2
        const dict = {0: list0, 1: list1, 2: list2};


        // create an object with id:window.userID and q:dict
        const info = {id: window.UserID, q: dict, name: answerName, isTrigo: isTrygo, quest: ansList, svg:svgRef?svgRef.current.outerHTML:""};
        console.log("Before Solution")
        console.log(JSON.stringify(info))

        setShowModal(false); // Close the modal before the fetch request

        fetch('http://localhost:7025/api/Solution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                // if a 400 error is returned or data.claimAndReason is {}
                setIsLoading(false); // Stop the loading animation
                if (data.status == 400 || Object.keys(data.claimAndReason).length == 0) {
                    // open the modal with the missing info message for 3 seconds
                    setAnswerName("");

                    setIsMissingInfo(true);
                    setTimeout(() => {
                        setIsMissingInfo(false);
                    }, 3000);
                } else {
                    window.answer = data;
                    setDataList([]);
                    handleSolveClick();
                    // Close the modal
                    setAnswerName(""); // Reset the answer name
                    setIsStarred(false)
                }
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false); // Stop the loading animation
            });
    }

    const openModal = () => {
        console.log(dataList)
        if (window.UserID == null) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } else {
            //setShowModal(true);
            setShowTrygoModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setAnswerName(""); // Reset the answer name when the modal is closed
        setErrorMessage(""); // Reset the error message when the modal is closed
    };

    const closeLoadingModal = () => {
        setIsLoading(false);
    };

    const closeTrygoModal = () => {
        setShowTrygoModal(false);
    };

    // close missing info
    const closeMissingInfo = () => {
        setIsMissingInfo(false);
    };

    const handleNameChange = event => {
        setAnswerName(event.target.value);
        setErrorMessage(""); // Reset the error message when the name is changed
    };

    return (
        <div>
            <Button className="getAnswer_bt"
                    variant="outline-dark"
                    onClick={openModal}>
                פתור
            </Button>

            <Modal show={showModal} onHide={closeModal} dialogClassName="text-right" centered>
                <Modal.Body className="text-center bold-text">
                    בחר שם לפתרון
                    <Form.Control type="text" value={answerName} onChange={handleNameChange}
                                  placeholder="יואל גבע עמוד 43 שאלה 4" className="text-right"/>
                    {errorMessage && <div className="error-message text-right">{errorMessage}</div>}
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <Button variant="secondary" onClick={closeModal}>
                        בטל
                    </Button>
                    <Button variant="primary" onClick={() => handleSolve(dataList)}>
                        פתור
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPopup} onHide={() => setShowPopup(false)} dialogClassName="text-right" centered>
                <Modal.Body className="text-center bold-text">התחבר כדי לפתור את השאלה</Modal.Body>
            </Modal>

            <Modal show={showTrygoModal} onHide={closeTrygoModal} dialogClassName="text-right" centered>
                <Modal.Body className="text-center bold-text">?לפתור גיאומטרית או טריגונומטרית</Modal.Body>
                <Modal.Footer className="text-right">
                    <Button variant="secondary" onClick={() => {
                        setIsTrygo(true);
                        setShowTrygoModal(false);
                        setShowModal(true);
                    }}>
                        טריגונומטרית
                    </Button>
                    <Button variant="primary" onClick={() => {
                        setShowTrygoModal(false)
                        setShowModal(true)
                    }}>
                        גיאומטרית
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Missing Info window */}
            <Modal show={isMissingInfo} onHide={closeMissingInfo} dialogClassName="text-right" centered>
                <Modal.Body className="text-center bold-text">חסרים נתונים לפתרון השאלה, אנא תקן את הנתונים</Modal.Body>
            </Modal>

            {/* Loading animation */}
            <Modal show={isLoading} onHide={closeLoadingModal} dialogClassName="text-right invisible-modal" centered>
                <Modal.Body className="text-center bold-text">
                    <BeatLoader color={"#3692d6"} loading={true} size={70} centered/>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default GetAnswer;
