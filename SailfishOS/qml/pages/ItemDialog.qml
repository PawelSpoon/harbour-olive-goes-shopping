//<license>

import QtQuick 2.2
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../Persistance.js" as DB

Dialog {
    id: settings

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All
    property string uid_ : ""
    property ManageItemsPage itemsPage: null
    property string itemType
    property alias name_ : itemName.text
    property alias amount_ : defaultAmount.text
    property string unit_
    property alias category_ : categoryName.text

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
                text: ""
                placeholderText: qsTr("Set item name")
                errorHighlight: text.length === 0
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                font.capitalization: Font.MixedCase
                EnterKey.onClicked: defaultAmount.focus = true
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
                    MenuItem { text: "ml" }
                }
            }

            TextField {
                id: categoryName
                width: parent.width
                inputMethodHints: Qt.ImhSensitiveData
                label: qsTr("Item category")
                property string orgText: ""
                text: ""
                readOnly: true
                placeholderText: qsTr("Set category")
                errorHighlight: text.length === 0
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                font.capitalization: Font.MixedCase
                EnterKey.onClicked: defaultAmount.focus = true
            }
            Button {
                id: changeCategory
                text: qsTr("Change Category")
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
                onClicked: {
                    console.log("Browse for ingredient clicked ")
                    var dialog = pageStack.push(Qt.resolvedUrl("EnumPicker.qml"), {itemType: "category", recipeDialog: settings} )
                    dialog.accepted.connect(function() {
                        categoryName.text = dialog.itemName});
                }
            }
            TextField {
                id: co2
                width: parent.width
                inputMethodHints: Qt.ImhDigitsOnly
                label: qsTr("co2 in []")
                text: ""
                placeholderText: qsTr("Set co2 footprint")
                errorHighlight: text.length === 0 // not mandatory
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: unit.focus = true
            }
            // nearly working combobox solution with an listmodel, only the loading into the listmodel is missing
            /*ComboBox {
                        id: categoryCombo
                        width: parent.width
                        x: Theme.paddingMedium
                        label: "Category"
                        menu: ContextMenu {
                            Repeater {
                                model: ListModel {
                                    id: cbItems
                                    ListElement { text: "Banana"; color: "Yellow" }
                                    ListElement { text: "Apple"; color: "Green" }
                                    ListElement { text: "Coconut"; color: "Brown" }
                                }
                                MenuItem { text: model.text
                                }
                            }
                        }
                    }*/
        }
    }

    Component.onCompleted: {
        if (uid_ === "") {
            print (uid_)
        }
        else {
            print("i am here")
            print(category_)
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
        // save to db and reload the prev page to make the new item visible
        if (uid_ == "" ) uid_ = DB.getDatabase().db.getUniqueId()
        DB.getDatabase().setItem(uid_,itemName.text,parseInt(defaultAmount.text),unit.value,itemType,0,categoryName.text,co2.text);
        itemsPage.initPage()
    }
    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        // no need for saving if input fields are invalid
        if (canNavigateForward) {
            // ?!
        }
    }
}
