import { expect, describe, test, afterEach, beforeAll } from 'vitest';
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import axios, { API_URL } from "../model/rest";
import { render, screen, cleanup, waitFor } from '../testUtils';
import { Login } from '.';

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

    test('form error', async () => {
        const scope = nock(API_URL)
        .post('/tokens')
        .reply(401, { message: "Unauthorized" });

        render(<Login />);

        await userEvent.type(screen.getByTestId('username-input'), "test");
        await userEvent.type(screen.getByTestId('password-input'), "test");

        await userEvent.click(screen.getByTestId('submit-button'));

        await waitFor(
            async () => expect(await screen.findByTestId('form-error')).toBeInTheDocument()
        );
        scope.done();
    });

    afterEach(cleanup)
})
