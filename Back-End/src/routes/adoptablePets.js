'use strict';

const express = require('express');
const router = express.Router();

const adoptablePets = require('../services/adoptablePets');

router.get('/', async (req, res, next) => {
    try {
        res.json(await adoptablePets.getMultiple(req.query.page));
    } catch (error) {
        console.error(`Error retrieving multiple rows from adoptable pets`, error.message);
        next(error);
    }
});


module.exports = router;
