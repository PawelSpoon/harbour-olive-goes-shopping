#ifndef OGSSETTINGS_H
#define OGSSETTINGS_H

#include <QObject>
#include <QStringList>
#include "settings.h"


class OGSSettings : public Settings
{
    Q_OBJECT
public:
    explicit OGSSettings(QObject *parent = 0);
    ~OGSSettings();

    // proxy to Qt QSettings, because QtQuick module "Qt.labs.settings" is not available
    Q_PROPERTY(bool useRecipes READ recipes WRITE setRecipes NOTIFY moduleChanged)
    bool recipes();
    void setRecipes(const bool value);

    Q_PROPERTY(bool useHousehold READ household WRITE setHousehold NOTIFY moduleChanged)
    bool household();
    void setHousehold(const bool value);

    Q_PROPERTY(bool useFood READ food WRITE setFood NOTIFY moduleChanged)
    bool food();
    void setFood(const bool value);

    Q_PROPERTY(bool useCategories READ categories WRITE setCategories NOTIFY categoryChanged)
    bool categories();
    void setCategories(const bool value);

    Q_PROPERTY(bool categorizeShoppingList READ categorizeShoppingList WRITE setCategorizeShoppingList NOTIFY categoryChanged)
    bool categorizeShoppingList();
    void setCategorizeShoppingList(const bool value);

    Q_PROPERTY(bool categorizeItems READ categorizeItems WRITE setCategorizeItems NOTIFY categoryChanged)
    bool categorizeItems();
    void setCategorizeItems(const bool value);

signals:
    void moduleChanged();
    void categoryChanged();

};

#endif // SETTINGS_H
