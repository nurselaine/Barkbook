'use strict';

const express = require('express');
const router = express.Router();

const adoptablePets = require('../services/adoptablePets');
const data = require('../../adoptable_pets.json');

router.get('/', async (req, res, next) => {
    try {
        res.json(await adoptablePets.getMultiple(req.query.page));
    } catch (error) {
        console.error(`Error retrieving multiple rows from adoptable pets`, error.message);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        res.json(await adoptablePets.findOne(id));
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
})

router.post('/', async(req, res, next) => {
    try{
        res.json(await adoptablePets.create(data.pets));
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
})

module.exports = router;
