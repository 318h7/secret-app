import { expect, describe, test, afterEach, beforeAll } from 'vitest';
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import axios, { API_URL } from "../model/rest";
import { render, screen, cleanup, waitFor } from '../testUtils';
import { Servers } from '.';
import i18n from '../i18n';

const MOCK_DATA = [
    { name: "b", distance: 5 },
    { name: "b", distance: 5 },
    { name: "c", distance: 1 },
    { name: "a", distance: 1 },
    { name: "a", distance: 2 },
    { name: "b", distance: 1 },
];

const getNames = (_: unknown, index: number) => index % 2 == 0;
const getDistances = (_: unknown, index: number) => index % 2 == 1;

describe('Servers page', () => {
    beforeAll(async () => {
        axios.defaults.adapter = 'http';
        await i18n.changeLanguage('cimode');
    });

    test('login page renders', () => {
        render(<Servers />);

        expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('sowing empty message', async () => {
        const scope = nock(API_URL)
            .get('/servers')
            .reply(200, []);
        render(<Servers />);

        await waitFor(
            async () => expect(
                await screen.findByText('servers.table.empty')
            ).toBeInTheDocument()
        );
        scope.done();
    });

    test('show data', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );
        scope.done();
    });

    test('no sorting by default', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getNames)).toStrictEqual(["b", "b", "c", "a", "a", "b"]);
        
        scope.done();
    });

    test('name descending', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const nameHeader = screen.getAllByTestId('sort-icon')[0]
        await userEvent.click(nameHeader);
        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getNames)).toStrictEqual(["a", "a", "b", "b", "b", "c"]);
        
        scope.done();
    });

    test('name ascending', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const nameHeader = screen.getAllByTestId('sort-icon')[0]
        await userEvent.click(nameHeader);
        await userEvent.click(nameHeader);
        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getNames)).toStrictEqual(["c", "b", "b", "b", "a", "a"]);
        
        scope.done();
    });

    test('data is reset on sorting disabled', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const nameHeader = screen.getAllByTestId('sort-icon')[0]
        await userEvent.click(nameHeader);
        await userEvent.click(nameHeader);
        await userEvent.click(nameHeader);

        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getNames)).toStrictEqual(["b", "b", "c", "a", "a", "b"]);
        
        scope.done();
    });

    test('distance descending', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const distanceHeader = screen.getAllByTestId('sort-icon')[1]
        await userEvent.click(distanceHeader);
        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => Number(cell.textContent));

        expect(text.filter(getDistances).map(Number)).toStrictEqual([1, 1, 1, 2, 5, 5]);
        
        scope.done();
    });

    test('both sorting rules are applied', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const distanceHeader = screen.getAllByTestId('sort-icon')[1]
        const nameHeader = screen.getAllByTestId('sort-icon')[0]
        
        // name ASC
        await userEvent.click(nameHeader);
        await userEvent.click(nameHeader);

        // dist DESC
        await userEvent.click(distanceHeader);

        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getDistances).map(Number)).toStrictEqual([1, 1, 1, 2, 5, 5]);
        expect(text.filter(getNames)).toStrictEqual(["c", "b", "a", "a", "b", "b"]);

        scope.done();
    });

    test('sorting order makes difference', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        render(<Servers />);

        await waitFor(
            async () => expect(await screen.findAllByRole('row')).toHaveLength(MOCK_DATA.length)
        );

        const distanceHeader = screen.getAllByTestId('sort-icon')[1]
        const nameHeader = screen.getAllByTestId('sort-icon')[0]

        // dist DESC
        await userEvent.click(distanceHeader);

        // name ASC
        await userEvent.click(nameHeader);
        await userEvent.click(nameHeader);

        const cells = await screen.findAllByRole('cell');
        const text = cells.map((cell) => cell.textContent);

        expect(text.filter(getNames)).toStrictEqual(["c", "b", "b", "b", "a", "a"]);
        expect(text.filter(getDistances).map(Number)).toStrictEqual([1, 1, 5, 5, 1, 2]);

        scope.done();
    });

    afterEach(cleanup)
})
