const sqlite3 = require("sqlite3").verbose();

class Database extends sqlite3.Database {

    constructor(path) {
        super(path);

        this.run(`
            CREATE TABLE IF NOT EXISTS USER (
                uid  integer primary key autoincrement,
                id   string not null unique,
                pw   string not null,
                name string not null,
                mail string not null,
                desc string,
                createdAt timestamp default current_timestamp
            )
        `);

        this.run(`
            CREATE TABLE IF NOT EXISTS NOVE (
                nid integer primary key autoincrement,
                wid  integer not null,
                name string not null,
                path string not null,
                desc string,
                view integer DEFAULT 0,
                createdAt timestamp default current_timestamp,
                updatedAt timestamp default current_timestamp
            )
        `);

        this.run(`
            CREATE TABLE IF NOT EXISTS TEMP (
                nid integer primary key autoincrement,
                wid integer not null,
                name string not null,
                path string not null,
                desc string,
                createdAt timestamp default current_timestamp
            )
        `);

        this.stmt = new Map();

        this.stmt.set('user', this.prepare('INSERT INTO USER (id, pw, name) VALUES(?, ?, ?)'));
        this.stmt.set('nove', this.prepare('INSERT INTO NOVE (wid, name, path) VALUES(?, ?, ?)'));
        this.stmt.set('temp', this.prepare('INSERT INTO TEMP (wid, name, path) VALUES(?, ?, ?)'));
    }

    Get(query, args) {
        return new Promise((resolve, reject) => {
            this.get(query, args, (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }

    All(query, args) {
        return new Promise((resolve, reject) => {
            this.all(query, args, (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }
    
    Insert(type, args) {
        return new Promise((resolve, reject) => {
            if (this.stmt.has(type))
                this.stmt.get(type).run(args, resolve);
            else
                rjt('requested type does not exist');
        });
    }

    GetUserById(id) {
        return new Promise((resolve, reject) => {
            this.get('SELECT * FROM USER WHERE id = ?', id, (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }

    GetLastNoveId() {
        return new Promise((resolve, reject) => {
            this.get('SELECT MAX(nid) as id FROM NOVE', (err, row) => {
                err ? reject(err) : resolve(row.id);
            });
        });
    }

    GetLastTempId() {
        return new Promise((resolve, reject) => {
            this.get('SELECT MAX(nid) as id FROM TEMP', (err, row) => {
                err ? reject(err) : resolve(row.id);
            });
        });
    }

}

module.exports = Database;