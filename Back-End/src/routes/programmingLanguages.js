const express = require('express');
const router = express.Router();

const programmingLanuages = require('../services/programmingLanguages');

router.get('/', async (req, res, next) => {
    try {
        res.json(await programmingLanuages.getMultiple(req.query.page));
    } catch (error) {
        console.error(`Error while getting progamming languages `, error.message);
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await programmingLanuages.create(req.body));
    } catch (error) {
        console.error(`Error whlie creating programming language`, error.message);
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json(await programmingLanuages.update(id, req.body));
    } catch (error) {
        console.error(`Error while updating programming language`);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json( await programmingLanuages.findOne(id));
    } catch (error) {
        console.error(`Error while finding one programming language`);
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("id => ", id);
        res.json( await programmingLanuages.remove(id));
    } catch (error) {
        console.error(`Error deleting a language from programming language`);
        next(error);
    }
})

module.exports = router;
