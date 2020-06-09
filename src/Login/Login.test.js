import React from "react";
import ReactDOM from 'react-dom';
import Login from "./Login";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import renderer from "react-test-renderer";

afterEach(cleanup);

it('Renders without crashing', function () {
	const div = document.createElement('div');
	ReactDOM.render(<Login></Login>, div);
});

it('matches snapshot', function () {
	const tree = renderer.create(<Login></Login>).toJSON();
	expect(tree).toMatchSnapshot();
});