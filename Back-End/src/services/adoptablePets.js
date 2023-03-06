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

    let size = petData.length;
    let count = 0;

    for(let i = 0; i < size; i++){
        let row = await db.query(
            `INSERT INTO adoptable_pets
            (pet_id,name,age, primary_color, breed, gender, size, url, imgsrc, context, spayed_neutered, email,animal_type)
            VALUES
            (${petData[i].pet_id},${petData[i].name},${petData[i].age},${petData[i].primary_color},${petData[i].breed},${petData[i].gender},${petData[i].size},${petData[i].url},${petData[i].imgsrc},${petData[i].context},${petData[i].spayed_neutered},${petData[i].email},${petData[i].animal_type})`
        )

        if(row.affectedRows){
            count++;
        }
    }

    let message = `Added ${count}/${size} adoptable pets`;

    return { message };

}

module.exports = {
    getMultiple,
    findOne,
    create,
}
