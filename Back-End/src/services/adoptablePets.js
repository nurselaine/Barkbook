'use strict';

const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');


async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, name, pet_id, imgsrc, primary_imgsrc FROM adoptable_pets`
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
    console.log("Pet id => ", petData.pet_id);
    let result = await db.query(
        `INSERT INTO adoptable_pets (pet_id,name,age, primary_color, breed, gender, size, url, imgsrc, primary_imgsrc, context, spayed_neutered, email,animal_type)
        VALUES (${petData.pet_id}, "${petData.name}", "${petData.age}", "${petData.primary_color}", "${petData.breed}", "${petData.gender}", "${petData.size}", "${petData.url}", "${petData.imgsrc}", "${petData.primary_imgsrc}", "${petData.context}", ${petData.spayed_neutered}, "${petData.email}", "${petData.animal_type}")`
    );

    let message = `Error, something went wrong trying to add in data`;

    if(result.affectedRows){
        message = 'Sucessfully added dog data';
    }

    return { message };
}

async function update(petData, id){
    console.log("pet data => ",petData);
    console.log("id => ", id);
    let result = await db.query(
        `UPDATE adoptable_pets SET pet_id=${petData.pet_id}, name = "${petData.name}", age="${petData.age}", primary_color="${petData.primary_color}", breed="${petData.breed}", gender="${petData.gender}", size="${petData.size}", url="${petData.url}", imgsrc="${petData.imgsrc}", primary_imgsrc="${petData.primary_imgsrc}", context="${petData.context}", spayed_neutered=${petData.spayed_neutered}, email="${petData.email}", animal_type="${petData.animal_type}"
        WHERE id=${id}`
    )

    let message = `Error in updating programming language`;

    if(result.affectedRows){
        message = `Programming language updated succesfully!`;
    }

    return { message };
}

async function removeAll(petData, id){
    let result = await db.query(
        `DELETE FROM adoptable_pets`
    );
    let message = `Error in deleting adoptable pet data`;

    if(result.affectedRows){
        message = `Pet data successfully deleted`;
    }
    return {message};
}

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

// this method does not work
async function getBySize(pet_size, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    let rows = await db.query(
        `SELECT id, name, pet_id, imgsrc FROM adoptable_pets WHERE size="${pet_size}"`
    )
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


module.exports = {
    getMultiple,
    findOne,
    create,
    update,
    remove,
    removeAll,
    getBySize,
}
