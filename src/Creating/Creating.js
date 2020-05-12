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
            name: '',
            pictureGrid: this.getPictureGrid(10, 10),
            topHints: [],
            sideHints: []
        };
    }

    getPictureGrid(x, y) {
        var pictureGrid = [];
        for (let i = 0; i < x; i++) {
            pictureGrid.push([])
            for (let j = 0; j < y; j++) {
                pictureGrid[i].push(0);
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

    changeWidth(width) {
        let pictureGrid = this.getPictureGrid(width, this.state.height);
        this.setState({width, pictureGrid});
    }

    changeHeight(height) {
        let pictureGrid = this.getPictureGrid(this.state.width, height);
        this.setState({height, pictureGrid});
    }

    changeName(name) {
        let pictureGrid = this.getPictureGrid(this.state.width, this.state.height);
        this.setState({name, pictureGrid});
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
        console.log(sideHints);

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
    }

    saveNonogram(){
        this.setHints();
    }


    render() {
        return (
            <div>
                <h1>
                    This is the creating page!
                </h1>
                    <Options changeWidth={(e) => this.changeWidth(e)} changeHeight={(e) => this.changeHeight(e)} changeName={(e) => this.changeName(e)}
                             width={this.state.width} height={this.state.height} name={this.state.name} saveNonogram={() => this.saveNonogram()}></Options>
                    <DrawingGrid width={this.state.width} height={this.state.height} pictureGrid={this.state.pictureGrid}
                    onClick={(x, y, e) => this.onClick(x, y, e)} onDrag={(x, y, e) => this.onDrag(x, y, e)}></DrawingGrid>
            </div>
        );
    }
}

export default Creating;