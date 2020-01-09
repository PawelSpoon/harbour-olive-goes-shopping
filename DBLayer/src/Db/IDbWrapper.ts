
// imlements the most basic function on db level and hides
// the diffs between sqlite3 on windows and qt local storage on sailfish
export interface IDbWrapper {
    // obsolete
    getDataBase(name: String, version: String) : Object
    execute(stmt: String): boolean;
    executeWithParams(stmt: String, params: any[]): boolean;
    executeSelect(selectStmt : String) : ISelectResult;
    executeSelectWithParams(selectStmt : String, params: any[]) : ISelectResult;
}

// rs.rows.item(i).uid
export interface ISelectResult {
    rows : any[];
    length: number;
}

/*export class row {
    item: any;
}*/ 

export class SelectResult implements ISelectResult {
    rows: any[];
    length: number;
    /*private _rows: any[];
    get rows():any[] {
        return this._rows;
    }
    set rows(r: any[]) {
        this._rows = r;
    }
    private _length: number;
    get length():number {
        return this.rows.length;
    }
    set length(theBar:number) {
        //this._length = theBar;
    }*/
}