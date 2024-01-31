import { ReactNode, useState } from "react";
import { SORT } from "../../constants";
import { getNextSorting } from "./unit";
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
        <HColumn {...rest}>
            {children}
            {isSortable ? <SortIcon $sort={sorting} onClick={toggleNameSorting} /> : null}
        </HColumn>
    );
}

interface TableProps {
    children: ReactNode;
    headers: ReactNode;
}

export const Table = ({ headers, children }: TableProps) => {
    return (
        <TableContainer>
            <Header>{headers}</Header>
            {children}
        </TableContainer>
    );
};
