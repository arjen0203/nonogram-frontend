import React from "react";
import ReactDOM from 'react-dom';
import PageSelection from "../PageSelection";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<PageSelection></PageSelection>, div);
});

it('Render correctly', function () {
	const mockPage = 1;

	const comp = render(<PageSelection displayNumber={mockPage}></PageSelection>).getByTestId("pageInput");
	expect(comp).toHaveValue(1);
});

it('Render correctly', function () {
	const mockPage = 6;

	const comp = render(<PageSelection displayNumber={mockPage}></PageSelection>).getByTestId("pageInput");
	expect(comp).toHaveValue(6);
});

it('matches snapshot', function () {
	const mockPage = 1;

	const tree = renderer.create(<PageSelection displayNumber={mockPage}></PageSelection>).toJSON();
	expect(tree).toMatchSnapshot();
});