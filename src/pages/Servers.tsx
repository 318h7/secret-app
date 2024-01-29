import { useTranslation } from "react-i18next";
import { Card } from "../components";
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
            {isEmpty ? t('servers.empty') : null }
        </Card>
    )
}