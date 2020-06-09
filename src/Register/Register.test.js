import React from "react";
import ReactDOM from 'react-dom';
import Register from "./Register";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<Register></Register>, div);
});

it('matches snapshot', function () {
	const tree = renderer.create(<Register></Register>).toJSON();
	expect(tree).toMatchSnapshot();
});