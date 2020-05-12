import React from "react";
import GetNonogram from "./GetNonogram";

class Solving extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    This is the solving page!
                </h1>
                <GetNonogram id={this.props.match.params.id}></GetNonogram>
            </div>
        );
    }
}

export default Solving;