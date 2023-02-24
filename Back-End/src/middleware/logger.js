'use strict';

const logger = (req, res, next) => {
    console.log(`REQUEST: ${req.method}, ${req.originalUrl}`);
    next();
}

module.exports = logger;
