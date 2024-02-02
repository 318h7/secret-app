import { expect, describe, test, afterEach, beforeAll } from 'vitest';
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import axios, { API_URL } from "../model/rest";
import { render, screen, cleanup, waitFor } from '../testUtils';
import { Login } from '.';
import { TOKEN_KEY } from '../constants';

describe('Login page', () => {
    beforeAll(() => {
        axios.defaults.adapter = 'http';
    });

    test('login page renders', () => {
        render(<Login />);

        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('field validation', async () => {
        render(<Login />);

        await userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(
            async () => expect(await screen.findAllByTestId('field-error')).toHaveLength(2)
        );
    });

    test('login error', async () => {
        const ERROR = "Custom error";
        const scope = nock(API_URL)
        .post('/tokens')
        .reply(401, { message: ERROR });

        render(<Login />);

        await userEvent.type(screen.getByTestId('username-input'), "test");
        await userEvent.type(screen.getByTestId('password-input'), "test");

        await userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(
            async () => expect(await screen.findByTestId('form-error')).toHaveTextContent(ERROR)
        );
        scope.done();
    });

    test('login success', async () => {
        const scope = nock(API_URL)
        .post('/tokens')
        .reply(200, { token: "TestToken" });

        render(<Login />);

        await userEvent.type(screen.getByTestId('username-input'), "test");
        await userEvent.type(screen.getByTestId('password-input'), "test");

        await userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(
            () => expect(localStorage.getItem(TOKEN_KEY)).toBe("TestToken")
        );
        expect(location.pathname).toBe("/servers")
        scope.done();
    });


    afterEach(cleanup)
})
