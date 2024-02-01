import { PropsWithChildren } from "react";
import Logout from "../icons/logout.svg?react";
import styled from "styled-components";
import { PAGES, TOKEN_KEY } from "../constants";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 1rem;
`;

const LogoutIcons = styled(Logout)`
    fill: ${({ theme: { colors } }) => colors.main};
    cursor: pointer;
`;

type Props<T extends object> = PropsWithChildren<T>;

export const HeaderMenu = <T extends object = object>({ children }: Props<T>) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem(TOKEN_KEY);
        navigate(PAGES.ROOT);
    }

    return (
        <HeaderContainer>
            {children}
            <LogoutIcons alt-text={t("general.logout")} onClick={handleClick} width={32} />
        </HeaderContainer>
    )
};