'use strict';

const db = require('./db');
const helper = require('../../helper');
const config = require('../../config');

async function getMultiple(pet_id){
    let rows = await db.query(
        `SELECT * FROM pet_comments WHERE id=${pet_id}`
    )

    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(pet, pet_id){
    let result = await db.query(
        `INSERT INTO pet_comments (comment, pet_id, comment_id) VALUES (
            comment=${pet.comment},
            pet_id=${pet_id},
            comment_id=${pet.comment_id}
        )`
    )

    let message = `Error in adding new comment to database`;

    if(result.affectedRows){
        message = `Successfully added comment to pet profile!`
    }
    return { message };
}

async function remove(comment_id){
    let result = await db.query(
        `DELETE FROM pet_comments WHERE comment_id=A${comment_id}`
    );
}

module.exports = {
    getMultiple,
    create,
    remove
}
