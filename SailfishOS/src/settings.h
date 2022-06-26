#ifndef SETTINGS_H
#define SETTINGS_H


#include <QObject>
#include <QStringList>

class Settings : public QObject
{
    Q_OBJECT
public:
    explicit Settings(QObject *parent = 0);
    ~Settings();

    // proxy to Qt QSettings, because QtQuick module "Qt.labs.settings" is not available
    /* example from import-export
    Q_PROPERTY(QString language READ language WRITE setLanguage)
    QString language();
    void setLanguage(const QString &lang);*/

    void setValue(const QString &key, const QVariant &value);
    void setStringValue(const QString &key, const QString &value);
    QVariant getValue(const QString &key);
    QString getStringValue(const QString &key);

    void migrateSettings();

};

#endif // OGSSETTINGS_H
