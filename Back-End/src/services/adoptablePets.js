'use strict';

const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');


async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT pet_id, imgsrc FROM adoptable_pets`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function findOne(pet_id){
    const row = await db.query(
        `SELECT * FROM adoptable_pets WHERE pet_id = ${pet_id}`
    )

    const data = helper.emptyOrRows(row);
    return data;
}

async function create(petData){

    let size = data.length;
    let count = 0;

    for(let i = 0; i < size; i++){
        let row = await db.query(
            `INSERT INTO adoptable_pets (name, age, primary_color, url, imgsrc, pet_id, context, breed, gender, size, spayed_neutered, email, animal_type)
            VALUES (name=${petData[i].name}, age=${petData[i].age}, primary_color=${petData[i].primary_color}, url=${petData[i].url}, context=${petData[i].context}, breed=${petData[i].breed}, gender=${petData[i].gender}, size=${petData[i].size}, spay_neutered=${petData[i].spay_neutered}, email=${petData[i].email}, animal_type=${petData[i].animal_type} )`
        )

        if(row.affectedRows){
            count++;
        }
    }

    let message = `Added ${count}/${size} adoptable pets`;

    return {message};

}

module.exports = {
    getMultiple,
    findOne
}
