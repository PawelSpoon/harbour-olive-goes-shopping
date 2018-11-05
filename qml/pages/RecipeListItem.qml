
/****************************************************************************************
**
** Copyright (C) 2013 Jolla Ltd.
** Contact: Matt Vogt <matthew.vogt@jollamobile.com>
** All rights reserved.
**
** Copyright (C) 2015 Murat Khairulin
**
** This file is part of Sailfish Silica UI component package.
**
** You may use this file under the terms of BSD license as follows:
**
** Redistribution and use in source and binary forms, with or without
** modification, are permitted provided that the following conditions are met:
**     * Redistributions of source code must retain the above copyright
**       notice, this list of conditions and the following disclaimer.
**     * Redistributions in binary form must reproduce the above copyright
**       notice, this list of conditions and the following disclaimer in the
**       documentation and/or other materials provided with the distribution.
**     * Neither the name of the Jolla Ltd nor the
**       names of its contributors may be used to endorse or promote products
**       derived from this software without specific prior written permission.
**
** THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
** ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
** WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
** DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR
** ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
** (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
** LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
** ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
** (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**
****************************************************************************************/

import QtQuick 2.1
import Sailfish.Silica 1.0
import "../Persistance.js" as DB


//short click will increase howMany by one
//long press will clear

MouseArea {
    id: root

    property alias uid_: uidLabel.text
    property alias text: label.text
    property string instruction_
    //property alias servings_: servingsLabel.text
    property string servings_
    property alias ingredient_: unitLabel.text
    property int howMany_
    property alias type_: typeLabel.text

    property bool checked : (howMany_ > 0)
    property real leftMargin
    property real rightMargin: Theme.paddingLarge
    property bool highlighted: false

    property bool busy


    width: parent ? parent.width : Screen.width
    implicitHeight: Math.max(toggle.height, servingsLabel.y + servingsLabel.height)

    Item {
        id: toggle

        width: Theme.itemSizeExtraSmall
        height: Theme.itemSizeSmall
        anchors {
            left: parent.left
            leftMargin: root.leftMargin
        }

        GlassItem {
            id: indicator
            anchors.centerIn: parent
            opacity: root.enabled ? 1.0 : 0.4
            dimmed: !checked
            falloffRadius: checked ? defaultFalloffRadius : 0.075
            Behavior on falloffRadius {
                NumberAnimation { duration: busy ? 450 : 50; easing.type: Easing.InOutQuad }
            }
            // KLUDGE: Behavior and State don't play well together
            // http://qt-project.org/doc/qt-5/qtquick-statesanimations-behaviors.html
            // force re-evaluation of brightness when returning to default state
            brightness: { return 1.0 }
            Behavior on brightness {
                NumberAnimation { duration: busy ? 450 : 50; easing.type: Easing.InOutQuad }
            }
            color: highlighted ? Theme.highlightColor : Theme.primaryColor
        }
        states: State {
            when: root.busy
            PropertyChanges { target: indicator; brightness: busyTimer.brightness; dimmed: false; falloffRadius: busyTimer.falloffRadius; opacity: 1.0 }
        }

    }

    Label {
        id: label
        opacity: root.enabled ? 1.0 : 0.4
        anchors {
            verticalCenter: toggle.verticalCenter
            // center on the first line if there are multiple lines
            verticalCenterOffset: lineCount > 1 ? (lineCount-1)*height/lineCount/2 : 0
            left: toggle.right
            right: prio.left
        }
        wrapMode: Text.NoWrap
        color: highlighted ? Theme.highlightColor : (checked ? Theme.primaryColor : Theme.secondaryColor)
        truncationMode: TruncationMode.Elide
    }

    Item {
        id: prio
        width: Theme.itemSizeExtraSmall
        height: Theme.itemSizeSmall
        anchors {
            right: parent.right
        }
        visible: howMany_ > 0

        Label {
            id: prioIndicator
            anchors.centerIn: parent
            text: howMany_
            color: highlighted ? Theme.highlightColor : (checked ? Theme.primaryColor : Theme.secondaryColor)
        }
    }

    Label {
        id: servingsLabel
        text: servings_ + " " + qsTr("servings")
        height: text.length ? (implicitHeight + Theme.paddingMedium) : 0
        opacity: root.enabled ? 1.0 : 0.4
        anchors {
            top: label.bottom
            //topMargin: Theme.paddingSmall /
            left: label.left
            right: parent.right
            rightMargin: Theme.paddingLarge
        }
        wrapMode: Text.NoWrap
        font.pixelSize: (Theme.fontSizeExtraSmall * 0.8)
        color: highlighted ? Theme.secondaryHighlightColor : Theme.secondaryColor
        truncationMode: TruncationMode.Elide
    }

    Label {
        id: unitLabel
        visible: false
        height: servingsLabel.height
        opacity: root.enabled ? 1.0 : 0.4
        anchors {
            top: label.bottom
            left: servingsLabel.right
            //right: parent.right
            rightMargin: Theme.paddingLarge
        }
        wrapMode: Text.NoWrap
        font.pixelSize: Theme.fontSizeExtraSmall
        color: highlighted ? Theme.secondaryHighlightColor : Theme.secondaryColor
        truncationMode: TruncationMode.Elide
    }

    Label {
        id: uidLabel
        visible: false
    }

    Label {
        id: typeLabel
        visible: false
    }

    onClicked: {
        howMany_ ++
        checked = (howMany_ > 0)
        print(uid + " " + name + " " + howMany_ + " " + type)
        DB.setRecipe(uid,name,servings_,instruction_,ingredient_,howMany_,type_)
        addRecipeToShoppingList(ingredient_)
    }

    onPressAndHold: {
        removeRecipeFromShoppingList(ingredient_,howMany_)
        howMany_ = 0
        checked = false
        DB.setRecipe(uid,name,servings_,instruction_,ingredient_,howMany_,type_)
    }

    // adds ingredients for 1 recipe
    function addRecipeToShoppingList(ingredient_)
    {
        if (ingredient_ === null)
        {
            print("ingredient is null, set howMany to 0")
            howMany_ = 0
            checked = false
            return
        }
        if (ingredient_ === "null")
        {
            print("ingredient is empty string set howMany to 0")
            howMany_ = 0
            checked = false
            return
        }
        print(ingredient_)
        // convert string to object
        var ingre = JSON.parse(ingredient_)
        //var ingre = jsonParse(ingredient_)
        for (var i = 0; i < ingre.length; i++)
        {
            var ing = ingre[i]
            print(ing.name + " " + ing.amount)
            var dbItem = DB.getItemPerName(ing.name);
            var uid = DB.getUniqueId()
            var unit = ing.unit
            if (dbItem.length > 0) // to make it stable while no sync between recipes->ingredients and items
            {
                uid = dbItem[0].uid
                unit = dbItem[0].unit
            }
            //if (dbItem == null) continue
            //if (dbItem.length == 0) continue
            // check if shoppinglist already contains that item, insert or update
            var shopIngres = DB.getShoppingListItemPerName(ing.name)
            if (shopIngres.length > 0)
            {
                uid = shopIngres[0].uid // this should fix the case, where ingredient does not fit to item in store
                var menge = shopIngres[0].amount
                // check for unit is missing
                menge = menge + ing.amount
                DB.setShoppingListItem(uid,ing.name,menge,unit,false);
            }
            else {
              DB.setShoppingListItem(uid,ing.name,ing.amount,unit,false);
            }
        }
    }

    // removes ingredients for this recipes, howMany times from shopping list
    function removeRecipeFromShoppingList(ingredient_,howMany_)
    {
        if (ingredient_ === null)
        {
            print("ingredient is null, set howMany to 0")
            howMany_ = 0
            checked = false
            return
        }
        if (ingredient_ === "null")
        {
            print("ingredient is empty string set howMany to 0")
            howMany_ = 0
            checked = false
            return
        }
        print(ingredient_)
        // convert string to object
        var ingre = JSON.parse(ingredient_)
        //var ingre = jsonParse(ingredient_)
        for (var i = 0; i < ingre.length; i++)
        {
            var ing = ingre[i]
            print(ing.name + " " + ing.amount)
            var dbItem = DB.getItemPerName(ing.name);
            var uid = DB.getUniqueId()
            var unit = ing.unit
            if (dbItem.length > 0) // to make it stable while no sync between recipes->ingredients and items
            {
                uid = dbItem[0].uid
                unit = dbItem[0].unit
            }
            //if (dbItem == null) continue
            //if (dbItem.length == 0) continue
            // check if shoppinglist already contains that item, insert or update
            var shopIngres = DB.getShoppingListItemPerName(ing.name)
            if (shopIngres.length > 0)
            {
                uid = shopIngres[0].uid // this should fix the case, where ingredient does not fit to item in store
                var menge = shopIngres[0].amount
                // check for unit is missing
                menge = menge - (ing.amount * howMany_)
                if (menge < 0) menge = 0
                if (menge > 0)
                   DB.setShoppingListItem(uid,ing.name,menge,unit,false);
                else
                   DB.removeShoppingListItem(uid,ing.name,menge,unit,false);
            }
            else {
                DB.removeShoppingListItem(uid,ing.name,ing.amount,false);
            }
        }
    }
}
