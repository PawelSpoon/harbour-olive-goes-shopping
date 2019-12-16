import * as sqlite3 from 'sqlite3';
var db = new sqlite3.Database('test.db');
db.run('CREATE TABLE IF NOT EXISTS memos(name LONGVARCHAR, val INTEGER)');
db.run("INSERT INTO memos VALUES('TEST', 5000)");

db.each("SELECT * FROM memos", (err, row) => {
  console.log(row.text);
});

db.close();

