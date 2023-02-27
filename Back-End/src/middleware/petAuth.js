'use strict';

const express = require('express');
const app = express();

const axios = require('axios');

module.exports = async (req, res, next) => {

    try {
        const response = await axios.post(
            'https://api.petfinder.com/v2/oauth2/token',
            `grant_type=client_credentials&client_id=${process.env.PET_API_KEY}&client_secret=${process.env.PET_API_SECRET}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        if(response.data){
            let token = response.data.access_token;
            console.log("token => ", typeof token);
            req.headers.authorization = `Bearer ${token}`;
            next();
        }
    } catch (err) {
        next('Invalid Credentials');
    }
}
