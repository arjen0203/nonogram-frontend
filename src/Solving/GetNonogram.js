import React from "react";
import Puzzle from "./Puzzle";

class GetNonogram extends React.Component {
    state = {
        loasding: true,
        nonogram: null,
        topRow: [[]],
        sideRow: [[]],
    };


    async componentDidMount() {
        const URL = "http://localhost:8080/nonogram";
        const response = await fetch(URL);
        const data = await  response.json();
        console.log(data);
        this.setState({nonogram: data , loading: false});
    }

    setRows(topRow, sideRow){
        var newTopRow = [];

        for (var i = 0; i < topRow.length; i++){
            for (var j = 0; j < topRow[i].length; j++)
                newTopRow[i][j].push([topRow[i][j], false]);
        }
        console.log(newTopRow);
    }

    render() {
        const progress = [[0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]];

        return (
            <div>
                {this.state.loading || !this.state.nonogram ? (
                    <div></div>
                    ) : (
                        <Puzzle topRow={this.state.nonogram.topRow} sideRow={this.state.nonogram.sideRow} solveState={progress}> </Puzzle>
                )}
            </div>
        );
    }
}

export default GetNonogram;