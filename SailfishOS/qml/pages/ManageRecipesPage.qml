import QtQuick 2.0
import Sailfish.Silica 1.0
import "../Persistance.js" as DB

Dialog {

    id: page
    property ItemsPage itemsPage
    property FirstPage mainPage
    property string itemType

    allowedOrientations: defaultAllowedOrientations


    Component.onCompleted: {
        initPage()
    }

    onAccepted: {
        itemsPage.initPage()
    }

    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        itemsPage.initPage()
    }

    function initPage()
    {
        var items = DB.getDatabase().getRecipes()
        itemModel.clear()
        fillItemsModel(items)
    }

    function fillItemsModel(items)
    {
        print('number of items: ' +  items.length)
        for (var i = 0; i < items.length; i++)
        {
            print(items[i].uid + " " + items[i].name + " " + items[i].type + " " + items[i].ingredients)
            itemModel.append({"uid": items[i].uid, "name": items[i].name, "servings": items[i].servings, "instruction": items[i].instruction, "ingredients": items[i].ingredients, "howMany": items[i].howMany, "type": items[i].type })
        }
    }

    ListModel {
        id: itemModel
        ListElement {uid: "123"; name: "dummy"; instruction:""; howMany: 0; ingredients:""; servings:0; type:"dummy"}

        function contains(uid) {
            for (var i=0; i<count; i++) {
                if (get(i).uid == uid)  {
                    return [true, i];
                }
            }
            return [false, i];
        }
        function containsTitle(name) {
            for (var i=0; i<count; i++) {
                if (get(i).name == name)  {
                    return true;
                }
            }
            return false;
        }
    }

    // Place our content in a Column.  The PageHeader is always placed at the top
    // of the page, followed by our content.
    SilicaListView {
        id: itemList
        width: page.width
        height: page.height
        anchors.top: parent.top
        model: itemModel
        header: PageHeader { title: "Manage Recipes" }
        ViewPlaceholder {
            enabled: itemList.count == 0
            text: qsTr("Please fill store with items")
        }

        PushUpMenu {
            MenuItem {
                text: qsTr("Clear Recipes Db")
                onClicked:
                {
                    remorse.execute("Deleting items db", deleteRecipesDb);
                }
                RemorsePopup {id: remorse }
                function deleteRecipesDb()
                {
                    DB.getDatabase().db.cleanTable("recipes");
                    initPage();
                }
            }

            MenuItem {
                text: qsTr("Import Recipes Db")
                onClicked: {
                    DB.getDatabase().importRecipesFromJson()
                    initPage()
                }
            }
        }

        PullDownMenu {

            MenuItem {
                text: qsTr("Add")
                onClicked: pageStack.push(Qt.resolvedUrl("RecipeDialog.qml"), {itemType:itemType, itemsPage: page})
            }
        }
        VerticalScrollDecorator {}

        delegate: Item {
            id: myListItem
            property bool menuOpen: contextMenu != null && contextMenu.parent === myListItem
            property int myIndex: index
            property Item contextMenu

            width: ListView.view.width
            height: menuOpen ? contextMenu.height + contentItem.height : contentItem.height

            function remove() {
                var removal = removalComponent.createObject(myListItem)
                ListView.remove.connect(removal.deleteAnimation.start)
                removal.execute(contentItem, "Deleting", function() {
                    print("u:" + uid + ",n:"+name)
                    DB.getDatabase().removeRecipe(uid,name);
                    itemModel.remove(index); }
                )
            }

            BackgroundItem {
                id: contentItem

                width: parent.width
                onPressAndHold: {
                    if (!contextMenu)
                        contextMenu = contextMenuComponent.createObject(itemList)
                    contextMenu.show(myListItem)
                }
                onClicked: {
                    console.log("Clicked " + name + servings)
                    pageStack.push(Qt.resolvedUrl("RecipeDialog.qml"),
                                   {uid_: uid, name_: name, servings_: servings, ingredients_: ingredients, itemType: type, itemsPage: page} )
                }
                Image {
                    id: typeIcon
                    anchors.left: parent.left
                    anchors.leftMargin: Theme.paddingSmall
                    source: {
                        if (type === "note") "image://theme/icon-l-copy"
                        else "image://theme/icon-m-levels"
                    }
                    height: parent.height
                    width: height
                }
                Label {
                    text: name
                    anchors.left: typeIcon.right
                    anchors.leftMargin: Theme.paddingMedium
                    anchors.verticalCenter: parent.verticalCenter
                    font.capitalization: Font.Capitalize
                    truncationMode: TruncationMode.Elide
                    elide: Text.ElideRight
                    color: contentItem.down || menuOpen ? Theme.highlightColor : Theme.primaryColor
                }
                /*Label {
                    text: type
                    anchors.left: typeIcon.right
                    anchors.leftMargin: Theme.paddingMedium
                    anchors.verticalCenter: parent.verticalCenter
                    font.capitalization: Font.Capitalize
                    truncationMode: TruncationMode.Elide
                    elide: Text.ElideRight
                    color: contentItem.down || menuOpen ? Theme.highlightColor : Theme.primaryColor
                }*/
            }

            Component {
                id: removalComponent
                RemorseItem {
                    property QtObject deleteAnimation: SequentialAnimation {
                        PropertyAction { target: myListItem; property: "ListView.delayRemove"; value: true }
                        NumberAnimation {
                            target: myListItem
                            properties: "height,opacity"; to: 0; duration: 300
                            easing.type: Easing.InOutQuad
                        }
                        PropertyAction { target: myListItem; property: "ListView.delayRemove"; value: false }
                    }
                    onCanceled: destroy()
                }
            }
            Component {
                id: contextMenuComponent
                ContextMenu {
                    id: menu
                    MenuItem {
                        text: "Delete"
                        onClicked: {
                            menu.parent.remove();
                        }
                    }
                }
            }
        }
    }
}




