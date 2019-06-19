// @flow

export const GET_PICTURE_URL_FROM_LOGIN = (login: string) => (
    `https://intra.epitech.eu/file/userprofil/profilview/${login}.jpg`
);

export const SERVER_PORT = 1234;
export const TOGGLE_BREAK_URL = `http://${process.env.REACT_APP_IP}:${SERVER_PORT}/break/toggle`;
export const REMOVE_BREAK_URL = `http://${process.env.REACT_APP_IP}:${SERVER_PORT}/break/remove`;
export const COMMENT_URL = `http://${process.env.REACT_APP_IP}:${SERVER_PORT}/comment`;
export const LOGINS_URL = `http://${process.env.REACT_APP_IP}:${SERVER_PORT}/logins`
