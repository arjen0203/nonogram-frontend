import React from "react";
import Puzzle from "./Puzzle";
import GetNonogram from "./GetNonogram";

class Solving extends React.Component {
    render() {
        const top = [[{number: 1, holds: false}], [{number: 5, holds: false}], [{number: 2, holds: false}], [{number: 5, holds: false}], [{number: 2, holds: false},{number: 1, holds: false}], [{number: 2, holds: false}]];
        const side = [[{number: 2, holds: false},{number: 1, holds: false}], [{number: 1, holds: false},{number: 3, holds: false}], [{number: 1, holds: false},{number: 2, holds: false}], [{number: 3, holds: false}], [{number: 4, holds: false}], [{number: 1, holds: false}]];

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
                <GetNonogram></GetNonogram>
            </div>
        );
    }
}

export default Solving;