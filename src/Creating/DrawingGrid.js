import React, {Component} from 'react';
import DrawSquare from "./DrawSquare";

class DrawingGrid extends Component {
    createGrid(){
        var grid = [];
        for (let x = 0; x < this.props.width; x++){
            var row = [];
            for (let y = 0; y < this.props.height; y++){
                row.push(<DrawSquare></DrawSquare>);
            }
            grid.push(<div>{row}</div>)
        }
        return grid;
    }
    render() {
        return (
            <div className="drawing-grid">
                {this.createGrid()}
            </div>
        );
    }
}

export default DrawingGrid;