import React from "react";

class Square extends React.Component {
    render() {
        var display;
        var styling = "square";
        if (this.props.value === 1){
            styling = "square-filled";
        } else if (this.props.value === 2){
            display = "✖";
        }
        return (
            <div data-testid="square"
                className={styling}
                onMouseDown={(e) => this.props.onMouseDown(e)}
                onContextMenu={(e) => this.props.onContextMenu(e)}
                onMouseEnter={(e) => this.props.onMouseEnter(e)}
            >
                {display}
            </div>
        );
    }
}

export default Square;