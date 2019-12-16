"use strict";
exports.__esModule = true;
var DbWrapperMock_1 = require("./src/Db/DbWrapperMock");
var OliveDb_1 = require("./src/OliveDb/OliveDb");
var OliveInit_1 = require("./src/OliveDb/OliveInit");
var DbAccess_1 = require("./src/Db/DbAccess");
function TraceStart(testcategory) {
    console.log(" Start " + testcategory + " tests");
}
function TraceEnd(testcategory) {
    console.log(" End " + testcategory + " tests");
}
console.log("OliveDb tests");
var testcategory = "Install";
TraceStart(testcategory);
var oliveDb = new OliveDb_1.OliveDb(new DbAccess_1.DbAccess(new DbWrapperMock_1.DbWrapperMock("olive-test-db", "1")));
var oliveInit = new OliveInit_1.OliveInit(oliveDb);
console.log("Starting install");
oliveInit.doInstall("10");
console.log("Install finished");
var temp = oliveInit.oliveDb.db.getVersion();
console.log(temp);
console.log(temp == "10");
oliveInit.doInstall("26");
temp = oliveInit.oliveDb.db.getVersion();
console.log(temp == "26");
oliveInit.oliveDb.getShoppingList();
TraceEnd(testcategory);
testcategory = "Initial-Import-From-Items-Json";
TraceStart(testcategory);
oliveInit.oliveDb.importCategoriesFromJson();
oliveInit.oliveDb.getEnums("category");
oliveInit.oliveDb.importItemsFromJson();
oliveInit.oliveDb.getItems("household");
oliveInit.oliveDb.importRecipesFromJson();
oliveInit.oliveDb.getRecipes();
TraceEnd(testcategory);
testcategory = "Export-Import";
TraceStart(testcategory);
oliveDb.dumpData();
TraceEnd(testcategory);
/*oliveInit.oliveDb.setItem("2","name",4,"unit","type",2,"category",1,2);
var x = oliveInit.oliveDb.getItemPerName('name');
console.log(x);
oliveInit.oliveDb.setEnum("category",1,"myenum",0);
var cats = oliveInit.oliveDb.getEnums("category");
console.log(cats);
oliveInit.oliveDb.importItemsFromJson();
console.log(oliveInit.oliveDb.getItems("household"));
*/ 
