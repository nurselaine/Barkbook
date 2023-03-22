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
    console.log()
    try {
        res.json(await adoptablePets.findOne(id));
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
})

router.get('/size/:size', async (req, res, next) => {
const { size } = req.params;
    try {
        res.json(await adoptablePets.findBySize(size));
    } catch (error){
        console.error(`Error while fetching pet data`, error.message);
    }
})

router.get('/age/:age', async (req, res, next) => {
    const { age } = req.params;
    try {
        res.json(await adoptablePets.findByAge(age));
    } catch (error) {
        console.log(`Error while fetching dogs by age: ${error.message}`);
    }
})

router.post('/', async(req, res, next) => {
    try{
        let size = data.pets.length;
        let count = 0;
        let pet_data = data.pets;

        for(let i = 0; i < size; i++){
            pet_data[i].spayed_neutered = pet_data[i].spayed_neutered ? 0 : 1;
            pet_data[i].imgsrc = pet_data[i].imgsrc[0]?.full;
            pet_data[i].primary_imgsrc = pet_data[i].primary_imgsrc?.full;
            console.log("imgsrc => ", pet_data[i].imgsrc);
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

router.delete('/', async (req, res, next) => {
    try {
        res.json(await adoptablePets.removeAll());
    } catch (error) {
        console.error(`Error while fetching pet data`, error.message);
    }
})

module.exports = router;
