//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../DbLayer/OliveDb/Persistance.js" as DB

// Dialog to edit a recipe

Dialog {
    id: settings

    property alias uid_ : recipeComponent.uid_
    property alias itemsPage: recipeComponent.itemsPage
    property string itemType
    property alias name_ : recipeComponent.name_
    property alias servings_ : recipeComponent.servings_
    property alias ingredients_ : recipeComponent.ingredients_
    property alias instructions_ : recipeComponent.instructions_
    property alias howMany_ : recipeComponent.howMany_
    // quick hack
    property alias recipeComponent: recipeComponent

    SilicaFlickable{

        id: settingsFlickable
        onActiveFocusChanged: print(activeFocus)
        anchors.fill: parent
        contentWidth: parent.width
        contentHeight: col.height

        // Show a scollbar when the view is flicked, place this over all other content
        VerticalScrollDecorator {}


        Column {
            id: col
            width: parent.width
            spacing: Theme.paddingLarge

            DialogHeader {
                acceptText: qsTr("Save")
                cancelText: qsTr("Discard")
            }

            Label {
                text: { if (uid_ === "") qsTr("New recipe")
                        else qsTr("Recipe") }
                font.pixelSize: Theme.fontSizeLarge
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
            }

        }

        RecipeComponent {
            id: recipeComponent
            itemType: itemTypes
            itemsPage: itemsPage
        }
    }


    onAccepted: {
        recipeComponent.doAccept()
    }

    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        // no need for saving if input fields are invalid
        if (canNavigateForward) {
            // ?!
        }
    }
 }
