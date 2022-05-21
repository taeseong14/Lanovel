const sqlite3 = require("sqlite3").verbose();

class Database extends sqlite3.Database {

    constructor(path) {
        super(path);

        this.run(`
            CREATE TABLE IF NOT EXISTS USER (
                uid  integer primary key autoincrement,
                id   text not null unique,
                pw   text not null,
                name text not null,
                mail text,
                desc text,
                createdAt timestamp default current_timestamp
            )
        `);

        this.run(`
            CREATE TABLE IF NOT EXISTS NOVE (
                nid  integer primary key autoincrement,
                uid  integer not null,
                name text not null,
                desc text,
                thum text,
                createdAt timestamp default current_timestamp,
                updatedAt timestamp default current_timestamp
            )
        `);

        this.run(`CREATE TABLE IF NOT EXISTS EPIS (
            eid  integer primary key autoincrement,
            nid  integer not null,
            name text not null,
            desc text,
            thum text,
            createdAt timestamp default current_timestamp
        )`);

        this.stmt = new Map();

        this.stmt.set('user', this.prepare('INSERT INTO USER (id, pw, name) VALUES(?, ?, ?)'));
        this.stmt.set('nove', this.prepare('INSERT INTO NOVE (uid, name, desc, thum) VALUES(?, ?, ?, ?)'));
        this.stmt.set('epis', this.prepare('INSERT INTO EPIS (nid, name, desc, thum) VALUES(?, ?, ?, ?, ?)'));
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

    GetNoveById(id) {
        return new Promise((resolve, reject) => {
            this.get('SELECT * FROM NOVE WHERE nid = ?', id, (err, row) => {
                err ? reject(err) : resolve(row);
            });
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
            this.get('SELECT count(*) as id FROM NOVE', (err, row) => {
                err ? reject(err) : resolve(row.id);
            });
        });
    }

    GetLastEpisId() {
        return new Promise((resolve, reject) => {
            this.get('SELECT count(*) as id FROM EPIS', (err, row) => {
                err ? reject(err) : resolve(row);
            });
        });
    }

    GetLastTempId() {
        return new Promise((resolve, reject) => {
            this.get('SELECT count(*) as id FROM TEMP', (err, row) => {
                err ? reject(err) : resolve(row.id);
            });
        });
    }

}

module.exports = Database;