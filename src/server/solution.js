function parallelLines(data, line1, line2, find) {
    console.log(data, line1, line2, find)
    let cutPoint1 = "";
    let cutPoint2 = "";
    let cutLine = "";
    const cutLines = [];
    let given = [];
    for (let d2 of data) {
        if (d2.claim[4] === "נחתכים בנקודה") {
            let line3 = "";
            let currentLine = "";
            if (d2.claim[1] === line1) {
                if (d2.claim[3] === line2) {
                    console.log("ERROR");
                    return;
                }
                line3 = d2.claim[3];
                currentLine = line1;
            } else if (d2.claim[3] === line1) {
                if (d2.claim[1] === line2) {
                    console.log("ERROR");
                    return;
                }
                line3 = d2.claim[1];
                currentLine = line1;
            } else if (d2.claim[1] === line2) {
                if (d2.claim[3] === line1) {
                    console.log("ERROR");
                    return;
                }
                line3 = d2.claim[3];
                currentLine = line2;
            } else if (d2.claim[3] === line2) {
                if (d2.claim[1] === line1) {
                    console.log("ERROR");
                    return;
                }
                line3 = d2.claim[1];
                currentLine = line2;
            }

            if (line3 !== "" && currentLine !== "") {
                const cutPoint = d2.claim[5];
                cutLines.push([line3, currentLine, cutPoint]);


            }
        }
        const currentClaim = d2.claim;
        if (currentClaim[3] === "⦟" && currentClaim[1] === "=" && !isNaN(parseInt(currentClaim[0]))) {
            given.push({dot: currentClaim[2], val: parseInt(currentClaim[0])});
        }
        // if (currentClaim[0] === "גודל" && currentClaim[2] === "⦟") {
        // }
    } //not cut...
    for (let i = 0; i < cutLines.length; ++i) {
        for (let j = i + 1; j < cutLines.length; ++j) {

            if (cutLines[i][0] === cutLines[j][0] &&
                cutLines[i][1] !== cutLines[j][1]) {
                cutLine = cutLines[i][0];
                if (cutLines[i][1] === line1) {
                    cutPoint1 = cutLines[i][2];
                    cutPoint2 = cutLines[j][2];
                } else {
                    cutPoint1 = cutLines[j][2];
                    cutPoint2 = cutLines[i][2];
                }
            }
        }
    }
    if (find)
        return tree(line1, line2, cutLine, cutPoint1, cutPoint2, given[0], find);
    else
        return isParallel(line1, line2, cutLine, cutPoint1, cutPoint2, given[0], given[1]);
}

function CalcAngle(data, find) {
    console.log(data, find)
    let addData = []
    for (let d of data) {
        //there is parallel lines
        if (d.claim[1] === "||") {
            const line1 = d.claim[0];
            const line2 = d.claim[2];
            addData = parallelLines(data, line1, line2, [find.claim[1]]);
        }
    }
    for (const addDatum of addData) {
        data.push(addDatum);
    }
    return (data);
}

function CalcParallelLines(data, prove) {
    const line1 = prove.claim[0];
    const line2 = prove.claim[2];
    const addData =  parallelLines(data, line1, line2);
    for (const addDatum of addData) {
        data.push(addDatum);
    }
    return data;
}

export function getSolution(dataList) {
    console.log(dataList);
    dataList = [
        {
            claim: [
                "AB",
                "||",
                "CD"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "הישרים",
                "AB",
                ",",
                "EF",
                "נחתכים בנקודה",
                "G"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "הישרים",
                "CD",
                ",",
                "EF",
                "נחתכים בנקודה",
                "H"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "40",
                "=",
                "DHF",
                "⦟"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "גודל",
                "AGE",
                "⦟"
            ],
            exp: "צריך להוכיח/ למצוא"
        }
    ];
    dataList = [
        {
            claim: [
                "הישרים",
                "AB",
                ",",
                "EF",
                "נחתכים בנקודה",
                "G"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "הישרים",
                "CD",
                ",",
                "EF",
                "נחתכים בנקודה",
                "H"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "100",
                "=",
                "BGE",
                "⦟"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "100",
                "=",
                "CHF",
                "⦟"
            ],
            exp: "נתון"
        },
        {
            claim: [
                "CD",
                "||",
                "AB"
            ],
            exp: "צריך להוכיח/ למצוא"
        }
    ];
    let givens = []
    let prove = ""
    for (const d of dataList) {
        if (d.exp === "נתון") {
            givens.push(d);
        } else // === "צריך להוכיח"
        {
            prove = d;
        }
    }
    //calculate angle
    if (prove.claim[0] === "גודל" && prove.claim[2] === "⦟") {
        return CalcAngle(givens, prove);
    }
    if (prove.claim[1] === "||") {
        return CalcParallelLines(givens, prove);
    }

}

class Node {
    constructor(data, exp, fun) {
        this.nextNodes = [];
        this.data = data;
        this.fun = fun;
        this.exp = exp;
    }
}

