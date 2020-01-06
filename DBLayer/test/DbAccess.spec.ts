import { expect } from 'chai';
import 'mocha';
import { DbWrapperMock } from '../src/Db/DbWrapperMock';
import { DbAccess } from '../src/Db/DbAccess';

let dbAccessWrapper;

before("setup for dbaccess.spec",() => {
  console.log("before dbaccess")
  console.log("creating dbwrappermock");
  dbAccessWrapper = new DbWrapperMock("test-dbaccess","1");
})

after("destroy db", () => {
    console.log("destroying dbaccess.spec");
})

describe("getUniqueId works without wrapper", () =>{
    it("should pass", () =>{
        var dateObject = new Date();
        let expUnique =  dateObject.getFullYear();
        let uniqueId = new DbAccess(null).getUniqueId();
        //I want to print the msg first like a log
        expect(uniqueId).contains(expUnique);
    })
})

describe("getUniqueId works with wrapper", () =>{
    it("should pass", () =>{
        var dateObject = new Date();
        let expUnique =  dateObject.getFullYear();
        console.log(dbAccessWrapper);
        let uniqueId = new DbAccess(dbAccessWrapper).getUniqueId();
        //I want to print the msg first like a log
        expect(uniqueId).contains(expUnique);
    })
})

describe("create items table", () =>{
    it("should pass", () =>{
        console.log(dbAccessWrapper);
        let result = new DbAccess(dbAccessWrapper).execute('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT, ordernr INTEGER DEFAULT 0, co2 dec(5,2) DEFAULT 0.0)');
    })
})


describe("insert a record", () =>{
    it("should pass", () =>{
        console.log(dbAccessWrapper);
        let result = new DbAccess(dbAccessWrapper).execute("INSERT INTO items(uid, name) values (1,'2')");
    })
})


describe("read a record", () =>{
    it("should pass", () =>{
        console.log(dbAccessWrapper);
        let result = new DbAccess(dbAccessWrapper).executeSelect("select * from items");
        expect(result.rows.length).equal(1);
    })
})

describe("cleanTable()", () =>{
    it("should pass", () =>{
        let result = new DbAccess(dbAccessWrapper).cleanTable("items");
    })
})

describe("read empty table", () =>{
    it("should pass", () =>{
        let result = new DbAccess(dbAccessWrapper).executeSelect("SELECT * FROM items");
        expect(result.rows.length).equal(0);
    })
})

describe("insert with params an item with appostrophe", () =>{
    it("should pass", () =>{
        let result = new DbAccess(dbAccessWrapper).executeWithParams("INSERT INTO items (uid,name) values(?,?)", [1,"o'clock"]);
        console.log("appo " + result);
    })
})

describe("read a record with appostrophe", () =>{
    it("should pass", () =>{
        console.log(dbAccessWrapper);
        let result = new DbAccess(dbAccessWrapper).executeSelect("select * from items");
        expect(result.rows.length).equal(1);
        expect(result.rows[0].name,"o'clock");
    })
})

describe("setVersion() on empty db", () =>{
    it("should fail", () =>{
        new DbAccess(dbAccessWrapper).setVersion("12");
    })
})

describe("getVersion() on empty db", () =>{
    it("should fail", () =>{
        new DbAccess(dbAccessWrapper).getVersion();
    })
})

describe("create version table", () =>{
    it("should pass", () =>{
        console.log(dbAccessWrapper);
        let result = new DbAccess(dbAccessWrapper).execute('CREATE TABLE IF NOT EXISTS version(version INTEGER)');
    })
})

describe("getVersion() empty version table", () =>{
    it("should pass", () =>{
        // clean table - for some reason it wrapper is null outside of it
        let result = new DbAccess(dbAccessWrapper).execute('DELETE from version');  
        // act
        let version2 =new DbAccess(dbAccessWrapper).getVersion();
        expect(version2).equal("");
    })
})

let version = '12';
describe("setVersion()", () =>{
    it("should pass", () =>{
        new DbAccess(dbAccessWrapper).setVersion(version);
    })
})

describe("getVersion()", () =>{
    it("should pass", () =>{
        let version2 =new DbAccess(dbAccessWrapper).getVersion();
        console.log('retrieved version:' + version2);
        expect(version2).equal(version);
    })
})
