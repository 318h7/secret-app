import { expect, describe, test } from 'vitest';

import { render, fireEvent, screen } from '../testUtils';
import { PasswordInput } from './Inputs';

describe('Inputs', () => {
    test('password input show password', () => {
        render(<PasswordInput />)
      
        expect(screen.getByTestId('password-input')).toHaveProperty('type', 'password');

        fireEvent.click(screen.getByTestId('password-icon'));

        expect(screen.getByTestId('password-input')).toHaveProperty('type', 'text');
      })
});
