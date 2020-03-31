import React from "react";
import Square from "./Square";
import PuzzleStyle from "./PuzzleStyle.module.css";

class Puzzle extends React.Component {
    createBoxes() {
        const x = this.props.topRow.length;
        const y = this.props.sideRow.length;

        var items = [];

        for (var i = 0; i < x; i++){
            var row = [];
            for (var j = 0; j < y; j++){
                row.push(<Square value={""}></Square>);
            }
            items.push(<div className={PuzzleStyle.row}> {row} </div>);
        }

        return (<div>{items}</div>);
    }

    render() {
        return (
            <div>
                {this.createBoxes()}
            </div>
        );
    }
}

export default Puzzle;