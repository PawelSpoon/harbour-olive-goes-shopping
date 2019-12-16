/***************************************************************************
**
** Copyright (C) 2013 Marko Koschak (marko.koschak@tisno.de)
** All rights reserved.
**
** This file is part of ownKeepass.
**
** ownKeepass is free software: you can redistribute it and/or modify
** it under the terms of the GNU General Public License as published by
** the Free Software Foundation, either version 2 of the License, or
** (at your option) any later version.
**
** ownKeepass is distributed in the hope that it will be useful,
** but WITHOUT ANY WARRANTY; without even the implied warranty of
** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
** GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License
** along with ownKeepass. If not, see <http://www.gnu.org/licenses/>.
**
***************************************************************************/

import QtQuick 2.0
import Sailfish.Silica 1.0

PageHeader {

    id: searchHeader
    property alias searchString: searchText.text

    SearchField {
            id: searchText
            y: searchIcon.y
            anchors.left: searchIcon.right
            width: parent.width //200//parent.width - (2*searchIcon.width)
            placeholderText: qsTr("Search ..")
            EnterKey.iconSource: "image://theme/icon-m-enter-close"
            inputMethodHints: Qt.ImhNoPredictiveText;

            errorHighlight: text.length === 0
            EnterKey.enabled: !errorHighlight
            font.capitalization: Font.MixedCase

            Keys.onPressed: {
                if (event.key == 16777220)  {
                    parent.parent.parent.parent.filterItemsModel(searchText.text)
                }
            }

            onTextChanged: {
                if (searchText.text == "")
                  filterItemsModel(searchText.text)
            }
    }

}
