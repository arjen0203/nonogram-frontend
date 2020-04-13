import React from "react";
import SolveNumberStyle from './NumberStyle.module.css';


class SideNumber extends React.Component {
    render() {
        return (
            <div className={SolveNumberStyle.ToBeSolvedSide}>{this.props.value}</div>
        );
    }
}

export default SideNumber;