import { useTranslation } from "react-i18next";
import { Card, Table, Row, Column, HeaderColumn } from "../components";
import { useServersQuery } from "../model";
import styled from "styled-components";

const Heading = styled.h2`
    color: ${({ theme: { colors }}) => colors.dark};
`;

export const Servers = () => {
    const { data, isLoading } = useServersQuery();
    const { t } = useTranslation();
    const isEmpty = data?.length == 0;

    console.log(isLoading);
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
                {isEmpty ? <Row><Column>{t('servers.table.empty')}</Column></Row> : null }
            </Table>
        </Card>
    )
}