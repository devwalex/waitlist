const userTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);`;
module.exports = userTable;
