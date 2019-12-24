// json with items for initial db fill up
import * as Imp from "./../../Items";
// interface of pawels commond db layer
import * as DbInterface from "./../Db/IDbAccess";
// pawels common db layer (db independent)
import * as Db from "../Db/DbAccess"
declare var Items: any;

/*
this is the olive-goes-shopping specific db access layer
dbAccess is the virtualized shared (with songkick) db access layer
dbWrapper & dbWrapperMock are connecting with the real db
*/
export class OliveDb {
    dBOpen: boolean
    constructor(accessor: DbInterface.IDbAccess) {
      this.db = accessor;
    }
    public db: DbInterface.IDbAccess = null;
    
    // First, let's create a short helper function to get the database connection
    checkDatabase() {
    }

    getItemPerName(itemName)
    {
        var items = []
        this.checkDatabase();
        var respath="";
        var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items where name='" + itemName + "'";

        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount,
                 unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany,
                 category: rs.rows[i].category, co2: rs.rows[i].co2}
            // console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid)
            items.push(trackedItem)
        }
        return items
    }
    
    getRecipes()
    {
        console.debug("getRecipes()")
        var items = []
        this.checkDatabase();
        var respath="";
        var sql = "SELECT DISTINCT uid, name, servings, instruction, ingredients, howMany, type from recipes";
        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name,
                    servings: rs.rows[i].servings, instruction: rs.rows[i].instruction,
                    ingredients: rs.rows[i].ingredients, howMany: rs.rows[i].howMany, type: rs.rows[i].type}
            //console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " done: " + rs.rows[i].done)
            items.push(trackedItem)
        }
        return items
    }

    // helpers for import of older files that do not contain some attributes
    tryGetOrderNr(item)
    {
        if (item === undefined)
            return 0
        if (item.ordernr=== undefined) {
            return 0
        }
        if (item.ordernr === null) {
            return 0
        }
        return item.category
    }

    // helpers for import of older files that do not contain some attributes
    tryGetCategory(item)
    {
        if (item === undefined)
            return ""
        if (item.category === undefined) {
            return ""
        }
        if (item.category === null) {
            return ""
        }
        return item.category
    }

    // helper for import of older files that do not contain co2
    tryGetCo2(item)
    {
        if (item === undefined)
            return 0.0
        if (item.co2 === undefined) {
            return 0.0
        }
        if (item.co2 === null) {
            return 0.0
        }
        return item.co2
    }

    // loads whole shopping list
    getShoppingList()
    {
        console.debug("getShoppingList()");
        return this.getShoppingListItemPerName("");
    }

    // loads whole list (itemName="") , or just one item
    getShoppingListItemPerName(itemName)
    {
        console.debug("getShoppingListItemPerName(itemName) with itemName:" + itemName)
        var items = []
        this.checkDatabase();
        var respath="";
        var sql = "SELECT DISTINCT uid, name, amount, unit, done, category, ordernr from shoppingList order by ordernr"; //, category";
        if (itemName !== "") sql = "SELECT DISTINCT uid, name, amount, unit, done, category, ordernr from shoppingList where name='" + itemName + "'";

        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, done: rs.rows[i].done, category: rs.rows[i].category}
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " done: " + rs.rows[i].done + " category: " + rs.rows[i].category + " order: " + rs.rows[i].ordernr)
            trackedItem.done = true
            if (rs.rows[i].done === 0)
                trackedItem.done = false
            items.push(trackedItem)
        }
        
        return items
    }

    // sets done flag of one shopping list item
    updateShoppingListItemChecked(uid,done)
    {
        console.debug("updateShoppingListItemChecked(uid,done) with uid:" + uid + ", done:" + done)
        this.checkDatabase();
        var res = "";
        var dbDone = 0;
        if (done) dbDone = 1;
        var rs = this.db.execute("UPDATE shoppingList SET done='" + dbDone + "' WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    // updates the amount of an shopping list item
    updateShoppingListItemSetAmount(uid, amount)
    {
        console.debug("updateShoppingListItemSetAmount(uid,amount) with uid:" + uid + ", amount:" + amount)
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("UPDATE shoppingList SET amount=" + amount + " WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", amount: " + amount);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    // this method considers the unit in shopping list and of added item (as those may differ due to
    // charatecteristics of the db )
    updateShoppingListItemSetAmountEx(ing)
    {
        // should have name, amount and unit
        // check it with unit in shopping list
        // if same fine
        console.log("item with name, amount and unit: " + ing.name + "," + ing.amount + "," + ing.unit);
        // if not try to convert g->kg g->l or vice versa
        // var dbItem = this.getItemPerName(ing.name)
        var shopIngres = this.getShoppingListItemPerName(ing.name)
        var uid, unit, category = "";
        unit = ing.unit;
        category = ing.category;
        if (shopIngres.length == 0) {
            "item not yet in shopping list: easy";
            uid = shopIngres[0].uid
            this.setShoppingListItem(uid,ing.name,ing.amount,unit,false,category);
            return;
        }
        // found in shopping list now we need to calculate
        uid = shopIngres[0].uid // this should fix the case, where ingredient does not fit to item in store
        var menge = shopIngres[0].amount
        var shopListUnit = shopIngres[0].unit
        var newValue = this.convertTo(ing.amount, ing.unit, shopIngres[0].amount, shopIngres[0].unit );
        this.setShoppingListItem(uid,ing.name,newValue,shopListUnit,false,category);
    }

    convertTo(amount, unit, shopAmount, shopUnit) {
        if (unit === shopUnit) {
            console.log("both units same: " + unit)
            return amount + shopAmount;
        }
        console.log("units are not equal. unit: " + unit + ", shopUnit: " + shopUnit)
        if (unit === "g") {
           console.log("am in g");
           if (shopUnit === "kg") {
               return shopAmount + amount/1000;
           }
           console.log("could not convert, incompatible");
           return;
        }
        if (unit === "kg") {
            if (shopUnit === "g") {
                return shopAmount + amount*1000;
            }
            console.log("could not convert, incompatible");
            return;
        }
        if (unit === "ml") {
            if (shopUnit === "l") {
                return shopAmount + amount/1000;
            }
            console.log("could not convert, incompatible");            
            return;
        }
        if (unit === "l") {
            if (shopUnit === "ml") {
                return shopAmount + amount*1000;
            }
            console.log("could not convert, incompatible");
            return;
        }
    }
    // upserts one shopping list item
    setShoppingListItem(uid,name,amount,unit,done,category) {
        console.debug("setShoppingListItem(uid,name,amount..) with uid:" + uid + ", name:" + name + ", category:" + category)
        this.checkDatabase();
        var res = "";
        var ordernr = 0;
        if (category !== "") {
            console.log("looking up category order.")
            // get actual order
            var sql = "SELECT DISTINCT ordernr from shoppingList where category='" + category + "'";
            var rs = this.db.executeSelect(sql);
            if (rs.rows.length > 0) {
                ordernr = rs.rows[0].ordernr;
                console.log('got category order-nr from shopping list: ' + ordernr);
            }
            if (ordernr == 0) {
                console.log("looking into category table for: " + category)
                // category is not in shopping list -> get it from category table
                sql = "SELECT DISTINCT ordernr from category where name='" + category + "'";
                rs = this.db.executeSelect(sql);
                if (rs.rows.length > 0) {
                    ordernr = rs.rows[0].ordernr;
                    console.log('got category order-nr from category table: ' + ordernr);
                }
            }
        }

        var success = this.db.executeWithParams('INSERT OR REPLACE INTO shoppingList (uid,name,amount,unit,done,category,ordernr) VALUES (?,?,?,?,?,?,?);', [uid,name,amount,unit,done,category,ordernr]);
        if (success) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    // delete a shopping list item
    removeShoppingListItem(uid,name,amount,unit,done) {
        console.debug("removeShoppingListItem(uid,..) with uid:" + uid)
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute('DELETE FROM shoppingList WHERE uid="' + uid + '";');
        if (rs) {
            res = "OK";
            console.log ("remove from database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    // clears shoppingList
    // clears howMany info in items and recipes table, which consequently clears the checkboxes on the ui
    clearShoppingList()
    {
        console.debug("clearShoppingList()")
        this.db.cleanTable("shoppingList")
        this.resetHowMany("items")
        this.resetHowMany("recipes")
    }

    setRecipe(uid,name,servings,instruction,ingredients,howMany,type) {

        //tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
        this.checkDatabase();
        var res = "";
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO recipes VALUES (?,?,?,?,?,?,?);', [uid,name,servings,instruction,ingredients,howMany,type]);
        if (rs) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", servings:" + servings + ", type:" + type);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    removeRecipe(uid,name) {
        this.checkDatabase();
        var res = "";
        var rs = this.db.execute("DELETE FROM recipes WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log ("remove from recipe - database: uid:" + uid + ", name:" + name);
        } else {
            res = "Error";
            console.log ("Error removing from database - recipes");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }
    
    

    importRecipesFromJson()
    {
        this.db.cleanTable("recipes");
        var items = Imp.getRecipes()
        for (var i = 0; i < items.length; i++)
        {
            var item  = items[i];
            this.setRecipe(this.db.getUniqueId(), item.name,item.servings,item.instruction,JSON.stringify(item.ingredients),0,item.type);
        }
    }

    importItemsFromJson()
    {
        var items = Imp.getItems()
        for (var i = 0; i < items.length; i++)
        {
            var item  = items[i];
            //todo: needs to support category and co2
            this.setItem(this.db.getUniqueId(), item.name,item.amount,item.unit,item.type,0,
            this.tryGetCategory(item),this.tryGetCo2(item));
        }
    }

    importCategoriesFromJson()
    {
        //cleanTable("items");
        var items = Imp.getCategories()
        for (var i = 0; i < items.length; i++)
        {
            var item  = items[i];
            //todo: check for existing, implement upsert
            this.setEnum("category",this.db.getUniqueId(), item.name, item.ordernr);
        }
    }

    // will init the ordernr of category
    initCategoryOrderNrs()
    {
        let maxOrderNr = this.db.executeSelect("select max(orderNr) from category");
        if (maxOrderNr.rows[0]['max(orderNr)'] === 0) {
            let categories = this.getEnums("category")
            for (let i=0; i < categories.length; i++) {
                let item = categories[i];
                this.setEnum("category",item.uid, item.name, (i+1)*1000);
            }
        }
    }

    // false = down
    // true = up
    moveCategoryInShoppingList(category,up)
    {
        // this works fine, if all cats are present in shopping list
        // when not, then you need to select the move multiple times
        // to see some reaction on the shopping list 
        // (in category it works fine)
        // final solution would be to check the diff between selected category and the next visible
        // in shopping list and then execute the move x times
        this.moveCategory(category,up);
        let categories = this.getEnums("category");
        for (var i=0; i < categories.length; i++)
        {
            this.updateCategoryOrder(categories[i].name,categories[i].ordernr);
        }
    
    }

    updateCategoryOrder(category, order)
    {
        this.checkDatabase()
        var res = "";

        var sql = "UPDATE shoppinglist set ordernr=" + order + " where category='" + category + "'";
        console.log(sql)
        this.db.execute(sql);
    }

    // false = down
    // true = up
    moveCategory(category,up)
    {
        // 0 is top
        // highest is lowest
        // what is missing: check that no need to move up / topest

        this.checkDatabase()
        var res = "";
        var delta = 1000;

        // get ordernr of given category
        // get category that has order+/-1000 value
        // increase order value+1000 of given category
        // decrease value of +1000 category by - 1


        // 1)
        var sql = "SELECT DISTINCT ordernr from category where name='" + category + "'";
        console.log(sql)
        var orgOrder
        var selectResult = this.db.executeSelect(sql);
        // todo: check for row-count first
        orgOrder = Number(selectResult.rows[0].ordernr);
        console.log('order nr of given category: ' + category + ' is: ' + orgOrder);

        // don't get smaller then no-category = 0
        if (orgOrder === 1000 && up) {
            console.log("category has number 1000 == highest position, returning");
            return false;
        }
        if (!up) {  // todo check that hightest lowest category cant' get lower
            sql = "select max(ordernr) from category";
            selectResult = this.db.executeSelect(sql);
            console.log(selectResult);
            if (selectResult.rows[0]['max(ordernr)'] == orgOrder) {
                console.log('category is already in lowest position, returning');
                return false;
            }
        }

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

            var rs = this.db.executeSelect(sql);
            if (rs.rows.length > 0) catToMove = rs.rows[0].name;
            console.log('category to switch: ' + catToMove);

            if (catToMove !== undefined) { // category was last or first, nothing to switch
                // 4) move the other
                if (up) {
                   sql = "UPDATE category SET ordernr = ordernr + 1000 WHERE name = '" + catToMove + "';"
                }
                else {
                   sql = "UPDATE category SET ordernr = ordernr - 1000 WHERE name = '" + catToMove + "';"
                }
            }
            console.log(sql);
            var updateResult = this.db.execute(sql);
            /*if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("the other category moved");
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }*/
            // todo: if there is no catToMove, then no need to move me ?
        }
        

        // 3) move given category up or down
        if (up) {
            sql = "UPDATE category SET ordernr = ordernr - 1000 WHERE name = '" + category + "';"
        }
        else {
            sql = "UPDATE category SET ordernr = ordernr + 1000 WHERE name = '" + category + "';"
        }
        console.log(sql);

        var updateResult = this.db.execute(sql);
        /*if (rs.rowsAffected > 0) {
                res = "OK";
                console.log ("category moved");
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
        }*/
    }

    resetHowMany(tableName)
    {
        this.checkDatabase()
        var res = "";
        var rs = this.db.execute('UPDATE ' + tableName + ' SET howMany=0;');
        if (rs) {
            res = "OK";
            console.log ("reset howmany successs");
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    setEnum(enumTable, uid, name, ordernr) {
        console.debug("setEnum(enumTable,..) with enumTable:" + enumTable + ", uid:" + uid 
        + ", name: " + name + ", ordernr: " + ordernr);
        this.checkDatabase()
        var res = "";

        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO ' + enumTable + ' (uid, name, ordernr) VALUES (?,?,?);', [uid,name,ordernr]);
        if (rs) {
            res = "OK";
            console.log ("Saved enum to database: uid:" + uid + ", name:" + name + ", ordernr: " + ordernr);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    getEnums(enumTable)
    {
        var items = []
        this.checkDatabase()
        var respath="";
        var sql = "SELECT DISTINCT uid, name, ordernr from category order by ordernr"; // default value
        if (enumTable !== "") {
            sql = "SELECT DISTINCT uid, name, ordernr from " + enumTable + " order by ordernr";
        }
        console.log(enumTable)
        console.log(sql)

        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name, ordernr: rs.rows[i].ordernr}
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " ordernr:" + trackedItem.ordernr)
            items.push(trackedItem)
        }
        return items
    }

    removeEnum(enumTable, uid) {
        console.debug("removeEnum(enumTable, uid) with enumTable:" + enumTable + ", uid:" + uid)
        this.checkDatabase()
        var res = "";
        var rs = this.db.execute("DELETE FROM " + enumTable + " WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log ("remove from database: uid:" + uid);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    
//todo: fix and use this during selection, to prevent downdate of i.e. categories ..
    updateItemSetHowMany(uid, howMany) {
        //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
        this.checkDatabase()
        var res = ""; // UPDATE items SET howMany='howMany' WHERE uid=uid;
        var rs = this.db.execute("UPDATE items SET howMany=" + howMany + " where uid='" + uid + "';");
            if (rs) {
                res = "OK";
                console.log ("Saved to database: uid:" + uid + ", howmany: " + howMany);
            } else {
                res = "Error";
                console.log ("Error saving to database");
            }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    // pre order
    setItem(uid,name,amount,unit,type,howMany,category,co2) {
        //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
        this.checkDatabase()
        var res = "";
        var rs = this.db.executeWithParams('INSERT OR REPLACE INTO items VALUES (?,?,?,?,?,?,?,?);', [uid,name,amount,unit,type,howMany,category,co2]);
        if (rs) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", unit:" + unit + ", type:" + type + ", howmany: " + howMany + ", category: " + category);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    removeItem(uid,name) {
        this.checkDatabase()
        var res = "";
        var rs = this.db.execute("DELETE FROM items WHERE uid='" + uid + "';");
        if (rs) {
            res = "OK";
            console.log ("remove from database: uid:" + uid + ", name:" + name);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
        // The function returns “OK” if it was successful, or “Error” if it wasn't
        return res;
    }

    getItems(itemType)
    {
        console.debug("getItems(itemType) with itemType:" + itemType)
        var items = []
        this.checkDatabase()
        var respath="";
        var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items where type='" + itemType + "' order by name";
        if (itemType === "") {
            sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category, co2 from items order by name";
        }

        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany, category: rs.rows[i].category}
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid + " and category: " + rs.rows[i].category)
            items.push(trackedItem)
        }
        return items
    }

    filterItemsPerName(itemName)
    {
        console.debug("filterItemsPerName(itemName) with itemName:" + itemName)
        var items = []
        this.checkDatabase()
        var respath="";
        var sql = "SELECT uid, name, amount, unit, type, howMany, category, co2 from items where UPPER(name) like '%" + itemName + "%'";

        var rs = this.db.executeSelect(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows[i].uid, name: rs.rows[i].name, amount: rs.rows[i].amount, unit: rs.rows[i].unit, type: rs.rows[i].type, howMany: rs.rows[i].howMany, category: rs.rows[i].category, co2: rs.rows[i].co2}
            console.debug("get: " + rs.rows[i].name + " with id:" + rs.rows[i].uid)
            items.push(trackedItem)
        }
        return items
    }


    dropDB()
    {
        this.db.cleanTable("items")
        this.db.cleanTable("recipes")
        this.db.cleanTable("shoppingList")
        this.db.cleanTable("category")
    }


    // dump data from DB to json
    dumpData() {
        var db = this.checkDatabase()

        var categories = []
        categories = this.getEnums("category")

        var items = []
        items = this.getItems("")
        var recipes = []
        recipes = this.getRecipes()

        var shoppingList = [];
        shoppingList = this.getShoppingList();

        var version = this.db.getVersion()

        var data = {
            "version": version,
            "categories": categories,
            "items": items,
            "recipes" : recipes,
            "shoppingList" : shoppingList
        };
        return JSON.stringify(data);
    }

    // import data from json
    importData(json: string) {
        console.log("importData() called.")
        this.checkDatabase()
        var parsed;
        try {
            parsed = JSON.parse(json);
        } catch (error) {
            console.log("error in parse");
            return false;
        }

        if (parsed.categories !== null && parsed.categories !== undefined)
        {
            if (parsed.categories.length > 0)
            {
                for (var i = 0; i < parsed.categories.length; i++)
                {
                    var item = parsed.categories[i];
                    var uid = this.db.getUniqueId();
                    if (item.uid !== null)
                        uid = item.uid;
                    this.setEnum("category",uid,item.name,0);
                }
            }
        }

        if (parsed.items !== null && parsed.items !== undefined)
        {
            if (parsed.items.length > 0)
            {
                for (i = 0; i < parsed.items.length; i++)
                {
                    item = parsed.items[i];
                    uid = this.db.getUniqueId();
                    if (item.uid !== null)
                        uid = item.uid;
                    this.setItem(uid,item.name,item.amount,item.unit,item.type,item.howMany,
                        this.tryGetCategory(item),this.tryGetCo2(item))
                }
            }
        }

        if (parsed.recipes !== null && parsed.recipes !== undefined)
        {
            if (parsed.recipes.length > 0)
            {
                for (i = 0; i < parsed.recipes.length; i++)
                {
                    var recipe = parsed.recipes[i]
                    uid = this.db.getUniqueId()
                    if (recipe.uid !== null)
                        uid = recipe.uid;
                    this.setRecipe(uid,recipe.name,recipe.servings,recipe.instruction,recipe.ingredients,0,recipe.type)
                }
            }
        }

        if (parsed.shoppingList !== null && parsed.shoppingList !== undefined)
        {
            if (parsed.shoppingList.length > 0)
            {
                for (i = 0; i < parsed.shoppingList.length; i++)
                {
                    var shoppingItem = parsed.shoppingList[i]
                    uid = this.db.getUniqueId()
                    if (shoppingItem.uid !== null)
                        uid = shoppingItem.uid;
                      // setShoppingListItem(uid,name,amount,unit,done,category)
                    this.setShoppingListItem(uid,shoppingItem.name,
                        shoppingItem.amount,shoppingItem.unit,shoppingItem.done,shoppingItem.category);
                }
            }
        }
        return true;
    }
}
