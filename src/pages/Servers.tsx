import { useTranslation } from "react-i18next";
import { Card, Table, Row, BodyItem, HeaderItem } from "../components";
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
            {isEmpty ? t('servers.table.empty') : null }
            <Table headers={[
                <HeaderItem key="name">{t('servers.table.name')}</HeaderItem>,
                <HeaderItem key="distance">{t('servers.table.distance')}</HeaderItem>
            ]}>
                {data?.map(({  name, distance }, index) => (
                    <Row key={index}>
                        <BodyItem>{name}</BodyItem>
                        <BodyItem>{distance}</BodyItem>
                    </Row>
                ))}
            </Table>
        </Card>
    )
}