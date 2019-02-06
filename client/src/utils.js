// @flow

export const formateToNChar = (str: string, length: number) => (
    `${Array(length - str.length).fill('0').join('')}${str}`
);