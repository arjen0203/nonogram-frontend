import React from "react";
import Puzzle from "./Puzzle";

class GetNonogram extends React.Component {
    state = {
        loasding: true,
        nonogram: null,
    };


    async componentDidMount() {
        const URL = "http://localhost:8080/nonogram";
        const response = await fetch(URL);
        const data = await  response.json();
        console.log(data);
        this.setState({nonogram : data.result});
    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.nonogram ? (
                    <b>loading...</b>
                    ) : (
                        <Puzzle topRow={this.state.nonogram.topRow} sideRow={this.state.nonogram.sideRow} solveState={progress}> </Puzzle>
                )}
            </div>
        );
    }
}

export default GetNonogram;