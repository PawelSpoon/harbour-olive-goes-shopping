# harbour-olive-goes-shopping

A shopping list (and todo list) app for sailfish os

it allows you to manage household and food items in a local db and use that as a pick list.
it also allows you to manage recipes incl. ingredients. when you pick an recipe, it's ingredients will be added to the shopping list.
it does sum up the incredients accross the multiple recipes.
it allows to group your house-hold and food items in categories. the shopping list is then grouped by those.

The db layer is written in typescript. While qt.localstorage is used on sailfish os, it is possible to use sqlite3 and sqlite-sync for tests on windows.
