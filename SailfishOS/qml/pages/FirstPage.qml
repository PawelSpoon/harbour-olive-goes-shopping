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
import harbour.olivegoesshopping.ogssettings 1.0

import "../DbLayer/OliveDb/Persistance.js" as DB

Page {
    id: firstPage
    property string selectedCategory

    // The effective value will be restricted by ApplicationWindow.allowedOrientationso
    allowedOrientations: Orientation.All

    Component.onCompleted:
    {
        DB.getDatabase();
        DB.initialize();
        initPage();
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
        var current = DB.getDatabase().getShoppingListItemPerName(name)
        pageStack.push(Qt.resolvedUrl("AnyItemDialog.qml"),
                        {shoppingListPage: firstPage, uid_: current[0].uid , name_: current[0].name, amount_: current[0].howMany, unit_: current[0].unit, category_: current[0].category })
    }

    function markAsDoneInShoppingList(name)
    {
        for(var i=0; i< shoppingModel.count; i++)
        {
          console.debug(shoppingModel.get(i).name)
          if(shoppingModel.get(i).name === name) {
            shoppingModel.get(i).done = true;
            break
          }
        }
    }

    // currently not used by should be from ShoppingListItem to inform
    function markAsDone(uid,name,amount,unit,category,done)
    {
        DB.getDatabase().setShoppingListItem(uid,name,amount,unit,true,category)
        initPage()
    }

    function initPage()
    {
        var items = DB.getDatabase().getShoppingList()
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
        // not needed, done in db
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

        PullDownMenu {
            MenuItem {
                text: qsTr("Clear")
                onClicked: {
                    remorse.execute(qsTr("Deleting shopping list"), deleteShoppingList);
                }
                RemorsePopup {id: remorse }
                function deleteShoppingList()
                {
                    DB.getDatabase().clearShoppingList() // this also clear the checked flag on recipes and items
                    shoppingModel.clear()
                }
            }
            MenuItem {
                text: qsTr("Clear done")
                onClicked: {
                    remorse.execute(qsTr("Removing done entries"), clearDoneFromShoppingList);
                }
                RemorsePopup {id: remorse2 }
                function clearDoneFromShoppingList()
                {
                    console.log('clearDoneFromShoppingList..')
                    console.log(shoppingModel.count)
                    for (var i= 0; i < shoppingModel.count; i++ )
                    {
                        console.log(shoppingModel.get(i).name + shoppingModel.get(i).done)
                        if (shoppingModel.get(i).done === true)
                        {
                            var uid = shoppingModel.get(i).uid
                            var name = shoppingModel.get(i).name
                            var amount = shoppingModel.get(i).amount
                            var unit = shoppingModel.get(i).unit
                            var done = 1
                            console.log('cleaning ' + name);
                            var dbItem = DB.getDatabase().getItemPerName(name);
                            if (dbItem.length > 0) { // why do i do that ? -- could be a non household / food ..hasOwnProperty()
                              DB.getDatabase().setItem(dbItem[0].uid,name,dbItem[0].amount,dbItem[0].unit,dbItem[0].type,0,dbItem[0].category,dbItem[0].co2)
                            }
                            else {
                                console.log('nothing to clear from items db')
                            }

                            DB.getDatabase().removeShoppingListItem(uid, name, amount, unit, done)
                        }
                     }
                    initPage();
                }
            }
            MenuItem {
                text: qsTr("Modify")
                onClicked: applicationWindow.controller.openAddDialog();
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
                    controller.openManagePage();
                }
            }
            MenuItem {
                text: qsTr("Help")
                onClicked: {
                    controller.openHelpPage();
                }
            }
            MenuItem {
                text: qsTr("About")
                onClicked: {
                    controller.openAboutPage();
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
            property: applicationWindow.settings.categorizeShoppingList ? "category": ""
            criteria: ViewSection.FullString
            delegate: SectionHeader {
                id: secHead
                text: section
                font.pixelSize: Theme.fontSizeLarge
                height: li.menuOpen ? li.contextMenu.height + 100 : 100

                ListItem {
                  id: li
                  property Item contextMenu
                  property bool menuOpen: contextMenu != null// && contextMenu.parent === shoppingList

                  onPressAndHold: {
                    page.selectedCategory = secHead.text;
                    if (!contextMenu)
                        contextMenu = contextMenuComponent.createObject(shoppingList)
                    contextMenu.open(secHead) // not good but ..
                  }
                }
            }
        }

        Component {
            id: contextMenuComponent
            ContextMenu {
                id: menu
                MenuItem {
                    text: "Move up"
                    onClicked: {
                       DB.getDatabase().moveCategoryInShoppingList(page.selectedCategory, true);
                       page.selectedCategory = "";
                       page.updatePage();
                    }
                }
                MenuItem {
                    text: "Move down"
                    onClicked: {
                        DB.getDatabase().moveCategoryInShoppingList(page.selectedCategory, false);
                        page.selectedCategory = "";
                        page.updatePage();
                    }
                }
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
            // order_: order
        }


        ListModel {
            id: shoppingModel
            ListElement {uid:""; name: "dummy"; amount: 1; unit: "g"; done: false; category: ""; order_: "1" }

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

