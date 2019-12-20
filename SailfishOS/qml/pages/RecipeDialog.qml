//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0
//import QtQuick.Controls 2.0

import "../Persistance.js" as DB

// Dialog to edit a recipe

Dialog {
    id: settings

    // The effective value will be restricted by ApplicationWindow.allowedOrientations
    allowedOrientations: Orientation.All
    property string uid_ : ""
    property ManageRecipesPage itemsPage: null
    property string itemType
    property alias name_ : itemName.text
    property alias servings_ : servings.text
    property string ingredients_ : ""
    property string instructions_ // to be replaced with a textfield
    property int howMany_


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

            TextField {
                id: itemName
                width: parent.width
                inputMethodHints: Qt.ImhSensitiveData
                label: qsTr("Recipe name")
                text: ""
                placeholderText: qsTr("Set recipe name")
                errorHighlight: text.length === 0
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                font.capitalization: Font.MixedCase
                EnterKey.onClicked: servings.focus = true
            }

            TextField {
                id: servings
                width: parent.width
                inputMethodHints: Qt.ImhDigitsOnly
                label: qsTr("Servings")
                text: ""
                placeholderText: qsTr("Set number of servings")
                errorHighlight: text.length === 0
                EnterKey.enabled: !errorHighlight
                EnterKey.iconSource: "image://theme/icon-m-enter-next"
                font.capitalization: Font.MixedCase
                EnterKey.onClicked: addButton.focus = true
            }

            Button {
                id: addButton
                text: qsTr("Add ingredient")
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
                onClicked: {
                   console.log("Add ingredient clicked ")
                   pageStack.push(Qt.resolvedUrl("RecipeItemDialog.qml"), {itemType: itemType, recipeDialog: settings} )
                }

            }

            SilicaListView {
                id: ingredientsList
                //anchors.top: addButton.bottom
                width : parent.width
                height: 800
                //anchors.bottom: parent.bottom
                model: ingredientsModel
                header: PageHeader { title: "Ingredients" }

                ViewPlaceholder {
                    enabled: ingredientsList.count == 0
                    text: qsTr("Please add ingredient")
                }

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
                            print("n:"+name)
                            //DB.getDatabase().removeItem(uid,name,amount,unit,done);
                            ingredientsModel.remove(index);
                            //todo: this should be a reusabel fu
                            storeIndredientModelToItem()
                            }
                        )
                    }

                    BackgroundItem {
                        id: contentItem

                        width: parent.width
                        onPressAndHold: {
                            if (!contextMenu)
                                contextMenu = contextMenuComponent.createObject(settingsFlickable)
                            contextMenu.show(myListItem)
                        }
                        onClicked: {
                            console.log("Clicked ingredient: " + ingreName.text)
                            // uid is used to differ between add and edit
                            pageStack.push(Qt.resolvedUrl("RecipeItemDialog.qml"), {uid_:"1", name_: ingreName.text, amount_: parseInt(ingreAmount.text), unit_: ingreUnit.value,itemType: itemType, recipeDialog: settings} )
                        }
                        Image {
                            id: typeIcon
                            anchors.left: parent.left
                            anchors.leftMargin: Theme.paddingSmall
                            source: {
                                //if (type === "note") "image://theme/icon-l-copy" else
                                "image://theme/icon-m-levels"
                            }
                            height: parent.height
                            width: height
                        }
                        Label {
                            id: ingreName
                            text: name
                            anchors.left: typeIcon.right
                            anchors.leftMargin: Theme.paddingMedium
                            anchors.verticalCenter: parent.verticalCenter
                            truncationMode: TruncationMode.Elide
                            elide: Text.ElideRight
                            color: contentItem.down || menuOpen ? Theme.highlightColor : Theme.primaryColor
                        }
                        Label {
                            id: ingreAmount
                            text: amount
                            anchors.left: ingreName.right
                            anchors.leftMargin: Theme.paddingMedium
                            anchors.verticalCenter: parent.verticalCenter
                            truncationMode: TruncationMode.Elide
                            elide: Text.ElideRight
                            color: contentItem.down || menuOpen ? Theme.highlightColor : Theme.primaryColor
                        }
                        Label {
                            id: ingreUnit
                            text: unit
                            anchors.left: ingreAmount.right
                            anchors.leftMargin: Theme.paddingMedium
                            anchors.verticalCenter: parent.verticalCenter
                            truncationMode: TruncationMode.Elide
                            elide: Text.ElideRight
                            color: contentItem.down || menuOpen ? Theme.highlightColor : Theme.primaryColor
                        }
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

            ListModel {
                id: ingredientsModel
                ListElement {name:"123";amount:0;unit:"g"}
            }

        }
    }

    Component.onCompleted: {
       fillIngredientsList()
    }

    Component.onDestruction: {

    }

    onAccepted: {
        // save to db and reload the prev page to make the new item visible
        if (uid_ == "" ) uid_ = DB.getDatabase().getUniqueId()
        DB.getDatabase().setRecipe(uid_, name_, servings_,"",ingredients_, howMany_, itemType)

        itemsPage.initPage()
    }
    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        // no need for saving if input fields are invalid
        if (canNavigateForward) {
            // ?!
        }
    }

    function fillIngredientsList()
    {
        if (ingredients_ == null)
        {
            print("ingredient is null, set howMany to 0")
            return
        }
        if (ingredients_ == "")
        {
            print("ingredient is empty string set howMany to 0")
            return
        }
        print(ingredients_)
        // convert string to object
        var ingre = JSON.parse(ingredients_)
        ingredientsModel.clear()
        for (var i = 0; i < ingre.length; i++)
        {
            var ing = ingre[i]
            print(ing.name + " " + ing.amount  + " " + ing.unit)
            var elem =  {name: ing.name, amount:ing.amount, unit: ing.unit}
            ingredientsModel.append(elem)
        }
        ingredientsList.height = i * 150
    }

    function addIngredient(ingre_, amount_, unit_)
    {
        var elem =  {name: ingre_, amount: amount_, unit: unit_}
        ingredientsModel.append(elem)

        storeIndredientModelToItem()

        fillIngredientsList()
    }

    function updateIngredient(ingre_, amount_, unit_, orgIngre)
    {
        // search for original name, only when orgName empty then search for new name
        var searchName = orgIngre;
        if (searchName == null) searchName = ingre_;

        // find and update ingredient
        for (var i=0; i < ingredientsModel.count; i++)
        {
            if (ingredientsModel.get(i).name === searchName) {
                //var elem =  {name: ingre_, amount: amount_, unit: unit_}
                ingredientsModel.setProperty(i,"name",ingre_)
                ingredientsModel.setProperty(i,"amount",amount_)
                ingredientsModel.setProperty(i,"unit",unit_)
            }
        }
        // do i need to update the list ?
        // no but you need to update ingedients_ string representation
        storeIndredientModelToItem()
    }

    function storeIndredientModelToItem()
    {
        var ingre = []
        for (var i=0; i < ingredientsModel.count; i++)
        {
            var elemi =  ingredientsModel.get(i)
            ingre.push(elemi)
        }
        ingredients_ = JSON.stringify(ingre)
    }
}
