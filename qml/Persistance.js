.import QtQuick.LocalStorage 2.0 as LS

.import "Items.js" as Imp

// First, let's create a short helper function to get the database connection
function getDatabase() {
    return LS.LocalStorage.openDatabaseSync("harbour-olive-goes-shopping", "1.0", "StorageDatabase", 100000);
}

function initialize() {
    var db = getDatabase();
    db.transaction(
                function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer, category TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS shoppingList(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean, category TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS category(uid LONGVARCHAR UNIQUE, name TEXT)')
                });
    try {
        // this one may fail when column already exists
        db.transaction(
                    function(tx) {
                        tx.executeSql('ALTER TABLE items ADD category TEXT') // for migration purposes
                        tx.executeSql('ALTER TABLE shoppingList ADD category TEXT')
                    });
    }
    catch (err){
    }
}

// returns a unique id based on date-time
function getUniqueId()
{
    var dateObject = new Date();
    var uniqueId =
            dateObject.getFullYear() + '' +
            dateObject.getMonth() + '' +
            dateObject.getDate() + '' +
            dateObject.getTime();

    return uniqueId;
};

function getRecipes()
{
    console.debug("getRecipes()")
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, servings, instruction, ingredients, howMany, type from recipes";
    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, servings: rs.rows.item(i).servings, instruction: rs.rows.item(i).instruction, ingredients: rs.rows.item(i).ingredients, howMany: rs.rows.item(i).howMany, type: rs.rows.item(i).type}
            //console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid + " done: " + rs.rows.item(i).done)
            items.push(trackedItem)
        }
    })
    return items
}

function getShoppingList()
{
    console.debug("getShoppingList()");
    return getShoppingListItemPerName("");
}

function getShoppingListItemPerName(itemName)
{
    console.debug("getShoppingListItemPerName(itemName) with itemName:" + itemName)
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, done, category from shoppingList";
    if (itemName !== "") sql = "SELECT DISTINCT uid, name, amount, unit, done, category from shoppingList where name='" + itemName + "'";

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, done: rs.rows.item(i).done, category: rs.rows.item(i).category}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid + " done: " + rs.rows.item(i).done + " category: " + rs.rows.item(i).category)
            trackedItem.done = true
            if (rs.rows.item(i).done === 0)
                trackedItem.done = false
            items.push(trackedItem)
        }
    })
    return items
}

