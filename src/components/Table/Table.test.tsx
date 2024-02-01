import { expect, describe, test, vi } from 'vitest';

import { render, fireEvent, screen } from '../../testUtils';
import { Table, HeaderCell } from './Table';
import { SORT } from '../../constants';

describe('HeaderCell', () => {
    test('not sortable if callback not passed', () => {
        const { unmount } = render(<HeaderCell>test1</HeaderCell>)

        expect(screen.queryAllByTestId('sort-icon')).toHaveLength(0);
        unmount();
    });

    test('sortable if callback is passed', () => {
        const callback = vi.fn();

        const { unmount } = render(<HeaderCell onSortingChanged={callback}>test2</HeaderCell>)
      
        expect(screen.queryAllByTestId('sort-icon')).toHaveLength(1);
        unmount();
    });


    test('sorting triggers callback', () => {
        const callback = vi.fn();

        const { unmount } = render(<HeaderCell onSortingChanged={callback}>test3</HeaderCell>)
    
        fireEvent.click(screen.getByTestId('sort-icon'));

        expect(callback).toHaveBeenCalledWith(SORT.DESC);
        unmount();
    });
});


describe('Table', () => {
    test('renders all headers', () => {
        const { unmount } = render(<Table headers={[<div key={'one'}>one</div>, <div key={'two'}>two</div>]}>testChild</Table>)

        expect(screen.getByText('one')).not.toBeNull();
        expect(screen.getByText('two')).not.toBeNull();

        unmount();
    });
});