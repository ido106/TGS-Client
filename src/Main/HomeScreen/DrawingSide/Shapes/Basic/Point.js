export function Point(x, y) {
    return {x: x, y: y};
}


export function isPoint(p) {
    return (p.x !== -1 && p.y !== -1);
}
// not a point
export const NaP = Point(-1, -1);



export default Point;
