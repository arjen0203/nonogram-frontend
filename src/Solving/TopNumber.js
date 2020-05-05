import React from "react";
import SolveNumberStyle from './NumberStyle.module.css';


class TopNumber extends React.Component {
    render() {
        var styling;
        if (this.props.value.holds === false){
            styling = SolveNumberStyle.ToBeSolvedTop
        } else {
            styling = SolveNumberStyle.SolvedTop
        }

        return (
            <div className={styling}>{this.props.value.number}</div>
        );
    }
}

export default TopNumber;