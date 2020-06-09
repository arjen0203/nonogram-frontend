import React from "react";
import ReactDOM from 'react-dom';
import Solving from "../Solving";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import { act as actRenderer, create } from "react-test-renderer";
import { act } from 'react-dom/test-utils';
import GetNonogram from "../GetNonogram";


afterEach(cleanup);

it('Renders without crashing', function () {
	fetch.dontMockOnce();

	const div = document.createElement('div');
	ReactDOM.render(<GetNonogram></GetNonogram>, div);
});

it('Render correctly', async function () {
	const data = {
		"id": 210,
		"name": "boi",
		"topValues": [
			[1],
			[1, 1, 2],
			[1, 2, 2],
			[1, 1],
			[1, 1, 1],
			[1, 2, 1],
			[1, 1],
			[1, 2, 2],
			[1, 1, 2],
			[1]
		],
		"sideValues": [
			[10],
			[0],
			[2, 2],
			[1, 1],
			[1],
			[2],
			[1, 1],
			[2, 2],
			[6],
			[0]
		],
		"user": {
			"id": 17,
			"username": "DitIsDeTest"
		}
	};

	fetch.mockResponseOnce(JSON.stringify(data));

	let comp;
	await act(async () => {
		comp = render(
			<GetNonogram></GetNonogram>
		).getByTestId("getNonogram");
	});

	expect(comp).toHaveTextContent("6");
});

it('Render correctly', async function () {
	const data = {
		"id": 249,
		"name": "Panda",
		"topValues": [
			[4],
			[3],
			[2, 1],
			[1, 2, 1],
			[1, 1, 1],
			[1, 1, 1],
			[1, 2, 1],
			[2, 1],
			[3],
			[4]
		],
		"sideValues": [
			[10],
			[3, 3],
			[2, 2],
			[1, 1],
			[1, 1],
			[2, 2],
			[0],
			[2],
			[0],
			[4]
		],
		"user": {
			"id": 16,
			"username": "test123"
		}
	};

	fetch.mockResponseOnce(JSON.stringify(data));

	let comp;
	await act(async () => {
		comp = render(
			<GetNonogram></GetNonogram>
		).getByTestId("getNonogram");
	});

	expect(comp).toHaveTextContent("10");
});

it('Render correctly throw error', async function () {
	fetch.mockReject(new Error());

	let comp;
	await act(async () => {
		comp = render(
			<GetNonogram></GetNonogram>
		).getByTestId("getNonogram");
	});

	expect(comp).toHaveTextContent("Could not communicate with server");
});

it('Render nonogram not found', async function () {
	fetch.mockResponseOnce("Nonogram not found", {status: 404});

	let comp;
	await act(async () => {
		comp = render(
			<GetNonogram></GetNonogram>
		).getByTestId("getNonogram");
	});

	expect(comp).toHaveTextContent("Nonogram not found");
});


it('matches snapshot', async function () {
	const data = {
		"id": 210,
		"name": "boi",
		"topValues": [
			[1],
			[1, 1, 2],
			[1, 2, 2],
			[1, 1],
			[1, 1, 1],
			[1, 2, 1],
			[1, 1],
			[1, 2, 2],
			[1, 1, 2],
			[1]
		],
		"sideValues": [
			[10],
			[0],
			[2, 2],
			[1, 1],
			[1],
			[2],
			[1, 1],
			[2, 2],
			[6],
			[0]
		],
		"user": {
			"id": 17,
			"username": "DitIsDeTest"
		}
	};

	fetch.mockResponseOnce(JSON.stringify(data));

	let tree;
	await actRenderer(async () => {tree = create(<GetNonogram></GetNonogram>)});
	expect(tree.toJSON()).toMatchSnapshot();
});