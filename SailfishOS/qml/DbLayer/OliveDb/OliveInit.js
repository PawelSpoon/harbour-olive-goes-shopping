"use strict";
//exports.__esModule = true;
var OliveInit = /** @class */ (function () {
    function OliveInit(oliveDb) {
        this.oliveDb = oliveDb;
    }
    OliveInit.prototype.doInstall = function (swVersion) {
        this.swVersion = swVersion;
        // this.oliveDb.checkDatabase();
        if (this.isFreshInstall()) {
            this.doFreshInstall(swVersion);
            return;
        }
        var dbVersion = this.oliveDb.db.getVersion();
        this.doUpdateInstall(dbVersion);
    };
    OliveInit.prototype.isFreshInstall = function () {
        // check if shoppinglist table exists
        // if not: fresh install, else: it's an update
        try {
            var shopResult = this.oliveDb.db.executeSelect('SELECT 1 FROM shoppingList LIMIT 1');
            if (shopResult.rows[0] === undefined) {
                console.log("isFreshInstall(): return true");
                return true;
            }
            console.log("isFreshInstall(): return false");
            return false;
        }
        catch (err) {
            console.log("isFreshInstall(): return true");
            return true;
        }
    };
    OliveInit.prototype.doFreshInstall = function (swVersion) {
        console.log("start fresh install");
        // clean install
        console.log('executing clean install');
        try {
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT, ordernr INTEGER DEFAULT 0, co2 dec(5,2) DEFAULT 0.0)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS shoppingList(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean, category TEXT, ordernr INTEGER DEFAULT 0)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS category(uid LONGVARCHAR UNIQUE, name TEXT, ordernr INTEGER DEFAULT 0)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS version(version INTEGER)');

            this.oliveDb.db.setVersion(swVersion);
            console.log('clean install success!');
        }
        catch (err) {
            console.log('exception during clean install: ' + err);
        }
        // for some reason, clean is not clean :(
        try {
            this.oliveDb.db.execute('ALTER TABLE category ADD COLUMN ordernr INTEGER DEFAULT 0');
        }
        catch (err) {
            console.log('seems category already has ordernr column: ' + err);
        }
        try {
            this.oliveDb.db.execute('ALTER TABLE shoppingList ADD COLUMN ordernr INTEGER DEFAULT 0');
        }
        catch (err) {
            console.log('seems shoppingList already has ordernr column: ' + err);
        }
        try {
            this.oliveDb.db.execute('ALTER TABLE items ADD COLUMN co2 dec(5,2) DEFAULT 0');
        }
        catch (err) {
            console.log('seems items already has co2 column: ' + err);
        }
        return;
    };
    OliveInit.prototype.ensureVersionTable = function () {
        try {
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS version(version INTEGER)');
        }
        catch (err) {
            console.log('seems version table already exists: ' + err);
        }
    };
    OliveInit.prototype.ensureCategoryTableHasOrderNrColumn = function () {
        try {
            this.oliveDb.db.execute('ALTER TABLE category ADD COLUMN ordernr INTEGER DEFAULT 0');
        }
        catch (err) {
            console.log('seems category already has ordernr column: ' + err);
        }
    };
    OliveInit.prototype.ensureShoppingTableHasOrderNrColumn = function () {
        try {
            this.oliveDb.db.execute('ALTER TABLE shoppingList ADD COLUMN ordernr INTEGER DEFAULT 0');
        }
        catch (err) {
            console.log('seems shoppingList already has ordernr column: ' + err);
        }
    };
    OliveInit.prototype.ensureItemsTableHasCO2Column = function () {
        try {
            this.oliveDb.db.execute('ALTER TABLE items ADD COLUMN co2 dec(5,2) DEFAULT 0');
        }
        catch (err) {
            console.log('seems items already has co2 column: ' + err);
        }
    };
    OliveInit.prototype.doUpdateInstall = function (dbVersion) {
        // for version higher 30 we should be ready
        var swVersion = "30";
        console.log("start update install");
        // for some reason, clean is not clean :(
        this.ensureVersionTable();
        this.ensureCategoryTableHasOrderNrColumn();
        this.ensureShoppingTableHasOrderNrColumn();
        this.ensureItemsTableHasCO2Column();
        // this should initialize the ordernr if all 0
        this.oliveDb.initCategoryOrderNrs();
        if (dbVersion == "26") {
            console.log('update from 26 to ' + swVersion + ', nothing to do.');
            this.oliveDb.db.setVersion(this.swVersion);
            return;
        }
        if (dbVersion == "25") {
            console.log('update from 26 to ' + swVersion + ', nothing to do.');
            this.oliveDb.db.setVersion(this.swVersion);
            return;
        }
        this.doPreVersionUpdate(this.swVersion);
    };
    OliveInit.prototype.doPreVersionUpdate = function (swVersion) {
        console.log(' db contains no version, running old installation script');
        this.oliveDb.db.setVersion(swVersion);
        return;
    };
    return OliveInit;
}());
//exports.OliveInit = OliveInit;
