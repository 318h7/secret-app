import { expect, describe, test } from 'vitest';

import { render, fireEvent } from '../testUtils';
import { PasswordInput } from './Inputs';

describe('Inputs', () => {
    test('password input show password', () => {
        const { getByTestId } = render(<PasswordInput />)
      
        expect(getByTestId('password-input')).toHaveProperty('type', 'password');

        fireEvent.click(getByTestId('password-icon'));

        expect(getByTestId('password-input')).toHaveProperty('type', 'text');
      })
});
