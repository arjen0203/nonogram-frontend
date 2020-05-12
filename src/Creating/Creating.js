import React from "react";
import Options from "./Options";
import DrawingGrid from "./DrawingGrid";
import './creatingStyling.scss';

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
        this.setState({width});
    }

    changeHeight(height) {
        this.setState({height});
    }
    changeName(name) {
        this.setState({name});
    }

    render() {
        return (
            <div>
                <h1>
                    This is the creating page!
                </h1>
                <form>
                    <DrawingGrid width={this.state.width} height={this.state.height}></DrawingGrid>
                    <Options changeWidth={(e) => this.changeWidth(e)} changeHeight={(e) => this.changeHeight(e)} changeName={(e) => this.changeName(e)}
                             width={this.state.width} height={this.state.height} name={this.state.name} ></Options>
                </form>
            </div>
        );
    }
}

export default Creating;