contains the backend of olive-goes-shopping app
contains the common db layer 

DbWrapper layer
  operates with db
  contains method to read and write data to db
  - execute
  - executeSelect

  DbWrapper
    works on SailfishOS with Qt.LocalStorage
  DbWrapperMock
    works on Windows with Sqlite3 and tbd access

DbAccess layer
    is virtualized and contains other common methods like
    - set/getVersion
    - cleanTable
    the assumption that this layer is doing is: 
      db has a version table

App layer
    contains the app specific persistance methods
    installation, execution, migration ? is separated
    
    OliveDb
      methods needed for UI
    
    OliveInit
      install and update of DB

App
    app needs additionally Persistance.js that creates a static db variable containing the App layer objects. In this case the OliveDb.

Everything is written in TS, compiled with es3, still js is not directly consumeable in Qt.
Have to 
- remove all the exports
- replace require() with .import "..js" as

UnitTesting ..
Installed jasmince
Installed typings but not sure why


Installation
install sqlite3 on your laptop
install typescript
install sqlite-sync using: npm install sqlite-sync --save-dev

for unit tests, this was the easiest way to go:

https://journal.artfuldev.com/unit-testing-node-applications-with-typescript-using-mocha-and-chai-384ef05f32b2

chai has the expect === asserts
mocha is the runner
ts-node ?!
npm install chai mocha ts-node @types/chai @types/mocha --save-dev
npm install typescript is needed

debuging with mocha
https://saravanaj.github.io/2017/02/05/debugging-mocha-tests-written-in-typescript-with-visual-studio-code/
