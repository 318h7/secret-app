import styled from "styled-components";

import { SORT } from "../../constants";
import Triangle from "../../icons/triangle.svg?react";
import { getAlignment } from "./util";

export const TableContainer = styled.div`
    border: 1px solid ${({ theme: { colors } }) => colors.dark};
    box-shadow: inset 1px -1px 0 ${({ theme: { colors } }) => colors.darkGrey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 720px;


    @media ${({ theme: { media } }) => media.md} {
        max-height: 620px;
    }
`;

export const Header = styled.div`
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

export const Column = styled.div<{ $left?: boolean, $right?: boolean }>`
    display: flex;
    justify-content: ${({ $left, $right }) => getAlignment($left, $right)};
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
`;

export const HColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: bold;
    padding: 0.5rem 1rem;
`;

export const SortIcon = styled(Triangle)<{ $sort: SORT }>`
    cursor: pointer;
    fill: ${({ theme: { colors }, $sort }) => $sort === SORT.NONE ? colors.grey : colors.dark};
    margin-left: 0.5rem;
    transform: ${({ $sort }) => $sort === SORT.ASC ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.3s ease-in-out;
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
