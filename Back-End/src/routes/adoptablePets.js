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
        let size = data.pets.length;
        let count = 0;
        let pet_data = data.pets;

        for(let i = 0; i < size; i++){
            pet_data[i].spayed_neutered = pet_data[i].spayed_neutered ? 0 : 1;
            // console.log(pet_data[i]);
            await adoptablePets.create(pet_data[i]);
            count++;
        }
        res.json(`Added ${count}/${size} adoptable pets`)
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        res.json(await adoptablePets.update(req.body, id));
    } catch (error){
        console.error(`Error while fetching pet data`, error.message);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("id => " + id)
        res.json(await adoptablePets.remove(id));
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
})

module.exports = router;
