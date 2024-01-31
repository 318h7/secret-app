import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from "axios";

import axios from "./rest";
import { TOKEN_KEY, SORT } from '../constants';

export interface Server {
    name: string;
    distance: number;
}

type Keys = keyof Server;
export type ServerSorting = Record<Keys, SORT>;
type Data = Server[];

const distanceDesc = (serverA: Server, serverB: Server) => serverA.distance - serverB.distance;
const nameDescending = (serverA: Server, serverB: Server) => serverA.name.localeCompare(serverB.name);
const swapParams = (fn: (a: Server, b: Server) => number) => (a: Server, b: Server) => fn(b, a);

export const useServersQuery = (sorting?: ServerSorting) => useQuery({
    queryKey: ['servers'],
    select: ({ data }: AxiosResponse<Data>): Data => {
        if (sorting?.name === SORT.NONE && sorting?.distance === SORT.NONE) {
            return data;
        }
        const copy = [...data];

        if (sorting?.name !== SORT.NONE) {
            copy.sort(sorting?.name === SORT.ASC ? swapParams(nameDescending) : nameDescending);
        }
        
        if (sorting?.distance !== SORT.NONE) {
            copy.sort(sorting?.distance === SORT.ASC ? swapParams(distanceDesc) : distanceDesc);
        }

        return copy;
    },
    queryFn: () => axios.get(
        '/servers',
        { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }}
    )
})