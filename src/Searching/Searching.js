import React, {Component} from 'react';
import NonogramInfo from "./NonogramInfo";
import './SearchingStyle.scss'
import PageSelection from "./PageSelection";

class Searching extends Component {
    constructor() {
        super();

        const params = new URLSearchParams(document.location.search.substring(1));

        let page = params.get('page');
        if (page === null) page = 0;

        this.state = {
            loading: false,
            currentPage: 0,
            maxPage: 0,
            nonogramInfos: [],
            displayNumber: page
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setNonogramInfos(data) {
        let nonogramInfos = [];

        for (let i = 0; i < data.length; i++) {
            nonogramInfos.push({id: data[i].id, name: data[i].name, creater: data[i].createrName});
        }
        this.setState({nonogramInfos});

    }

    getInfoComps() {
        let output = this.state.nonogramInfos.map((info) =>
            <NonogramInfo key={"NI" + info.id} info={info} onClick={() => this.goToNonogram(info.id)}></NonogramInfo>
        );
        return output;
    }

    goToNonogram(id){
        this.props.history.push("/solving/" + id);
    }

    componentDidMount() {
        this.setInfos();
    }

    setInfos(){
        this._isMounted = true;

        const params = new URLSearchParams(document.location.search.substring(1));

        let page = params.get('page') - 1;

        if (page < 1){
            page = 0;
        }

        const URL = 'https://nonograms.nl/api/nonogram/getAll?page=' + page;
        fetch(URL)
            .then( async res => {

                if (res.ok) {
                    const maxPage = await res.headers.get("TotalPages");
                    res.json().then(data => {
                        this.setNonogramInfos(data)
                        this.setState({loading: false, currentPage: page + 1, maxPage: maxPage, displayNumber: page + 1})
                    })
                } else {
                    const error = await res.text();
                    this.setState({error});
                }
            }).catch(() => this.setState({error: "Could not communicate with server"}));


    }

    changePage(page){
        this.props.history.push("/solving?page=" + page)
        this.setInfos();
    }

    changDisplauNumber(displayNumber){
        this.setState({displayNumber})
    }

    render() {
        let info;
        if (!this.state.loading) info = this.getInfoComps();
        return (
            <div data-testid="searching" className="center">
                {this.state.loading ? (
                    <div>{this.state.error}</div>
                ) : (
                    <div className="nonogram-selection">
                        <div className="nonogram-infos">{info}</div>
                        <PageSelection changePage={(page) => this.changePage(page)} displayNumber={this.state.displayNumber} currentPage={this.state.currentPage}
                                       maxPage={this.state.maxPage} changeDisplayNumber={() => this.changDisplauNumber()}></PageSelection>
                    </div>
                )}
            </div>
        );
    }
}

export default Searching;