//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../Persistance.js" as DB

// This dialog is invoked on shoppingListPage (FirstPage)
// it allows to add an item to shopping list that does not exist in db
// it allows also to quickly add one item to db
Dialog {
    id: settings

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All
    property string uid_ : ""
    property FirstPage shoppingListPage: null
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
                acceptText: qsTr("Add")
                cancelText: qsTr("Discard")
            }

            Label {
                text: qsTr("Item")
                font.pixelSize: Theme.fontSizeLarge
                anchors.leftMargin: Theme.paddingLarge
                anchors.left: parent.left
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
            TextArea {
                id: explain
                width: parent.width
                text: qsTr("All following fields are only required, if you want to add this item also into your db. if not, swipe to accept.")
                readOnly: true
            }
            TextField {
                id: defaultAmount
                width: parent.width
                inputMethodHints: Qt.ImhDigitsOnly
                label: qsTr("Standard package size")
                text: "1"
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
            ComboBox {
                id: type
                label: qsTr("Type")
                menu: ContextMenu {
                    MenuItem { text: "household" }
                    MenuItem { text: "food" }
                }
            }
            Button {
                id: addButton
                text: qsTr("Add this item to DB")
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
                onClicked: {
                    var isThereAny = DB.getItemPerName(itemName.text)
                    if (isThereAny.length < 1)
                    {
                      var freshUid = DB.getUniqueId()
                      DB.setItem(freshUid,itemName.text,parseInt(defaultAmount.text), unit.value,type.value,0);
                      uid_ = freshUid
                    }
                    //todo: show pop up error that aready there
                }
            }
        }
    }

    Component.onCompleted: {

       if (uid_ === "") {
           print (uid_)
       }
       else {
           if (unit_ == "-") {
               unit.currentIndex = 0
           }
           else if (unit_ == "g") {
               unit.currentIndex = 1
           }
           else if (unit_ == "ml") {
               unit.currentIndex = 2
           }
       }
    }

    Component.onDestruction: {

    }

    onAccepted: {
        // ignore accept if no name was entered
        if (itemName.text == null || itemName.text == "") return;
        // make sure that this 'new' item is really new, if not, use uid from db
        var isThereAny = DB.getItemPerName(itemName.text)
        if (isThereAny.length < 1)
        {
          if (uid_ == "" ) uid_ = DB.getUniqueId()
        }
        else
        {
          uid_ = isThereAny[0].uid // take uid from db if the new item, actually does exist in db
          // in case of the unlikely usecase, that item exists in db AND in shoppinglist an new add will reset the counter in shoppinglist
        }
        // save to db and reload the prev page to make the new item visible
        DB.setShoppingListItem(uid_,itemName.text,parseInt(defaultAmount.text),unit.value,0)
        shoppingListPage.initPage()
    }
    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
    }
}
