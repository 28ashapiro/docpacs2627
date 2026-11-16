(function() {
    function up(){
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                email  TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                creationDate TEXT NOT NULL
            );
        `)
    }
    function down(){}
    up()
})();