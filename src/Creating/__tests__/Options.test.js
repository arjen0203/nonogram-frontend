import React from "react";
import ReactDOM from 'react-dom';
import Options from "../Options";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<Options></Options>, div);
});

it('Render correctly empty', function () {
	const rendered = render(<Options width="5" height="6" name="rens"></Options>)
	const compHeight = rendered.getByTestId("optHeight");
	const compWidth = rendered.getByTestId("optWidth");
	const compName = rendered.getByTestId("optName");

	expect(compHeight).toHaveValue(6);
	expect(compWidth).toHaveValue(5);
	expect(compName).toHaveValue("rens");
});

it('Render correctly empty', function () {
	const rendered = render(<Options width="8" height="4" name="sjoerd"></Options>)
	const compHeight = rendered.getByTestId("optHeight");
	const compWidth = rendered.getByTestId("optWidth");
	const compName = rendered.getByTestId("optName");

	expect(compHeight).toHaveValue(4);
	expect(compWidth).toHaveValue(8);
	expect(compName).toHaveValue("sjoerd");
});

it('matches snapshot', function () {
	const tree = renderer.create(<Options></Options>).toJSON();
	expect(tree).toMatchSnapshot();
});