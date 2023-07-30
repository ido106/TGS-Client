import {Col} from "react-bootstrap";
import React from "react";

const convertPatternToTile = {
    "[A-Z]{1}": "enter a capital letter",
    "[A-Z]{2}": "enter 2 capital letters",
    "[A-Z]{3}": "enter 3 capital letters",
    "[0-9]*": "enter a number",
    "[+-*/]": "enter a math sign: +,-,* or/"
}

function Opt(id, inp, temp) {
    return {id: id, input: inp, template: temp};
}

export function Template(id,temp = [], letters, handleChange) {
    const name = `templateId templateId-${id}`;
    return (
        <div>
            <Col className="templateCol">
                {temp.map((input, index) =>
                    <div
                    className= {name}>
                        {isElement(input) ?
                            <input
                                key={index}
                                id={`templateInput_${index}`}
                                // placeholder={input.exp}
                                title={convertPatternToTile[input.pattern]}
                                pattern={input.pattern}
                                className="templateInput template"
                                type="text"
                                maxLength={input.element}
                                onClick={() => {
                                    window.InputId = `templateInput_${index}`;
                                    console.log(window.InputId);
                                }}
                            /> : <p key={index} className="templateP template">{input}</p>}
                    </div>
                )}
            </Col>
        </div>
    );
}

const isElement = (elm) => {
    return typeof elm === "object" && "element" in elm && "pattern" in elm;
}
const element = (elm, pat, exp = []) => {
    // return {element: elm, pattern: pat,exp:exp};
    return {element: elm, pattern: pat};
}

export const optionInputGiven = [
    // GIVEN (code 0)
    // Angle
    Opt(2, "זווית שווה לזווית / ביטוי", [element(50, "[1-9]{50}"), " = ", element(50, "[A-Z]{50}"), "∢"]),
    Opt(15, "ישרים מאונכים", ["°", "90", " = ", element(3, "[A-Z]{3}"), "∢"]),

    // Line
    Opt(12, "ישר שווה לישר / ביטוי" , [element(50, "[A-Z]{50}"), " = ", element(50, "[A-Z]{50}")]),

    // Others
    Opt(1, "משולש", ["משולש ", element(1, "[A-Z]{1}"),element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]), // Triangle
    Opt(3, "ישרים נחתכים", ["הישרים ", element(2, "[A-Z]{2}"), " , ", element(2, "[A-Z]{2}"), "נחתכים בנקודה", element(1, "[A-Z]{1}")]),
    Opt(4, "שני ישרים מקבילים הנחתכים על ידי ישר שלישי", ["הישרים ", element(2, "[A-Z]{2}"), " , ",
     element(2, "[A-Z]{2}"), " הם מקבילים ונחתכים על ידי הישר ", element(2, "[A-Z]{2}"),
     " בנקודות " , element(1, "[A-Z]{1}"), ",", element(1, "[A-Z]{1}")]),
    Opt(5, "משולש ישר זווית", ["משולש ישר זווית ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"),
        " שזוויתו הישרה " , element(3, "[A-Z]{3}"), "∢"]),
    Opt(6, "משולש שווה שוקיים", ["משולש שווה שוקיים ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"),
        " שבסיסו ", element(2, "[A-Z]{2}")]),
    Opt(7, "משולש שווה צלעות", ["משולש שווה צלעות ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]),
    Opt(8, "גובה במשולש", ["הישר ", element(2, "[A-Z]{2}"), " הוא גובה במשולש ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]),
    Opt(9, "תיכון במשולש", ["הישר ", element(2, "[A-Z]{2}"), " הוא תיכון במשולש ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]),
    Opt(10, "חוצה זווית", ["הישר ", element(2, "[A-Z]{2}"), " הוא חוצה זווית במשולש " , element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]),
    Opt(11, "זווית חיצונית למשולש", ["הנקודה ", element(1, "[A-Z]{1}"),  " על המשך הצלע ", element(2, "[A-Z]{2}"), " יוצרת זווית חיצונית למשולש ", element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}"), element(1, "[A-Z]{1}")]),
    Opt(16, "ישרים מקבילים", ["הישר ", element(2, "[A-Z]{2}"), " מקביל לישר ", element(2, "[A-Z]{2}")]),
];

export const optionInputProve = [
    // FIND (code 2)
    Opt(201, "חישוב אורך ישר / קטע", ["אורך קטע " , element(2, "[A-Z]{2}") ,]), // "Line"
    Opt(202, "חישוב גודל זווית", ["גודל הזווית ", element(3, "[A-Z]{3}"),"∢" ,]), // "Angle"

    // PROVE (code 1)
    Opt(101, "ישר שווה לישר אחר", [element(2, "[A-Z]{2}"), " = ", element(2, "[A-Z]{2}")]),
    Opt(102, "משולש ישר זווית", ["המשולש ", element(3, "[A-Z]{3}"), " הוא משולש ישר זווית"]),
    Opt(103, "משולש שווה שוקיים", ["המשולש ", element(3, "[A-Z]{3}"), " הוא משולש שווה שוקיים"]),
    Opt(104, "משולש שווה צלעות", ["המשולש ", element(3, "[A-Z]{3}"), " הוא משולש שווה צלעות"]),
    Opt(105, "זויות שוות", [element(3, "[A-Z]{3}"), "∢", " = ", element(3, "[A-Z]{3}"), "∢"]),
    Opt(106, "שטח משולש", ["שטח המשולש ", element(3, "[A-Z]{3}")]),
    Opt(107, "היקף משולש", ["היקף המשולש ", element(3, "[A-Z]{3}")]),
    Opt(108, "משולשים חופפים", ["המשולש ", element(3, "[A-Z]{3}"), " חופף למשולש ", element(3, "[A-Z]{3}")]),
    Opt(109, "דמיון משולשים", ["המשולש ", element(3, "[A-Z]{3}"), " דומה למשולש ", element(3, "[A-Z]{3}")]),
    Opt(110, "ישרים מקבילים", ["הישר ", element(2, "[A-Z]{2}"), " מקביל לישר ", element(2, "[A-Z]{2}")]),
];