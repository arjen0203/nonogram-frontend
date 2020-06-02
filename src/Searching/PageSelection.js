import React, {Component} from 'react';

class PageSelection extends Component {
    render() {
        return (
            <div>
                <div onClick={() => this.props.changePage(0)}>{"<<"}</div>
                <div onClick={() => this.props.changePage(this.props.currentPage - 1)}>{"<"}</div>
                <input type="number"></input>
                <div onClick={() => this.props.changePage(this.props.currentPage + 1)}>{">"}</div>
                <div onClick={() => this.props.changePage(this.props.maxPage)}>{">>"}</div>
            </div>
        );
    }
}

export default PageSelection;