'use strict';

const Excel = require('exceljs');

const NEWLINE = '\r\n';
const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const IN_PROGRESS_STATUS = 'in progress';
const DEFAULT_STATUS = 'default';

class Database {
    constructor(filePath) {
        this.filePath = filePath;
        this.store = {};
        this.workbook = new Excel.Workbook();
        this.workbook.xlsx.readFile(filePath).then(
            () => this.refreshStore()
        );
    }

    async updateFile() {
        await this.workbook.xlsx.writeFile(this.filePath);
    }

    async refreshStore() {
        // default take the first work sheet.
        const sheet = this.workbook.getWorksheet(1);
        sheet.eachRow(row => {
            const loginCell = row.getCell(1);
            const breaksCell = row.getCell(2);

            if (!loginCell.value.match(EMAIL_REG)) return;

            const login = loginCell.value.replace(/@.*$/, '');
            this.store[login] = {
                login,
                breaks: (breaksCell.value
                    ? breaksCell.value.split(NEWLINE)
                    : []
                ),
                status: DEFAULT_STATUS,
                lastUpdate: Date.now(),
                breakInProgress: null,
                _login: loginCell,
                _breaks: breaksCell,
            };
        });
    }

    getStore() {
        return Object.values(this.store).map(row => ({
            login: row.login,
            breaks: row.breaks,
            status: row.status,
            lastUpdate: row.lastUpdate,
        }))
    }

    toggleBreak(login, date) {
        const row = this.store[login];
        if (!row) {
            return this.getStore();
        }

        row.lastUpdate = Date.now();
        if (row.status === DEFAULT_STATUS) {
            // begin break.
            row.status = IN_PROGRESS_STATUS;
            row.breakInProgress = date;
        } else {
            // end break.
            const begin = row.breakInProgress;
            row.status = DEFAULT_STATUS;
            row.breakInProgress = null;
            row.breaks.push(`${begin} -> ${date}`);
            row._breaks = row.breaks.join(NEWLINE);
        }

        this.updateFile();
        return this.getStore();
    }
}

module.exports = Database;
