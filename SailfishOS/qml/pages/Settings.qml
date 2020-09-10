//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
import harbour.olivegoesshopping.ogssettings 1.0

Page {
    /*OGSSettings {
        id: settings
    }*/

    SilicaFlickable {
        anchors.fill: parent
        contentHeight: column.height + Theme.paddingLarge

        Component.onCompleted:
        {
            useRecipes.checked = applicationWindow.settings.useRecipes
            useHousehould.checked = applicationWindow.settings.useHousehold
            useFood.checked = applicationWindow.settings.useFood
            useCategories.checked = applicationWindow.settings.useCategories
            categorizeItems.checked = applicationWindow.settings.categorizeItems
            categorizeShoppingList.checked = applicationWindow.settings.categorizeShoppingList
        }

        // Why is this necessary?
        contentWidth: parent.width

        VerticalScrollDecorator {}
        Column {
            id: column
            spacing: Theme.paddingLarge
            width: parent.width
            PageHeader {
                title: qsTr("Settings")
            }
            SectionHeader {
                text: qsTr("Modules")
            }
            Column {
                width: parent.width
                property bool playing
                TextSwitch {
                    id: useRecipes
                    text: qsTr("Use recipes")
                    description: "will allow you to manage recipes and add those to shopping list"
                    automaticCheck: true;
                    onCheckedChanged: {
                        applicationWindow.settings.useRecipes = checked;
                    }
                }
                TextSwitch {
                    id: useHousehould
                    text: qsTr("Use household items")
                    description: "will allow you to manage household items and add those to shopping list"
                    automaticCheck: true;
                    onCheckedChanged: {
                        applicationWindow.settings.useHousehold = checked;
                    }
                }
                TextSwitch {
                    id: useFood
                    text: qsTr("Use food items")
                    description: "will allow you to manage food items and and add those to shopping list"
                    automaticCheck: true;
                    onCheckedChanged: {
                        applicationWindow.settings.useFood = checked;
                    }
                }
            }
            SectionHeader {
                text: "Categories"
            }
            TextSwitch {
                id: useCategories
                text: "Show categories"
                description: "will allow you to manage categories and link them to items"
                automaticCheck: true;
                onCheckedChanged: {
                    applicationWindow.settings.useCategories = checked;
                    if (checked === false) {
                        categorizeItems.checked = false;
                        categorizeShoppingList.checked = false;
                    }
                }
            }
            TextSwitch {
                id: categorizeShoppingList
                text: "Show categories in shopping list"
                visible: useCategories.checked
                // description: "includes categories"
                automaticCheck: true;
                onCheckedChanged: {
                    applicationWindow.settings.categorizeShoppingList = checked;
                }
            }
            TextSwitch {
                id: categorizeItems
                text: "Show categories in items"
                //description: "includes categories"
                visible: useCategories.checked
                automaticCheck: true;
                onCheckedChanged: {
                    applicationWindow.settings.categorizeItems = checked;
                }
            }
        }
    }
}
