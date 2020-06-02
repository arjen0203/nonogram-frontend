import React, {Component} from 'react';

class NonogramInfo extends Component {
    render() {
        return (
            <div className="nonoogram-info" onClick={() => this.props.onClick()}>
                <div className="gram-info-name">{this.props.info.name}</div>
                <div className="gram-info-creater">By: {this.props.info.creater}</div>
            </div>
        );
    }
}

export default NonogramInfo;