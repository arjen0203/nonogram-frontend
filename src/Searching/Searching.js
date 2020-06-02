import React, {Component} from 'react';
import NonogramInfo from "./NonogramInfo";
import './SearchingStyle.scss'

class Searching extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            nonogramInfos: [],
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setNonogramInfos(data) {
        let nonogramInfos = [];
        console.log(data);

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
                    res.json().then(data => {
                        this.setNonogramInfos(data);
                        this.setState({loading: false})
                    })
                } else {
                    const error = await res.text();
                    this.setState({error});
                }
            }).catch(() => this.setState({error: "Could not communicate with server"}));
    }



    render() {
        let info;
        if (!this.state.loading) info = this.getInfoComps();
        return (
            <div className="center">
                {this.state.loading ? (
                    <div>{this.state.error}</div>
                ) : (
                    <div className="nonogram-selection">
                        <div className="nonogram-infos">{info}</div>
                        <div></div>
                    </div>
                )}
            </div>
        );
    }
}

export default Searching;