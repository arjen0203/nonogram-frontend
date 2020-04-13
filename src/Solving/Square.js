import React from "react";
import SquareStyle from './SquareStyle.module.css';

class Square extends React.Component {
    render() {
        var display;
        if (this.props.value === 1){
            // display = "⯀";
            var filled = { backgroundColor: '#35393C'};
        } else if (this.props.value === 2){
            display = "✖";
        }
        return (
            <div
                className={SquareStyle.square}
                style={filled}
                onClick={(e) => this.props.onClick(e)}
                onContextMenu={(e) => this.props.onContextMenu(e)}
                onMouseEnter={(e) => this.props.onMouseEnter(e)}
            >
                {display}
            </div>
        );
    }
}

export default Square;