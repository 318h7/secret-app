import { SORT } from "../../constants";

export const SORTING_ORDER = [SORT.NONE, SORT.ASC, SORT.DESC];

export const getNextSorting = (current: SORT) => SORTING_ORDER[(SORTING_ORDER.indexOf(current) + 1) % SORTING_ORDER.length];

export const getAlignment = (left?: boolean, right?: boolean) => {
    if (left) return 'flex-start';
    if (right) return 'flex-end';
    return 'center';
};

