import React, {useState} from "react";

const next = 'A';

function Dot({id, point, onMouseDown}){
    return(
        <circle
            key={id}
            //bottom
            cx={point.x}
            cy={point.y}
            r={7}
            fill="lightblue"
            stroke="black"
            onMouseDown={()=>onMouseDown(id)}

        />
    );
}
export default Dot;
