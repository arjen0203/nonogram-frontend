import React from "react";


class TopNumber extends React.Component {
    render() {

        return (
            <div className="top-draw-number">{this.props.value.number}</div>
        );
    }
}

export default TopNumber;