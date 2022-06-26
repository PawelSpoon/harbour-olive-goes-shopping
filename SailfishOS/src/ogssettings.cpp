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
    return getValue("recipes").toBool();
}

void OGSSettings::setRecipes(const bool value)
{
    setValue("recipes", value);
    emit moduleChanged();
}

bool OGSSettings::household()
{
    return getValue("household").toBool();
}

void OGSSettings::setHousehold(const bool value)
{
    setValue("household", value);
    emit moduleChanged();
}

bool OGSSettings::food()
{
    return getValue("food").toBool();
}

void OGSSettings::setFood(const bool value)
{
    setValue("food", value);
    emit moduleChanged();
}

bool OGSSettings::categories()
{
    return getValue("categories").toBool();
}

void OGSSettings::setCategories(const bool value)
{
    setValue("categories", value);
    emit categoryChanged();
}

bool OGSSettings::categorizeShoppingList()
{
    return getValue("categorizeShoppingList").toBool();
}

void OGSSettings::setCategorizeShoppingList(const bool value)
{
    setValue("categorizeShoppingList", value);
    emit categoryChanged();
}

bool OGSSettings::categorizeItems()
{
    return getValue("categorizeItems").toBool();
}

void OGSSettings::setCategorizeItems(const bool value)
{
    setValue("categorizeItems", value);
    emit categoryChanged();
}

bool OGSSettings::capitalization()
{
    return getValue("capitalization").toBool();
}

void OGSSettings::setCapitalization(const bool value)
{
    setValue("capitalization", value);
    emit capitalizationChanged();
}
