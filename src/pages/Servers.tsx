import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css, useTheme } from "styled-components";

import { Card, Table, Row, Column, HeaderCell, HeaderMenu } from "../components";
import { useServersQuery } from "../model";
import type { SortAction, ServerField } from "../model";
import Loader from "../icons/loader.svg?react";
import { SORT } from "../constants";

interface NoDataRowProps {
    isEmpty: boolean;
    isLoading: boolean;
}

interface Width {
    $w: number;
}

const adaptiveWidth = css<Width>`
    @media ${({ theme: { media } }) => media.sm} {
        width: ${({ $w }) => $w}%;
    }
`;

const AdaptiveHeader = styled(HeaderCell)<Width>`
    ${adaptiveWidth}
`;

const AdaptiveColumn = styled(Column)<Width>`
    ${adaptiveWidth}
`;

const NoDataRow = ({ isEmpty, isLoading }: NoDataRowProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    if (!isEmpty) return null;

    return (
        <Row>
            <Column>
                {isLoading ? <Loader fill={colors.main} width={40} /> : t('servers.table.empty')}
            </Column>
        </Row>
    )
}

export const Servers = () => {
    const [sorting, setSorting] = useState<SortAction>();
    const { data, isLoading } = useServersQuery(sorting);
    const { t } = useTranslation();
    const isEmpty = !data || data?.length == 0;
    const onSortingChanged = (name: ServerField) => (value: SORT) => {
        setSorting({ name, value });
    };

    return (
        <Card>
            <HeaderMenu>
                <h2>{t('servers.title')}</h2>
            </HeaderMenu>
            <Table headers={[
                <AdaptiveHeader $w={60} key="name" onSortingChanged={onSortingChanged("name")}>
                    {t('servers.table.name')}
                </AdaptiveHeader>,
                <AdaptiveHeader $w={40} key="distance" onSortingChanged={onSortingChanged("distance")}>
                    {t('servers.table.distance')}
                </AdaptiveHeader>
            ]}>
                {data?.map(({  name, distance }, index) => (
                    <Row key={index}>
                        <AdaptiveColumn $w={60} $right>{name}</AdaptiveColumn>
                        <AdaptiveColumn $w={40} $left>{distance}</AdaptiveColumn>
                    </Row>
                ))}
                <NoDataRow isEmpty={isEmpty} isLoading={isLoading} />
            </Table>
        </Card>
    )
}