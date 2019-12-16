"use strict";
exports.__esModule = true;
// json with items for initial db fill up
var Imp = require("./../../Items");
/*
this is the olive-goes-shoppting specific db access layer
dbAccess is the virtualized shared (with songkick) db access layer
dbWrapper & dbWrapperMock are connecting with the real db
*/
var OliveDb = /** @class */ (function () {
    function OliveDb(accessor) {
        this.db = null;
        this.db = accessor;
    }
    // First, let's create a short helper function to get the database connection
    OliveDb.prototype.checkDatabase = function () {
    };
    // upserts an item in inventory
    /*setItem_(uid,name,amount,unit,type,howMany,category,ordernr,co2) {
        this.checkDatabase();
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO items VALUES (?,?,?,?,?,?,?,?,?);',[uid,name,amount,unit,type,howMany,category,ordernr,co2]);
        var res = "";
            if (rs) {
                res = "OK";
                console.log ("Saved to database: uid:" + uid + ", name:" + name + ", unit:" + unit + ", type:" + type + ", howmany: " + howMany + ", category: " + category);
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }*/
    OliveDb.prototype.getItemPerName = function (itemName) {
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items where name='" + itemName + "'";
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount,
                unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany,
                category: rs.rows[i].category, co2: rs.rows[i].co2 };
            // console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid)
            items.push(trackedItem);
        }
        return items;
    };
    OliveDb.prototype.getRecipes = function () {
        console.debug("getRecipes()");
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT DISTINCT uid, name, servings, instruction, ingredients, howMany, type from recipes";
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name,
                servings: rs.rows[i].servings, instruction: rs.rows[i].instruction,
                ingredients: rs.rows[i].ingredients, howMany: rs.rows[i].howMany, type: rs.rows[i].type };
            //console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " done: " + rs.rows[i].done)
            items.push(trackedItem);
        }
        return items;
    };
    // helpers for import of older files that do not contain some attributes
    OliveDb.prototype.tryGetOrderNr = function (item) {
        if (item === undefined)
            return 0;
        if (item.ordernr === undefined) {
            return 0;
        }
        if (item.ordernr === null) {
            return 0;
        }
        return item.category;
    };
    // helpers for import of older files that do not contain some attributes
    OliveDb.prototype.tryGetCategory = function (item) {
        if (item === undefined)
            return "";
        if (item.category === undefined) {
            return "";
        }
        if (item.category === null) {
            return "";
        }
        return item.category;
    };
    // helper for import of older files that do not contain co2
    OliveDb.prototype.tryGetCo2 = function (item) {
        if (item === undefined)
            return 0.0;
        if (item.co2 === undefined) {
            return 0.0;
        }
        if (item.co2 === null) {
            return 0.0;
        }
        return item.co2;
    };
    // loads whole shopping list
    OliveDb.prototype.getShoppingList = function () {
        console.debug("getShoppingList()");
        return this.getShoppingListItemPerName("");
    };
    // loads whole list (itemName="") , or just one item
    OliveDb.prototype.getShoppingListItemPerName = function (itemName) {
        console.debug("getShoppingListItemPerName(itemName) with itemName:" + itemName);
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT DISTINCT uid, name, amount, unit, done, category, ordernr from shoppingList order by ordernr, category";
        if (itemName !== "")
            sql = "SELECT DISTINCT uid, name, amount, unit, done, category, ordernr from shoppingList where name='" + itemName + "'";
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, done: rs.rows[i].done, category: rs.rows[i].category };
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " done: " + rs.rows[i].done + " category: " + rs.rows[i].category + " order: " + rs.rows[i].ordernr);
            trackedItem.done = true;
            if (rs.rows[i].done === 0)
                trackedItem.done = false;
            items.push(trackedItem);
        }
        return items;
    };
    // sets done flag of one shopping list item
    OliveDb.prototype.updateShoppingListItemChecked = function (uid, done) {
        console.debug("updateShoppingListItemChecked(uid,done) with uid:" + uid + ", done:" + done);
        this.checkDatabase();
        var res = "";
        var dbDone = 0;
        if (done)
            dbDone = 1;
        var rs = this.db.execute("UPDATE shoppingList SET done='" + dbDone + "' WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    // updates the amount of an shopping list item
    OliveDb.prototype.updateShoppingListItemSetAmount = function (uid, amount) {
        console.debug("updateShoppingListItemSetAmount(uid,amount) with uid:" + uid + ", amount:" + amount);
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("UPDATE shoppingList SET amount=" + amount + " WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", name:" + name + ", amount: " + amount);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    // upserts one shopping list item
    OliveDb.prototype.setShoppingListItem = function (uid, name, amount, unit, done, category) {
        console.debug("setShoppingListItem(uid,name,amount..) with uid:" + uid + ", name:" + name + ", category:" + category);
        this.checkDatabase();
        var res = "";
        var ordernr = 0;
        if (category !== "") {
            console.log("looking up category order.");
            // get actual order
            var sql = "SELECT DISTINCT ordernr from shoppingList where category='" + category + "'";
            var rs = this.db.executeSelect(sql);
            if (rs.rows.length > 0) {
                ordernr = rs.rows[0].ordernr;
                console.log('got category order-nr from shopping list: ' + ordernr);
            }
            if (ordernr == 0) {
                console.log("looking into category table for: " + category);
                // category is not in shopping list -> get it from category table
                sql = "SELECT DISTINCT ordernr from category where name='" + category + "'";
                rs = this.db.executeSelect(sql);
                if (rs.rows.length > 0) {
                    ordernr = rs.rows[0].ordernr;
                    console.log('got category order-nr from category table: ' + ordernr);
                }
            }
        }
        var success = this.db.executeWithParams('INSERT OR REPLACE INTO shoppingList (uid,name,amount,unit,done,category,ordernr) VALUES (?,?,?,?,?,?,?);', [uid, name, amount, unit, done, category, ordernr]);
        if (success) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    // delete a shopping list item
    OliveDb.prototype.removeShoppingListItem = function (uid, name, amount, unit, done) {
        console.debug("removeShoppingListItem(uid,..) with uid:" + uid);
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute('DELETE FROM shoppingList WHERE uid="' + uid + '";');
        if (rs) {
            res = "OK";
            console.log("remove from database: uid:" + uid + ", name:" + name + ", done: " + done);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    // clears shoppingList
    // clears howMany info in items and recipes table, which consequently clears the checkboxes on the ui
    OliveDb.prototype.clearShoppingList = function () {
        console.debug("clearShoppingList()");
        this.db.cleanTable("shoppingList");
        this.resetHowMany("items");
        this.resetHowMany("recipes");
    };
    OliveDb.prototype.setRecipe = function (uid, name, servings, instruction, ingredients, howMany, type) {
        //tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
        this.checkDatabase();
        var res = "";
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO recipes VALUES (?,?,?,?,?,?,?);', [uid, name, servings, instruction, ingredients, howMany, type]);
        if (rs) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", name:" + name + ", servings:" + servings + ", type:" + type);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.removeRecipe = function (uid, name) {
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("DELETE FROM recipes WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("remove from recipe - database: uid:" + uid + ", name:" + name);
        }
        else {
            res = "Error";
            console.log("Error removing from database - recipes");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.importRecipesFromJson = function () {
        this.db.cleanTable("recipes");
        var items = Imp.getRecipes();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.setRecipe(this.db.getUniqueId(), item.name, item.servings, item.instruction, JSON.stringify(item.ingredients), 0, item.type);
        }
    };
    OliveDb.prototype.importItemsFromJson = function () {
        var items = Imp.getItems();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            //todo: needs to support category and co2
            this.setItem(this.db.getUniqueId(), item.name, item.amount, item.unit, item.type, 0, this.tryGetCategory(item), this.tryGetCo2(item));
        }
    };
    OliveDb.prototype.importCategoriesFromJson = function () {
        //cleanTable("items");
        var items = Imp.getCategories();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            this.setEnum("category", this.db.getUniqueId(), item.name, 0);
        }
    };
    // false = down
    // true = up
    /*function moveCategoryInShoppingList(category,up)
    {
        // 0 is top
        // highest is lowest
        // what is missing: check that no need to move up / down as already the lowest / topest
    
        this.checkDatabase()
        var res = "";
        var delta = 1000;
    
        // get order of given category
        // get category that has order+1000 value
        // increase order value+1000 of given category
        // decrease value of +1000 category by - 1
    
    
        // 1)
        var sql = "SELECT DISTINCT ordernr from shoppingList where category='" + category + "'";
        console.log(sql)
        var orgOrder
        db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            orgOrder = Number(rs.rows.item(0).ordernr);
            console.log('order of given category: ' + orgOrder);
        })
    
        // don't get smaller then no-category = 0
        if (orgOrder === 1000 && up) return;
    
        // 2) get category that has to switch places
        var catToMoveDown;
        var temp;
        if (up) {
            temp = orgOrder - 1000;
        }
        else {
            temp = orgOrder + 1000;
        }
        if (temp !== 0) { // do not move no-category
          sql = "SELECT DISTINCT category from shoppingList where ordernr=" + temp + ""
          console.log(sql)
    
          db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            if (rs.rows.length > 0)
            catToMoveDown = rs.rows.item(0).category;
            console.log('category to switch: ' + catToMoveDown);
          })
        }
    
        if (catToMoveDown === "undefined") return; // category was last or first, nothing to switch
        // 4) move the other
        if (up) {
            sql = "UPDATE shoppingList SET ordernr = ordernr + 1000 WHERE category = '" + catToMoveDown + "';"
        }
        else {
            sql = "UPDATE shoppingList SET ordernr = ordernr - 1000 WHERE category = '" + catToMoveDown + "';"
        }
        console.log(sql);
        db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("the other category moved");
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
        }
        );
        // todo: if there is no catToMove, then no need to move me ?
    
        // 3) move given category up or down
        if (up) {
            sql = "UPDATE shoppingList SET ordernr = ordernr - 1000 WHERE category = '" + category + "';"
        }
        else {
            sql = "UPDATE shoppingList SET ordernr = ordernr + 1000 WHERE category = '" + category + "';"
        }
        console.log(sql);
    
        db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("category moved");
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
        }
        );
    }
    
    function updateCategoryOrder(category, order)
    {
        this.checkDatabase()
        var res = "";
    
        var sql = "UPDATE shoppinglist set ordernr=" + order + " where category='" + category + "'";
        console.log(sql)
        var orgOrder
        db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
        });
    }
    
    // false = down
    // true = up
    function moveCategory(category,up)
    {
        // 0 is top
        // highest is lowest
        // what is missing: check that no need to move up / topest
    
        this.checkDatabase()
        var res = "";
        var delta = 1000;
    
        // get order of given category
        // get category that has order+/-1000 value
        // increase order value+1000 of given category
        // decrease value of +1000 category by - 1
    
    
        // 1)
        var sql = "SELECT DISTINCT ordernr from category where name='" + category + "'";
        console.log(sql)
        var orgOrder
        db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            // todo: check for row-count first
            orgOrder = Number(rs.rows.item(0).ordernr);
            console.log('order of given category: ' + orgOrder);
        })
    
        // don't get smaller then no-category = 0
        if (orgOrder === 1000 && up) return;
    
        // 2) get category that has to switch places
        var catToMove = undefined;
        var temp;
        if (up) {
            temp = orgOrder - 1000;
        }
        else {
            temp = orgOrder + 1000;
        }
        if (temp > 0) { // do not move no-category (=0), < 0 is an upgrade sideeffect where all categories are 0
           sql = "SELECT DISTINCT name from category where ordernr=" + temp + ""
          console.log(sql)
    
          db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            if (rs.rows.length > 0)
            catToMove = rs.rows.item(0).category;
            console.log('category to switch: ' + catToMove);
          })
    
    
          if (catToMove !== undefined) { // category was last or first, nothing to switch
             // 4) move the other
             if (up) {
               sql = "UPDATE category SET ordernr = ordernr + 1000 WHERE name = '" + catToMove + "';"
             }
             else {
               sql = "UPDATE category SET ordernr = ordernr - 1000 WHERE name = '" + catToMove + "';"
             }
             console.log(sql);
     
              var rs = tx.executeSql(sql);
              if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("the other category moved");
              } else {
                res = "Error";
                console.log ("Error saving to database");
              }
             }
             );
            // todo: if there is no catToMove, then no need to move me ?
          }
        }
    
          // 3) move given category up or down
          if (up) {
            sql = "UPDATE category SET ordernr = ordernr - 1000 WHERE name = '" + category + "';"
          }
          else {
            sql = "UPDATE category SET ordernr = ordernr + 1000 WHERE name = '" + category + "';"
          }
          console.log(sql);
    
          db.transaction(function(tx) {
            var rs = tx.executeSql(sql);
            if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("category moved");
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
         }
          );
    }*/
    OliveDb.prototype.resetHowMany = function (tableName) {
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute('UPDATE ' + tableName + ' SET howMany=0;');
        if (rs) {
            res = "OK";
            console.log("reset howmany successs");
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.setEnum = function (enumTable, uid, name, ordernr) {
        console.debug("setEnum(enumTable,..) with enumTable:" + enumTable + ", uid:" + uid);
        this.checkDatabase();
        var res = "";
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO ' + enumTable + ' (uid, name, ordernr) VALUES (?,?,?);', [uid, name, ordernr]);
        if (rs) {
            res = "OK";
            console.log("Saved enum to database: uid:" + uid + ", name:" + name + ", ordernr: " + ordernr);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.getEnums = function (enumTable) {
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT DISTINCT uid, name, ordernr from category order by ordernr"; // default value
        if (enumTable !== "") {
            sql = "SELECT DISTINCT uid, name, ordernr from " + enumTable + " order by ordernr";
        }
        console.log(enumTable);
        console.log(sql);
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name, ordernr: rs.rows[i].ordernr };
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " ordernr:" + trackedItem.ordernr);
            items.push(trackedItem);
        }
        return items;
    };
    OliveDb.prototype.removeEnum = function (enumTable, uid) {
        console.debug("removeEnum(enumTable, uid) with enumTable:" + enumTable + ", uid:" + uid);
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("DELETE FROM " + enumTable + " WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("remove from database: uid:" + uid);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    //todo: fix and use this during selection, to prevent downdate of i.e. categories ..
    OliveDb.prototype.updateItemSetHowMany = function (uid, howMany) {
        //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
        this.checkDatabase();
        var res = ""; // UPDATE items SET howMany='howMany' WHERE uid=uid;
        var rs = this.db.execute("UPDATE items SET howMany=" + howMany + " where uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", howmany: " + howMany);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    // pre order
    OliveDb.prototype.setItem = function (uid, name, amount, unit, type, howMany, category, co2) {
        //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
        this.checkDatabase();
        var res = "";
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO items VALUES (?,?,?,?,?,?,?,?);', [uid, name, amount, unit, type, howMany, category, co2]);
        if (rs) {
            res = "OK";
            console.log("Saved to database: uid:" + uid + ", name:" + name + ", unit:" + unit + ", type:" + type + ", howmany: " + howMany + ", category: " + category);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.removeItem = function (uid, name) {
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("DELETE FROM items WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log("remove from database: uid:" + uid + ", name:" + name);
        }
        else {
            res = "Error";
            console.log("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    };
    OliveDb.prototype.getItems = function (itemType) {
        console.debug("getItems(itemType) with itemType:" + itemType);
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items where type='" + itemType + "' order by name";
        if (itemType === "") {
            sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items order by name";
        }
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany, category: rs.rows[i].category };
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " and category: " + rs.rows[i].category);
            items.push(trackedItem);
        }
        return items;
    };
    OliveDb.prototype.filterItemsPerName = function (itemName) {
        console.debug("filterItemsPerName(itemName) with itemName:" + itemName);
        var items = [];
        this.checkDatabase();
        var respath = "";
        var sql = "SELECT uid, name, amount, unit, type, howMany, category, co2 from items where UPPER(name) like '%" + itemName + "%'";
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = { uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany, category: rs.rows[i].category, co2: rs.rows[i].co2 };
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid);
            items.push(trackedItem);
        }
        return items;
    };
    OliveDb.prototype.dropDB = function () {
        this.db.cleanTable("items");
        this.db.cleanTable("recipes");
        this.db.cleanTable("shoppingList");
        this.db.cleanTable("category");
    };
    // dump data from DB to json
    OliveDb.prototype.dumpData = function () {
        var db = this.checkDatabase();
        var categories = [];
        categories = this.getEnums("category");
        var items = [];
        items = this.getItems("");
        var recipes = [];
        recipes = this.getRecipes();
        var shoppingList = [];
        shoppingList = this.getShoppingList();
        var version = this.db.getVersion();
        console.log();
        var data = {
            "version": version,
            "categories": categories,
            "items": items,
            "recipes": recipes,
            "shoppingList": shoppingList
        };
        return JSON.stringify(data);
    };
    // import data from json
    OliveDb.prototype.importData = function (json) {
        this.checkDatabase();
        var parsed;
        try {
            parsed = JSON.parse(json);
        }
        catch (error) {
            console.log("error in parse");
            return false;
        }
        if (parsed.categories !== null && parsed.categories !== undefined) {
            if (parsed.categories.length > 0) {
                for (var i = 0; i < parsed.categories.length; i++) {
                    var item = parsed.categories[i];
                    var uid = this.db.getUniqueId();
                    if (item.uid !== null)
                        uid = item.uid;
                    this.setEnum("category", uid, item.name, 0);
                }
            }
        }
        if (parsed.items !== null && parsed.items !== undefined) {
            if (parsed.items.length > 0) {
                for (i = 0; i < parsed.items.length; i++) {
                    item = parsed.items[i];
                    uid = this.db.getUniqueId();
                    if (item.uid !== null)
                        uid = item.uid;
                    this.setItem(uid, item.name, item.amount, item.unit, item.type, item.howMany, this.tryGetCategory(item), this.tryGetCo2(item));
                }
            }
        }
        if (parsed.recipes !== null && parsed.recipes !== undefined) {
            if (parsed.recipes.length > 0) {
                for (i = 0; i < parsed.recipes.length; i++) {
                    var recipe = parsed.recipes[i];
                    uid = this.db.getUniqueId();
                    if (recipe.uid !== null)
                        uid = recipe.uid;
                    this.setRecipe(uid, recipe.name, recipe.servings, recipe.instruction, recipe.ingredients, 0, recipe.type);
                }
            }
        }
        return true;
    };
    return OliveDb;
}());
exports.OliveDb = OliveDb;
