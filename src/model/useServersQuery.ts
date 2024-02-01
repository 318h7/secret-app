import { useCallback, useEffect, useState } from 'react';
import { expect, it } from "vitest";
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query'

import { TOKEN_KEY, SORT } from '../constants';
import axios from "./rest";

export interface Server {
    name: string;
    distance: number;
}

type Data = Server[];

const distanceDesc = (serverA: Server, serverB: Server) => serverA.distance - serverB.distance;
const nameDescending = (serverA: Server, serverB: Server) => serverA.name.localeCompare(serverB.name);
const swapParams = <T = unknown, R = unknown>(fn: (a: T, b: T) => R) => (a: T, b: T) => fn(b, a);

export type ServerField = keyof Server;
export interface SortAction {
    name: ServerField;
    value: SORT;
}

export const useServersQuery = (sortAction?: SortAction) => {
    const [sorting, setSorting] = useState<SortAction[]>(sortAction ? [sortAction] : []);
    
    useEffect(() => {
        if (sortAction) {
            setSorting((current) => {
                const remaining = current.filter(({ name }) => sortAction?.name !== name);

                return [...remaining, sortAction];
            });
        }
    }, [sortAction]);

    const select = useCallback(
        ({ data }: AxiosResponse<Data>): Data => {

            const copy = [...data];

            if (sorting.length == 0 || sorting.every(({ value }) => value === SORT.NONE)) {
                return data;
            }

            sorting?.forEach(({ name, value }) => {
                if (name === 'name' && value !== SORT.NONE) {
                    copy.sort(value === SORT.ASC ? swapParams(nameDescending) : nameDescending);
                }
                if (name === 'distance' && value !== SORT.NONE) {
                    copy.sort(value === SORT.ASC ? swapParams(distanceDesc) : distanceDesc);
                }
            });

            return copy;
        }, [sorting]
    );

    return useQuery({
        queryKey: ['servers'],
        select,
        queryFn: () => axios.get(
            '/servers',
            { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }}
        )
    });
};

it('sort descending distances', () => {
    const unsorted = [
        { name: "third", distance: 45 },
        { name: "second", distance: 20 },
        { name: "first", distance: 5 },
    ];
    const list = unsorted.sort(distanceDesc);

    expect(list.map(({ name }) => name)).toEqual(["first","second","third"]);
});

it('sort descending names', () => {
    const unsorted = [
        { name: "Carlos", distance: 45 },
        { name: "Anna", distance: 20 },
        { name: "Bob", distance: 5 },
    ];
    const list = unsorted.sort(nameDescending);

    expect(list.map(({ name }) => name)).toEqual(["Anna","Bob","Carlos"]);
});

it('swaps function parameters', () => {
    const diff = (a: number, b: number) => a - b;

    const swapped = swapParams(diff);

    expect(swapped(4, 2)).toEqual(-2);
});