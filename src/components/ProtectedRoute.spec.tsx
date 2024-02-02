import { describe, vi, test, expect, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from '../testUtils';
import { ProtectedRoute } from ".";
import { Navigate, Route, Routes } from "react-router-dom";

describe('ProtectedRoute', () => {
    afterEach(cleanup);

    test('protected route renders with token', async () => {
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: vi.fn(() => "fake token"),
            },
            writable: true,
        });

        render(
            <Routes>
                <Route index element={<Navigate to="/test" />} />
                <Route path="/test" element={<ProtectedRoute>protected text</ProtectedRoute>} />
                <Route path="/" element={<div>back to root</div>}/>
            </Routes>
        );

        await waitFor(
            () => expect(screen.getByText('protected text')).toBeInTheDocument()
        );
    });

    test('protected route redirects', async () => {
        Object.defineProperty(window, "localStorage", {
            value: {
              getItem: vi.fn(() => null),
            },
            writable: true,
        });

        render(
            <Routes>
                <Route path="/test" element={<ProtectedRoute>protected text</ProtectedRoute>} />
                <Route path="/" element={<div>back to root</div>}/>
            </Routes>
        );

        await waitFor(
            () => expect(screen.getByText('back to root')).toBeInTheDocument()
        );
        
    });

});