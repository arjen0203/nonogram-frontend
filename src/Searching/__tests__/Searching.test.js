import React from "react";
import ReactDOM from 'react-dom';
import Searching from "../Searching";
import {render, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import { act as actRenderer, create } from "react-test-renderer";
import { act } from 'react-dom/test-utils';


afterEach(cleanup);

it('Renders without crashing', function () {
	fetch.dontMockOnce();

	const div = document.createElement('div');
	ReactDOM.render(<Searching></Searching>, div);
});

it('Render correctly', async function () {
	const data = [
		{
			id: 1,
			name: "Big puzzle",
			createrName: "Rens"
		},
		{
			id: 2,
			name: "Smoll puzzle",
			createrName: "Freek"
		}
	];

	fetch.mockResponseOnce(JSON.stringify(data));

	let comp;
	await act(async () => {
		comp = render(
			<Searching></Searching>
		).getByTestId("searching");
	});

	expect(comp).toHaveTextContent("By: Rens");
	expect(comp).toHaveTextContent("Smoll puzzle");
	expect(comp).toHaveTextContent("By: Freek");
	expect(comp).toHaveTextContent("Big puzzle");
});

it('Render correctly', async function () {
	const data = [
		{
			id: 1,
			name: "GREAT STUFF",
			createrName: "Sjoerd"
		},
		{
			id: 2,
			name: "AMAZING",
			createrName: "User567"
		}
	];

	fetch.mockResponseOnce(JSON.stringify(data));

	let comp;
	await act(async () => {
		comp = render(
			<Searching></Searching>
		).getByTestId("searching");
	});

	expect(comp).toHaveTextContent("AMAZING");
	expect(comp).toHaveTextContent("By: Sjoerd");
	expect(comp).toHaveTextContent("GREAT STUFF");
	expect(comp).toHaveTextContent("By: User567");
});

it('matches snapshot', async function () {
	const data = [
		{
			id: 1,
			name: "Big puzzle",
			createrName: "Rens"
		},
		{
			id: 2,
			name: "Smoll puzzle",
			createrName: "Freek"
		}
	];

	fetch.mockResponseOnce(JSON.stringify(data));

	let tree;
	await actRenderer(async () => {tree = create(<Searching></Searching>)});
	expect(tree.toJSON()).toMatchSnapshot();
});