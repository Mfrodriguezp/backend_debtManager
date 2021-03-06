const express = require('express');
const debtController = require('../controllers/debts');

const router = express.Router();

//Routes
router.get('/getCustomers',debtController.getCustomers);
router.get('/getCustomer/:id',debtController.getCustomer);
router.post('/setCustomer',debtController.setCustomer);
router.put('/editCustomer/:id',debtController.editCustomer);
router.delete('/deleteCustomer/:id',debtController.deleteCustomer);
router.get('/getDebts',debtController.getDebts);
router.get('/getDebt/:id',debtController.getDebt);
router.post('/setDebt',debtController.setDebt);
router.put('/editDebt/:id',debtController.editDebt);
router.delete('/deleteDebt/:id',debtController.deleteDebt);
router.get('/getTotalDebts',debtController.getTotalDebts);

module.exports = router;
