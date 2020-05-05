import React from "react";
import SolveNumberStyle from './NumberStyle.module.css';


class SideNumber extends React.Component {
    render() {
        var styling;
        if (this.props.value.holds === false){
            styling = SolveNumberStyle.ToBeSolvedSide
        } else {
            styling = SolveNumberStyle.SolvedSide
        }

        return (
            <div className={styling}>{this.props.value.number}</div>
        );
    }
}

export default SideNumber;