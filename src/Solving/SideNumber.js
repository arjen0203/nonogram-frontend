import React from "react";


class SideNumber extends React.Component {
    render() {
        var styling;
        if (this.props.value.holds === false){
            styling = "to-be-solved-side"
        } else {
            styling = "solved-side"
        }

        return (
            <div className={styling}>{this.props.value.number}</div>
        );
    }
}

export default SideNumber;