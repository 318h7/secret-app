import { expect, test, suite } from 'vitest'
import { getNextSorting, getAlignment } from './util';
import { SORT } from '../../constants';

suite('getAlignment', () => {
    test('default alignment', () => {
        expect(getAlignment()).toBe('center')
    });

    test('left alignment', () => {
        expect(getAlignment(true)).toBe('flex-start')
    });

    test('rignt alignment', () => {
        expect(getAlignment(false, true)).toBe('flex-end')
    });

    test('left alignment priority', () => {
        expect(getAlignment(true, true)).toBe('flex-start')
    });
});

suite('getNextSorting', () => {
    test('ASC after NONE', () => {
        expect(getNextSorting(SORT.NONE)).toBe(SORT.ASC)
    });

    test('DESC after ASC', () => {
        expect(getNextSorting(SORT.ASC)).toBe(SORT.DESC)
    });

    test('NONE after DESC', () => {
        expect(getNextSorting(SORT.DESC)).toBe(SORT.NONE)
    });

    test('cycle brings back', () => {
        let value = SORT.NONE;
        Array.from({ length: 3 }).forEach(() => {
            value = getNextSorting(value);
        });
        expect(value).toBe(SORT.NONE)
    });
});