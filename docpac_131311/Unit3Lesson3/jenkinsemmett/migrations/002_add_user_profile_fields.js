(function() {
    function up(){
        db.exec(`
            ALTER TABLE users
            ADD logged_in BOOLEAN NOT NULL;
        `)
    }
    function down(){}
    up()
})();