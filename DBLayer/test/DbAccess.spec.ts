import { expect } from 'chai';
import 'mocha';
import { DbWrapperMock } from '../src/Db/DbWrapperMock';
import { DbAccess } from '../src/Db/DbAccess';

let wrapper;

before("setup DbWrapperMock",() => {
  console.log("creating dbwrappermock");
  wrapper = new DbWrapperMock("test-dbaccess","1");
})

after("destroy db", () => {
    console.log("destroying");
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
        console.log(wrapper);
        let uniqueId = new DbAccess(wrapper).getUniqueId();
        //I want to print the msg first like a log
        expect(uniqueId).contains(expUnique);
    })
})

describe("create items table", () =>{
    it("should pass", () =>{
        console.log(wrapper);
        let result = new DbAccess(wrapper).execute('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT, ordernr INTEGER DEFAULT 0, co2 dec(5,2) DEFAULT 0.0)');
    })
})


describe("insert a record", () =>{
    it("should pass", () =>{
        console.log(wrapper);
        let result = new DbAccess(wrapper).execute("INSERT INTO items(uid, name) values (1,'2')");
    })
})


describe("read a record", () =>{
    it("should pass", () =>{
        console.log(wrapper);
        let result = new DbAccess(wrapper).executeSelect("select * from items");
        expect(result.rows.length).equal(1);
    })
})

describe("cleanTable()", () =>{
    it("should pass", () =>{
        let result = new DbAccess(wrapper).cleanTable("items");
    })
})

describe("read empty table", () =>{
    it("should pass", () =>{
        let result = new DbAccess(wrapper).executeSelect("SELECT * FROM items");
        expect(result.rows.length).equal(0);
    })
})

describe("setVersion() on empty db", () =>{
    it("should fail", () =>{
        new DbAccess(wrapper).setVersion("12");
    })
})

describe("getVersion() on empty db", () =>{
    it("should fail", () =>{
        new DbAccess(wrapper).getVersion();
    })
})

describe("create version table", () =>{
    it("should pass", () =>{
        console.log(wrapper);
        let result = new DbAccess(wrapper).execute('CREATE TABLE IF NOT EXISTS version(version INTEGER)');
    })
})

describe("getVersion() empty version table", () =>{
    it("should pass", () =>{
        let version2 =new DbAccess(wrapper).getVersion();
        expect(version2).equal("");
    })
})

let version = "12"
describe("setVersion()", () =>{
    it("should pass", () =>{
        new DbAccess(wrapper).setVersion(version);
    })
})

describe("getVersion()", () =>{
    it("should pass", () =>{
        let version2 =new DbAccess(wrapper).getVersion();
        expect(version2).equal(version);
    })
})
