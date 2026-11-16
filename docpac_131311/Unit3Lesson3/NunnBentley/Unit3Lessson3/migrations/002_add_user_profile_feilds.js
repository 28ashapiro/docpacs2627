module.exports = {
    name: '002_add_user_profile_feilds',
    up: (db) => {
        db.exec(`
    Alter Table Users Add column display_name TEXT DEFAULT NULL
`);
    }
};
