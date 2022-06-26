#include "settings.h"
#include <QDesktopServices>
#include <QDirIterator>
#include <QFile>
#include <QTextStream>
#include <QSettings>

// FIXME
#include <QDebug>

Settings::Settings(QObject *parent) :
    QObject(parent)
{
    migrateSettings();
}

Settings::~Settings()
{
}


QVariant Settings::getValue(const QString &key)
{
    QSettings settings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);
    return settings.value(key, "");
}

QString Settings::getStringValue(const QString &key)
{
    QSettings settings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);
    return settings.value(key, "").toString();
}

void Settings::setValue(const QString &key, const QVariant &value)
{
    QSettings settings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);
    settings.setValue(key, value);
}

void Settings::setStringValue(const QString &key, const QString &value)
{
    QSettings settings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);
    settings.setValue(key, value);
}

void Settings::migrateSettings()
{
    // The new location of config file
    QSettings settings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/oarg.pawelspoon/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);

    if (settings.contains("migrated"))
        return;

    QSettings oldSettings(QStandardPaths::writableLocation(QStandardPaths::ConfigLocation) + "/harbour-olive-goes-shopping/harbour-olive-goes-shopping.conf", QSettings::NativeFormat);

    for (const QString& key : oldSettings.childKeys())
        settings.setValue(key, oldSettings.value(key));

    settings.setValue("migrated", "true");
}
