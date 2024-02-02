import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query'

import { TOKEN_KEY, SORT } from '../constants';
import axios from "./rest";

export interface Server {
    name: string;
    distance: number;
}

export type ServersData = Server[];

const distanceAscending = (serverA: Server, serverB: Server) => serverA.distance - serverB.distance;
const nameDescending = (serverA: Server, serverB: Server) => serverB.name.localeCompare(serverA.name);

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
        ({ data }: AxiosResponse<ServersData>): ServersData => {
            const copy = [...data];

            if (sorting.length == 0 || sorting.every(({ value }) => value === SORT.NONE)) {
                return data;
            }

            sorting?.forEach(({ name, value }) => {
                if (name === 'name' && value !== SORT.NONE) {
                    copy.sort(nameDescending);
                    if (value === SORT.ASC) {
                        copy.reverse();
                    }
                }
                if (name === 'distance' && value !== SORT.NONE) {
                    copy.sort(distanceAscending);
                    if (value === SORT.DESC) {
                        copy.reverse();
                    }
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

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest

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
}