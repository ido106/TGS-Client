let solutionData = {};

class Node {
    constructor(parentNodes, data, exp, val) {
        this.parentNodes = parentNodes;
        this.val = val;
        this.data = data;
        this.exp = exp;
        this.claim = [data.toString()];
        if (val) {
            this.claim.push("=");
            this.claim.push(val.toString());
        }

    }


    print() {
        const visited = new Set();
        const stack = [this];

        while (stack.length > 0) {
            const currentNode = stack.pop();

            if (!visited.has(currentNode)) {
                visited.add(currentNode);
                console.log(`${currentNode.claim.join(" ")}   ${currentNode.exp}`);

                for (const childNode of currentNode.parentNodes) {
                    // console.log(`${currentNode.claim} -> ${childNode.claim}`);

                    stack.push(childNode);
                }
            }
        }
    }
}

class NodeLevel0 {
    constructor(claim, fun) {
        this.parentNodes = [];
        // this.nextNodes = [];
        this.claim = claim;
        // this.fun = fun;
        // fun(claim);
    }
}

function lineWithEqualTriangle(triangle, line) {
    const line1 = triangle[0] + triangle[1];
    const line2 = triangle[1] + triangle[2];
    const line3 = triangle[2] + triangle[0];
    const val = line[2];
    const line1Node = new Node([], line1, "כלל המעבר", val);
    const line2Node = new Node([], line2, "כלל המעבר", val);
    const line3Node = new Node([], line3, "כלל המעבר", val);
    solutionData = {...solutionData, [line1]: line1Node, [line2]: line2Node, [line3]: line3Node}

    if (line[0] === line1) {
        line1Node.exp = "נתון";
        line3Node.parentNodes = [line1Node];
        line2Node.parentNodes = [line1Node];
        return line1Node;
    }
    if (line[0] === line2) {
        line2Node.exp = "נתון";
        line3Node.parentNodes = [line2Node];
        line1Node.parentNodes = [line2Node];
        return line2Node;
    }
    if (line[0] === line3) {
        line3Node.exp = "נתון";
        line1Node.parentNodes = [line3Node];
        line2Node.parentNodes = [line3Node];
        return line3Node;
    }
}

function isCutParallel(line1, line2) {
    if (line1 in solutionData.parallel) {
        const line = solutionData.parallel[line1];
        return [line1, line, line2];
    } else if (line2 in solutionData.parallel) {
        const line = solutionData.parallel[line2];
        return [line2, line, line1];
    } else {
        return [null, null, null];
    }

}

function push(arr, elem, equal = (e1, e2) => e1 === e2) {
    for (const arrElement of arr) {
        if (equal(arrElement, elem)) {
            return;
        }
    }
    arr.push(elem);
}

