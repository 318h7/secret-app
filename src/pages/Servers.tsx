import { useTranslation } from "react-i18next";
import { Card, Table, Row, Column, HeaderCell } from "../components";
import { ServerSorting, useServersQuery } from "../model";
import { useTheme } from "styled-components";
import Loader from "../icons/loader.svg?react";
import { SORT } from "../constants";
import { useState } from "react";

interface NoDataRowProps {
    isEmpty: boolean;
    isLoading: boolean;
}

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
    const [sorting, setSorting] = useState<ServerSorting>({ name: SORT.NONE, distance: SORT.NONE});
    const { data, isLoading } = useServersQuery(sorting);
    const { t } = useTranslation();
    const isEmpty = !data || data?.length == 0;
    const onSortingChanged = (name: string) => (value: SORT) => {
        setSorting(current => ({ ...current, [name]: value }));
    };

    return (
        <Card>
            <h2>{t('servers.title')}</h2>
            <Table headers={[
                <HeaderCell key="name" onSortingChanged={onSortingChanged("name")}>
                    {t('servers.table.name')}
                </HeaderCell>,
                <HeaderCell key="distance" onSortingChanged={onSortingChanged("distance")}>
                    {t('servers.table.distance')}
                </HeaderCell>
            ]}>
                {data?.map(({  name, distance }, index) => (
                    <Row key={index}>
                        <Column $right>{name}</Column>
                        <Column $left>{distance}</Column>
                    </Row>
                ))}
                <NoDataRow isEmpty={isEmpty} isLoading={isLoading} />
            </Table>
        </Card>
    )
}