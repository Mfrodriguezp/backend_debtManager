const express = require('express');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//const cookieParser = require('cookie-parser');
const app = express();
const debts_routes = require('./routes/debts');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/api/',debts_routes);
//app.use(cookieParser);

module.exports=app;