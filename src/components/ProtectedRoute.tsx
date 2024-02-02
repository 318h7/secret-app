import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES, TOKEN_KEY } from "../constants";

type Props<T extends object> = PropsWithChildren<T>;

export const ProtectedRoute = <T extends object>({ children }: Props<T>) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(TOKEN_KEY) === null) {
            navigate(PAGES.ROOT);
        }
    }, [navigate]);

    return children;
};