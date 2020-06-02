import React from "react";
import Options from "./Options";
import DrawingGrid from "./DrawingGrid";
import './creatingStyling.scss';
import {UserContext} from "../UserContext";

class Creating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 10,
            height: 10,
            name: '',
            pictureGrid: this.firstGrid(10, 10),
            topHints: [],
            sideHints: [],
            sizeWarning: "",
            nameWarning: ""
        };
    }

    firstGrid(x, y){
        let pictureGrid = [];
        for (let i = 0; i < x; i++) {
            pictureGrid.push([])
            for (let j = 0; j < y; j++) {
                pictureGrid[i].push(0);
            }
        }
        return pictureGrid;
    }

    getPictureGrid(x, y) {
        let oldGrid = this.state.pictureGrid;
        let pictureGrid = [];
        for (let i = 0; i < x; i++) {
            pictureGrid.push([])
            for (let j = 0; j < y; j++) {
                if (i < oldGrid.length) {
                    if (j < oldGrid[i].length){
                        if (oldGrid[i][j] === 1) pictureGrid[i].push(1);
                        else pictureGrid[i].push(0);
                    } else pictureGrid[i].push(0);
                } else pictureGrid.push(0);
            }
        }
        return pictureGrid;
    }

    onClick(x, y, e){
        e.preventDefault();

        const pictureGrid = this.state.pictureGrid.slice();

        if (pictureGrid[x][y] === 1) pictureGrid[x][y] = 0;
        else pictureGrid[x][y] = 1;

        this.setState({pictureGrid});
    }

    onDrag(x, y, e){
        e.preventDefault();

        const pictureGrid = this.state.pictureGrid.slice();

        if (e.nativeEvent.which === 1 && pictureGrid[x][y] === 0) pictureGrid[x][y] = 1;

        this.setState({pictureGrid});
    }

    getSizeWarning(width, height){
        let sizeWarning = this.state.sizeWarning;
        if (width < 4 || height < 4) sizeWarning = "Nonogram should be at least 4 by 4"
        else sizeWarning = "";

        return sizeWarning;
    }

    //actually changes height
    changeWidth(width) {
        if (width > 30) width = 30;
        if (width < 1) width = 1;

        let sizeWarning = this.getSizeWarning(width, this.state.height);
        let pictureGrid = this.getPictureGrid(width, this.state.height);
        this.setState({width, pictureGrid, sizeWarning});
    }

    //actually changes width
    changeHeight(height) {
        if (height > 30) height = 30;
        if (height < 1) height = 1;

        let sizeWarning = this.getSizeWarning(this.state.width, height);
        let pictureGrid = this.getPictureGrid(this.state.width, height);
        this.setState({height, pictureGrid, sizeWarning});
    }

    changeName(name) {
        let warning = this.state.nameWarning;
        if (name.length > 2 && name.length < 65) warning = "";
        this.setState({name, nameWarning: warning});
    }

    setHints(){
        let sideHints = [];
        let counter = 0;

        for (let x = 0; x < this.state.width; x++){
            sideHints.push([]);
            for (let y = 0; y < this.state.height; y++){
                if (this.state.pictureGrid[x][y] === 1) counter++;
                else if (counter > 0) {
                    sideHints[x].push(counter);
                    counter = 0;
                }
            }
            if (counter !== 0 || sideHints[x].length === 0) {
                sideHints[x].push(counter);
                counter = 0;
            }
        }

        let topHints = [];
        counter = 0;

        for (let y = 0; y < this.state.height; y++){
            topHints.push([]);
            for (let x = 0; x < this.state.width; x++){
                if (this.state.pictureGrid[x][y] === 1) counter++;
                else if (counter > 0) {
                    topHints[y].push(counter);
                    counter = 0;
                }
            }
            if (counter !== 0 || topHints[y].length === 0) {
                topHints[y].push(counter);
                counter = 0;
            }
        }

        this.setState({topHints, sideHints})

        return {sideHints: sideHints, topHints: topHints};
    }

    async saveNonogram(){
        if (this.state.width < 4 || this.state.height < 4) return;
        if (this.saving) return;
        if (this.state.name.length < 3) {
            this.setState({nameWarning: "name is too short"})
            return;
        }
        if (this.state.name.length > 64) {
            this.setState({nameWarning: "name is too long"})
            return;
        }
        this.saving = true;


        var hints = this.setHints();

        var topHintsList = [];
        for (let x = 0; x < hints.topHints.length; x++) {
            for (let y = hints.topHints[x].length - 1; y >= 0; y--){
                topHintsList.push({value: hints.topHints[x][y], xCord: x, ycord: y})
            }
        }
        console.log(topHintsList);
        var sideHintsList = [];
        for (let x = 0; x < hints.sideHints.length; x++) {
            for (let y = hints.sideHints[x].length - 1; y >= 0; y--){
                sideHintsList.push({value: hints.sideHints[x][y], xCord: x, ycord: y})
            }
        }

        let nonogram = { name: this.state.name, topValues: topHintsList, sideValues: sideHintsList };
        console.log(nonogram);
        fetch(`https://nonograms.nl/api/nonogram/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
            body: JSON.stringify(nonogram)
        })
            .then(res => {
                if(!res.ok){
                    this.setState({ ...this.state, saveError: "Something went wrong while saving"});
                    this.saving = false;
                    return Promise.reject("Promise rejected")
                }
                res.json()
            })
            .then(data => {
                this.props.history.push("/solving");
                this.saving = false;
            })
            .catch(this.setState({ ...this.state, registerError: "Something went wrong while saving"}));
    }


    render() {
        return (
            <div>
                    <Options changeWidth={(e) => this.changeWidth(e)} changeHeight={(e) => this.changeHeight(e)} changeName={(e) => this.changeName(e)}
                             width={this.state.width} height={this.state.height} name={this.state.name} saveNonogram={() => this.saveNonogram()}
                            sizeWarning={this.state.sizeWarning} nameWarning={this.state.nameWarning}></Options>
                    <DrawingGrid width={this.state.width} height={this.state.height} pictureGrid={this.state.pictureGrid}
                    onClick={(x, y, e) => this.onClick(x, y, e)} onDrag={(x, y, e) => this.onDrag(x, y, e)}></DrawingGrid>
                <UserContext.Consumer>
                    {({user, logoutUser, loginUser}) => {if (user.userId === 0) this.props.history.push('/solving')}}
                </UserContext.Consumer>
            </div>
        );
    }
}

export default Creating;