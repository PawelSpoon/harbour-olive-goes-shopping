import * as DbInterface from "./IDbWrapper";
//import * as LS from QtQuick.LocalStorage 2.0;
// .import QtQuick.LocalStorage 2.0 as LS

/*
this is the sailfish os wrapper
*/
class DbWrapper implements DbInterface.IDbWrapper {
    constructor(_db: any) {
        this.dbOpen = true;
        this.db = _db;
    }

    dbOpen: boolean;
    dbName: String;
    dbVersion: String;
    db: any;

    executeWithParams(stmt: String, params: any[]): boolean {
        if (!this.dbOpen) {
            console.log("db not opened");
            return false;
        }
        var result;
        this.db.transaction(function(tx) {
            var rs = tx.executeSql(stmt,params);
            if (rs.rowsAffected > 0) {
                result = true;
                return;
            } else {
                console.log ("No rows affected: " + stmt + " : params " + params);
                result = false;
                return;
            }
        }
        );
        return result;
    }
    execute(stmt: String): boolean {
        if (!this.dbOpen) {
            console.log("db not opened");
            return false;
        }
        var result;
        this.db.transaction(function(tx) {
            var rs = tx.executeSql(stmt);
            if (rs.rowsAffected > 0) {
                result = true;
                return;
            } else {
                console.log ("No rows affected: " + stmt);
                result = false;
                return;
            }
        }
        );
        return result;
    }
    executeSelect(selectStmt: String): DbInterface.SelectResult {
        if (!this.dbOpen) {
            console.log("db not opened");
            return null;
        }
        var result;
        this.db.transaction(function(tx) {
            var rs = tx.executeSql(selectStmt);
            if (!(rs.rowsAffected > 0)) {              
                console.log ("no rows affected: " + selectStmt);
            }
            result = rs;
            return; // this.convertResult(rs);
        }
        );
        return result;
    }
    executeSelectWithParams(selectStmt: String, params: any[]): DbInterface.SelectResult {
        if (!this.dbOpen) {
            console.log("db not opened");
            return null;
        }
        var result;
        this.db.transaction(function(tx) {
            var rs = tx.executeSql(selectStmt,params);
            if (!(rs.rowsAffected > 0)) {              
                console.log ("no rows affected: " + selectStmt);
            }
            result = rs;
            return; // this.convertResult(rs);
        }
        );
        return result;
    }
    // not used, thedb is injected in constructor
    getDataBase(name: String, version: String): Object {
        this.dbName = name;
        this.dbVersion = version;
        this.dbOpen = true;
        //this.db = LS.LocalStorage.openDatabaseSync(name, version, "StorageDatabase", 100000);
        //todo: get rid of this return value
        return this.db;
    }
    
    // convert qt ls format to 
    /*convertResult(result : any)
    {
        var converted = new DbInterface.SelectResult();
        converted.rows = result.rows; 
        //todo: could extend interface and pass also this
        //result.rowsAffected
        return converted;
    }*/
}
