import React, {Component} from 'react';

class PageSelection extends Component {
    render() {
        return (
            <div className="page-nav">
                <button className="page-nav-button" onClick={() => this.props.changePage(0)}>{"<<"}</button>
                <button className="page-nav-button" onClick={() => this.props.changePage(this.props.currentPage - 1)}>{"<"}</button>
                <input className="page-nav-input" type="number" value={this.props.displayNumber} onChange={(e) => this.props.changeDisplayNumber(e.target.value)} onBlur={(e) => this.props.changePage(e.target.value)}></input>
                <button className="page-nav-button" onClick={() => this.props.changePage(this.props.currentPage + 1)}>{">"}</button>
                <button className="page-nav-button" onClick={() => this.props.changePage(this.props.maxPage)}>{">>"}</button>
            </div>
        );
    }
}

export default PageSelection;