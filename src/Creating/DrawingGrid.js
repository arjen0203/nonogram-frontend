import React, {Component} from 'react';
import DrawSquare from "./DrawSquare";

class DrawingGrid extends Component {
    createGrid(){
        var grid = [];
        for (let x = 0; x < this.props.width; x++){
            var row = [];
            for (let y = 0; y < this.props.height; y++){
                row.push(<DrawSquare key={"DS" + x + y}
                                     value={this.props.pictureGrid[x][y]}
                                     onMouseDown={(e) => this.props.onClick(x, y, e)}
                                     onMouseEnter={(e) => this.props.onDrag(x, y, e)}></DrawSquare>);
            }
            grid.push(<div className="draw-row" key={"DSR" + x}>{row}</div>)
        }
        return grid;
    }
    render() {
        return (
            <div className="center">
                <div data-testid="drawingGrid" className="drawing-grid">
                    {this.createGrid()}
                </div>
            </div>
        );
    }
}

export default DrawingGrid;