import React, {Component} from 'react';

class DrawSquare extends Component {
    render() {
        if (this.props.value === 1){
            var filled = { backgroundColor: '#35393C'};
        }
        return (
            <div className="draw-square"
                 style={filled}
                 onMouseDown={(e) => this.props.onMouseDown(e)}
                 onMouseEnter={(e) => this.props.onMouseEnter(e)}
            >
            </div>
        );
    }
}

export default DrawSquare;