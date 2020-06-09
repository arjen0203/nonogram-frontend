import React from "react";
import ReactDOM from 'react-dom';
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";
import DrawSquare from "../DrawSquare";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<DrawSquare></DrawSquare>, div);
});

it('Render correctly empty', function () {
	const val = 0;

	const comp = render(<DrawSquare value={val}></DrawSquare>).getByTestId("drawSquare");
	expect(comp).toBeEmpty();
	expect(comp).toHaveClass("draw-square");
});

it('Render correctly filled in', function () {
	const val = 1;

	const comp = render(<DrawSquare value={val}></DrawSquare>).getByTestId("drawSquare");
	expect(comp).toBeEmpty();
	expect(comp).toHaveClass("draw-square-filled");
});

it('matches snapshot', function () {
	const tree = renderer.create(<DrawSquare></DrawSquare>).toJSON();
	expect(tree).toMatchSnapshot();
});