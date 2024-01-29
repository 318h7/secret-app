import { ReactNode } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
    border: 1px solid ${({ theme: { colors } }) => colors.dark};
    border-radius: ${({ theme: { borderRadius } }) => borderRadius};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.dark};

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
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;

    max-height: 680px;
    overflow-y: auto;
    overflow-x: hidden;

    ${Row}:not(:last-child) {
        border-bottom: 1px solid ${({ theme: { colors } }) => colors.dark};
    }

    :not(:last-child) {
        justify-content: flex-end;
        border-right: 1px solid ${({ theme: { colors } }) => colors.dark};
    }

    :last-child {
        justify-content: flex-start;
    }
`;

export const BodyItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
`;

export const HeaderItem = styled.div`
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
            <Body>{children}</Body>
        </TableContainer>
    );
};
