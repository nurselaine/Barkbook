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
    let result = await db.query(
        `INSERT INTO adoptable_pets (name,age, primary_color, breed, gender, size, url, imgsrc, context, spayed_neutered, email,animal_type)
        VALUES ("${petData.name}", "${petData.age}", "${petData.primary_color}", "${petData.breed}", "${petData.gender}", "${petData.size}", "${petData.url}", "${petData.imgsrc}", "${petData.context}", ${petData.spayed_neutered}, "${petData.email}", "${petData.animal_type}")`
    );

    let message = `Error, something went wrong trying to add in data`;

    if(result.affectedRows){
        message = 'Sucessfully added dog data';
    }

    return { message };
}

// async function update(petData){
//     let result = await db.query(
//         `UPDATE adoptable_pets SET `
//     )
// }

async function remove(id){
    let row = await db.query(
        `DELETE FROM adoptable_pets WHERE pet_id=${id}`
    );
    let message = `Error in deleting adoptable pet data`;

    if(row.affectedRows){
        message = `Pet data successfully deleted`;
    }
    return {message};
}

module.exports = {
    getMultiple,
    findOne,
    create,
    remove,
}
