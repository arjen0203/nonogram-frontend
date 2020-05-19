import React from "react";


class TopNumber extends React.Component {
    render() {
        var styling;
        if (this.props.value.holds === false){
            styling = "to-be-solved-top";
        } else {
            styling = "solved-top"
        }

        return (
            <div className={styling}>{this.props.value.number}</div>
        );
    }
}

export default TopNumber;