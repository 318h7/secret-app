import { ReactNode } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
    border: 1px solid ${({ theme: { colors } }) => colors.dark};
    box-shadow: inset 1px -1px 0 ${({ theme: { colors } }) => colors.grey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-height: 680px;
    overflow-y: auto;
    overflow-x: hidden;
`;

const Header = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    background: ${({ theme: { colors } }) => colors.main};
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.dark};
    box-shadow: 0px 0px 4px ${({ theme: { colors } }) => colors.dark};

    :not(:last-child) {
        border-right: 1px solid ${({ theme: { colors } }) => colors.dark};
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;

    &:nth-child(odd) {
        background: ${({ theme: { colors } }) => colors.lightGrey};
    }
`;

const getAlignment = (left?: boolean, right?: boolean) => {
    if (left) return "flex-start";
    if (right) return "flex-end";
    return "center";
};

export const Column = styled.div<{ $left?: boolean, $right?: boolean }>`
    display: flex;
    justify-content: ${({ $left, $right }) => getAlignment($left, $right)};
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
`;

export const HeaderColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: bold;
    padding: 0.5rem 1rem;
`;

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
