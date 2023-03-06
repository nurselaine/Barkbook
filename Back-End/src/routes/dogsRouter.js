'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const fs = require('fs');

const axios = require('axios');
const router = express.Router();

const petAuth = require('../middleware/petAuth');
const { json } = require('express');

router.get('/getAnimals', petAuth, async (req, res, err) => {

    const token = req.headers.authorization;
    // get animal data
    if(token){
        try {
            const response = await axios.get('https://api.petfinder.com/v2/animals?type=dog', {
                headers: {
                    'Authorization': token
                }
            });
            let data = sanitizeData(response.data);
            res.status(200).send(response.data);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(404).send(`bad token. check credentials`);
    }
});

function sanitizeData(data){

    const petArr = data.animals;
    let jsonData = {};

    jsonData.pets = petArr.map(pet => ({
        "name": pet.name,
        "age": pet.age,
        "primary_color": pet.colors,
        "url": pet.url,
        "imgsrc": pet.photos[0].full,
        "pet_id": pet.id,
        "context": pet.description,
        "breed": pet.breeds.primary,
        "gender": pet.gender,
        "size": pet.size,
        "spayed_neutered": pet.attributes.spayed_neutered,
        "email": pet.contact.email,
        "animal_type": pet.type,

    }));

    let stringifyData = JSON.stringify(jsonData, null, 2);

    fs.writeFile('adoptable_pets.json', stringifyData, function(err) {
        if(err) throw err;
        console.log('Saved!');
    })

    return petArr;
}

module.exports = router;
