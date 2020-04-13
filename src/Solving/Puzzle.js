import React from "react";
import Square from "./Square";
import PuzzleStyle from "./PuzzleStyle.module.css";
import TopNumber from "./TopNumber";
import SideNumber from "./SideNumber";

class Puzzle extends React.Component {
    createBoxes() {
        const x = this.props.topRow.length;
        const y = this.props.sideRow.length;

        var items = [];

        var numbers = [];
        //top number hints
        for (var m = 0; m < x; m++){
            var sameColumn = [];

            for (var n = 0; n < this.props.topRow[m].length; n++){
                sameColumn.push(<TopNumber value={this.props.topRow[m][n]}></TopNumber>)
            }

            if (sameColumn.length === 0){
                sameColumn.push(<TopNumber></TopNumber>)
            }

            numbers.push(<div className={PuzzleStyle.topNumberColumn}>{sameColumn}</div>);
        }
        items.push(<div className={PuzzleStyle.row}> {numbers} </div>);

        //cubes and side number hints
        for (var i = 0; i < y; i++){
            var row = [];

            for (var q = 0; q < this.props.sideRow[i].length; q++){
                row.push(<SideNumber value={this.props.sideRow[i][q]}></SideNumber>)
            }
            if (row.length === 0){
                row.push(<SideNumber></SideNumber>)
            }

            for (var j = 0; j < x; j++){
                const x = i;
                const y = j;
                row.push(<Square value={this.props.solveState[i][j]} onClick={() => this.handleClick(x, y)}></Square>);
            }
            items.push(<div className={PuzzleStyle.row}> {row} </div>);
        }

        return (<div>{items}</div>);
    }

    handleClick(i,j) {
        const solveState = this.props.solveState.slice();
        solveState[i][j] = 1;
        this.setState({solveState: solveState});
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