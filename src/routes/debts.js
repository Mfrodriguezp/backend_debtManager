const express = require('express');
const debtController = require('../controllers/debts');
const checkJwt = require('../middleware/checkJwt');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

//Routes
router.get('/test',debtController.test);
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
//admin only
router.post('/registrerNewUser',[checkJwt.checkJwt,checkRole(['Admin'])],debtController.registrerNewUser);
router.post('/login',debtController.login);
router.get('/logout',debtController.logout);

module.exports = router;
