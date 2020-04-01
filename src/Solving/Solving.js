import React from "react";
import Puzzle from "./Puzzle";

class Solving extends React.Component {
    render() {
        const top = [[1, 2, 3], [2, 3], [3], [3], [3]];
        const side = [[3,2,1], [2,1], [1]];

        return (
            <div>
                <h1>
                    This is the solving page!
                </h1>
                <Puzzle topRow={top} sideRow={side}></Puzzle>
            </div>
        );
    }
}

export default Solving;