//{node:G1,val:100}
function hasPath(root, arr, x) {
    if (root == null) {
        return false;
    }
    arr.push({claim: [root.node.data, "=", root.val], exp: root.node.exp});
    if (root.node.data === x) {
        return true;
    }
    for (let i = 0; i < root.node.nextNodes.length; i++) {
        if (hasPath({node: root.node.nextNodes[i], val: root.node.nextNodes[i].fun(root.val)}, arr, x)) {
            return true;
        }
    }

    arr.pop();
    return false;
}

function tree(line1, line2, cutLine, cutDot1, cutDot2, given, find)
{
//     console.log([line1, line2, cutLine, cutDot1, cutDot2, given, find]);
//     let index1 = 1;
//     let index2 = 1;
//     let indexCut = 0;
//     if (given.dot[1] === cutDot2) {
//         indexCut = 1;
//         const temp = line2;
//         line2 = line1;
//         line1 = temp;
//     }
//
//     let cutDots = [cutDot1, cutDot2];
//
//     if (given.dot[0] === line1[0]) {
//         index1 = 0;
//     }
//
//     if (given.dot[2] === cutLine[0]) {
//         index2 = 0;
//     }
//
//     const G1 = new Node(line1[index1] + cutDots[indexCut] + cutLine[index2], 'נתון', null)
//     const G2 = new Node(line1[(index1 + 1) % 2] + cutDots[indexCut] + cutLine[index2], 'צמודות', (x) => 180 - x);//({type:'equal',a:{type:'var',val:'G2'},b:{type:'minus',a:{type:'number',val:180},b:{type:'var',val:'G1'}}});
//     const G3 = new Node(line1[(index1 + 1) % 2] + cutDots[indexCut] + cutLine[(index2 + 1) % 2], 'קודקודיות', (x) => x);
//     const G4 = new Node(line1[index1] + cutDots[indexCut] + cutLine[(index2 + 1) % 2], 'צמודות', (x) => 180 - x);
//     const H1 = new Node(line2[index1] + cutDots[(indexCut + 1) % 2] + cutLine[index2], 'מתאימות', (x) => x);
//     const H2 = new Node(line2[(index1 + 1) % 2] + cutDots[(indexCut + 1) % 2] + cutLine[index2], 'מתאימות', (x) => 180 - x);
//     const H3 = new Node(line2[(index1 + 1) % 2] + cutDots[(indexCut + 1) % 2] + cutLine[(index2 + 1) % 2], 'קודקודיות', (x) => x);
//     const H4 = new Node(line2[index1] + cutDots[(indexCut + 1) % 2] + cutLine[(index2 + 1) % 2], 'מתאימות', (x) => x);
//
//     G1.nextNodes = [G2, G3, G4, H1];
//     H1.nextNodes = [H3];
//     G2.nextNodes = [H2];
//     G4.nextNodes = [H4];
//
//     let data = []
//     for (const angle of find) {
//         let arr = [];
//         hasPath({node: G1, val: given.val}, arr, angle);
//         for (const arrElement of arr) {
//             data.push(arrElement);
//         }
//     }
//
//     console.log(data);
//     return data;
}

function isParallel(line1, line2, cutLine, cutDot1, cutDot2, angle1, angle2) {
    console.log([line1, line2, cutLine, cutDot1, cutDot2, angle1, angle2]);
    let index1 = 1;
    let index2 = 1;
    let indexCut = 0;
    let line = line2;
    if (angle1.dot[1] === cutDot2) {
        indexCut = 1;
        line = line1;
    }

    let cutDots = [cutDot1, cutDot2];

    if (angle1.dot[0] === line1[0]) {
        index1 = 0;
    }

    if (angle1.dot[2] === cutLine[0]) {
        index2 = 0;
    }
    const findAnge = line[index1] + cutDots[(indexCut + 1) % 2] + cutLine[index2];
    let cutDot = cutDot1;
    line = line1;
    if (angle2.dot[1] === cutDot2) {
        cutDot = cutDot2;
        line = line2;
    }
    if (angle2.dot[0] === line1[0]) {
        index1 = 0;
    }

    if (angle2.dot[2] === cutLine[0]) {
        index2 = 0;
    }

    // console.log([angle2, line, cutDot, cutLine, index1, index2])
    const G1 = new Node(line[index1] + cutDot + cutLine[(index2 + 1) % 2], 'נתון', null);
    const G2 = new Node(line[(index1 + 1) % 2] + cutDot + cutLine[index2], 'קודקודיות', (x) => x);
    const G3 = new Node(line[(index1 + 1) % 2] + cutDot + cutLine[(index2 + 1) % 2], 'צמודות', (x) => 180 - x);
    const G4 = new Node(line[index1] + cutDot + cutLine[index2], 'צמודות', (x) => 180 - x);

    G1.nextNodes = [G2, G3, G4];
    let arr = []

    hasPath({node: G1, val: angle2.val}, arr, findAnge);

    if(arr[arr.length-1].claim[2]=== angle1.val){
        arr.push({claim:[line1,"||",line2],exp:"זוויות מתאימות שוות"})
    }else {
        arr.push({claim:[line1,line2,"לא מקבילים"],exp:"זוויות מתאימות אינן שוות"})
    }
    console.log(arr);
    return arr;
}
