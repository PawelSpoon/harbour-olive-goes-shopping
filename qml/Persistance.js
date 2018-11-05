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
              tx.executeSql('CREATE TABLE IF NOT EXISTS items(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer)');
              tx.executeSql('CREATE TABLE IF NOT EXISTS shoppingList(uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean)');
              tx.executeSql('CREATE TABLE IF NOT EXISTS recipes(uid LONGVARCHAR UNIQUE, name TEXT, servings integer, instruction TEXT, ingredients TEXT, howMany integer, type TEXT)');
          });
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
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, done from shoppingList";
    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, done: rs.rows.item(i).done}
            trackedItem.done = true
            if (rs.rows.item(i).done === 0)
                trackedItem.done = false
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid + " done: " + rs.rows.item(i).done)
            items.push(trackedItem)
        }
    })
    return items
}

function getShoppingListItemPerName(itemName)
{
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, done from shoppingList where name='" + itemName + "'";
    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, done: rs.rows.item(i).done}
            trackedItem.done = true
            if (rs.rows.item(i).done === 0)
                trackedItem.done = false
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid + " done: " + rs.rows.item(i).done)
            items.push(trackedItem)
        }
    })
    return items
}

function setShoppingListItem(uid,name,amount,unit,done) {
    //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, done boolean
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO shoppingList VALUES (?,?,?,?,?);', [uid,name,amount,unit,done]);
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
    cleanTable("shoppingList")
    resetHowMany("items")
    resetHowMany("recipes")
}

function persistShoppingList()
{
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

function importItemsFromJson()
{
    //cleanTable("items");
    var items = Imp.getItems()
    for (var i = 0; i < items.length; i++)
    {
        var item  = items[i];
        setItem(getUniqueId(), item.name,item.amount,item.unit,item.type,0);
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

function setItem(uid,name,amount,unit,type,howMany) {
    //uid LONGVARCHAR UNIQUE, name TEXT, amount integer, unit TEXT, type TEXT, howMany integer
    var db = getDatabase();
    var res = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO items VALUES (?,?,?,?,?,?);', [uid,name,amount,unit,type,howMany]);
        if (rs.rowsAffected > 0) {
            res = "OK";
            console.log ("Saved to database: uid:" + uid + ", name:" + name + ", unit:" + unit + ", type:" + type + ", howmany: " + howMany);
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
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany from items where type='" + itemType + "' order by name";
    if (itemType === "") {
        sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany from items order by name";
    }

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany}
            console.debug("get: " + rs.rows.item(i).name + " with id:" + rs.rows.item(i).uid)
            items.push(trackedItem)
        }
    })
    return items
}

function filterItemsPerName(itemName)
{
    var items = []
    var db = getDatabase();
    var respath="";
    var sql = "SELECT uid, name, amount, unit, type, howMany from items where UPPER(name) like '%" + itemName + "%'";

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany}
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
    var sql = "SELECT DISTINCT uid, name, amount, unit, type, howMany from items where name='" + itemName + "'";

    db.transaction(function(tx) {
        var rs = tx.executeSql(sql);
        for (var i = 0; i < rs.rows.length; i++) {
            var trackedItem = {uid: rs.rows.item(i).uid, name: rs.rows.item(i).name, amount: rs.rows.item(i).amount, unit: rs.rows.item(i).unit, type: rs.rows.item(i).type, howMany: rs.rows.item(i).howMany}
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
}


// dump data from DB to json
function dumpData() {
    var db = getDatabase()

    var items = []
    items = getItems("")
    var recipes = []
    recipes = getRecipes()

    var data = {
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

    if (parsed.items !== null)
    {
      if (parsed.items.length > 0)
      {
         for (var i = 0; i < parsed.items.length; i++)
         {
             var item = parsed.items[i]
             var uid = getUniqueId()
            if (item.uid !== null)
                uid = item.uid;
            setItem(uid,item.name,item.amount,item.unit,item.type,0)
         }
      }
    }

    if (parsed.recipes !== null)
    {
        if (parsed.recipes.length > 0)
        {
           for (var i = 0; i < parsed.recipes.length; i++)
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

