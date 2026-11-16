const migName = 'AddUserProfileFieldsuhhh';
function up(db) {
    db.exec(`
            ALTER TABLE users
            ADD COLUMN display_name TEXT;
        `);
}

function down(db) {

}


module.exports = { migName, up, down };