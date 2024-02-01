import { expect, it, describe, vi, afterAll } from "vitest";
import { renderHook, waitFor, act } from '../testUtils';
import { useLoginQuery } from "./useLoginQuery"
import axios from "./rest";

describe('useLoginQuery', () => {
    const postSpy = vi.spyOn(axios, 'post');

    it('should call onSuccess after sucessful mutation', async () => {
        const successMock = vi.fn();
        postSpy.mockResolvedValue({ data: { token: "test" }});
        const { result: { current: { mutate }} } = renderHook(() => useLoginQuery({ onSuccess: successMock}));

        expect(successMock).not.toHaveBeenCalled();

        act(() => {
            mutate({ username: "test", password: "test" });
        });

        await waitFor(() => {
            expect(successMock).toHaveBeenCalled();
        });
    });

    it('should call onError on failure', async () => {
        const errorMock = vi.fn();
        postSpy.mockRejectedValue({ message: "Error "});
        const { result: { current: { mutate }} } = renderHook(() => useLoginQuery({ onError: errorMock}));

        expect(errorMock).not.toHaveBeenCalled();

        act(() => {
            mutate({ username: "test", password: "test" });
        });
    
        await waitFor(() => {
            expect(errorMock).toHaveBeenCalled();
        });
    });

    afterAll(() => {
        postSpy.mockRestore();
    });
});