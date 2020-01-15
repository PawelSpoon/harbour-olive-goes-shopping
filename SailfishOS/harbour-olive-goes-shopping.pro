# NOTICE:
#
# Application name defined in TARGET has a corresponding QML filename.
# If name defined in TARGET is changed, the following needs to be done
# to match new name:
#   - corresponding QML filename must be changed
#   - desktop icon filename must be changed
#   - desktop filename must be changed
#   - icon definition filename in desktop file must be changed
#   - translation filenames have to be changed

# The name of your application
TARGET = harbour-olive-goes-shopping

CONFIG += sailfishapp

SOURCES += src/harbour-olive-goes-shopping.cpp \
    src/importexport.cpp

HEADERS += \
    src/importexport.h

DISTFILES += qml/harbour-olive-goes-shopping.qml \
    qml/pages/ItemsPage.qml \
    qml/pages/StoreListItem.qml \
    qml/pages/ShoppingListItem.qml \
    qml/pages/ItemDialog.qml \
    qml/pages/ManageItemsPage.qml \
    qml/pages/RecipeDialog.qml \
    qml/pages/RecipesPage.qml \
    qml/pages/RecipeListItem.qml \
    qml/pages/ManageRecipesPage.qml \
    qml/olive-goes-shopping-cover-image.png \
    qml/pages/HelpMainPage.qml \
    qml/pages/HelpPage.qml \
    qml/pages/PageHeaderExtended.qml \
    qml/pages/SilicaLabel.qml \
    qml/pages/SearchPageHeader.qml \
    qml/pages/AnyItemDialog.qml \
    qml/pages/ExportPage.qml \
    qml/pages/RecipeItemDialog.qml \
    qml/pages/ShareWithPage.qml \
    qml/pages/RecipeItemPicker.qml \
    qml/pages/ManageMainPage.qml \
    qml/pages/ManageEnumsPage.qml \
    qml/pages/EnumPicker.qml \
    qml/pages/EnumDialog.qml \
    qml/pages/About.qml \
    qml/pages/FirstPage.qml \
    qml/cover/CoverPage.qml \
    rpm/harbour-olive-goes-shopping.changes.in \
    rpm/harbour-olive-goes-shopping.spec \
    rpm/harbour-olive-goes-shopping.yaml \
    translations/*.ts \
    harbour-olive-goes-shopping.desktop \
    icons/*.png \
    qml/DbLayer/OliveDb/OliveDb.js \
    qml/DbLayer/OliveDb/OliveInit.js \
    qml/DbLayer/OliveDb/Persistance.js \
    qml/DbLayer/OliveDb/Items.js \
    qml/DbLayer/Db/IDbWrapper.js \
    qml/DbLayer/Db/DbWrapper.js \
    qml/DbLayer/Db/DbAccess.js

SAILFISHAPP_ICONS = 86x86 108x108 128x128 256x256

# to disable building translations every time, comment out the
# following CONFIG line
CONFIG += sailfishapp_i18n

# German translation is enabled as an example. If you aren't
# planning to localize your app, remember to comment out the
# following TRANSLATIONS line. And also do not forget to
# modify the localized app name in the the .desktop file.
TRANSLATIONS += translations/harbour-olive-goes-shopping-de.ts \
                translations/harbour-olive-goes-shopping-en.ts \
                translations/harbour-olive-goes-shopping-es.ts \
                translations/harbour-olive-goes-shopping-cs.ts \
                translations/harbour-olive-goes-shopping-hu.ts \
                translations/harbour-olive-goes-shopping-nl.ts \
                translations/harbour-olive-goes-shopping-pl.ts \
                translations/harbour-olive-goes-shopping-zh_CN.ts \
                translations/harbour-olive-goes-shopping-fi_FI.ts \
	        translations/harbour-olive-goes-shopping-fr.ts

