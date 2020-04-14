import React from "react";
import Puzzle from "./Puzzle";

class Solving extends React.Component {
    render() {
        const top = [[[1, false]], [[5, false]], [[2, false]], [[5, false]], [[2, false],[1, false]], [[2, false]]];
        const side = [[[2, false],[1, false]], [[1,false],[3,false]], [[1,false],[2,false]], [[3,false]], [[4,false]], [[1,false]]];

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