const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(6000);
    })
    .catch(err =>{
        console.log(err);
    })
