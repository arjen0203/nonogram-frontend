import React from "react";

class Square extends React.Component {
    render() {
        var display;
        if (this.props.value === 1){
            var filled = { backgroundColor: '#35393C'};
        } else if (this.props.value === 2){
            display = "✖";
        }
        return (
            <div
                className={"square"}
                style={filled}
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