const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
const categoriesRouters = require('./routes/categories');
const servicesRouters = require('./routes/services');
const usersRouters = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouters);
app.use(`${api}/services`, servicesRouters);
app.use(`${api}/users`, usersRouters);


//Database
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database Connection')
    })
    .catch((err) => {
        console.log(err)
    })

//server
app.listen(3000, () => {

    console.log('server is running http://localhost:3000');
})

