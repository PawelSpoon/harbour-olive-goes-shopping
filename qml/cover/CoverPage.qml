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
import "../pages"

CoverBackground {

    id: coverPage
    property FirstPage controller;

    function fillModel(items)
    {
        // filter out strike-through items, show only open ones
        print(events.count)
        shoppingListModel.clear()
        var maxcount = 7
        if (items.count < maxcount) maxcount = items.count
        if (maxcount == 0) { label.visible = true; return } // show Olive goes shoppin again
        label.visible = false; // hide Olive goes shoppin
        for (var i = 0; i < items.count; i++)
        {            
            var uid = items.get(i).uid
            var name = items.get(i).name
            var amount = items.get(i).amount
            var unit = items.get(i).unit
            var done = items.get(i).done
            if (!done) shoppingListModel.append({"uid": uid, "name": name, "amount": amount, "unit": unit, "done":done });
            print(uid + " " + name + " " + amount + " " + unit + " " + done)
            if (shoppingListModel.count == maxcount) break
        }
        if (shoppingListModel.count > 0) {
            shoppingListModel.append({"name": ".."});
        }
        else
            label.visible = true;
    }

    function markFirstAsDone()
    {
        if (shoppingListModel.count == 0) return;
        var item = shoppingListModel.get(0);
        var uid = shoppingListModel.get(0).uid
        var name = shoppingListModel.get(0).name
        var amount = shoppingListModel.get(0).amount
        var unit = shoppingListModel.get(0).unit
        var done = shoppingListModel.get(0).done
        if (controller == null)
            controller = applicationWindow.page
        controller.markAsDone(uid,name,amount,unit,true)
    }

    Image {
        id: imgcover
        source: "../olive-goes-shopping-cover-image.jpeg"
        asynchronous: true
        opacity: 0.1
        width: parent.width
        height: parent.height
        anchors.horizontalCenter: parent.horizontalCenter
    }
    Label {
        id: label
        anchors.centerIn: parent
        anchors.verticalCenterOffset: 2 * Theme.paddingLarge
        //font: Font.Bold
        text: qsTr("Olive
goes
 shoppin'")
    }

    ListModel {
        id: shoppingListModel
        //ListElement { title : "Title"; type : "Type"; date: "Date"} //; venue: "Venue"; uri: "uri"}
    }

    SilicaListView  {
        id: events
        model: shoppingListModel
        width: parent.width
        anchors.fill: parent
        anchors.topMargin: 80
        anchors.leftMargin: Theme.paddingMedium

        delegate: Item {
            id: myListItem
            width: ListView.view.width
            height: 65

            BackgroundItem {
                id: contentItem
                width: parent.width

                Label {
                    id: titleText
                    text: name
                    anchors.leftMargin: Theme.paddingLarge * 2
                    anchors.verticalCenter : parent.verticalCenter
                    //anchors.topMargin:  Theme.paddingSmall
                    //font.capitalization: Font.Capitalize
                    font.pixelSize: Theme.fontSizeSmall
                    font.bold: false
                    truncationMode: TruncationMode.Fade
                    elide: Text.ElideRight
                    color: Theme.primaryColor //Theme.highlightColor
                }
            }
        }

    }

    CoverActionList {
        id: coverAction

        // strike through the first item
        CoverAction {
            iconSource: "image://theme/icon-cover-next"
            onTriggered: markFirstAsDone()
        }

        /*CoverAction {
            iconSource: "image://theme/icon-cover-pause"
        }*/
    }
}

