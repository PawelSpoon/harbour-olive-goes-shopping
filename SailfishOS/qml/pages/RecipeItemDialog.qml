//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../DbLayer/OliveDb/Persistance.js" as DB

// dialog to select item and amount of an ingredient of an recipe

Dialog {
    id: settings

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All
    property string uid_ : ""
    property RecipeDialog recipeDialog: null
    property string itemType
    property alias name_ : itemName.text
    property alias amount_ : defaultAmount.text
    property string unit_

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
                text: { if (uid_ === "") qsTr("New item")
                        else qsTr("Edit item") }
                font.pixelSize: Theme.fontSizeLarge
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
            }

            TextField {
                id: itemName
                width: parent.width
                inputMethodHints: Qt.ImhSensitiveData
                label: qsTr("Item name")
                property string orgText: ""
                text: ""
                placeholderText: qsTr("Set item name")
                errorHighlight: text.length === 0
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                font.capitalization: Font.MixedCase
                EnterKey.onClicked: defaultAmount.focus = true
            }
            Button {
                id: itemPicker
                text: qsTr("Browse for items")
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
                onClicked: {
                   console.log("Browse for ingredient clicked ")
                   var dialog = pageStack.push(Qt.resolvedUrl("RecipeItemPicker.qml"), {itemType: "food", recipeDialog: settings} )
                   dialog.accepted.connect(function() {
                       itemName.text = dialog.itemName});
                }
            }

            TextField {
                id: defaultAmount
                width: parent.width
                inputMethodHints: Qt.ImhDigitsOnly
                label: qsTr("Standard package size")
                text: ""
                placeholderText: qsTr("Set standard package size")
                errorHighlight: text.length === 0 // not mandatory
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: unit.focus = true
            }

            ComboBox {
                id: unit
                label: qsTr("Unit")
                menu: ContextMenu {
                    MenuItem { text: "-" }
                    MenuItem { text: "g" }
                    MenuItem { text: "kg" }
                    MenuItem { text: "ml" }
                    MenuItem { text: "l" }
                }
            }

        }
    }

    Component.onCompleted: {
       itemName.orgText = itemName.text
       if (uid_ === "") {
           print (uid_)
       }
       else {
           print("i am here")
           print("unit:" + unit_)
           if (unit_ == "-") {
               print("-")
               unit.currentIndex = 0
           }
           else if (unit_ == "g") {
               print("g")
               unit.currentIndex = 1
           }
           else if (unit_ == "ml") {
               print("ml")
               unit.currentIndex = 2
           }
       }
    }

    Component.onDestruction: {

    }

    onAccepted: {
        if (uid_ == "1") {
           recipeDialog.updateIngredient(itemName.text,parseInt(defaultAmount.text),unit.value, itemName.orgText)
        }

        else {
          recipeDialog.addIngredient(itemName.text,parseInt(defaultAmount.text),unit.value)
        }
    }
    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        // no need for saving if input fields are invalid
        if (canNavigateForward) {
            // ?!
        }
    }
}
