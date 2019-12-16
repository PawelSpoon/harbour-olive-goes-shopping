"use strict";
exports.__esModule = true;
// i use this file to create the mlg strings for items
// also for the initial filling
// it allows me to fill the db with data from json
// returns pre-defined food and household items
function qsTr(str) { return str; }
function getCategories() {
    var retItems = [];
    // categories for food and household
    retItems.push({ "name": qsTr("dairy products") });
    retItems.push({ "name": qsTr("meat products") });
    retItems.push({ "name": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("bakery products") });
    retItems.push({ "name": qsTr("frozen food") });
    retItems.push({ "name": qsTr("canned food") });
    retItems.push({ "name": qsTr("personal hygiene") });
    retItems.push({ "name": qsTr("cleaning supplies") });
    retItems.push({ "name": qsTr("magazines") });
    retItems.push({ "name": qsTr("hardware") });
    // car and bikes
    retItems.push({ "name": qsTr("automotive") });
    retItems.push({ "name": qsTr("others") });
    return retItems;
}
exports.getCategories = getCategories;
function getItems() {
    var retItems = [];
    // food
    retItems.push({ "name": qsTr("apple"), "amount": 4, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("apple cider vinegar"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("asian noodels"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("avocado"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("soup peas"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("balsamic vinegar"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("banana"), "amount": 4, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("basmati rice"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pear"), "amount": 4, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("puff pastry"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("string beans"), "amount": 100, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("bread crumbs"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("bread"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("button mushrooms"), "amount": 250, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("spelled flour"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("caned tomatoes"), "amount": 400, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("eg"), "amount": 10, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("emmental cheese"), "amount": 100, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("peas"), "amount": 300, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("strawberries"), "amount": 200, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("pickled cucumbers"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("fennel"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("feta cheese"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("frankfurters"), "amount": 4, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("fruit tea"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("vegetable stock"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("yeast"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("ghee"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("cucumber"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("oat milk"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("millet"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("honey"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("ginger"), "amount": 100, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("curd"), "amount": 150, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("coffee"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("coffe decaf"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("capers berries"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("cauliflower"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("carrots"), "amount": 1000, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("potatoes"), "amount": 1000, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("chickpeas"), "amount": 300, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("chickpea flour"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("garlic"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("dumpling bread"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("kohlrabi"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("cabbage"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("pumpkin"), "amount": 1, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("lassagne noodles"), "amount": 250, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("leek"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("lime"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("lentils yellow"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("lentils red"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("lentils green"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("corn"), "amount": 200, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("cornstarch"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("almonds"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("mango"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("melanzani"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("milk"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("italian rice"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("cereal"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("noodels"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("walnuts"), "amount": 100, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("hazelnuts"), "amount": 100, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("olives"), "amount": 250, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("olive oil"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("oranges"), "amount": 1000, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("bell pepper"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("parboiled rice"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("parmesan cheese"), "amount": 100, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pesto"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("pepper mix"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pepper green"), "amount": 50, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pepper pink"), "amount": 50, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pepper black"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("polenta"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("quinoa"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("rapeseed oil"), "amount": 1000, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("beef"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("rye flour"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("raisins"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("salad"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("salt"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("salt coarse"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pickled cabbage"), "amount": 250, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("sour cream"), "amount": 200, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("ham"), "amount": 100, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("sweet cream"), "amount": 200, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("roll"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("pickeled onions"), "amount": 200, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("soy sauce"), "amount": 200, "unit": "ml", "type": "food" });
    retItems.push({ "name": qsTr("soy cubes"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("soy granules"), "amount": 500, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("bacon"), "amount": 200, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("spinach"), "amount": 400, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("sticky rice"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("pastry"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("soup noodles"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("tomatoes"), "amount": 4, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("curd cheese"), "amount": 250, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("tortillas"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("grapes"), "amount": 200, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("wheat flour"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("lemon"), "amount": 1, "unit": "-", "type": "food", "category": qsTr("fresh produce") });
    retItems.push({ "name": qsTr("zucchini"), "amount": 1, "unit": "-", "type": "food" });
    retItems.push({ "name": qsTr("sugar"), "amount": 1000, "unit": "g", "type": "food" });
    retItems.push({ "name": qsTr("onion"), "amount": 1000, "unit": "g", "type": "food", "category": qsTr("fresh produce") });
    // household
    retItems.push({ "name": qsTr("all purpose cleaner"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("aluminum foil"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("baking paper"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("bathroom cleaner"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("greaseproof paper"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("fine detergent"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("window cleaner"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("moist toilet paper"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("lighter"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("liquid soap"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("freeze bag"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("dishwasher - rinse aid"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("dishwasher - salt"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("dishwasher - tabs"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("dishwashing liquid"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("dishwashing sponge"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("rubber rings"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("hygienic rinse"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("children's toothpaste"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("toilet paper"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("kitchen cleaner"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("kitchen roll"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("lens cleaner"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("trash bags"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("trash bags - small"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("over fire starter"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("shaving cream"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("shampoo"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("sponge wipes"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("soap"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("panty liners"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("tampons"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("condoms"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("piles"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("handkerchiefs"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("laundry detergent"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("toothbrush"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("toothpaste"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("matches"), "amount": 1, "unit": "-", "type": "household" });
    retItems.push({ "name": qsTr("razor blades"), "amount": 1, "unit": "-", "type": "household" });
    return retItems;
}
exports.getItems = getItems;
// returns pre-defined recipes
function getRecipes() {
    var items = { "food": [{ "name": "Butterchicken", "servings": 4, "instruction": null, "list": null }, { "name": "Chow Mein", "servings": 4, "instruction": "Veg. Kochen S.138", "list": [{ "name": "Asiatische Nudeln", "amount": 500, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Karotten", "amount": 75, "unit": "g" }, { "name": "Champignons", "amount": 125, "unit": "g" }, { "name": "Zuckerschoten", "amount": 125, "unit": "g" }, { "name": "Gurke", "amount": 1, "unit": "g" }, { "name": "Spinat", "amount": 125, "unit": "g" }, { "name": "Sojabohnensprossen", "amount": 125, "unit": "g" }, { "name": "Maisstärke", "amount": 10, "unit": "g" }, { "name": "Sesamöl", "amount": 10, "unit": "g" }, { "name": "Reiswein", "amount": 10, "unit": "ml" }, { "name": "Sojasauce", "amount": 10, "unit": "ml" }] }, { "name": "Dhal", "servings": 4, "instruction": "done", "list": [{ "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Indische Linsen", "amount": 200, "unit": "g" }, { "name": "Tomate", "amount": 1, "unit": "-" }] }, { "name": "Eiernockerl", "servings": 4, "instruction": "done", "list": [{ "name": "Weizenmehl", "amount": 300, "unit": "g" }, { "name": "Ei", "amount": 4, "unit": "-" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }] }, { "name": "Erdäpfelsuppe", "servings": 4, "instruction": "Aus aller Welt S.62", "list": [{ "name": "Karotte", "amount": 1, "unit": "-" }, { "name": "Sellerie", "amount": 1, "unit": "-" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Gemüsebrühe", "amount": 1, "unit": "-" }, { "name": "Kartoffel", "amount": 500, "unit": "g" }, { "name": "Majoran", "amount": 5, "unit": "g" }, { "name": "Lorbeer", "amount": 1, "unit": "-" }, { "name": "Pilze", "amount": 200, "unit": "g" }, { "name": "Sauerrahm", "amount": 50, "unit": "ml" }, { "name": "Petersilie", "amount": 1, "unit": "-" }] }, { "name": "Faschierte Leibchen", "servings": 4, "instruction": "done", "list": [{ "name": "Rindfleisch faschiert", "amount": 500, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Brösel", "amount": 50, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }] }, { "name": "Gebackener Karfiol", "servings": 4, "instruction": "done", "list": [{ "name": "Karfiol", "amount": 1, "unit": "-" }, { "name": "Weizenmehl", "amount": 50, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Brösel", "amount": 200, "unit": "g" }, { "name": "Rapsöl", "amount": 0, "unit": "ml" }] }, { "name": "Gebackener Käse", "servings": 4, "instruction": "done", "list": [{ "name": "Käse", "amount": 300, "unit": "g" }, { "name": "Weizenmehl", "amount": 50, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Brösel", "amount": 100, "unit": "g" }, { "name": "Rapsöl", "amount": 0, "unit": "ml" }] }, { "name": "Gefüllte Melanzani", "servings": 4, "instruction": "done", "list": [{ "name": "Melanzani", "amount": 4, "unit": "-" }, { "name": "Reis", "amount": 200, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Sojakrümmel", "amount": 150, "unit": "g" }, { "name": "Tomatenmark", "amount": 50, "unit": "g" }, { "name": "Sauerrahm", "amount": 100, "unit": "g" }] }, { "name": "Gefüllte Zucchini", "servings": 4, "instruction": "done", "list": [{ "name": "Zucchini", "amount": 4, "unit": "-" }, { "name": "Reis", "amount": 200, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Sojakrümmel", "amount": 150, "unit": "g" }, { "name": "Tomatenmark", "amount": 50, "unit": "g" }, { "name": "Sauerrahm", "amount": 100, "unit": "g" }] }, { "name": "Gemüse Pulao", "servings": 4, "instruction": "Veg. Kochen S.159", "list": [{ "name": "Kartoffeln", "amount": 100, "unit": "g" }, { "name": "Melanzani", "amount": 1, "unit": "-" }, { "name": "Karotten", "amount": 200, "unit": "g" }, { "name": "Bohnschotten", "amount": 50, "unit": "g" }, { "name": "Ghee", "amount": 50, "unit": "g" }, { "name": "Zwiebeln", "amount": 2, "unit": "-" }, { "name": "Joghurt", "amount": 175, "unit": "g" }, { "name": "Ingwer", "amount": 10, "unit": "g" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Milch", "amount": 300, "unit": "ml" }, { "name": "Basmati Reis", "amount": 600, "unit": "g" }, { "name": "Zitrone", "amount": 1, "unit": "-" }, { "name": "Garam Masala", "amount": 0, "unit": "g" }, { "name": "Cumin", "amount": 10, "unit": "g" }, { "name": "Kurkuma", "amount": 3, "unit": "g" }, { "name": "Kardamon", "amount": 3, "unit": "-" }, { "name": "Zimtstange", "amount": 3, "unit": "-" }, { "name": "Chillipulver", "amount": 5, "unit": "g" }] }, { "name": "Gemüsecurry", "servings": 4, "instruction": "Veg. Kochen S.156", "list": [{ "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Cumin", "amount": 10, "unit": "g" }, { "name": "Chillischote", "amount": 1, "unit": "-" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Dosentomaten", "amount": 400, "unit": "g" }, { "name": "Kokosnusspulver", "amount": 75, "unit": "g" }, { "name": "Karfiol", "amount": 1, "unit": "-" }, { "name": "Zucchini", "amount": 2, "unit": "-" }, { "name": "Karotten", "amount": 2, "unit": "-" }, { "name": "Kartoffel", "amount": 50, "unit": "g" }, { "name": "Kirchererbsen", "amount": 400, "unit": "g" }, { "name": "Joghurt", "amount": 150, "unit": "g" }, { "name": "Mango Chutney", "amount": 50, "unit": "g" }, { "name": "Koriander", "amount": 20, "unit": "g" }] }, { "name": "Ghobi Manchurian", "servings": 4, "instruction": "done", "list": [{ "name": "Karfiol", "amount": 1, "unit": "-" }, { "name": "Frühlingszwiebel", "amount": 1, "unit": "-" }, { "name": "Ingwer", "amount": 1, "unit": "-" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Dosentomaten", "amount": 400, "unit": "g" }, { "name": "Chilliisauce", "amount": 0, "unit": "g" }, { "name": "Kichererbsenmehl", "amount": 50, "unit": "g" }, { "name": "Weizenmehl", "amount": 50, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Korriander grün", "amount": 1, "unit": "-" }] }, { "name": "Griesknödelsuppe", "servings": 4, "instruction": "done", "list": [{ "name": "Gries", "amount": 120, "unit": "g" }, { "name": "Butter", "amount": 60, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Muskatnuss", "amount": 0, "unit": "g" }, { "name": "Schnittlauch", "amount": 1, "unit": "-" }, { "name": "Gemüsebrühe", "amount": 0, "unit": "-" }] }, { "name": "Gulasch", "servings": 4, "instruction": "done", "list": [{ "name": "Zwiebel", "amount": 4, "unit": "-" }, { "name": "Rindfleisch", "amount": 500, "unit": "g" }, { "name": "Paprika", "amount": 0, "unit": "g" }, { "name": "Tomatenmark", "amount": 50, "unit": "g" }] }, { "name": "Hirsekrapfen", "servings": 4, "instruction": "done", "list": [{ "name": "Hirse", "amount": 200, "unit": "g" }, { "name": "Gemüsebrühe", "amount": 10, "unit": "g" }, { "name": "Speck", "amount": 100, "unit": "g" }, { "name": "Käse", "amount": 150, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Brösel", "amount": 50, "unit": "g" }] }, { "name": "Karfiolsuppe", "servings": 4, "instruction": "done", "list": [{ "name": "Karfiolsuppe", "amount": 0, "unit": "-" }, { "name": "Kartoffeln", "amount": 200, "unit": "g" }, { "name": "Karotten", "amount": 100, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Gemüsebrühe", "amount": 20, "unit": "g" }] }, { "name": "Kartoffelgulasch", "servings": 4, "instruction": "done", "list": [{ "name": "Kartoffeln", "amount": 500, "unit": "g" }, { "name": "Frankfurter", "amount": 4, "unit": "-" }, { "name": "Zwiebel", "amount": 3, "unit": "-" }, { "name": "Nudeln", "amount": 250, "unit": "g" }, { "name": "Sauerrahm", "amount": 100, "unit": "g" }, { "name": "Ei", "amount": 3, "unit": "-" }, { "name": "Paprikapulver", "amount": 0, "unit": "g" }, { "name": "Essiggurkel", "amount": 0, "unit": "-" }] }, { "name": "Kartoffelknödel", "servings": 4, "instruction": "done", "list": [{ "name": "Kartoffeln", "amount": 500, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Griess", "amount": 100, "unit": "g" }, { "name": "Muskatnuss", "amount": 10, "unit": "g" }] }, { "name": "Kartoffelpuffer", "servings": 4, "instruction": "done", "list": [{ "name": "Kartoffeln", "amount": 1000, "unit": "g" }, { "name": "Majoran", "amount": 0, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Mehl", "amount": 50, "unit": "g" }] }, { "name": "Kartoffelstrudel", "servings": 4, "instruction": "done", "list": [{ "name": "Blätterteig", "amount": 1, "unit": "-" }, { "name": "Kartoffeln", "amount": 500, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Speck", "amount": 150, "unit": "g" }, { "name": "Sauerrahm", "amount": 100, "unit": "g" }] }, { "name": "Knödel", "servings": 4, "instruction": "done", "list": [{ "name": "Weizenmehl", "amount": 1000, "unit": "g" }, { "name": "Germ", "amount": 1, "unit": "-" }, { "name": "Milch", "amount": 100, "unit": "ml" }, { "name": "Ei", "amount": 1, "unit": "-" }] }, { "name": "Knödel mit Ei", "servings": 4, "instruction": "done", "list": [{ "name": "Knödel", "amount": 4, "unit": "-" }, { "name": "Ei", "amount": 3, "unit": "-" }, { "name": "Essiggurkeln", "amount": 0, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }] }, { "name": "Krautstrudel", "servings": 4, "instruction": "done", "list": [{ "name": "Blätterteig", "amount": 1, "unit": "-" }, { "name": "Kraut", "amount": 0, "unit": "-" }, { "name": "Faschiertes", "amount": 150, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }] }, { "name": "Kürbis Kichererbsen Curry", "servings": 4, "instruction": null, "list": null }, { "name": "Kürbissuppe", "servings": 4, "instruction": "done", "list": [{ "name": "Kürbis", "amount": 500, "unit": "g" }, { "name": "Gemüsebrühe", "amount": 0, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }] }, { "name": "Lauchkuchen", "servings": 4, "instruction": "done", "list": [{ "name": "Roggenmehl", "amount": 335, "unit": "g" }, { "name": "Topfen", "amount": 335, "unit": "g" }, { "name": "Butter", "amount": 167, "unit": "g" }, { "name": "Lauch", "amount": 500, "unit": "g" }, { "name": "Ei", "amount": 3, "unit": "-" }, { "name": "Schlagobers", "amount": 200, "unit": "ml" }] }, { "name": "Malai Kofta", "servings": 4, "instruction": "Alle Welt S.182", "list": [{ "name": "Dosentomaten", "amount": 400, "unit": "g" }, { "name": "Ingwer", "amount": 1, "unit": "-" }, { "name": "Ghee", "amount": 20, "unit": "g" }, { "name": "Chillischote", "amount": 2, "unit": "-" }, { "name": "Cumin", "amount": 5, "unit": "g" }, { "name": "Kurkuma", "amount": 5, "unit": "g" }, { "name": "Joghurt", "amount": 200, "unit": "g" }, { "name": "Karfiol", "amount": 0, "unit": "-" }, { "name": "Kartoffeln", "amount": 450, "unit": "g" }, { "name": "Koriander grün", "amount": 40, "unit": "g" }, { "name": "Kichererbsenmehl", "amount": 50, "unit": "g" }, { "name": "Garam Masala", "amount": 5, "unit": "g" }] }, { "name": "Mangosau", "servings": 4, "instruction": "Wok S.12", "list": [{ "name": "Schweinefleisch", "amount": 500, "unit": "g" }, { "name": "Limette", "amount": 1, "unit": "-" }, { "name": "Sojasauce", "amount": 50, "unit": "ml" }, { "name": "Zucker braun", "amount": 10, "unit": "g" }, { "name": "Knoblauch", "amount": 2, "unit": "-" }, { "name": "Lauch", "amount": 400, "unit": "g" }, { "name": "Mango", "amount": 1, "unit": "-" }, { "name": "Korriander", "amount": 0, "unit": "g" }, { "name": "Gemüsebrühe", "amount": 0, "unit": "g" }] }, { "name": "Moussaka", "servings": 4, "instruction": "done", "list": [{ "name": "Faschiertes", "amount": 400, "unit": "g" }, { "name": "Melanzani", "amount": 3, "unit": "-" }, { "name": "Kartoffeln", "amount": 500, "unit": "g" }, { "name": "Ei", "amount": 2, "unit": "-" }, { "name": "Weizenmehl", "amount": 200, "unit": "g" }, { "name": "Milch", "amount": 500, "unit": "ml" }, { "name": "Zimt", "amount": 5, "unit": "g" }, { "name": "Muskatnuss", "amount": 5, "unit": "g" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Käse", "amount": 200, "unit": "g" }, { "name": "Dosentomaten", "amount": 400, "unit": "g" }, { "name": "Oregano", "amount": 20, "unit": "g" }] }, { "name": "Nudeln mit Pesto", "servings": 4, "instruction": "done", "list": [{ "name": "Nudeln", "amount": 400, "unit": "g" }, { "name": "Pesto", "amount": 1, "unit": "-" }, { "name": "Parmesan", "amount": 100, "unit": "g" }] }, { "name": "Pizza", "servings": 4, "instruction": null, "list": null }, { "name": "Polenta Karottenkuchen", "servings": 4, "instruction": "Kochvergnügen S.103", "list": [{ "name": "Polenta", "amount": 250, "unit": "g" }, { "name": "Karotten", "amount": 500, "unit": "g" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Butter", "amount": 25, "unit": "g" }, { "name": "Gemüsebrühe", "amount": 10, "unit": "g" }, { "name": "Milch", "amount": 250, "unit": "ml" }, { "name": "Sauerrahm", "amount": 100, "unit": "g" }, { "name": "Käse", "amount": 150, "unit": "g" }] }, { "name": "Quiche mit Lauch", "servings": 4, "instruction": null, "list": null }, { "name": "Reisfleisch", "servings": 4, "instruction": "done", "list": [{ "name": "Zwiebel", "amount": 2, "unit": "-" }, { "name": "Rindfleisch", "amount": 300, "unit": "g" }, { "name": "Reis", "amount": 200, "unit": "g" }, { "name": "Karotten", "amount": 200, "unit": "g" }, { "name": "Erbsen", "amount": 150, "unit": "g" }, { "name": "Sauerrahm", "amount": 150, "unit": "g" }] }, { "name": "Rind mit Marillen", "servings": 4, "instruction": "Wok S.12", "list": [{ "name": "Rind faschiert", "amount": 400, "unit": "g" }, { "name": "Cumin", "amount": 0, "unit": "g" }, { "name": "Zimt", "amount": 0, "unit": "g" }, { "name": "Zitrone", "amount": 1, "unit": "-" }, { "name": "Staudenselleries", "amount": 400, "unit": "g" }, { "name": "Tomaten", "amount": 4, "unit": "-" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Knoblauch", "amount": 1, "unit": "-" }, { "name": "Ingwer", "amount": 1, "unit": "-" }, { "name": "Marillen", "amount": 0, "unit": "-" }, { "name": "Gemüsebrühe", "amount": 0, "unit": "g" }, { "name": "Maisstärke", "amount": 5, "unit": "g" }] }, { "name": "Rindsroulade", "servings": 4, "instruction": null, "list": null }, { "name": "Ritschert", "servings": 4, "instruction": "St. Martiner Kochbuch S.103", "list": [{ "name": "Bohnen", "amount": 300, "unit": "g" }, { "name": "Rollgerste", "amount": 200, "unit": "g" }, { "name": "Selchfleisch", "amount": 300, "unit": "g" }, { "name": "Majoran", "amount": 0, "unit": "g" }, { "name": "Thymian", "amount": 0, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Weizenmehl", "amount": 10, "unit": "g" }, { "name": "Suppengemüse", "amount": 1, "unit": "-" }] }, { "name": "Röstgemüse", "servings": 4, "instruction": null, "list": null }, { "name": "Russischer Nudelauflauf", "servings": 4, "instruction": "done", "list": [{ "name": "Topfen", "amount": 250, "unit": "g" }, { "name": "Nudeln", "amount": 300, "unit": "g" }, { "name": "Speck", "amount": 100, "unit": "g" }, { "name": "Majoran", "amount": 0, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Butterbrösel", "amount": 0, "unit": "g" }, { "name": "Ei", "amount": 1, "unit": "-" }, { "name": "Schlagobers", "amount": 200, "unit": "ml" }] }, { "name": "Schinken Käse Röllchen", "servings": 4, "instruction": null, "list": null }, { "name": "Serviettenknödel", "servings": 4, "instruction": "done", "list": [{ "name": "Knödelbrot", "amount": 250, "unit": "g" }, { "name": "Ei", "amount": 2, "unit": "-" }, { "name": "Milch", "amount": 250, "unit": "ml" }, { "name": "Weizenmehl", "amount": 50, "unit": "g" }] }, { "name": "Spinalspätzle mit Gorgonzola", "servings": 4, "instruction": "done", "list": [{ "name": "Spinat", "amount": 450, "unit": "g" }, { "name": "Roggenmehl", "amount": 300, "unit": "g" }, { "name": "Ei", "amount": 2, "unit": "-" }, { "name": "Gorgonzola", "amount": 150, "unit": "g" }, { "name": "Schinken", "amount": 120, "unit": "g" }, { "name": "Schlagobers", "amount": 200, "unit": "ml" }] }, { "name": "Spinalstrudel", "servings": 4, "instruction": "partly", "list": [{ "name": "Blätterteig", "amount": 1, "unit": "-" }, { "name": "Spinat", "amount": 300, "unit": "g" }, { "name": "Zwiebel", "amount": 1, "unit": "-" }, { "name": "Feta", "amount": 200, "unit": "g" }] }, { "name": "Spinat, Kartoffel und Ei", "servings": 4, "instruction": "done", "list": [{ "name": "Spinat", "amount": 400, "unit": "g" }, { "name": "Ei", "amount": 4, "unit": "-" }, { "name": "Kartoffel", "amount": 500, "unit": "g" }] }, { "name": "Steak mit Pfefferrahmsauce", "servings": 4, "instruction": "done", "list": [{ "name": "Rindfleisch", "amount": 500, "unit": "g" }, { "name": "Schlagobers", "amount": 150, "unit": "ml" }, { "name": "Pfeffer rosa", "amount": 0, "unit": "g" }, { "name": "Pfeffer grün", "amount": 20, "unit": "g" }, { "name": "Kroketten", "amount": 500, "unit": "g" }] }, { "name": "Svickova", "servings": 4, "instruction": "done", "list": [{ "name": "Rindfleisch", "amount": 1000, "unit": "g" }, { "name": "Suppengemüse", "amount": 2, "unit": "-" }, { "name": "Schlagobers", "amount": 100, "unit": "ml" }, { "name": "Preiselbeeren", "amount": 0, "unit": "g" }, { "name": "Knödel", "amount": 0, "unit": "-" }] }, { "name": "Topfenküchlein", "servings": 4, "instruction": "Kochvergnügen S.161", "list": [{ "name": "Paprika", "amount": 1, "unit": "-" }, { "name": "Ei", "amount": 3, "unit": "-" }, { "name": "Topfen", "amount": 500, "unit": "g" }, { "name": "Griess", "amount": 120, "unit": "g" }, { "name": "Backpulver", "amount": 0, "unit": "g" }, { "name": "Haferflocken", "amount": 120, "unit": "g" }, { "name": "Paprikapulver", "amount": 5, "unit": "g" }, { "name": "Milch", "amount": 50, "unit": "ml" }] }, { "name": "Tortillas mit Chilli", "servings": 4, "instruction": null, "list": null }, { "name": "Tortillas mit Röstgemüse", "servings": 4, "instruction": null, "list": null }], "sweet": [{ "name": "Käsekuchen", "servings": 4, "instruction": "tua amol", "list": [{ "name": "Spinach", "amount": 750, "unit": "g" }, { "name": "Egg", "amount": 4, "unit": "-" }] }] };
    var retItems = [];
    for (var i = 0; i < items.food.length; i++) {
        var item = items.food[i];
        var name = item.name;
        var servings = item.servings;
        var instruction = item.instruction;
        var ingredients = item.list;
        //print(name + " " + ingredients)
        retItems.push({ "name": name, "servings": servings, "instruction": instruction, "ingredients": ingredients, "type": "food" });
    }
    for (i = 0; i < items.sweet.length; i++) {
        item = items.food[i];
        name = item.name;
        servings = item.servings;
        instruction = item.instruction;
        ingredients = item.list;
        retItems.push({ "name": name, "servings": servings, "instruction": instruction, "ingredients": ingredients, "type": "sweet" });
    }
    return retItems;
}
exports.getRecipes = getRecipes;
