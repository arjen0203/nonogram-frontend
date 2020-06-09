import React from "react";
import ReactDOM from 'react-dom';
import NonogramInfo from "../NonogramInfo";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

const mockInfo = {id: 5, name: "puzzle", creater: "rens"};

afterEach(cleanup);

it('Renders without crashing', function () {
	const mockInfo = {id: 0, name: "", creater: ""};

	const div = document.createElement('div');
	ReactDOM.render(<NonogramInfo info={mockInfo}></NonogramInfo>, div);
});

it('Render correctly', function () {
	const mockInfo = {id: 5, name: "puzzle", creater: "rens"};

	const comp = render(<NonogramInfo info={mockInfo}></NonogramInfo>).getByTestId("nonoInfo");
	expect(comp).toHaveTextContent("puzzle");
	expect(comp).toHaveTextContent("By: rens");
});

it('Render correctly', function () {
	const mockInfo = {id: 5, name: "Crazy", creater: "user123"};

	const comp = render(<NonogramInfo info={mockInfo}></NonogramInfo>).getByTestId("nonoInfo");
	expect(comp).toHaveTextContent("Crazy");
	expect(comp).toHaveTextContent("By: user123");
});

it('mathces snapshot', function () {
	const mockInfo = {id: 5, name: "puzzle", creater: "rens"};

	const tree = renderer.create(<NonogramInfo info={mockInfo}></NonogramInfo>).toJSON();
	expect(tree).toMatchSnapshot();
});