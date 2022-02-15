const express = require('express');
const app = express();
const debts_routes = require('./routes/debts');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/',debts_routes);


module.exports=app;