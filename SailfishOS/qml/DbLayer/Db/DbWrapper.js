/*
this is the sailfish os wrapper
*/
.import "IDbWrapper.js" as DbInterface

var DbWrapper = /** @class */ (function () {
    function DbWrapper(_db) {
        this.dbOpen = true;
        this.db = _db;
    }
    DbWrapper.prototype.executeWithParams = function (stmt, params) {
        if (!this.dbOpen) {
            console.log("db not opened");
            return false;
        }
        var result;
        this.db.transaction(function (tx) {
            var rs = tx.executeSql(stmt, params);
            if (rs.rowsAffected > 0) {
                result = true;
                return;
            }
            else {
                console.log("No rows affected: " + stmt + " : params " + params);
                result = false;
                return;
            }
        });
        return result;
    };
    DbWrapper.prototype.execute = function (stmt) {
        if (!this.dbOpen) {
            console.log("db not opened");
            return false;
        }
        var result;
        this.db.transaction(function (tx) {
            var rs = tx.executeSql(stmt);
            if (rs.rowsAffected > 0) {
                result = true;
                return;
            }
            else {
                console.log("No rows affected: " + stmt);
                result = false;
                return;
            }
        });
        return result;
    };
    DbWrapper.prototype.executeSelect = function (selectStmt) {
        if (!this.dbOpen) {
            console.log("db not opened");
            return null;
        }
        var result;
        this.db.transaction(function (tx) {
            var rs = tx.executeSql(selectStmt);
            if (!(rs.rowsAffected > 0)) {
                console.log("no rows affected: " + selectStmt);
            }
            result = rs;
            return; // this.convertResult(rs);
        });
        return result;
    };
    DbWrapper.prototype.executeSelectWithParams = function (selectStmt, params) {
        if (!this.dbOpen) {
            console.log("db not opened");
            return null;
        }
        var result;
        this.db.transaction(function (tx) {
            var rs = tx.executeSql(selectStmt, params);
            if (!(rs.rowsAffected > 0)) {
                console.log("no rows affected: " + selectStmt);
            }
            result = rs;
            return; // this.convertResult(rs);
        });
        return result;
    };
    // not used, thedb is injected in constructor
    DbWrapper.prototype.getDataBase = function (name, version) {
        this.dbName = name;
        this.dbVersion = version;
        this.dbOpen = true;
        //this.db = LS.LocalStorage.openDatabaseSync(name, version, "StorageDatabase", 100000);
        //todo: get rid of this return value
        return this.db;
    };
    return DbWrapper;
}());
