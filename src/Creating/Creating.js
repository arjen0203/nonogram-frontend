import React from "react";
import Options from "./Options";
import DrawingGrid from "./DrawingGrid";

class Creating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 10,
            height: 10,
            name: ''
        };
    }

    changeWidth(width) {
        this.setState(width);
    }

    changeHeight(height) {
        this.setState(height);
    }

    render() {
        return (
            <div>
                <h1>
                    This is the creating page!
                </h1>
                <form>
                    <DrawingGrid width={this.state.width} height={this.state.height}></DrawingGrid>
                    <Options changeWidth={this.changeWidth()} changeHeight={this.changeHeight()}></Options>
                </form>
            </div>
        );
    }
}

export default Creating;