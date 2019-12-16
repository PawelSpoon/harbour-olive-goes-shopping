"use strict";
exports.__esModule = true;
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database('test.db');
db.run('CREATE TABLE IF NOT EXISTS memos(name LONGVARCHAR, val INTEGER)');
db.run("INSERT INTO memos VALUES('TEST', 5000)");
db.each("SELECT * FROM memos", function (err, row) {
    console.log(row.text);
});
db.close();
/*var Sqlite = require("nativescript-sqlite");
class Db2Connector {
    database: object;
    msg: string;
    constructor(message: string) {
        this.msg = message;
     }

    getMessage() {
       return this.msg;
    }

    getDatabase() {
        (new Sqlite("my.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)").then(id => {
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }
}

let connector = new Db2Connector('message');
console.log(connector.getMessage());
*/ 
