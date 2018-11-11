//<license>

import QtQuick 2.0
import Sailfish.Silica 1.0


Page {
    id: aboutPage

    //allowedOrientations: applicationWindow.orientationSetting

    SilicaFlickable {
        anchors.fill: parent
        contentWidth: parent.width
        // contentHeight: col.height

        // Show a scollbar when the view is flicked, place this over all other content
        VerticalScrollDecorator {}

        Column {
            id: col
            width: parent.width
            spacing: Theme.paddingLarge

            PageHeaderExtended {
                title: "Olive's goes shoppin'"
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
                ListElement {language: "spanish"; trans: "carmenfdezb"}
                ListElement {language: "czech";   trans: "PawelSpoon"}
                ListElement {language: "dutch";   trans: "pljmn"}
                ListElement {language: "german";  trans: "Unreasonable_Behaviour"}
                ListElement {language: "german";  trans: "jumPM"}
                ListElement {language: "german";  trans: "PawelSpoon"}
                ListElement {language: "hungarian";  trans: "g.szabotamas"}
                ListElement {language: "hungarian";  trans: "leoka"}
                ListElement {language: "polish";  trans: "pemekcz"}
                ListElement {language: "polish";  trans: "atlochowski"}
            }

            SilicaListView {
                id: itemList
                anchors.left: translatorLabel.left
                anchors.top: translatorLabel.bottom
                anchors.topMargin: Theme.paddingLarge
                model: translatorsModel
                height: 600

                delegate: ListItem {
                    id: listItem

                    Label {
                        id: languageLabel
                        text: language
                        anchors.leftMargin: Theme.paddingMedium
                        color: Theme.primaryColor
                    }
                    Label {
                        id: transeLabel
                        text: trans
                        anchors.left: languageLabel.right
                        anchors.leftMargin: Theme.paddingMedium
                        color: Theme.primaryColor
                    }
                }
            }
        }
    }
}
