import { useTranslation } from "react-i18next";
import { Card, Table, Row, Column, HeaderColumn } from "../components";
import { useServersQuery } from "../model";
import styled, { useTheme } from "styled-components";
import Loader  from "../icons/loader.svg?react";

const Heading = styled.h2`
    color: ${({ theme: { colors }}) => colors.dark};
`;

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
    const { data, isLoading } = useServersQuery();
    const { t } = useTranslation();
    const isEmpty = !data || data?.length == 0;

    return (
        <Card>
            <Heading>{t('servers.title')}</Heading>
            <Table headers={[
                <HeaderColumn key="name">{t('servers.table.name')}</HeaderColumn>,
                <HeaderColumn key="distance">{t('servers.table.distance')}</HeaderColumn>
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