// @flow

import {
    LOGINS_URL,
    COMMENT_URL,
    REMOVE_BREAK_URL,
    TOGGLE_BREAK_URL,
} from 'constants/network';

import {
    type StudentType,
    type BreakType,
} from 'types/DataTypes';

const sortByLogin = (students: Array<StudentType>) => (
    students.sort((a, b) => {
        if (a.login < b.login) return -1;
        if (a.login > b.login) return 1;
        return 0;
    })
);

const parseData = (data: Array<StudentType>) => {
    const mappedData = data.map(student => {
        const breaks: Array<BreakType> = student.breaks.map(b => {
            const [begin, end] = b.split(/ *->? */);
            return { begin, end };
        });
        return {
            login: student.login,
            lastUpdate: student.lastUpdate,
            status: student.status,
            comment: student.comment,
            breaks,
        }
    });
    const sortedData = sortByLogin(mappedData);
    return sortedData;
};

export const toggleBreak = async (login: string, date: string) => {
    const res = await fetch(TOGGLE_BREAK_URL, {
        method: 'POST',
        body: JSON.stringify({ login, date }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data: Array<StudentType> = await res.json();
    return parseData(data);
};

export const removeBreak = async (login: string, date: string) => {
const res = await fetch(REMOVE_BREAK_URL, {
        method: 'POST',
        body: JSON.stringify({ login, date }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data: Array<StudentType> = await res.json();
    return parseData(data);
};

export const updateComment = async (login: string, comment: string) => {
    const res = await fetch(COMMENT_URL, {
        method: 'POST',
        body: JSON.stringify({ login, comment }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data: Array<StudentType> = await res.json();
    return parseData(data);
};

export const getStudents = async () => {
    const res = await fetch(LOGINS_URL, { crossDomain: true });
    const data = await res.json();
    return parseData(data);
};
