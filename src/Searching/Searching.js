import React, {Component} from 'react';

class Searching extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <div></div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

export default Searching;