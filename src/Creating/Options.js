import React, {Component} from 'react';

class Options extends Component {
    render() {
        return (
            <div className="center">
                <div className="options">
                    <label for="name">Name: </label>
                    <input id="name" className="name-input" type="text" value={this.props.name} onChange={(e) => this.props.changeName(e.target.value)}></input>
                    <div className="name-warning">{this.props.nameWarning}</div>
                    <div>
                        <label for="width">Width:</label>
                        <input id="width" className="size-input" type="number" min="1" max="30"
                               value={this.props.height} onChange={(e) => this.props.changeHeight(e.target.value)}></input>
                        <label for="height">Height:</label>
                        <input id="height" className="size-input" type="number" min="1" max="30"
                               value={this.props.width} onChange={(e) => this.props.changeWidth(e.target.value)}></input>
                    </div>
                    <div className="size-warning">{this.props.sizeWarning}</div>
                    <button onClick={() => this.props.saveNonogram()} className="save-button">Save nonogram</button>
                    <div className="save-state">{this.props.saveState}</div>
                </div>
            </div>
        );
    }
}

export default Options;