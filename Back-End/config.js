'use strict';

const config = {
    db: {
        host: "db4free.net",
        user: process.env.MY_SQL_USERNAME,
        password: process.env.MY_SQL_PASSWORD,
        database: process.env.MY_SQL_DATABASE,
    },
    listPerPage: 100,
};

module.exports = config;
