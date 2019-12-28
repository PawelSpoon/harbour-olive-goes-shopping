import * as sqlite from 'sqlite-sync';
import * as DbInterface from "./IDbWrapper";

export class DbWrapperMock implements DbInterface.IDbWrapper {

    constructor(name: String, vers: String) {
        this.dbName = name;
        this.dbVersion = vers;
        this.getDataBase(this.dbName,this.dbVersion);
    }
    
    dbOpen: boolean;
    dbName: String;
    dbVersion: String;

    execute(stmt: String) : boolean {
        console.log('executing: ' + stmt);
        if (!this.dbOpen) {
            console.log("openDb first.");
            return false;;
        }
        try {
            var result = sqlite.run(stmt);
            console.log("statement executed " + stmt);
            return result;
        }
        catch(ex)
        {   
            console.log("something bad happened");
            console.log(ex);
            return false;
        }
        finally
        {
        }
    }

    executeWithParams(stmt: String, params: any[]) : boolean {

        console.log("executing statement (params): " + stmt);
        var rows = sqlite.run(stmt, params)
        console.log(rows);
        return rows;
    }

    executeSelect(selectStmt: String): DbInterface.ISelectResult {

        console.log("executing statement: " + selectStmt);
        var rows = sqlite.run(selectStmt);
        console.log(rows);
        return this.convertResult(rows);
    }
    

    getDataBase(name: String, version: String): Object {
        
        console.log("connecting to: " + name);
        sqlite.connect(name);
        this.dbOpen = true;
        this.dbName = name;
        this.dbVersion = version;
        console.log("return database: " + this.dbName + "," + this.dbVersion);
        return null;
    }

    closeDataBase(): void  {

        this.dbOpen = false;
        this.dbName = "";
        this.dbVersion = "";
        sqlite.close();
        console.log("closing database")
    }

    // convert sqlite3 format to iselectresult
    convertResult(result : any[])
    {
        var converted = new DbInterface.SelectResult();
        converted.rows = result;
        return converted;
    }
}
