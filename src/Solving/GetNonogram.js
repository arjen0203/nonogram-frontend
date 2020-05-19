import React from "react";
import Puzzle from "./Puzzle";

class GetNonogram extends React.Component {
    state = {
        loading: true,
        solveState: null,
        topRow: null,
        sideRow: null,
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        const URL = 'https://nonograms.nl/api/nonogram/get?id=' + this.props.id;
        const response = await fetch(URL);
        const data = await response.json();
        this.setRows(data.topValues, data.sideValues);
    }

    setRows(topRow, sideRow){
        var newTopRow = [];

        for (let i = 0; i < topRow.length; i++){
            newTopRow.push([])
            for (let j = 0; j < topRow[i].length; j++){
                let isZero = false;
                if (topRow[i][j] === 0) isZero = true;
                newTopRow[i].push({number: topRow[i][j], holds: isZero});
            }
        }

        var newSideRow = [];

        for (let i = 0; i < sideRow.length; i++){
            newSideRow.push([])
            for (let j = 0; j < sideRow[i].length; j++){
                let isZero = false;
                if (sideRow[i][j] === 0) isZero = true;
                newSideRow[i].push({number: sideRow[i][j], holds: isZero});
            }
        }

        var newSolveState = [];

        for (let i = 0; i < sideRow.length; i++){
            newSolveState.push([])
            for (let j = 0; j < topRow.length; j++){
                newSolveState[i].push(0);
            }
        }
        if (this.state._isMounted) {
            this.setState({topRow: newTopRow, sideRow: newSideRow, solveState: newSolveState, loading: false});
        }


    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.solveState ? (
                    <div></div>
                    ) : (
                        <Puzzle topRow={this.state.topRow} sideRow={this.state.sideRow} solveState={this.state.solveState}> </Puzzle>
                )}
            </div>
        );
    }
}

export default GetNonogram;