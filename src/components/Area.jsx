import {area, curveCatmullRom} from "d3-shape";
import React from "react";

export default props => {
    const { coordinates, color } = props;

    return (
       <path
          fill={color}
          d={area()
             .x(({ arg }) => arg)
             .y1(({ val }) => val)
             .y0(({ startVal }) => startVal)
             .curve(curveCatmullRom)(coordinates)}
          opacity={0.5}
       />
    );
};
