import * as DbInterface from "./../Db/IDbWrapper";
import * as Db from "./OliveDb"

export class OliveInit {

    constructor(oliveDb : Db.OliveDb) {
        this.oliveDb = oliveDb;
    }
    oliveDb: Db.OliveDb;
    swVersion: String;

    doInstall(swVersion: string)
    {
        this.swVersion = swVersion;
        // this.oliveDb.checkDatabase();
        if (this.isFreshInstall()) {
            this.doFreshInstall(swVersion);
            return;
        }
        var dbVersion = this.oliveDb.db.getVersion();
        this.doUpdateInstall(dbVersion);
    }

    isFreshInstall() : boolean {
        // check if shoppinglist table exists
        // if not: fresh install, else: it's an update
        try {
            var shopResult = this.oliveDb.db.executeSelect('SELECT 1 FROM shoppingList LIMIT 1');
            if(shopResult.rows[0] == undefined) {
                console.log("isFreshInstall(): return true");
                return true;
            }
            console.log("isFreshInstall(): return false");
            return false;
        }
        catch(err) { 
            console.log("isFreshInstall(): return true");
            return true; 
        }
    }

    doFreshInstall(swVersion: String) {
    console.log("start fresh install")
        // clean install
        console.log('executing clean install');
        try {

            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT, ordernr INTEGER DEFAULT 0, co2 dec(5,2) DEFAULT 0.0)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS shoppingList(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean, category TEXT, ordernr INTEGER DEFAULT 0)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS category(uid LONGVARCHAR UNIQUE, name TEXT, ordernr INTEGER DEFAULT 0)')
            this.oliveDb.db.execute('CREATE TABLE IF NOT EXISTS version(version INTEGER)');
            this.oliveDb.db.setVersion(swVersion);
            console.log('clean install success!')
        }
        catch(err) { console.log('exception during clean install: ' + err); }
        return;
    }

    doUpdateInstall(dbVersion: String)
    {
        var swVersion = "26";
        console.log("start update install")
        if (dbVersion == "26") {
            console.log('dbVersion is recent, nothing to do.');
            // reorder categories playground
            // does not work for me with pure sql
            // getAllCategories, if some are with 0 ordernr, just apply 1000 steps
            /*var cats = getEnums("");
            console.log('total number of categories: ' + cats.length);
            for (var catCount = 0; catCount < cats.length; catCount++) {
                var actCat = cats[catCount];
                setEnum("category",actCat.uid,actCat.name, (catCount+1)*1000);
            }*/
            return;
        }
        if (dbVersion == "25") {
            console.log('update from 25 to 26 -> nothing to do but update version');
            this.oliveDb.db.setVersion(this.swVersion);
            console.log('success');
            return;
        }
        this.doPreVersionUpdate(this.swVersion);

    }

    doPreVersionUpdate(swVersion: String) {
        console.log(' db contains no version, running old installation script');
        /*try {
        db.transaction(
                    function(tx) {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS shoppingList(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean, category TEXT)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
                        tx.executeSql('CREATE TABLE IF NOT EXISTS category(uid LONGVARCHAR UNIQUE, name TEXT)')
                    });
        }
        catch(err) { console.log('exception during table creation: ' + err); }
        try {
            // this one may fail when column already exists
            console.log('try to add category columns');
            db.transaction(
                        function(tx) {
                            tx.executeSql('ALTER TABLE items ADD category TEXT') // for migration purposes
                            tx.executeSql('ALTER TABLE shoppingList ADD category TEXT')
                        });
            console.log('category columns added');
        }
        catch (err){
            console.log('category columns were already there: ' + err);
        }
        try {
            // this one may fail when column already exists
            // extend tables for ordering, introduce version table like in sailkick for eaier future migrations
            console.log('try to add ordernr column, and version table');
            db.transaction(
                        function(tx) {
                            //tx.executeSql('DROP TABLE version');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS version(version INTEGER)');
                            tx.executeSql('ALTER TABLE category ADD COLUMN ordernr INTEGER DEFAULT 0');
                            tx.executeSql('ALTER TABLE shoppingList ADD COLUMN ordernr INTEGER DEFAULT 0');
                            tx.executeSql('INSERT OR REPLACE INTO version values (?);', swVersion);
                        });
            console.log('ordernr added');
        }
        catch (err){
            console.log(err);
        }
        try {
            // this one may fail when column already exists
            // extend tables co2 footprint
            console.log('try to add co2 column');
            db.transaction(
                        function(tx) {
                            tx.executeSql('ALTER TABLE items ADD COLUMN co2 dec(5,2) DEFAULT 0.0');
                            tx.executeSql('INSERT OR REPLACE INTO version values (?);', swVersion);
                        });
        }
        catch (err){
            console.log(err);
        }*/
        this.oliveDb.db.setVersion(swVersion);
        return;

    }

}
