// @flow

export const GET_PICTURE_URL_FROM_LOGIN = (login: string) => (
    `https://intra.epitech.eu/file/userprofil/profilview/${login}.jpg`
);

export const PORT = 3003;
export const TOGGLE_BREAK_URL = `http://${process.env.REACT_APP_IP}:${PORT}/break/toggle`;
export const REMOVE_BREAK_URL = `http://${process.env.REACT_APP_IP}:${PORT}/break/remove`;
export const COMMENT_URL = `http://${process.env.REACT_APP_IP}:${PORT}/comment`;
export const LOGINS_URL = `http://${process.env.REACT_APP_IP}:${PORT}/logins`
