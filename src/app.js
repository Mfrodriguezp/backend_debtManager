const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express();
const debts_routes = require('./routes/debts');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
    credentials: true
}
));
app.use('/api/', debts_routes);
app.use(function (req, res, next) {
    if (!req.userName) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        next();
    }
});

module.exports = app;