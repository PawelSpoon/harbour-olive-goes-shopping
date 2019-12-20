/*
    TaskList - A small but mighty program to manage your daily tasks.
    Copyright (C) 2015 Murat Khayrulin

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import QtQuick 2.1
import Sailfish.Silica 1.0
import harbour.olivegoesshopping.import_export 1.0

import "../Persistance.js" as DB


Page {
    id: exportPage
    allowedOrientations: Orientation.All
    property string appname : "harbour-olivegoesshopping"
    property int selectedElementId: -1
    property string selectedFileName : ""
    property string directory: StandardPaths.documents

    function composeFullPath(baseName) {
        var suffix = ".json"
        if (baseName.indexOf(suffix, baseName.length - suffix.length) === -1)
            baseName += ".json"
        return directory + "/" + appname + "/" + baseName;
    }

    function truncatePath(path) {
        var pos = 0
        while (path.length - pos > 38) {
            var j = pos + 1
            while (j < path.length && path[j] !== '/')
                ++j
            if (j < path.length)
                pos = j
            else
                break
        }
        if (pos > 0)
            return "..." + path.substring(pos)
        return path
    }

    function getFiles() {
        var list = exporter.getFilesList(directory + "/" + appname);
        importFilesModel.clear()
        if (list.length < 1) {
            //: informing user that no former exports are available
            //% "No files for import available."
            importFilesModel.append({fileName: qsTr("no-importfiles-placeholder"), elementId: 0});
        } else {
            for (var i = 0; i < list.length; ++i)
                importFilesModel.append({fileName: list[i], elementId: i + 1});
        }
    }

    function composeExportPath() {
        var path = composeFullPath(exportName.text)
        exportName.label = truncatePath(path)
        exporter.fileName = path
    }

    function scanTargets() {
        var externalStorage = "/run/media/nemo/"
        targetModel.clear()
        //% "Internal storage"
        targetModel.append({"name": qsTr("internal-storage-label"), "path": StandardPaths.documents})
        var sdcardArray = exporter.sdcardPath(externalStorage)
        for (var i = 0; i < sdcardArray.length; i++)
            //: Label for SD-Cards where %1 represents the increasing number for each card
            //% "SD-Card %1"
            targetModel.append({"name": qsTr("sdcard-label").arg(i + 1), "path": externalStorage + sdcardArray[i]})
    }

    onDirectoryChanged: {
        composeExportPath()
        getFiles()
    }

    Component.onCompleted: {
        scanTargets()
    }

    ListModel {
        id: targetModel
    }

    SilicaFlickable {
        anchors.fill: parent
        contentHeight: column.height

        VerticalScrollDecorator { }

        Column {
            id: column
            width: parent.width

            PageHeader {
                //: export/import page headline
                //% "Export/Import"
                title: qsTr("Export / Import")
            }

            SectionHeader {
                //: headline for exports
                //% "Export target"
                text: qsTr("Export target")
            }

            ComboBox {
                id: storageTarget
                //% "Choose target"
                label: qsTr("Choose target") + ":"

                menu: ContextMenu {
                    Repeater {
                        model: targetModel
                        MenuItem {
                            text: name
                        }
                    }
                }

                onCurrentIndexChanged: directory = targetModel.get(currentIndex).path
            }

            TextField {
                id: exportName
                width: parent.width
                //: placeholder message to remind the user that he has to enter a name for the data export
                //% "Enter a file name for export"
                placeholderText: qsTr("Enter a file name for export")
                onTextChanged: composeExportPath()
                validator: RegExpValidator { regExp: /^.{1,60}$/ }
                inputMethodHints: Qt.ImhNoPredictiveText

                EnterKey.onClicked: focus = false
            }

            ImportExport {
                id: exporter
            }

            Button {
                id: exportButton
                //: headline for the data export section
                //% "Export data"
                text: qsTr("Export data")
                width: parent.width * 0.75
                anchors.horizontalCenter: parent.horizontalCenter
                enabled: exportName.acceptableInput

                onClicked: {
                    var json = DB.getDatabase().dumpData()
                    var ret = exporter.save(json)
                    if (ret) {
                        //: informational notification about the successful eported data
                        //% "Successfully exported all data."
                        /*appWindow.pushNotification("INFO", qsTr("data-export-success"),
                                                        //% "File path"
                                                        qsTr("data-export-path") + ": " + composeFullPath(exportName.text))*/
                        exportName.text = ""
                        getFiles()
                    }
                }
            }

            SectionHeader {
                //: headline for imports
                //% "Select a file to import"
                text: qsTr("select-file-header")
            }

            ListModel {
                id: importFilesModel
                ListElement {
                    fileName: "dummy"
                    width: "0"
                    elementId: 0
                }
            }

            Grid {
                id: importList
                width: parent.width
                columns: 1

                Repeater {
                    model: importFilesModel

                    delegate: ValueButton {
                        label: fileName
                        description: elementId !== 0 ? truncatePath(composeFullPath(fileName)) : ""
                        width: column.width
                        highlighted: elementId === selectedElementId
                        onClicked: {
                            /* element with id 0 is non-selectable placeholder if there are no files */
                            if (elementId === 0)
                                return
                            selectedElementId = elementId
                            selectedFileName = fileName
                        }
                    }
                }
            }

            Component.onCompleted: {
                getFiles()
            }

            Rectangle {
                width: parent.width
                height: Theme.paddingLarge
                color: "transparent"
            }

            Row {
                width: parent.width - 2 * Theme.horizontalPageMargin
                spacing: Theme.horizontalPageMargin
                anchors.horizontalCenter: parent.horizontalCenter

                Button {
                    id: deleteButton
                    width: parent.width / 2 - 0.5 * Theme.horizontalPageMargin
                    //: Button to delete the selected data file
                    //% "Delete file"
                    text: qsTr("delete-file-button")
                    enabled: selectedElementId !== -1

                    onClicked: {
                        if (selectedFileName.length === 0)
                            return
                        var result = exporter.remove(composeFullPath(selectedFileName))

                        if (result) {
                            selectedElementId = -1
                            getFiles()
                        }
                    }
                }

                Button {
                    id: importButton
                    width: parent.width / 2 - 0.5 * Theme.horizontalPageMargin
                    //: Button to import data form the selected file
                    //% "Import data"
                    text: qsTr("import-button")
                    enabled: selectedElementId !== -1

                    onClicked: {
                        if (selectedFileName.length === 0)
                            return
                        var json = exporter.load(composeFullPath(selectedFileName));
                        if (DB.getDatabase().importData(json)) {
                            //: informational notification about the successful eported data
                            //% "Successfully imported all data."
                            /*taskListWindow.pushNotification("INFO", qsTr("data-import-success"),
                                                            //% "Source file path"
                                                            qsTr("data-import-path") + ": " + composeFullPath(selectedFileName))*/
                        }
                    }
                }
            }

            SectionHeader {
                //: headline for information about import/export mechanism
                //% "Information"
                text: qsTr("information-label")
            }

            Label {
                width: parent.width - 2 * Theme.horizontalPageMargin
                anchors.horizontalCenter: parent.horizontalCenter
                wrapMode: Text.WordWrap
                //: Explanation of how importing and exporting data works and where the files are/have to be located.
                //% "You can export your data to a json formatted file and import it from a json formatted file. Please keep in mind that ALL YOUR DATA containing tasks and lists is stored in a single file!"
                text: qsTr("export-import-description")
            }

            SectionHeader {
                //: headline for the database purge
                //% "Drop data (very destructive!!!)"
                text: qsTr("drop-database-header")
            }

            Label {
                width: parent.width - 2 * Theme.horizontalPageMargin
                anchors.horizontalCenter: parent.horizontalCenter
                wrapMode: Text.WordWrap
                //: warn user of destructive drop DB function
                //% "CAUTION: This function will drop all your data immediately! So only use this if you know what you're doing!"
                text: qsTr("drop-database-warning")
                color: "red"
            }

            TextSwitch {
                id: dropDBconfirmation
                width: parent.width
                //: let user confirm the database purge
                //% "Yes, I know what I'm doing."
                text: qsTr("drop-database-confirmation")
            }

            Button {
                width: parent.width * 0.75
                anchors.horizontalCenter: parent.horizontalCenter
                //: Button to import data form the selected file
                //% "Drop database"
                text: qsTr("drop-database-button")
                enabled: dropDBconfirmation.checked

                onClicked: {
                    if (DB.getDatabase().dropDB())
                        //: informational notification about the successful dropped data tables
                        //% "Successfully dropped all data."
                        taskListWindow.pushNotification("WARNING", qsTr("drop-database-success"),
                                                        //% "Please restart TaskList to work with the new database."
                                                        qsTr("drop-database-detail"))
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
