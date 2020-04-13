import React from "react";
import Puzzle from "./Puzzle";

class Solving extends React.Component {
    render() {
        const top = [[1], [5], [2], [5], [2,1], [2]];
        const side = [[2,1], [1,3], [1,2], [3], [4], [1]];

        const progress = [[0,0,0,0,0,0],
                          [0,0,0,0,0,0],
                          [0,0,0,0,0,0],
                          [0,0,0,0,0,0],
                          [0,0,0,0,0,0],
                          [0,0,0,0,0,0]];
        return (
            <div>
                <h1>
                    This is the solving page!
                </h1>
                <Puzzle topRow={top} sideRow={side} solveState={progress}></Puzzle>
            </div>
        );
    }
}

export default Solving;