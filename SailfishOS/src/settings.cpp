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
}

Settings::~Settings()
{
}

/* example from import export
QString Settings::language()
{
    QSettings settings;
    return settings.value("language", "").toString();
}

void Settings::setLanguage(const QString &lang)
{
    QSettings settings;
    settings.setValue("language", lang);
}*/

QString Settings::getValue(const QString &key)
{
    QSettings settings;
    return settings.value(key, "").toString();
}

void Settings::setValue(const QString &key, const QString &value)
{
    QSettings settings;
    settings.setValue(key, value);
}
