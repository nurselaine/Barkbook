'use strict';

const db = require('./db');
const helper = require('../../helper');

async function getMultiple(pet_id){
    let rows = await db.query(
        `SELECT * FROM pet_likes WHERE id=${pet_id}`
    )

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}
