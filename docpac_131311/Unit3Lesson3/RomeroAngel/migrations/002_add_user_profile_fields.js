const { version } = require("./001_create_users_table");

const addProfileFields = `
  ALTER TABLE users ADD COLUMN bio TEXT;
  ALTER TABLE users ADD COLUMN location TEXT;
`;

const dropProfileFields = `
  ALTER TABLE users DROP COLUMN bio;
  ALTER TABLE users DROP COLUMN location;
`;

///Here are the user profiles and stuff!
module.exports = {
    version: "002_add_user_profile_fields",
    up: (db) => {
        db.exec(addProfileFields);
    },
    down: (db) => {
        db.exec(dropProfileFields);
    }
};