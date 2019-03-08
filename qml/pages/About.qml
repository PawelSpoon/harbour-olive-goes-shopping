//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0


Page {
    id: aboutPage
    allowedOrientations: Orientation.All

    SilicaFlickable {
        id: aboutOlive
        anchors.fill: parent
        contentHeight: aboutRectangle.height

        VerticalScrollDecorator { flickable: aboutOlive }

        Column {
            id: aboutRectangle
            anchors.horizontalCenter: parent.horizontalCenter
            width: parent.width

            spacing: Theme.paddingLarge

            PageHeaderExtended {
                title: "Olive goes shoppin'"
                subTitle: qsTr("a native shopping list")
                subTitleOpacity: 0.5
            }

            SilicaLabel {
                id: licenseLabel
                linkColor: Theme.highlightColor
                text: qsTr('License')
                font.pixelSize: Theme.fontSizeLarge
            }

            SilicaLabel {
                linkColor: Theme.highlightColor
                text: 'https://github.com/PawelSpoon/harbour-olive-goes-shopping/blob/master/LICENSE'
            }

            SilicaLabel {
                text: qsTr('Source')
                font.pixelSize: Theme.fontSizeLarge
            }

            SilicaLabel {
                linkColor: Theme.highlightColor
                text: 'https://github.com/PawelSpoon/harbour-olive-goes-shopping'
            }

            SilicaLabel {
                font.pixelSize: Theme.fontSizeLarge
                text: qsTr("Localization")
            }

            SilicaLabel {
                linkColor: Theme.highlightColor
                text: 'www.transifex.com/pawelspoon/olive-goes-shopping'
            }

            SilicaLabel {
                id: translatorLabel
                linkColor: Theme.highlightColor
                text: qsTr('Translators')
                font.pixelSize: Theme.fontSizeLarge
            }

            ListModel {
                id: translatorsModel
                ListElement {trans: "spanish:"}
                ListElement {trans: "     carmenfdezb"}
                ListElement {trans: "czech:"}
                ListElement {trans: "     PawelSpoon"}
                ListElement {trans: "dutch:"}
                ListElement {trans: "     pljmn"}
                ListElement {trans: "german:"}
                ListElement {trans: "     Unreasonable_Behaviour"}
                ListElement {trans: "     jumPM"}
                ListElement {trans: "     PawelSpoon"}
                ListElement {trans: "hungarian:"}
                ListElement {trans: "     g.szabotamas"}
                ListElement {trans: "     leoka"}
                ListElement {trans: "polish:"}
                ListElement {trans: "     pemekcz"}
                ListElement {trans: "     atlochowski"}
                ListElement {trans: "finnish:"}
                ListElement {trans: "     jakke"}
            }

            Repeater {
                model: translatorsModel

                delegate: Label {
                    text: trans
                    width: parent.width - Theme.horizontalPageMargin * 2
                    anchors.horizontalCenter: parent.horizontalCenter
                    font.pixelSize: Theme.fontSizeSmall
                }
            }

            Rectangle {
                width: parent.width
                height: Theme.paddingLarge
                color: "transparent"
            }
        }
    }
}
