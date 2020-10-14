//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../DbLayer/OliveDb/Persistance.js" as DB

// hosting container is TabedAddDialog
// this component allows to add an item to shopping list that does not exist in db
// it allows also to quickly add one item to db
SilicaListView {

    id: anyItemComponent

    property string uid_ : ""
    property FirstPage shoppingListPage
    property string itemType
    property alias name_ : itemName.text
    property alias amount_ : defaultAmount.text
    property string unit_
    property alias category_ : categoryName.text

    SilicaFlickable{

        id: anyItemFlickable
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
                focus: true
                EnterKey.onClicked: {
                    if (applicationWindow.settings.useCategories) {
                       changeCategory.forceActiveFocus()
                    }
                    else {
                       defaultAmount.forceActiveFocus()
                    }
                }
            }
            Item {
                id: categoryGroupItem
                visible: applicationWindow.settings.useCategories
                anchors.left: parent.left
                width: parent.width
                height: categoryName.height
                TextField {
                    id: categoryName
                    width: parent.width * 2 / 3
                    readOnly: categoryName.text !== "" ? false: true
                    label: qsTr("Item category")
                    property string orgText: ""
                    text: ""
                    opacity: itemName.opacity
                    placeholderText: qsTr("Set category")
                    // errorHighlight: text.length === 0
                    EnterKey.enabled: !errorHighlight
                    EnterKey.iconSource: "image://theme/icon-m-enter-next"
                    font.capitalization: Font.MixedCase
                    EnterKey.onClicked: defaultAmount.focus = true
                }
                Button {
                    id: changeCategory
                    text: qsTr("Select")
                    anchors.top: categoryName.top
                    anchors.left: categoryName.right
                    anchors.right: parent.right
                    anchors.rightMargin: Theme.paddingLarge
                    anchors.leftMargin: Theme.paddingLarge
                      onClicked: {
                       var dialog = pageStack.push(Qt.resolvedUrl("EnumPicker.qml"), {itemType: "category"} )
                       dialog.accepted.connect(function() {
                           categoryName.text = dialog.itemName});
                    }
                }
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
            // the next part could be shown only if household xor's food
            ComboBox {
                id: unit
                label: qsTr("Unit")
                menu: ContextMenu {
                    // missing qsTr ??
                    MenuItem { text: "-" }
                    MenuItem { text: "g" }
                    MenuItem { text: "kg" }
                    MenuItem { text: "ml" }
                    MenuItem { text: "l" }
                }
            }
            /*Button {
                id: saveAndClose
                text: qsTr("Save and close")
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.rightMargin: Theme.paddingLarge
                anchors.leftMargin: Theme.paddingLarge
                  onClicked: {
                      doAccept();
                }
            }*/
            Button {
                id: saveAndKeep
                text: qsTr("Create another")
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.rightMargin: Theme.paddingLarge
                anchors.leftMargin: Theme.paddingLarge
                  onClicked: {
                      saveAndKeep.forceActiveFocus();
                      doAccept();
                      reset();
                      itemName.editor.forceActiveFocus();
                }
            }
            TextArea {
                id: explain
                width: parent.width
                text: qsTr("All following fields are only required, if you want to add this item also into your db. if not, swipe to accept.")
                readOnly: true
            }
            ComboBox {
                id: type
                label: qsTr("Type")
                menu: ContextMenu {
                    MenuItem { text: "household" }
                    MenuItem { text: "food" }
                }
            }
            TextField {
                id: co2
                width: parent.width
                inputMethodHints: Qt.ImhDigitsOnly
                label: qsTr("co2 in []")
                text: "1"
                placeholderText: qsTr("Set co2 footprint")
                errorHighlight: text.length === 0 // not mandatory
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                EnterKey.onClicked: unit.focus = true
            }

            Button {
                id: addButton
                text: qsTr("Add this item to DB")
                anchors.left: parent.left
                anchors.right: parent.right
                anchors.leftMargin: Theme.paddingLarge
                anchors.rightMargin: Theme.paddingLarge
                onClicked: {
                    // adds item to household/food db !
                    var isThereAny = DB.getDatabase().getItemPerName(itemName.text)
                    if (isThereAny.length < 1)
                    {
                      var freshUid = DB.getDatabase().db.getUniqueId()
                      DB.getDatabase().setItem(freshUid,itemName.text,parseInt(defaultAmount.text), unit.value,type.value,0,categoryName.text,co2.text);
                      uid_ = freshUid
                    }
                    //todo: show pop up error that aready there
                }
            }
            TextArea {
                id: empty
                width: parent.width
                text: "  "
                readOnly: true
            }
        }
    }

    Component.onCompleted: {

       if (uid_ === "") {
           print (uid_)
       }
       else {
           // set unit
           if (unit_ === "-") {
               unit.currentIndex = 0
           }
           else if (unit_ === "g") {
               unit.currentIndex = 1
           }
           else if (unit_ === "kg") {
               unit.currentIndex = 2
           }
           else if (unit_ === "ml") {
               unit.currentIndex = 3
           }
           else if (unit_ === "l") {
               unit.currentIndex = 4
           }
           // set itemType
           if (itemType === "household") {
               type.currentIndex = 0

           }
           else if (itemType === "food") {
               type.currentIndex = 1
           }
       }
       /*
                    MenuItem { text: "-" }
                    MenuItem { text: "g" }
                    MenuItem { text: "kg" }
                    MenuItem { text: "ml" }
                    MenuItem { text: "l" }
*/
       /*
                    MenuItem { text: "household" }
                    MenuItem { text: "food" }
*/
       itemName.forceActiveFocus()
    }

    Component.onDestruction: {

    }

    function doAccept() {
        // adds item to shopping list !
        // ignore accept if no name was entered
        if (itemName.text == null || itemName.text == "") return;
        // make sure that this 'new' item is really new, if not, use uid from db
        var isThereAny = DB.getDatabase().getItemPerName(itemName.text)
        if (isThereAny.length < 1)
        {
          if (uid_ == "" ) uid_ = DB.getDatabase().db.getUniqueId()
        }
        else
        {
          uid_ = isThereAny[0].uid // take uid from db if the new item, actually does exist in db
          // in case of the unlikely usecase, that item exists in db AND in shoppinglist an new add will reset the counter in shoppinglist
        }
        // save to db and reload the prev page to make the new item visible
        // shoppinglist has no itemType column -> so item type can not be stored
        DB.getDatabase().setShoppingListItem(uid_,itemName.text,parseInt(defaultAmount.text),unit.value,0,categoryName.text)
        applicationWindow.controller.updateShoppingListPage();
    }

    function reset()
    {
        uid_ = "";
        name_ = "";
        amount_ = 1;
        unit_ = "-";
        category_ = "";
        itemType = "household"
    }
}
