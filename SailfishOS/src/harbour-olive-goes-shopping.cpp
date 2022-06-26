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

#ifdef QT_QML_DEBUG
#include <QtQuick>
#endif

#include <sailfishapp.h>
#include <QTranslator>
#include <QLocale>
#include <QGuiApplication>
#include <QtGui>
#include <QtQml>
#include <QProcess>
#include <QQuickView>
#include <QSettings>
#include "importexport.h"
#include "settings.h"
#include "ogssettings.h"



void migrateSettings()
{

    // copy sql databae
    // The new location of the LocalStorage database
    QString pathOld = "/harbour-olive-goes-shopping/harbour-olive-goes-shopping/QML/OfflineStorage/Databases/";
    QString pathNew = "/oarg.pawelspoon/harbour-olive-goes-shopping/QML/OfflineStorage/Databases/";

    QDir newDbDir(QStandardPaths::writableLocation(QStandardPaths::AppLocalDataLocation) + pathNew);

    if(newDbDir.exists())
        return;

    newDbDir.mkpath(newDbDir.path());

    QString dbname = QString(QCryptographicHash::hash(("harbour-olive-goes-shopping"), QCryptographicHash::Md5).toHex());

    qDebug() << "dbname: " + dbname;

    // The old LocalStorage database
    QFile oldDb(QStandardPaths::writableLocation(QStandardPaths::AppLocalDataLocation) +  pathOld + dbname + ".sqlite");
    QFile oldIni(QStandardPaths::writableLocation(QStandardPaths::AppLocalDataLocation) + pathOld + dbname + ".ini");

    oldDb.copy(QStandardPaths::writableLocation(QStandardPaths::AppLocalDataLocation) +  pathNew + dbname + ".sqlite");
    oldIni.copy(QStandardPaths::writableLocation(QStandardPaths::AppLocalDataLocation) + pathNew + dbname + ".ini");

    qDebug("migrating");

    // config file

    QFile oldSetting(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf");
    QDir newConfDir(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping");

    if(newConfDir.exists())
        return;

    newConfDir.mkpath(newConfDir.path());
}

int main(int argc, char *argv[])
{
    QString appname = "Olive goes shopping";
    QString pkgname = "harbour-olive-goes-shopping";

    migrateSettings();

    QCoreApplication::setOrganizationDomain("oarg.pawelspoon");
    QCoreApplication::setOrganizationName("oarg.pawelspoon"); // needed for Sailjail
    QCoreApplication::setApplicationName(pkgname);

    // SailfishApp::main() will display "qml/template.qml", if you need more
    // control over initialization, you can use:
    //
    //   - SailfishApp::application(int, char *[]) to get the QGuiApplication *
    //   - SailfishApp::createView() to get a new QQuickView * instance
    //   - SailfishApp::pathTo(QString) to get a QUrl to a resource file
    //
    // To display the view, call "show()" (will show fullscreen on device).

    qmlRegisterType<ImportExport>("harbour.olivegoesshopping.import_export", 1, 0, "ImportExport");
    qmlRegisterType<OGSSettings>("harbour.olivegoesshopping.ogssettings", 1, 0, "OGSSettings");
    qmlRegisterType<Settings>("harbour.olivegoesshopping.settings", 1, 0, "Settings");


    return SailfishApp::main(argc, argv);
}


