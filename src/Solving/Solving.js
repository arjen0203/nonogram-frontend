import React from "react";
import Puzzle from "./Puzzle";

class Solving extends React.Component {
    render() {
        const top = [[1, 2, 3], [], [2, 3], [3], [], [3], [3]];
        const side = [[3,2,1], [2,1], [1], [], [4]];

        const progress = [[0,0,0,0,0,0,0],
                          [0,0,2,0,0,0,0],
                          [0,0,0,1,0,0,0],
                          [0,0,2,0,0,0,0],
                          [0,0,0,0,1,0,0]];
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