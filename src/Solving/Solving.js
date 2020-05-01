import React from "react";
import Puzzle from "./Puzzle";
import GetNonogram from "./GetNonogram";

class Solving extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    This is the solving page!
                </h1>
                <GetNonogram></GetNonogram>
            </div>
        );
    }
}

export default Solving;