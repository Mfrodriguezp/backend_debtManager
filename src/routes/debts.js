const express = require('express');
const debtController = require('../controllers/debts');

const router = express.Router();

//Routes
router.get('/getCustomers',debtController.getCustomers);
router.get('/getCustomer/:id',debtController.getCustomer);
router.get('/getDebts',debtController.getDebts);
router.post('/setCustomer',debtController.setCustomer);

module.exports = router;