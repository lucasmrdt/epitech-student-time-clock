// @flow

export const GET_PICTURE_URL_FROM_LOGIN = (login: string) => (
    `https://intra.epitech.eu/file/userprofil/profilview/${login}.jpg`
);

export const PORT = 3003;
export const BREAK_URL = `http://${process.env.REACT_APP_IP}:${PORT}/break`;
export const LOGINS_URL = `http://${process.env.REACT_APP_IP}:${PORT}/logins`
