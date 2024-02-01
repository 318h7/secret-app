import { expect, it, describe, vi, beforeAll } from "vitest";
import nock from 'nock'
import { renderHook, waitFor } from '../testUtils';
import { useServersQuery } from "./useServersQuery"
import axios, { API_URL } from "./rest";


describe('useServersQuery', () => {
    beforeAll(() => {
        axios.defaults.adapter = 'http';
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: vi.fn(() => "test"),
            },
            writable: true,
        });
    });

    it('should query for servers as soon as it loads', async () => {
        const scope = nock(API_URL)
        .get('/servers')
        .reply(200, [{ name: "test", distance: 1 }]);

        const { result: { current } } = renderHook(() => useServersQuery());

        expect(current.isLoading).toBe(true);
       
        await waitFor(() => expect(current.isLoading).toBe(true));
        scope.done()
    });
});