import React from "react";
import Puzzle from "./Puzzle";

class GetNonogram extends React.Component {
    state = {
        loading: true,
        solveState: null,
        topRow: null,
        sideRow: null,
        error: ""
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        const URL = 'https://nonograms.nl/api/nonogram/get?id=' + this.props.id;

        fetch(URL)
            .then( async res => {
                if (res.ok) {
                    res.json().then(data => {
                        this.setRows(data.topValues, data.sideValues)
                        this.setState({loading: false})
                    })
                } else {
                    const error = await res.text();
                    this.setState({error});
                }
            }).catch(() => this.setState({error: "Could not communicate with server"}));

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
        if (this._isMounted) {
            this.setState({topRow: newTopRow, sideRow: newSideRow, solveState: newSolveState});
        }
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <div>{this.state.error}</div>
                    ) : (
                        <Puzzle topRow={this.state.topRow} sideRow={this.state.sideRow} solveState={this.state.solveState}> </Puzzle>
                )}
            </div>
        );
    }
}

export default GetNonogram;