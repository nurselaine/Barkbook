'use strict';

const express = require('express');
const router = express.Router();


const petComments = require('../services/petComments');

router.get('/comment/:id', async(req, res, next) => {
    const { id } = req.params;
    try {
        res.json(await petComments.getMultiple(id));
    } catch (error) {
        console.error(`Error retrieving multiple rows from pet comments`, error.message);
        next(error);
    }
})

router.post('/comment/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        res.json(await petComments.create(req.body.comment, id));
    } catch (error){
        console.error(`Error while trying to add new comment to pet comments`, error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        res.json(await petComments.remove(id));
    } catch (error) {
        console.error(`Error deleting rows from pet comments`, error.message);
        next(error);
    }
})

module.exports = router;
