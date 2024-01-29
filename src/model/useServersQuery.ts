import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from "axios";

import axios from "./rest";
import { TOKEN_KEY } from '../constants';

interface Server {
    name: string;
    distance: number;
}
type Data = Server[];

export const useServersQuery = () => useQuery({
    queryKey: ['servers'],
    select: (response: AxiosResponse<Data>): Data => response.data,
    queryFn: () => axios.get(
        '/servers',
        { headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }}
    )
})