import { expect, it, describe, vi, afterAll, beforeAll } from "vitest";
import { renderHook, waitFor } from '../testUtils';
import { useServersQuery } from "./useServersQuery"
import axios from "./rest";


describe('useServersQuery', () => {
    const getSpy = vi.spyOn(axios, 'get');

    beforeAll(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: vi.fn(() => "test"),
            },
            writable: true,
        });
    });

    it('should query for servers as soon as it loads', async () => {
        getSpy.mockResolvedValue({ data: [{ name: "test", distance: 1 }]});

        const { result: { current } } = renderHook(() => useServersQuery());

        expect(current.isLoading).toBe(true);
       
        await waitFor(() => {
            return expect(current.isLoading).toBe(true);
        });
    });

    afterAll(() => {
        getSpy.mockRestore();
        vi.useRealTimers();
    });
});