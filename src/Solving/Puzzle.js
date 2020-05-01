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
                sameColumn.push(<TopNumber key={["T",n,m]} value={this.props.topRow[m][n]}></TopNumber>)
            }

            if (sameColumn.length === 0){
                sameColumn.push(<TopNumber key={["T",n,m]}></TopNumber>)
            }

            numbers.push(<div key={["TN",m]} className={PuzzleStyle.topNumberColumn}>{sameColumn}</div>);
        }
        items.push(<div key={"TopNumbers"} className={PuzzleStyle.row}> {numbers} </div>);

        //cubes and side number hints
        for (var i = 0; i < y; i++){
            var row = [];

            for (var q = 0; q < this.props.sideRow[i].length; q++){
                row.push(<SideNumber key={["S",i,q]} value={this.props.sideRow[i][q]}></SideNumber>)
            }
            if (row.length === 0){
                row.push(<SideNumber key={["S",i,q]}></SideNumber>)
            }

            for (var j = 0; j < x; j++){
                const x = i;
                const y = j;
                row.push(<Square key={["C",i,j]}
                    value={this.props.solveState[i][j]}
                                 onMouseDown={(e) => this.onClick(x, y, e)}
                                 onContextMenu={(e) => this.noContextMenu(e)}
                                 onMouseEnter={(e) => this.onDrag(x, y, e)}
                ></Square>);
            }
            items.push(<div key={["CR",i]} className={PuzzleStyle.row}> {row} </div>);
        }

        return (<div>{items}</div>);
    }

    noContextMenu(e){
        e.preventDefault();
    }

    onClick(x,y,e) {
        e.preventDefault();

        const solveState = this.props.solveState.slice();

        var importantChange = false;

        if (e.nativeEvent.which === 1) {
            if (solveState[x][y] === 1) solveState[x][y] = 0;
            else solveState[x][y] = 1;
            importantChange = true;
        } else if (e.nativeEvent.which === 3) {
            if (solveState[x][y] === 2) {
                solveState[x][y] = 0;
            }
            else if (solveState[x][y] === 1) {
                solveState[x][y] = 2;
                importantChange = true;
            } else {
                solveState[x][y] = 2;
            }
        }

        this.setState({solveState: solveState});

        if (importantChange) this.checkNumbers(x, y);
    }

    onDrag(x,y,e) {
        e.preventDefault();

        var importantChange = false;

        const solveState = this.props.solveState.slice();

        if (e.nativeEvent.which === 1 && solveState[x][y] === 0) {
            solveState[x][y] = 1;
            importantChange = true;
        } else if (e.nativeEvent.which === 3 && solveState[x][y] === 0) {
            solveState[x][y] = 2;
        } else {
            return;
        }

        this.setState({solveState: solveState});

        if (importantChange) this.checkNumbers(x, y);
    }

    checkNumbers(y,x) {
        var numbersTop = this.props.topRow[x];
        var currentFIllColumn = [];

        var counter = 0;
        var allTrue = true;

        //gets the values of the column
        for (var i = 0; i < this.props.solveState.length; i++) {
            if (this.props.solveState[i][x] === 1) {
                counter++;
            } else if (counter !== 0) {
                currentFIllColumn.push(counter);
                counter = 0;
            }
        }

        if (counter !== 0 || currentFIllColumn.length === 0) {
            currentFIllColumn.push(counter);
            counter = 0;
        }

        for (var k = 0; k < numbersTop.length; k++) {
            if (currentFIllColumn[k] === numbersTop[k].number && currentFIllColumn.length <= numbersTop.length) {
                numbersTop[k].holds = true;
            } else {
                numbersTop[k].holds = false;
                allTrue = false;
            }
        }

        var numbersSide = this.props.sideRow[y];
        var currentFIllRow = [];

        //gets the values of the row
        for (var j = 0; j < this.props.solveState[0].length; j++) {
            if (this.props.solveState[y][j] === 1) {
                counter++;
            } else if (counter !== 0) {
                currentFIllRow.push(counter);
                counter = 0;
            }
        }
        if (counter !== 0 || currentFIllRow.length === 0) currentFIllRow.push(counter);


        for (var l = 0; l < numbersSide.length; l++) {
            if (currentFIllRow[l] === numbersSide[l].number && currentFIllRow.length <= numbersSide.length) {
                numbersSide[l].holds = true;
            } else {
                numbersSide[l].holds = false;
                allTrue = false;
            }
        }
        if (allTrue) this.checkSolved();
    }

    checkSolved() {
        for(var x = 0; x < this.props.topRow.length; x++){
            for (var i = 0; i < this.props.topRow[x].length; i++){
                if (this.props.topRow[x][i].holds === false) {
                    return;
                }
            }
        }
        for(var y = 0; y < this.props.sideRow.length; y++){
            for (var j = 0; j < this.props.sideRow[y].length; j++){
                if (this.props.sideRow[y][j].holds === false) return;
            }
        }
        alert("YOU SOLVED IT!!!!");
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