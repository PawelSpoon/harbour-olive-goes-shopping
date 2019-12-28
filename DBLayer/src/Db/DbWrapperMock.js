"use strict";
exports.__esModule = true;
var sqlite = require("sqlite-sync");
var DbInterface = require("./IDbWrapper");
var DbWrapperMock = /** @class */ (function () {
    function DbWrapperMock(name, vers) {
        this.dbName = name;
        this.dbVersion = vers;
        this.getDataBase(this.dbName, this.dbVersion);
    }
    DbWrapperMock.prototype.execute = function (stmt) {
        console.log('executing: ' + stmt);
        if (!this.dbOpen) {
            console.log("openDb first.");
            return false;
            ;
        }
        try {
            var result = sqlite.run(stmt);
            console.log("statement executed " + stmt);
            return result;
        }
        catch (ex) {
            console.log("something bad happened");
            console.log(ex);
            return false;
        }
        finally {
        }
    };
    DbWrapperMock.prototype.executeWithParams = function (stmt, params) {
        console.log("executing statement (params): " + stmt);
        var rows = sqlite.run(stmt, params);
        console.log(rows);
        return rows;
    };
    DbWrapperMock.prototype.executeSelect = function (selectStmt) {
        console.log("executing statement: " + selectStmt);
        var rows = sqlite.run(selectStmt);
        console.log(rows);
        return this.convertResult(rows);
    };
    DbWrapperMock.prototype.getDataBase = function (name, version) {
        console.log("connecting to: " + name);
        sqlite.connect(name);
        this.dbOpen = true;
        this.dbName = name;
        this.dbVersion = version;
        console.log("return database: " + this.dbName + "," + this.dbVersion);
        return null;
    };
    DbWrapperMock.prototype.closeDataBase = function () {
        this.dbOpen = false;
        this.dbName = "";
        this.dbVersion = "";
        sqlite.close();
        console.log("closing database");
    };
    // convert sqlite3 format to iselectresult
    DbWrapperMock.prototype.convertResult = function (result) {
        var converted = new DbInterface.SelectResult();
        converted.rows = result;
        return converted;
    };
    return DbWrapperMock;
}());
exports.DbWrapperMock = DbWrapperMock;
