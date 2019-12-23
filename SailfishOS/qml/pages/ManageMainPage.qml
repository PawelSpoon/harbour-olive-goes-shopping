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

//this page allows to manage all the lists and settings

Page {
    id: managePage

    // The effective value will be restricted by ApplicationWindow.allowedOrientationso
    allowedOrientations: Orientation.All

    Component.onCompleted:
    {
    }


    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaListView {
        id: shoppingList
        anchors.fill: parent


        PushUpMenu {
            MenuItem {
                text: qsTr("Help")
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("HelpMainPage.qml"))
                }
            }

        }

        header: PageHeader {
            id: head
            title: qsTr("Manage Application")
        }

        VerticalScrollDecorator {}

        // REM: add a slider in case you put more buttons into this column !
        Column {
            id: col
            width: parent.width
            spacing: Theme.paddingLarge
            // could be f(orientation)
            anchors.topMargin: Theme.paddingLarge * 3.5 * Theme.pixelRatio
            anchors.fill: shoppingList
            anchors.horizontalCenter: parent.horizontalCenter

            TextArea {
                id: explain
                text: "\n \n"
                readOnly: true
            }

            Button {
                id: manageRecipes
                text: qsTr("Recipes")
                anchors.top: head.bottom
                anchors.horizontalCenter: parent.horizontalCenter
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("ManageRecipesPage.qml"), {itemType: "recipe", itemsPage: null})
                }

            }
            Button {
                id: manageFood
                /*anchors.left: parent.left
            anchors.leftMargin: Theme.paddingLarge*/
                text: qsTr("Food")
                anchors.horizontalCenter: parent.horizontalCenter
                onClicked: pageStack.push(Qt.resolvedUrl("ManageItemsPage.qml"), {itemType: "food"})

            }
            Button {
                id: manageHouseHold
                text: qsTr("Household")
                anchors.horizontalCenter: parent.horizontalCenter
                onClicked: pageStack.push(Qt.resolvedUrl("ManageItemsPage.qml"), {itemType: "household"})
            }
            Button {
                id: manageCategories
                text: qsTr("Categories")
                anchors.horizontalCenter: parent.horizontalCenter
                onClicked: pageStack.push(Qt.resolvedUrl("ManageEnumsPage.qml"), {enumType: "category"})
            }
            Button {
                id: impExport
                text: qsTr("Import Export")
                anchors.horizontalCenter: parent.horizontalCenter
                onClicked: {
                    pageStack.push(Qt.resolvedUrl("ExportPage.qml"))
                }
            }

        }
    }
}

