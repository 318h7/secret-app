import { useEffect, useState } from 'react';
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
const swapParams = (fn: (a: Server, b: Server) => number) => (a: Server, b: Server) => fn(b, a);

export interface SortAction {
    name: string;
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

    return useQuery({
        queryKey: ['servers'],
        select: ({ data }: AxiosResponse<Data>): Data => {
            const copy = [...data];

            if (sorting.every(({ value }) => value === SORT.NONE)) {
                return data;
            }

            sorting?.forEach(({ name, value }) => {
                if (name === 'name' && value !== SORT.NONE) {
                    // console.log('sort by name', value)
                    copy.sort(value === SORT.ASC ? swapParams(nameDescending) : nameDescending);
                }
                if (name === 'distance' && value !== SORT.NONE) {
                    // console.log('sort by distance', value)
                    copy.sort(value === SORT.ASC ? swapParams(distanceDesc) : distanceDesc);
                }
            });

            return copy;
        },
        queryFn: () => axios.get(
            '/servers',
            { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }}
        )
    });
};