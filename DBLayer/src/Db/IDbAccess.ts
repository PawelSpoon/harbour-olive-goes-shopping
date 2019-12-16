import { IDbWrapper } from "./IDbWrapper";

export interface IDbAccess extends IDbWrapper {
    // get db version (= app version)
    getVersion() : String
    // set db version
    setVersion(version: String)
    // generates a rather unique id
    getUniqueId() : String
    // cleans content of one table
    cleanTable(name: String);
}

