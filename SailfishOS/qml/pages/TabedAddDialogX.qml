// main page hosting tab1View

import QtQuick 2.0
import Sailfish.Silica 1.0
import "."

//Page {
Dialog {
    id: tabsPage
    //REM: switching the name i could switch between tabed and non tabed
    objectName: "TabedAddDialogX"
    property FirstPage shoppingListPage
    //anchors.fill: parent
    allowedOrientations: defaultAllowedOrientations

    DialogHeader {
        id: dialogHeader
        //acceptText: qsTr("Close")
        //cancelText: qsTr("Close")
    }

    onAccepted: {
        applicationWindow.controller.doAccept();
    }

    function moveToTab(index)
    {
        console.log(index)
        tabs.moveTo(index)
    }

    SilicaFlickable {
        id: flick
        anchors.fill: parent
        contentHeight: parent.height
        contentWidth: parent.width

        anchors.topMargin: dialogHeader.height

        Component.onCompleted: {
            // todo: init if needed
        }

        SlideshowView {
            id: viewsSlideshow
            anchors.fill: parent
            itemWidth: parent.width  // width
            onRotationChanged: {
                console.log('rotating')
                itemWidth = parent.width
            }

            clip: true
            model: VisualItemModel {
                Loader {
                    id: anyContent
                    property int index: index // makes attached property available from outside
                    width: viewsSlideshow.width; height: viewsSlideshow.height
                    source: Qt.resolvedUrl("AnyItemComponent.qml")
                    onSourceChanged: {
                        applicationWindow.controller.addPage('any', anyContent.item)
                    }
                }
                Loader {
                    id: householdContent
                    width: viewsSlideshow.width; height: viewsSlideshow.height
                    source: Qt.resolvedUrl("ItemsComponent.qml")
                    onSourceChanged: {
                        householdContent.item.itemType = "household"
                        householdContent.item.initPage()
                        applicationWindow.controller.addPage('household', householdContent.item)

                    }
                }
                Loader {
                    id: foodContent
                    width: viewsSlideshow.width; height: viewsSlideshow.height
                    source: Qt.resolvedUrl("ItemsComponent.qml")
                    onSourceChanged:
                    {
                        foodContent.item.itemType = "food"
                        foodContent.item.initPage()
                        applicationWindow.controller.addPage('food', foodContent.item)

                    }
                }
                  Loader {
                    id: recipeContent
                    width: viewsSlideshow.width; height: viewsSlideshow.height
                    source: Qt.resolvedUrl("RecipesComponent.qml")
                    onSourceChanged: {
                        recipeContent.item.initPage()
                        applicationWindow.controller.addPage('recipe', recipeContent.item)
                    }
                }
            }

            // interactive: useCloud
            onCurrentIndexChanged: {
                tabBar.currentSelection = currentIndex
                if (currentIndex === 0)  applicationWindow.controller.setCurrentPage('any')
                if (currentIndex === 1)  applicationWindow.controller.setCurrentPage('household')
                if (currentIndex === 2)  applicationWindow.controller.setCurrentPage('food')
                if (currentIndex === 3)  applicationWindow.controller.setCurrentPage('recipe')
            }

            currentIndex: tabBar.currentSelection
            // Component.onCompleted: if (currentIndex === dictView.index) dictView.item.focusSearchField()

            Connections {
                target: tabBar
                onCurrentSelectionChanged: {
                    if (viewsSlideshow.currentIndex !== tabBar.currentSelection) {
                        viewsSlideshow.positionViewAtIndex(tabBar.currentSelection, PathView.SnapPosition);
                    }
                }
            }
        }
    }
}
