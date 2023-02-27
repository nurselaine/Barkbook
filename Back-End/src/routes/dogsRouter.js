'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const axios = require('axios');
const router = express.Router();

const petAuth = require('../middleware/petAuth');

router.get('/getAnimals', petAuth, async (req, res, err) => {

    console.log(req.headers);
    const token = req.headers.authorization;
    console.log("Passed Token => ", token);
    // get animal data
    if(token){
        try {
            const response = await axios.get('https://api.petfinder.com/v2/animals', {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data.animals.length);
            res.status(200).send(response.data);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(404).send(`bad token. check credentials`);
    }
});

module.exports = router;