export function mainS(data) {
    // data = [{id: 4, claim: ["|", "CD", "| = |", "AB", "|"], exp: "נתון"},
    //     {id: 4, claim: ["|", "EF", "| = |", "AB", "|"], exp: "נתון"}]
    for (const d of data) {
        switch (d.id) {
            case 1: {
                const line1 = d.claim[0];
                const line2 = d.claim[2];
                solutionData.parallel = {...solutionData.parallel, [line1]: line2, [line2]: line1}
                let line, cutDot1, cutDot2, angle, angleVal;
                for (const d2 of data) {
                    if (d2.id === 3) {
                        if (d2.claim[1] === line1) {
                            line = d2.claim[3];
                            cutDot1 = d2.claim[5];
                        } else if (d2.claim[1] === line2) {
                            line = d2.claim[3];
                            cutDot2 = d2.claim[5];
                        } else if (d2.claim[3] === line1) {
                            line = d2.claim[1];
                            cutDot1 = d2.claim[5];
                        } else if (d2.claim[3] === line2) {
                            line = d2.claim[1];
                            cutDot2 = d2.claim[5];
                        }
                    } else if (d2.id === 7) {
                        angle = d2.claim[2];
                        angleVal = d2.claim[0];
                    }
                }
                if (line && cutDot1 && cutDot2 && angle && angleVal) {
                    const parallelNode = new Node([], d.claim.join(" "), "נתון", null);
                    anglesWithParallelLines(line1, line2, line, cutDot1, cutDot2, angle, angleVal).parentNodes.push(parallelNode);//G1
                }
            }
                break;
            case 4: {
                const line1 = d.claim[1];
                const line2 = d.claim[3];
                const lineNode1 = new Node([], line2, "נתון", line1);
                const lineNode2 = new Node([], line1, "נתון", line2);
                const equal = (e1, e2) => e1.data === e2.data && e1.val === e2.val;
                line1 in solutionData ?
                    push(solutionData[line1], lineNode1, equal) :
                    solutionData[line1] = [lineNode1];
                line2 in solutionData ?
                    push(solutionData[line2], lineNode2, equal) :
                    solutionData[line2] = [lineNode2];
                let count = 0;
                while(count!==99){
                    count+=1
                }
                for (const node of solutionData[line2]) {
                    if (node.data !== line1) {
                        push(solutionData[node.data], new Node([node,lineNode2], line1, "כלל המעבר", node.data), equal);
                    }
                }
                for (const node of solutionData[line1]) {
                    if (node.data !== line2) {
                        push(solutionData[node.data], new Node([node,lineNode1], line2, "כלל המעבר", node.data), equal);
                    }
                }
            }
                break;

            // case 2:
            //     solutionData = {...solutionData, [d.claim]: [d.claim[0], d.claim[1]]}
            //     verticalLinesNode = new NodeLevel0([d.claim[0], d.claim[1]]);
            //     break;
            // case 3:
            //     const claim = d.claim;
            //     const [line1, line2, cutLine] = isCutParallel(claim[1], claim[3]);
            //     if (line1 !== null && line2 !== null) {
            //
            //         const d2 = arr.find((e) => {
            //
            //                 return e.id === 3 && (
            //                     (e.claim[1] === d.claim[1] && e.claim[3] !== d.claim[3]) ||
            //                     (e.claim[3] === d.claim[1] && e.claim[1] !== d.claim[3]) ||
            //                     (e.claim[1] === d.claim[3] && e.claim[3] !== d.claim[1]) ||
            //                     (e.claim[3] === d.claim[3] && e.claim[1] !== d.claim[1])
            //                 )
            //             }
            //         );
            //         if (d2) {
            //             parallelLinesNode = new NodeLevel0([line1, line2, cutLine, d.claim[5], d2.claim[5]]);
            //             d2.id = -1;
            //         }
            //
            //     }
            //     break;
            // case 4:
            //     solutionData = {...solutionData, [d.claim[1].toString() + "=" + d.claim[3]]: -1}
            //     equalLinesNode = new NodeLevel0(d.claim);
            //     break;
            // case 5:
            //     solutionData = {...solutionData, [d.claim[0].toString() + "=" + d.claim[3]]: -1}
            //     break;
            // case 6:
            //     solutionData = {
            //         ...solutionData,
            //         [d.claim[5]]: d.claim[0].toString() + d.claim[1].toString() + d.claim[2].toString()
            //     }
            //     break;
            // case 7:
            //     solutionData = {...solutionData, [d.claim[2]]: d.claim[0]}
            //     angleNode = new NodeLevel0(d.claim);
            //     break;
            // case 9:
            //     solutionData = {...solutionData, [d.claim[1]]: d.claim[4]}
            //     lineNode = new NodeLevel0(["AB", "=", 10]);
            //     break;
            // case 10:
            //     outAngleNode = new NodeLevel0(["זווית חיצונית", "⦟", "ABE"]);
            //     break;
            // case 11:
            //     break;
            // default:
            //     break;

        }
    }
    // let anglesWithParallelLinesNode;
    // console.log(solutionData)
    // if (parallelLinesNode && angleNode) {
    //     anglesWithParallelLinesNode = anglesWithParallelLines(parallelLinesNode, angleNode);//G1
    // }

    // const
    // const traingleNode = new NodeLevel0(["משולש", "ABC"]);
    // const equalTraingleNode = new NodeLevel0(["משולש שווי צלעות", "ABC"]);
    // const angles60Node = [new Node([equalTraingleNode], "ABC", "משולש שווצ", 60),
    //     new Node([equalTraingleNode], "BCA", "משולש שווצ", 60),
    //     new Node([equalTraingleNode], "CAB", "משולש שווצ", 60)];
    // for (const node of angles60Node) {
    //     solutionData = {...solutionData, [node.data]: node};
    // }
    // const linesEqualsNode = new Node([equalTraingleNode], "AB=BC=CA", "משולש שווצ", null);
    // solutionData = {...solutionData, [linesEqualsNode.claim]: linesEqualsNode};
    //
    //
    // const lineWithEqualTriangleNode = lineWithEqualTriangle(equalTraingleNode.claim[1], lineNode.claim);
    // lineWithEqualTriangleNode.parentNodes.push(lineNode);
    // lineWithEqualTriangleNode.parentNodes.push(linesEqualsNode);
    console.log(solutionData)
    // solutionData.BGE.print()

    return (<></>);

}


