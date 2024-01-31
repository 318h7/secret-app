import { SORT } from "../../constants";

const SORTING_ORDER = [SORT.NONE, SORT.DESC, SORT.ASC];

export const getNextSorting = (current: SORT) => SORTING_ORDER[(SORTING_ORDER.indexOf(current) + 1) % SORTING_ORDER.length];

export const getAlignment = (left?: boolean, right?: boolean) => {
    if (left) return "flex-start";
    if (right) return "flex-end";
    return "center";
};

