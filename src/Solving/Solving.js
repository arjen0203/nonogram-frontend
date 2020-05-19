import React from "react";
import GetNonogram from "./GetNonogram";
import './SolvingStyle.scss'

class Solving extends React.Component {
    render() {
        return (
            <div className="center">
                <div className="solving">
                    <GetNonogram id={this.props.match.params.id}></GetNonogram>
                </div>
            </div>
        );
    }
}

export default Solving;