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
import "../DbLayer/OliveDb/Persistance.js" as DB

// browse for food

//Page
Dialog {
    id: page
    property string itemType
    property string itemName
    property string orgItemName

    // The effective value will be restricted by ApplicationWindow.allowedOrientationso
    allowedOrientations: Orientation.All

    Component.onCompleted:
    {
        initPage()
    }

    onAccepted: {
//        itemName = itemList
        print("selected item:" + itemName)
    }

    // user has rejected editing entry data, check if there are unsaved details
    onRejected: {
        itemName = orgItemName;
        print("selected item:" + itemName)
    }


    function initPage()
    {
        orgItemName = itemName;
        var items = DB.getDatabase().getItems("food") // currently only food enabled
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
            print(items[i].uid + " " + items[i].name)
            itemModel.append({"uid": items[i].uid, "name": items[i].name, "unit": items[i].unit})
        }
    }


    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaListView {
        id: itemList
        anchors.fill: parent
        model: itemModel

        header: PageHeader {
            id: pageHeader
            title: qsTr("Press & hold to accept")
        }

        SearchField {
                id: searchText
                anchors.top: parent.top
                opacity: 1
                anchors.topMargin: Theme.paddingMedium
                width: parent.width - 120
                placeholderText: qsTr("Search ..")
                EnterKey.iconSource: "image://theme/icon-m-enter-close"
                inputMethodHints: Qt.ImhNoPredictiveText;

                errorHighlight: text.length === 0
                placeholderColor: Theme.primaryColor

                EnterKey.enabled: !errorHighlight
                font.capitalization: Font.MixedCase
                color: Theme.primaryColor

                Keys.onPressed: {
                    if (event.key == 16777220)  {
                        filterItemsModel(searchText.text)
                    }
                }

                onTextChanged: {
                    if (searchText.text == "")
                      filterItemsModel(searchText.text)
                }
        }

        ViewPlaceholder {
            enabled: itemModel.count === 0 // show placeholder when model is empty
            text: qsTr("No items")
        }

        delegate: ListItem {
            id: listItem
            property string text: name
            property string uid

            onPressAndHold: {
                print(name + " selected" + "i:" + index + "t:" + text)
                page.itemName = name
                page.accept()
            }

            Label {
                id: titleText
                text: name
                anchors.left: parent.left
                anchors.leftMargin: Theme.paddingLarge
            }
        }


        ListModel {
            id: itemModel
            ListElement {uid: "123"; name: "dummy"}

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

