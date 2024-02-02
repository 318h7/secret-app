import { expect, it, describe, vi, beforeAll, afterEach } from "vitest";
import nock from 'nock'
import type { UseQueryResult } from "@tanstack/react-query";

import { renderHook, act, waitFor, cleanup, configure } from '../testUtils';
import { distanceAscending, nameDescending, useServersQuery } from "./useServersQuery"
import type { Server, ServersData, SortAction } from "./useServersQuery"
import axios, { API_URL } from "./rest";
import { SORT } from "../constants";

type QueryResult = UseQueryResult<ServersData>

const MOCK_DATA: Server[] = [
    { name: "c", distance: 1 },
    { name: "c", distance: 5 },
    { name: "a", distance: 1 },
    { name: "a", distance: 2 },
    { name: "a", distance: 3 },
    { name: "b", distance: 1 },
    { name: "b", distance: 4 },
];

const getNames = ({ name }: Server) => name;
const getDistances = ({ distance }: Server) => distance;

describe('useServersQuery', () => {
    configure({reactStrictMode: true})

    beforeAll(() => {
        axios.defaults.adapter = 'http';
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: vi.fn(() => "test"),
            },
            writable: true,
        });
    });

    afterEach(cleanup);

    it('should query for servers as soon as it loads', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        const { result } = renderHook<SortAction, QueryResult>(useServersQuery);

        await waitFor(() => {
            const { current: { isLoading } } = result;
            return expect(isLoading).toBe(false);
        });

        expect(result?.current?.data).toHaveLength(MOCK_DATA.length);
        scope.done()
    });

    it('should sort the results by name', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        const { result, rerender} = renderHook<SortAction, QueryResult>(useServersQuery);
        
        await waitFor(() => {
            const { current: { isLoading } } = result;

            return expect(isLoading).toBe(false);
        });

        act(() => {
            rerender({ name: 'name', value: SORT.ASC });
        });

        expect(result.current.data?.map(getNames)).toStrictEqual(['a', 'a', 'a', 'b', 'b', 'c', 'c']);

        scope.done()
    });

    it('should sort the results by distance', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        const { result, rerender} = renderHook<SortAction, QueryResult>(useServersQuery);
        
        await waitFor(() => {
            const { current: { isLoading } } = result;

            return expect(isLoading).toBe(false);
        });

        act(() => {
            rerender({ name: 'distance', value: SORT.ASC });
        });

        expect(result.current.data?.map(getDistances)).toStrictEqual([1, 1, 1, 2, 3, 4, 5]);

        scope.done()
    });

    it('should apply both sorting rules', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        const { result, rerender} = renderHook<SortAction, QueryResult>(useServersQuery);
        
        await waitFor(() => {
            const { current: { isLoading } } = result;

            return expect(isLoading).toBe(false);
        });

        act(() => {
            rerender({ name: 'distance', value: SORT.ASC });
        });

        expect(result.current.data?.map(getDistances)).toStrictEqual([1, 1, 1, 2, 3, 4, 5]);

        act(() => {
            rerender({ name: 'distance', value: SORT.DESC });
        });
        act(() => {
            rerender({ name: 'name', value: SORT.ASC });
        });

        expect(result.current.data?.map(getNames)).toStrictEqual(['a', 'a', 'a', 'b', 'b', 'c', 'c']);
        expect(result.current.data?.map(getDistances)).toStrictEqual([1, 2, 3, 1, 4, 1, 5]);

        scope.done()
    });

    it('should apply both sorting rules', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, MOCK_DATA);

        const { result, rerender} = renderHook<SortAction, QueryResult>(useServersQuery);
        
        await waitFor(() => {
            const { current: { isLoading } } = result;

            return expect(isLoading).toBe(false);
        });

        act(() => {
            rerender({ name: 'distance', value: SORT.ASC });
        });

        expect(result.current.data?.map(getDistances)).toStrictEqual([1, 1, 1, 2, 3, 4, 5]);

        act(() => {
            rerender({ name: 'name', value: SORT.ASC });
        });

        expect(result.current.data?.map(getNames)).toStrictEqual(['a', 'a', 'a', 'b', 'b', 'c', 'c']);
        expect(result.current.data?.map(getDistances)).toStrictEqual([3, 2, 1, 4, 1, 5, 1]);

        scope.done()
    });
});


describe("utils", () => {
    it('sort descending distances', () => {
        const unsorted = [
            { name: "third", distance: 45 },
            { name: "second", distance: 20 },
            { name: "first", distance: 5 },
        ];
        const list = unsorted.sort(distanceAscending);

        expect(list.map(({ name }) => name)).toEqual(["first","second","third"]);
    });

    it('sort descending names', () => {
        const unsorted = [
            { name: "Carlos", distance: 45 },
            { name: "Anna", distance: 20 },
            { name: "Bob", distance: 5 },
        ];
        const list = unsorted.sort(nameDescending);

        expect(list.map(({ name }) => name)).toEqual(["Carlos", "Bob", "Anna"]);
    });
});