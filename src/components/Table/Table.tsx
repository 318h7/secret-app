import { ReactNode, useState } from "react";
import { SORT } from "../../constants";
import { getNextSorting } from "./util";
import { HColumn, Header, SortIcon, TableContainer } from "./styled";

interface HeaderCellProps {
    children: ReactNode;
    onSortingChanged?: (value: SORT) => void;
}

export const HeaderCell = ({ children, onSortingChanged, ...rest }: HeaderCellProps) => {
    const [sorting, setSorting] = useState<SORT>(SORT.NONE);
    const isSortable = !!onSortingChanged;
    
    const toggleNameSorting = () => {
        const next = getNextSorting(sorting);
        setSorting(next);
        onSortingChanged?.(next);
    };

    return (
        <HColumn data-testid="header-column" {...rest}>
            {children}
            {isSortable ? <SortIcon data-testid="sort-icon" $sort={sorting} onClick={toggleNameSorting} /> : null}
        </HColumn>
    );
}

interface TableProps {
    children: ReactNode;
    headers: ReactNode;
}

export const Table = ({ headers, children }: TableProps) => {
    return (
        <TableContainer data-testid="table">
            <Header>{headers}</Header>
            {children}
        </TableContainer>
    );
};
