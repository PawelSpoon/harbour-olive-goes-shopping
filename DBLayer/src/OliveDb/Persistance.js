.import QtQuick.LocalStorage 2.0 as LS

.import "OliveDb.js" as OliveDB
.import "OliveInit.js" as OliveInit
.import "./../Db/DbAccess.js" as DbAccess
.import "./../Db/DbWrapper.js" as DB

// this files is a wrapper to the object oriented model from Qt

// getDatabase(), opens db (if needed) and returns a OliveDB object
//    which contains all methods needed by ui
function getDatabase() {

    console.log("in")
    if ( typeof getDatabase.db == 'undefined' ) {
        console.log("in-in");
        getDatabase.db = LS.LocalStorage.openDatabaseSync("harbour-olive-goes-shopping","1.0", "StorageDatabase", 100000);
    }
    if ( typeof getDatabase.OliveDB == 'undefined') {
        console.log("olive-in");
        var dbWrapper = new DB.DbWrapper(getDatabase.db);
        var dbAccess = new DbAccess.DbAccess(dbWrapper);
        getDatabase.OliveDB = new OliveDB.OliveDb(dbAccess);
    }
    return getDatabase.OliveDB;
}

function initialize()
{
    var init = new OliveInit.OliveInit(getDatabase());
    init.doInstall("26");
}

var uniqueID = (function() {
   var id = 0; // This is the private persistent value
   // The outer function returns a nested function that has access
   // to the persistent value.  It is this nested function we're storing
   // in the variable uniqueID above.
   return function() { return id++; };  // Return and increment
})(); // Invoke the outer function after defining it.
