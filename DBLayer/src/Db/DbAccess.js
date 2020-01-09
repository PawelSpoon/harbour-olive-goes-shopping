"use strict";
exports.__esModule = true;
// this class implements common functions that do not need direct db access
var DbAccess = /** @class */ (function () {
    function DbAccess(dbWrapper) {
        this.dbWrap = dbWrapper;
    }
    DbAccess.prototype.getDataBase = function (name, version) {
        return this.dbWrap.getDataBase(name, version);
    };
    DbAccess.prototype.execute = function (stmt) {
        return this.dbWrap.execute(stmt);
    };
    DbAccess.prototype.executeWithParams = function (stmt, params) {
        return this.dbWrap.executeWithParams(stmt, params);
    };
    DbAccess.prototype.executeSelect = function (selectStmt) {
        return this.dbWrap.executeSelect(selectStmt);
    };
    DbAccess.prototype.executeSelectWithParams = function (selectStmt, params) {
        return this.dbWrap.executeSelectWithParams(selectStmt, params);
    };
    DbAccess.prototype.setVersion = function (version) {
        console.log("setVersion() called.");
        this.execute('DELETE from version');
        this.execute('INSERT OR REPLACE INTO version values ("' + version + '")');
    };
    DbAccess.prototype.getVersion = function () {
        console.log("getVersion() called.");
        var version = "1";
        var temp;
        try {
            temp = this.executeSelect("SELECT version FROM VERSION order by version");
        }
        catch (err) {
            console.log("seems table version does not exist. return ''.");
            return "";
        }
        console.log("return version object: " + temp);
        if (temp == undefined) {
            console.log("empty array  -> version empty");
            return "";
        }
        if (temp.rows === undefined) {
            console.log("empty row -> version empty");
            return "";
        }
        if (temp.rows[0] === undefined) {
            console.log("empty row array -> version empty");
            return "";
        }
        var v = temp.rows[0]['version'];
        console.log("returning version: " + v);
        return v.toString();
    };
    DbAccess.prototype.getUniqueId = function () {
        console.log("getUniqueId() called.");
        var dateObject = new Date();
        var uniqueId = dateObject.getFullYear() + '' +
            dateObject.getMonth() + '' +
            dateObject.getDate() + '' +
            dateObject.getTime();
        return uniqueId;
    };
    DbAccess.prototype.cleanTable = function (name) {
        console.log("cleanTable() called.");
        this.execute('DELETE FROM ' + name + ';');
    };
    return DbAccess;
}());
exports.DbAccess = DbAccess;
