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

//this page shows items to shop
//each click increases howMany by 1
//longpress shows context menu with reset to 0
//swipe to left or right (cancel / ok) will store items to db and update shoppingList

SilicaListView {
// Dialog {
    id: page
    property string itemType

    anchors.fill: parent

    // value of search..
    property string searchString
    onSearchStringChanged: filterPage(searchString) //listModel.update()
    //Component.onCompleted: listModel.update()

    Component.onCompleted:
    {
        initPage()
    }

    function doAccept() {
        applicationWindow.page.initPage()
    }

    // user has rejected editing entry data, check if there are unsaved details
    function doReject() {
        applicationWindow.page.initPage()
    }

    function initPage()
    {
        var items = DB.getDatabase().getItems(itemType)
        itemModel.clear()
        fillItemsModel(items)
    }

    function filterPage(nameFilter)
    {
        var items = DB.getDatabase().filterItemsPerName(nameFilter)
        itemModel.clear()
        fillItemsModel(items)
    }

    function filterItemsModel(texti)
    {
        if (texti.length > 0) {
            filterPage(texti)
        } else {
            initPage()
        }
    }

    function fillItemsModel(items)
    {
        print('number of items: ' +  items.length)
        for (var i = 0; i < items.length; i++)
        {
            // print(items[i].uid + " " + items[i].name + " " + items[i].type + " " + " " + items[i].howMany + " " + items[i].category)
            itemModel.append({"uid": items[i].uid, "name": items[i].name, "amount": items[i].amount, "unit": items[i].unit, "howMany": items[i].howMany, "type": items[i].type, "category": items[i].category })
        }
        if (applicationWindow.settings.categorizeItems) {
            console.log('soring items')
            sortModel();
        }
    }

    function sortModel()
    {
        // not needed, done in db
        print("sorting")
        for(var i=0; i< itemModel.count; i++)
        {
            for(var j=0; j<i; j++)
            {
                // console.debug(shoppingModel.get(i).category)
                if(itemModel.get(i).category === itemModel.get(j).category)
                   itemModel.move(i,j,1)
                // break
            }
        }
    }

    Column {
        id: headerContainer
        width: parent.width

        SearchField {
            id: searchField
            width: parent.width
            opacity: 1

            Binding {
                target: page
                property: "searchString"
                value: searchField.text.toLowerCase().trim()
            }
        }
    }

    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaListView {
        id: itemList
        model: itemModel
        anchors.fill: parent
        anchors.topMargin: searchField.height
        contentWidth: parent.width


        ViewPlaceholder {
            enabled: itemModel.count === 0 // show placeholder text when no locations/artists are tracked
            text: qsTr("No items")
        }

        // have sections by category
        // ExpandingSectionGroup and ExpandingSection might be better
        section {
            property: applicationWindow.settings.categorizeItems ? "category": ""
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


        delegate: ListItem {
            id: listItem

            StoreListItem {
                uid_: uid
                text: name
                amount_: amount
                unit_: unit
                type_: type
                howMany_: howMany
                category_: category
            }
        }


        ListModel {
            id: itemModel
            ListElement {uid: "123"; name: "dummy"; amount: 0; unit:""; howMany:0; type:"dummy"; category:""}

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

