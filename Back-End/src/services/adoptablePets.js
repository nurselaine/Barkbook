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

module.exports = {
    getMultiple,
    findOne
}