function anglesWithParallelLines(line1, line2, cutLine, cutDot1, cutDot2, given, val) {
    let index1 = 1;
    let index2 = 1;
    let indexCut = 0;
    if (given[1] === cutDot2) {
        indexCut = 1;
        const temp = line2;
        line2 = line1;
        line1 = temp;
    }

    let cutDots = [cutDot1, cutDot2];

    if (given[0] === line1[0]) {
        index1 = 0;
    }

    if (given[2] === cutLine[0]) {
        index2 = 0;
    }

    const G1 = new Node([], line1[index1] + cutDots[indexCut] + cutLine[index2], 'נתון', val);
    const G2 = new Node([G1], line1[(index1 + 1) % 2] + cutDots[indexCut] + cutLine[index2], 'הסכום של שתי זוויות צמודות הוא 180', 180 - G1.val);
    const G3 = new Node([G1], line1[(index1 + 1) % 2] + cutDots[indexCut] + cutLine[(index2 + 1) % 2], 'כל שתי זוויות קדקודיות בעלי קדקוד משותף שוות זו לזו', G1.val);
    const G4 = new Node([G1], line1[index1] + cutDots[indexCut] + cutLine[(index2 + 1) % 2], 'הסכום של שתי זוויות צמודות הוא 180', 180 - G1.val);
    const H1 = new Node([G1], line2[index1] + cutDots[(indexCut + 1) % 2] + cutLine[index2], 'זוויות מתאימות שוות זו לזו', G1.val);
    const H2 = new Node([G2], line2[(index1 + 1) % 2] + cutDots[(indexCut + 1) % 2] + cutLine[index2], 'זוויות מתאימות שוות זו לזו', G2.val);
    const H3 = new Node([H1], line2[(index1 + 1) % 2] + cutDots[(indexCut + 1) % 2] + cutLine[(index2 + 1) % 2], 'כל שתי זוויות קדקודיות בעלי קדקוד משותף שוות זו לזו', H1.val);
    const H4 = new Node([G4], line2[index1] + cutDots[(indexCut + 1) % 2] + cutLine[(index2 + 1) % 2], 'זוויות מתאימות שוות זו לזו', G4.val);

    // G2.parentNodes = [G1];
    // G3.parentNodes = [G1];
    // G4.parentNodes = [G1];
    // H1.parentNodes = [G1];
    // H3.parentNodes = [H1];
    // H2.parentNodes = [G2];
    // H4.parentNodes = [G4];

    const arr = [G1, G2, G3, G4, H1, H2, H3, H4];

    for (const node of arr) {
        solutionData = {...solutionData, [node.data]: node}
    }
    return G1;
}
