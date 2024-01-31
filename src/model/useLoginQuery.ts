import { useMutation } from "@tanstack/react-query";
import type { MutateOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import axios from "./rest";

interface Data { token: string }
interface Message { message: string }
type Error = AxiosError<Message>;
type Response = AxiosResponse<Data>;

export interface LoginData {
    username: string;
    password: string;
}

interface Parameters {
    onSuccess?: MutateOptions<Response, Error, LoginData>['onSuccess'];
    onError?: MutateOptions<Response, Error, LoginData>['onError'];
}

export const useLoginQuery = ({ onSuccess, onError }: Parameters = {}) => useMutation<Response, Error, LoginData>({
    onSuccess,
    onError,
    mutationFn: (data: LoginData) => axios.post('/tokens', data)
})