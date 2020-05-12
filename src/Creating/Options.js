import React, {Component} from 'react';

class Options extends Component {
    render() {
        return (
            <div className="center">
                <div className="options">
                    <label>Name: </label>
                    <input className="name-input" type="text" id="fname" name="fname" value={this.props.name} onChange={(e) => this.props.changeName(e.target.value)}></input>
                    <div>
                        <label>Width:</label>
                        <input className="size-input" type="number" id="width" name="quantity" min="2" max="100"
                               value={this.props.width} onChange={(e) => this.props.changeWidth(e.target.value)}></input>
                        <label>Height:</label>
                        <input className="size-input" type="number" id="Height" name="quantity" min="2" max="100"
                               value={this.props.height} onChange={(e) => this.props.changeHeight(e.target.value)}></input>
                    </div>
                    <button className="save-button">Save nonogram</button>
                </div>
            </div>
        );
    }
}

export default Options;