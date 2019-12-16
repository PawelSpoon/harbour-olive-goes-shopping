/*
  Copyright (C) 2013 Jolla Ltd.
  Contact: Thomas Perl <thomas.perl@jollamobile.com>
  All rights reserved.

  You may use this file under the terms of BSD license as follows:

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Jolla Ltd nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR
  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import QtQuick 2.0
import Sailfish.Silica 1.0
import "../Persistance.js" as DB

//this page will show the real-calculated shopping list
//page2 will have all the recipes
//page3 will have all the items
//you can click on them in p2 and p3


Page {
    id: firstPage

    // The effective value will be restricted by ApplicationWindow.allowedOrientationso
    allowedOrientations: Orientation.All

    Component.onCompleted:
    {
        DB.initialize();
        initPage()
    }

    function updatePage()
    {
        // shoppinglistitem does update the value in db but not in the model
        // as a workaround i need to initpage

        // print('updatePage')
        // i might need to update the item too
        // applicationWindow.updateCoverList(shoppingModel)
        initPage()
    }

    function editCurrent(name)
    {
        var current = DB.getShoppingListItemPerName(name)
        pageStack.push(Qt.resolvedUrl("AnyItemDialog.qml"),
                        {shoppingListPage: firstPage, uid_: current[0].uid , name_: current[0].name, amount_: current[0].howMany, unit_: current[0].unit, category_: current[0].category })
 //       property string itemType
    }


    function markAsDone(uid,name,amount,unit,category,done)
    {
        DB.setShoppingListItem(uid,name,amount,unit,true,category)
        initPage()
    }

    function invokeAddDialog()
    {
         pageStack.push(Qt.resolvedUrl("AnyItemDialog.qml"), {shoppingListPage: firstPage, itemType: "-"})
    }

    function initPage()
    {
        var items = DB.getShoppingList()
        shoppingModel.clear()
        fillShoppingListModel(items)
        applicationWindow.updateCoverList(shoppingModel)
    }

    function fillShoppingListModel(items)
    {
        print('number of items: ' +  items.length)
        for (var i = 0; i < items.length; i++)
        {
            var uid = items[i].uid
            var name = items[i].name
            var amount = items[i].amount
            var unit = items[i].unit
            var done = items[i].done
            var category = items[i].category
            print(items[i].uid + " " + items[i].name + " " + items[i].amount + " " + items[i].unit + " " + items[i].done + " " + items[i].category)
            shoppingModel.append({"uid": uid, "name": name, "amount": amount, "unit": unit, "done":done, "category":category })
        }

        sortModel();
    }

    function sortModel()
    {
        print("sorting")
        for(var i=0; i< shoppingModel.count; i++)
        {
            for(var j=0; j<i; j++)
            {
                // console.debug(shoppingModel.get(i).category)
                if(shoppingModel.get(i).category === shoppingModel.get(j).category)
                   shoppingModel.move(i,j,1)
                // break
            }
        }
    }

    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaListView {
        id: shoppingList
        anchors.fill: parent
        model: shoppingModel
        VerticalScrollDecorator { flickable: shoppingList }



        // PullDownMenu and PushUpMenu must be declared in SilicaFlickable, SilicaListView or SilicaGridView
        PullDownMenu {
            MenuItem {
                text: qsTr("Clear")
                onClicked: {
                    remorse.execute("Deleting shopping list", deleteShoppingList);
                }
                RemorsePopup {id: remorse }
                function deleteShoppingList()
                {
                    DB.clearShoppingList() // this also clear the checked flag on recipes and items
                    shoppingModel.clear()
                }
            }
            MenuItem {
                text: qsTr("Anything")
                onClicked: pageStack.push(Qt.resolvedUrl("AnyItemDialog.qml"), {shoppingListPage: firstPage, itemType: "recipe"})
            }
            MenuItem {
                text: qsTr("Recipes")
                onClicked: pageStack.push(Qt.resolvedUrl("RecipesPage.qml"), {mainPage: firstPage, itemType: "recipe"})
            }
            MenuItem {
                text: qsTr("Household")
                onClicked: pageStack.push(Qt.resolvedUrl("ItemsPage.qml"), {mainPage: firstPage, itemType: "household"})
            }
            MenuItem {
                text: qsTr("Food")
                onClicked: pageStack.push(Qt.resolvedUrl("ItemsPage.qml"), {mainPage: firstPage, itemType: "food"})
            }

        }

        PushUpMenu {
            MenuItem {
                text: qsTr("Share")
                onClicked: {
                    if (shoppingModel.count > 0)
                    {
                        var listToShare = "";
                        for (var i=0; i< shoppingModel.count; i++) {
                            var oneItemAsString = shoppingModel.get(i).name + " " + shoppingModel.get(i).amount
                            listToShare += "\n" + oneItemAsString // here newline instead
                        }
                        pageStack.push(Qt.resolvedUrl("ShareWithPage.qml"), {destroyOnPop:true, mainPage: firstPage, sharedName: "My shopping list", sharedContent: listToShare, sharedType:"text/x-url" })
                    }
                }
            }
            MenuItem {
                text: qsTr("Manage")
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("ManageMainPage.qml"))
                }
            }
            MenuItem {
                text: qsTr("Help")
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("HelpMainPage.qml"))
                }
            }
            MenuItem {
                text: qsTr("About")
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("About.qml"))
                }
            }
        }

        header: PageHeader {
            title: qsTr("Shopping List")
        }


        ViewPlaceholder {
            enabled: shoppingModel.count === 0
            text: qsTr("Oh dear, <br>nothing to shop ?!")
        }

        // have sections by category
        section {
            property: "category"
            criteria: ViewSection.FullString
            delegate: SectionHeader {
                text: section
                font.pixelSize: Theme.fontSizeLarge
            }
        }

        delegate:
            ShoppingListItem {
            id: shoppingListItem
            uid_: uid
            text: name
            amount_: amount
            unit_: unit
            checked: done
            category: category
        }


        ListModel {
            id: shoppingModel
            ListElement {uid:""; name: "dummy"; amount: 1; unit: "g"; done: false; category: ""}

            function contains(uid) {
                for (var i=0; i<count; i++) {
                    if (get(i).uid === uid)  {
                        return [true, i];
                    }
                }
                return [false, i];
            }
        }


    }
}