function updateShoppingListItemChecked(uid,done)
{
    console.debug("updateShoppingListItemChecked(uid,done) with uid:" + uid + ", done:" + done)
    var db = getDatabase();
    var res = "";
    var dbDone = 0;
    if (done) dbDone = 1;
    db.transaction(function(tx) {
        var rs = tx.executeSql("UPDATE shoppingList SET done='" + dbDone + "' WHERE uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function updateShoppingListItemSetAmount(uid, amount)
{
    console.debug("updateShoppingListItemSetAmount(uid,amount) with uid:" + uid + ", amount:" + amount)
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql("UPDATE shoppingList SET amount=" + amount + " WHERE uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", amount: " + amount);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function setShoppingListItem(uid,name,amount,unit,done,category) {
    console.debug("setShoppingListItem(uid,name,amount..) with uid:" + uid + ", name:" + name + ", category:" + category)
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO shoppingList VALUES (?,?,?,?,?,?);', [uid,name,amount,unit,done,category]);
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function removeShoppingListItem(uid,name,amount,unit,done) {
    console.debug("removeShoppingListItem(uid,..) with uid:" + uid)
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('DELETE FROM shoppingList WHERE uid="' + uid + '";');
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("remove from database: uid:" + uid + ", name:" + name + ", done: " + done);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

// clears shoppingList
// clears howMany info in items and recipes table, which consequently clears the checkboxes on the ui

function clearShoppingList()
{
    console.debug("clearShoppingList()")
    cleanTable("shoppingList")
    resetHowMany("items")
    resetHowMany("recipes")
}


function importRecipesFromJson()
{
    cleanTable("recipes");
    var items = Imp.getRecipes()
    //tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
    for (var i = 0; i < items.length; i++)
    {
        var item  = items[i];
        //JSON.stringify(data['root'])
        setRecipe(getUniqueId(), item.name,item.servings,item.instruction,JSON.stringify(item.ingredients),0,item.type);
    }
}


function setRecipe(uid,name,servings,instruction,ingredients,howMany,type) {

    //tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO recipes VALUES (?,?,?,?,?,?,?);', [uid,name,servings,instruction,ingredients,howMany,type]);
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", servings:" + servings + ", type:" + type);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function removeRecipe(uid,name) {
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql("DELETE FROM recipes WHERE uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("remove from recipe - database: uid:" + uid + ", name:" + name);
        } else {
            res = "Error";
            console.log ("Error removing from database - recipes");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function tryGetCategory(item)
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

function importItemsFromJson()
{
    var items = Imp.getItems()
    for (var i = 0; i < items.length; i++)
    {
        var item  = items[i];
        setItem(getUniqueId(), item.name,item.amount,item.unit,item.type,0,tryGetCategory(item));
    }
}

function importCategoriesFromJson()
{
    //cleanTable("items");
    var items = Imp.getCategories()
    for (var i = 0; i < items.length; i++)
    {
        var item  = items[i];
        setEnum("category",getUniqueId(), item.name);
    }
}

function resetHowMany(tableName)
{
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('UPDATE ' + tableName + ' SET howMany=0;');
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("reset howmany successs");
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function setEnum(enumTable, uid, name) {
    console.debug("setEnum(enumTable,..) with enumTable:" + enumTable + ", uid:" + uid)
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO ' + enumTable + ' VALUES (?,?);', [uid,name]);
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved enum to database: uid:" + uid + ", name:" + name);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function getEnums(enumTable)
{
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name from category"; // default value
    if (enumTable !== "") {
        sql = "SELECT DISTINCT uid, name from " + enumTable;
    }

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid)
            items.push(trackedItem)
        }
    })
    return items
}

function removeEnum(enumTable, uid) {
    console.debug("removeEnum(enumTable, uid) with enumTable:" + enumTable + ", uid:" + uid)
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql("DELETE FROM " + enumTable + " WHERE uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("remove from database: uid:" + uid);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

//todo: fix and use this during selection, to prevent downdate of i.e. categories ..
function updateItemSetHowMany(uid, howMany) {
    //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
    var db = getDatabase();
    var res = ""; // UPDATE items SET howMany='howMany' WHERE uid=uid;
    db.transaction(function(tx) {
        var rs = tx.executeSql("UPDATE items SET howMany=" + howMany + " where uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", howmany: " + howMany);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function setItem(uid,name,amount,unit,type,howMany,category) {
    //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO items VALUES (?,?,?,?,?,?,?);', [uid,name,amount,unit,type,howMany,category]);
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", unit:" + unit + ", type:" + type + ", howmany: " + howMany + ", category: " + category);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function removeItem(uid,name) {
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql("DELETE FROM items WHERE uid='" + uid + "';");
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("remove from database: uid:" + uid + ", name:" + name);
        } else {
            res = "Error";
            console.log ("Error saving to database");
        }
    }
    );
    // The function returns “OK” if it was successful, or “Error” if it wasn't
    return res;
}

function getItems(itemType)
{
    console.debug("getItems(itemType) with itemType:" + itemType)
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category from items where type='" + itemType + "' order by name";
    if (itemType === "") {
        sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category from items order by name";
    }

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany, category: rs.rows.item(i).category}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid + " and category: " + rs.rows.item(i).category)
            items.push(trackedItem)
        }
    })
    return items
}

function filterItemsPerName(itemName)
{
    console.debug("filterItemsPerName(itemName) with itemName:" + itemName)
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT uid, name, amount, unit, type, howMany, category from items where UPPER(name) like '%" + itemName + "%'";

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany, category: rs.rows.item(i).category}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid)
            items.push(trackedItem)
        }
    })
    return items
}

function getItemPerName(itemName)
{
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany, category from items where name='" + itemName + "'";

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany, category: rs.rows.item(i).category}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid)
            items.push(trackedItem)
        }
    })
    return items
}

function cleanTable(name)
{
    var db = getDatabase();
    var respath="";
    db.transaction(function(tx) {
        var rs = tx.executeSql('DELETE FROM ' + name + ';');
    })
}

function dropDB()
{
    cleanTable("items")
    cleanTable("recipes")
    cleanTable("shoppingList")
    cleanTable("category")
}


// dump data from DB to json
function dumpData() {
    var db = getDatabase()

    var categories = []
    categories = getEnums("category")

    var items = []
    items = getItems("")
    var recipes = []
    recipes = getRecipes()

    var data = {
        "categories": categories,
        "items": items,
        "recipes" : recipes
    };
    return JSON.stringify(data);
}

// import data from json
function importData(json) {
    var db = getDatabase();
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
                var item = parsed.categories[i]
                var uid = getUniqueId()
                if (item.uid !== null)
                    uid = item.uid;
                setEnum("category",uid,item.name)
            }
        }
    }

    if (parsed.items !== null && parsed.items !== undefined)
    {
        if (parsed.items.length > 0)
        {
            for (i = 0; i < parsed.items.length; i++)
            {
                item = parsed.items[i]
                uid = getUniqueId()
                if (item.uid !== null)
                    uid = item.uid;
                setItem(uid,item.name,item.amount,item.unit,item.type,item.howMany,tryGetCategory(item))
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
                uid = getUniqueId()
                if (recipe.uid !== null)
                    uid = recipe.uid;
                setRecipe(uid,recipe.name,recipe.servings,recipe.instruction,recipe.ingredients,0,recipe.type)
            }
        }
    }

    return true;
}

