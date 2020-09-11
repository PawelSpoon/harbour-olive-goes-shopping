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
import Nemo.KeepAlive 1.2
import harbour.olivegoesshopping.ogssettings 1.0

import "pages"
import "cover"
import "sf-docked-tab-bar"

ApplicationWindow
{
    id: applicationWindow
    property ApplicationController controller: myController
    property OGSSettings settings: settings
    property bool on: false
    property FirstPage page

    // from tab sample
    property alias tabBar: _tabBar

    ApplicationController {
        id: myController
    }

    OGSSettings {
        id: settings
        onModuleChanged: {
            console.log('module settings did change -> need to update visibility')
        }
        onCategoryChanged: {
            console.log('category settings did change -> need to update visibility')
        }
    }


    initialPage: Component {
        FirstPage {
             id: firstPage
             Component.onCompleted: {
                 applicationWindow.page = firstPage
             }
        }
    }

    allowedOrientations: Orientation.All

    KeepAlive {
        id: keepAlive
        enabled: on
    }

    DisplayBlanking {
        id: display
        preventBlanking: on
    }

    CoverPage {
        id: coverPage

        Component.onCompleted:  {
            applicationWindow.cover = coverPage
            // controller = applicationWindow.page
        }
    }

    DockedTabBar {
        id: _tabBar
        enabledOnPage: "TabedAddDialogX"
        currentSelection: 0

        DockedTabButton {
            icon.source: "image://theme/icon-m-wizard"
            label: qsTr("Any")
            fontSize: Theme.fontSizeTiny
        }
        DockedTabButton {
            visible: settings.useHousehold
            icon.source: "image://theme/icon-m-home"
            label: qsTr("Household")
            fontSize: Theme.fontSizeTiny
        }
        DockedTabButton {
            visible: settings.useFood
            icon.source: "image://theme/icon-m-media-albums"
            label: qsTr("Food")
            fontSize: Theme.fontSizeTiny
        }
        DockedTabButton {
            visible: settings.useRecipes
            icon.source: "image://theme/icon-m-lan"
            label: qsTr("Recipes")
            fontSize: Theme.fontSizeTiny
        }
    }

    function updateCoverList(model) {
        coverPage.fillModel(model)
    }

}

