import { DbWrapperMock } from "./src/Db/DbWrapperMock";
import { OliveDb } from "./src/OliveDb/OliveDb";
import { OliveInit } from "./src/OliveDb/OliveInit";
import { DbAccess } from "./src/Db/DbAccess";

function TraceStart(testcategory: String) : void {
   console.log(" Start " + testcategory + " tests");
}

function TraceEnd(testcategory: String) : void {
    console.log(" End " + testcategory + " tests");
}
 
console.log("OliveDb tests")
var testcategory = "Install";
TraceStart(testcategory);
var oliveDb = new OliveDb(new DbAccess(new DbWrapperMock("olive-test-db","1")))
var oliveInit = new OliveInit(oliveDb);
console.log("Starting install");
oliveInit.doInstall("10");
console.log("Install finished")
var temp = oliveInit.oliveDb.db.getVersion();
console.log(temp);
console.log (temp == "10");
oliveInit.doInstall("26");
temp = oliveInit.oliveDb.db.getVersion();
console.log (temp == "26");
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