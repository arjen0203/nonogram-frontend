import React from "react";
import SquareStyle from './SquareStyle.module.css';

class Square extends React.Component {
    render() {
        return (
            <div className={SquareStyle.square}>{this.props.value}</div>
        );
    }
}

export default Square;