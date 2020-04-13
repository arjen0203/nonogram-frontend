import React from "react";
import SolveNumberStyle from './NumberStyle.module.css';


class TopNumber extends React.Component {
    render() {
        return (
            <div className={SolveNumberStyle.ToBeSolvedTop}>{this.props.value}</div>
        );
    }
}

export default TopNumber;