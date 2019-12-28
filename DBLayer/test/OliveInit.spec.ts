import { expect } from 'chai';
import 'mocha';
import { DbWrapperMock } from '../src/Db/DbWrapperMock';
import { DbAccess } from '../src/Db/DbAccess';
import { OliveDb } from '../src/OliveDb/OliveDb';
import { OliveInit } from '../src/OliveDb/OliveInit';

let oliveInitWrapper;
let oliveInitDbAccess;
let oliveInitOliveDb;
let oliveInitOliveInit;

before("setup for oliveinit.spec",() => {
  console.log("before oliveinit");
  console.log("creating dbwrappermock");
  oliveInitWrapper = new DbWrapperMock("test-oliveinit","1");
  console.log("creating dbaccess");
  oliveInitDbAccess = new DbAccess(oliveInitWrapper);
  console.log("creating oliveDb");
  oliveInitOliveDb = new OliveDb(oliveInitDbAccess);
  console.log("creating oliveInit")
  oliveInitOliveInit = new OliveInit(oliveInitOliveDb);
  oliveInitOliveInit.doInstall("30");
})

after("destroy db", () => {
    console.log("destroying oliveinit.spec");
    console.log("destroying olivedb.movecategory.spec");
    oliveInitOliveDb.dropDB();
    oliveInitOliveDb.db.cleanTable("version");
})


describe("should be fresh install",() => {
    it("should pass", () =>{
        var isFresh = oliveInitOliveInit.isFreshInstall();
        console.log(isFresh);
        expect(isFresh).equal(true);
    })
})


/*describe("check that shopping list has no ordernr column",() => {
    var x = oliveInitOliveDb.executeSelect("DESC shoppingList");
    console.log(x);
})*/


/*describe("immportData from export", () =>{

    it("should pass", () =>{
        oliveDb.importData(a);
    })
})

describe("immportData from export", () =>{

    it("should pass", () =>{
        oliveDb.importData(b);
    })
})*/