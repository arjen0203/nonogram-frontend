import React from "react";
import ReactDOM from 'react-dom';
import Creating from "../Creating";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<Creating history={[]}></Creating>, div);
});

it('Render correctly', function () {
	const comp = render(<Creating history={[]}></Creating>)
	const compOptions = comp.getByTestId("options");
	const compGrid = comp.getByTestId("drawingGrid");
	expect(compOptions).toHaveClass("options");
	expect(compGrid).toHaveClass("drawing-grid");
});

it('matches snapshot', function () {
	const tree = renderer.create(<Creating history={[]}></Creating>).toJSON();
	expect(tree).toMatchSnapshot();
});