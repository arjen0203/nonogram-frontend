import React from "react";
import ReactDOM from 'react-dom';
import TopNumber from "../TopNumber";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const val = {number: 6, holds: false};

	const div = document.createElement('div');
	ReactDOM.render(<TopNumber value={val}></TopNumber>, div);
});

it('Render correctly', function () {
	const val = {number: 6, holds: false};

	const comp = render(<TopNumber value={val}></TopNumber>).getByTestId("topNumber");
	expect(comp).toHaveTextContent("6");
	expect(comp).toHaveClass("to-be-solved-top");
});

it('Render correctly 2', function () {
	const val = {number: 3, holds: false};

	const comp = render(<TopNumber value={val}></TopNumber>).getByTestId("topNumber");
	expect(comp).toHaveTextContent("3");
	expect(comp).toHaveClass("to-be-solved-top");
});

it('Render correctly is holding', function () {
	const val = {number: 6, holds: true};

	const comp = render(<TopNumber value={val}></TopNumber>).getByTestId("topNumber");
	expect(comp).toHaveTextContent("6");
	expect(comp).toHaveClass("solved-top");
});

it('Render correctly is holding 2', function () {
	const val = {number: 3, holds: true};

	const comp = render(<TopNumber value={val}></TopNumber>).getByTestId("topNumber");
	expect(comp).toHaveTextContent("3");
	expect(comp).toHaveClass("solved-top");
});

it('matches snapshot', function () {
	const val = {number: 6, holds: false};

	const tree = renderer.create(<TopNumber value={val}></TopNumber>).toJSON();
	expect(tree).toMatchSnapshot();
});