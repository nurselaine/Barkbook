const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the BarkBook Server!");
})

app.get('*', (req, res, err) => {
    res.status(400).send('uh oh, bad request!');
})

function start(){
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    })
}


module.exports = start;
