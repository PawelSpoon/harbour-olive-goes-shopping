import { expect } from 'chai';
import 'mocha';
import { DbWrapperMock } from '../src/Db/DbWrapperMock';
import { DbAccess } from '../src/Db/DbAccess';
import { OliveDb } from '../src/OliveDb/OliveDb';
import { OliveInit } from '../src/OliveDb/OliveInit';
import a from '../test_data/real_exports/Olive-2.4.1.json';
import b from '../test_data/real_exports/Another-2.4.1.json';

let wrapper;
let dbAccess;
let oliveDb;
let oliveInit;

before("setup DbWrapperMock and dbAccess",() => {
  console.log("before olivedb");
  console.log("creating dbwrappermock");
  wrapper = new DbWrapperMock("test-olivedb","1");
  console.log("creating dbaccess");
  dbAccess = new DbAccess(wrapper);
  console.log("creating oliveDb");
  oliveDb = new OliveDb(dbAccess);
  console.log("creating oliveInit and run doInstall")
  oliveInit = new OliveInit(oliveDb);
  oliveInit.doInstall("26");
})

after("destroy db", () => {
    console.log("destroying olivedb");
})

describe("getUniqueId works", () =>{
    it("should pass", () =>{
        var dateObject = new Date();
        let expUnique =  dateObject.getFullYear();
        let uniqueId = oliveDb.db.getUniqueId();
    })
})

let exportedJson;
describe("dumpData works", () =>{
    it("should pass", () =>{
        exportedJson = oliveDb.dumpData();
        //I want to print the msg first like a log
    })
})

describe("immportData works", () =>{
    it("should pass", () =>{
        oliveDb.importData(exportedJson);
        //I want to print the msg first like a log
    })
})

describe("immportData from export", () =>{

    it("should pass", () =>{
        oliveDb.importData(a);
    })
})

describe("immportData from export", () =>{

    it("should pass", () =>{
        oliveDb.importData(b);
    })
})