export const PAGES = {
    ROOT: '/',
    SERVERS: '/servers',
} as const;

export const TOKEN_KEY = "token";

export enum SORT {
    ASC = 'acs',
    DESC = 'desc',
    NONE = 'none',
}