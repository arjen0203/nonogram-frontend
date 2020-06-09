import React from "react";
import ReactDOM from 'react-dom';
import Square from "../Square";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";
import NonogramInfo from "../../Searching/NonogramInfo";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<Square></Square>, div);
});

it('Render correctly empty', function () {
	const val = 0;

	const comp = render(<Square value={val}></Square>).getByTestId("square");
	expect(comp).toBeEmpty()
});

it('Render correctly filled in', function () {
	const val = 1;

	const comp = render(<Square value={val}></Square>).getByTestId("square");
	expect(comp).toBeEmpty
});

it('Render correctly marked', function () {
	const val = 2;

	const comp = render(<Square value={val}></Square>).getByTestId("square");
	expect(comp).toHaveTextContent("✖");
});

it('matches snapshot', function () {
	const tree = renderer.create(<Square></Square>).toJSON();
	expect(tree).toMatchSnapshot();
});