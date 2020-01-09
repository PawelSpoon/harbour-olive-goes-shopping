import * as Db from "./IDbWrapper";
import * as DbA from "./IDbAccess";

// this class implements common functions that do not need direct db access
export class DbAccess implements DbA.IDbAccess {

    getDataBase(name: String, version: String): Object {
        return this.dbWrap.getDataBase(name, version);
    }
    execute(stmt: String): boolean {
        return this.dbWrap.execute(stmt);
    }
    executeWithParams(stmt: String, params: any[]): boolean {
        return this.dbWrap.executeWithParams(stmt, params);
    }
    executeSelect(selectStmt: String): Db.ISelectResult {
        return this.dbWrap.executeSelect(selectStmt);
    }
    executeSelectWithParams(selectStmt: String, params: any[]): Db.ISelectResult {
        return this.dbWrap.executeSelectWithParams(selectStmt, params);
    }
    dbWrap: Db.IDbWrapper;
    constructor(dbWrapper: Db.IDbWrapper) {
      this.dbWrap = dbWrapper;
    }
    
    setVersion(version: String) {
        console.log("setVersion() called.")
        this.execute('DELETE from version');
        this.execute('INSERT OR REPLACE INTO version values ("' + version + '")');
    }

    getVersion(): String {
        console.log("getVersion() called.")
        var version = "1";
        var temp;
        try {
             temp = this.executeSelect("SELECT version FROM VERSION order by version");
        }
        catch(err){
            console.log("seems table version does not exist. return ''.")
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
            console.log("empty row array -> version empty")
            return "";
        }
        var v = temp.rows[0]['version'];
        console.log("returning version: " + v);
        return v.toString();
    }

    getUniqueId(): String {
        console.log("getUniqueId() called.")
        var dateObject = new Date();
        var uniqueId =
                dateObject.getFullYear() + '' +
                dateObject.getMonth() + '' +
                dateObject.getDate() + '' +
                dateObject.getTime();
    
        return uniqueId;
    }

    cleanTable(name)
    {
        console.log("cleanTable() called.")
        this.execute('DELETE FROM ' + name + ';');
    }
}