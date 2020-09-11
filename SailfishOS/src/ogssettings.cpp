#include "ogssettings.h"
#include <QDesktopServices>
#include <QDirIterator>
#include <QFile>
#include <QTextStream>
#include <QSettings>

// FIXME
#include <QDebug>

OGSSettings::OGSSettings(QObject *parent) :
    Settings(parent)
{
}

OGSSettings::~OGSSettings()
{
    //missing: call destructor
}

bool OGSSettings::recipes()
{
    QSettings settings;
    return settings.value("recipes", "").toBool();
}

void OGSSettings::setRecipes(const bool value)
{
    QSettings settings;
    settings.setValue("recipes", value);
    emit moduleChanged();
}

bool OGSSettings::household()
{
    QSettings settings;
    return settings.value("household", "").toBool();
    emit moduleChanged();
}

void OGSSettings::setHousehold(const bool value)
{
    QSettings settings;
    settings.setValue("household", value);
    emit moduleChanged();
}

bool OGSSettings::food()
{
    QSettings settings;
    return settings.value("food", "").toBool();
}

void OGSSettings::setFood(const bool value)
{
    QSettings settings;
    settings.setValue("food", value);
    emit moduleChanged();
}

bool OGSSettings::categories()
{
    QSettings settings;
    return settings.value("categories", "").toBool();
}

void OGSSettings::setCategories(const bool value)
{
    QSettings settings;
    settings.setValue("categories", value);
    emit categoryChanged();
}

bool OGSSettings::categorizeShoppingList()
{
    QSettings settings;
    return settings.value("categorizeShoppingList", "").toBool();
}

void OGSSettings::setCategorizeShoppingList(const bool value)
{
    QSettings settings;
    settings.setValue("categorizeShoppingList", value);
    emit categoryChanged();
}

bool OGSSettings::categorizeItems()
{
    QSettings settings;
    return settings.value("categorizeItems", "").toBool();
}

void OGSSettings::setCategorizeItems(const bool value)
{
    QSettings settings;
    settings.setValue("categorizeItems", value);
    emit categoryChanged();
}
