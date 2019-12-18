import { expect } from 'chai';
import 'mocha';
import { DbWrapperMock } from '../src/Db/DbWrapperMock';
import { DbAccess } from '../src/Db/DbAccess';
import { OliveDb } from '../src/OliveDb/OliveDb';
import { OliveInit } from '../src/OliveDb/OliveInit';

let moveCatWrapper;
let moveCatDbAccess;
let moveCatOliveDb;
let moveCatOliveInit;

before("setup DbWrapperMock and dbAccess for move-cat",() => {
  console.log("before olivedb.movecategory");
  console.log("creating dbwrappermock");
  moveCatWrapper = new DbWrapperMock("test-olivedbmove","1");
  console.log("creating dbaccess");
  moveCatDbAccess = new DbAccess(moveCatWrapper);
  console.log("creating oliveDb");
  moveCatOliveDb = new OliveDb(moveCatDbAccess);
  console.log("creating oliveInit and run doInstall")
  moveCatOliveInit = new OliveInit(moveCatOliveDb);
  moveCatOliveInit.doInstall("26");
  // moveCatOliveDb.importCategoriesFromJson();
})

after("destroy db", () => {
    console.log("destroying olivedb.movecategory");
})

describe("try to move highest category up and fail", () =>{
    it("should pass", () =>{
        // just check they are there
        moveCatOliveDb.importCategoriesFromJson();
        let highestCat = moveCatOliveDb.db.executeSelect("select * from category where ordernr=1000");
        //let meatCat = moveCatOliveDb.getEnums("category");
        console.log(highestCat);
        let success = moveCatOliveDb.moveCategory(highestCat.rows[0].name,true);
        let highestCat2 = moveCatOliveDb.db.executeSelect("select * from category where ordernr=1000");
        console.log(highestCat2);
        // check that success = false;
        expect(success).equal(false);
        // check that both are same
        expect(highestCat.rows[0].name).equal(highestCat2.rows[0].name);
    })
})

// same test for move down of last would be good

describe("try to move lowest category down and fail", () =>{
    it("should pass", () =>{
        // just check they are there
        // moveCatOliveDb.importCategoriesFromJson();
        let highestOrderNr = moveCatOliveDb.db.executeSelect("select max(ordernr) from category");
        console.log(highestOrderNr.rows[0]);
        let lowestCat = moveCatOliveDb.db.executeSelect("select * from category where ordernr=" + highestOrderNr.rows[0]['max(ordernr)']);
        //let meatCat = moveCatOliveDb.getEnums("category");
        console.log(lowestCat);
        let success = moveCatOliveDb.moveCategory(lowestCat.rows[0].name,false);
        expect(success).equal(false);
    })
})

describe("try to move category up and succeed", () =>{
    it("should pass", () =>{
        // just check they are there
        // moveCatOliveDb.importCategoriesFromJson();
        let selectResult = moveCatOliveDb.db.executeSelect("select * from category where ordernr=2000");
        console.log(selectResult);
        let category2move = selectResult.rows[0].name;
        selectResult = moveCatOliveDb.db.executeSelect("select * from category where ordernr=1000");
        let theOtherCategory = selectResult.rows[0].name;
        let success = moveCatOliveDb.moveCategory(category2move,true);
        // check new ordernr of category2move
        selectResult = moveCatOliveDb.db.executeSelect("select * from category where name='" + category2move + "'");
        expect(selectResult.rows[0].ordernr).equal(1000);
        // check name of ordernr = 2000
        selectResult = moveCatOliveDb.db.executeSelect("select * from category where name='" + theOtherCategory + "'");
        expect(selectResult.rows[0].ordernr).equal(2000);
        // check also number of ..
        selectResult = moveCatOliveDb.db.executeSelect("select * from category where ordernr=2000");
        expect(selectResult.rows.length).equal(1);
        selectResult = moveCatOliveDb.db.executeSelect("select * from category where ordernr=1000");
        expect(selectResult.rows.length).equal(1);
        // check that success = false;
        //expect(success).equal(false);
        // check that both are same
    })
})
