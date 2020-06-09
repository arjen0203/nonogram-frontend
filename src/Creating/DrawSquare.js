import React, {Component} from 'react';

class DrawSquare extends Component {
    render() {
        let style;
        if (this.props.value === 1){
            style = "draw-square-filled"
        } else {
            style = "draw-square";
        }
        return (
            <div data-testid="drawSquare"
                 className={style}
                 onMouseDown={(e) => this.props.onMouseDown(e)}
                 onMouseEnter={(e) => this.props.onMouseEnter(e)}
            >
            </div>
        );
    }
}

export default DrawSquare;