const express = require('express');
const debtController = require('../controllers/debts');
const checkJwt = require('../middleware/checkJwt');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

//Routes
router.get('/test',debtController.test);
router.get('/getCustomers',debtController.getCustomers);
router.get('/getCustomer/:id',debtController.getCustomer);
router.post('/setCustomer',[checkJwt.checkJwt],debtController.setCustomer);
router.put('/editCustomer/:id',[checkJwt.checkJwt],debtController.editCustomer);
router.delete('/deleteCustomer/:id',[checkJwt.checkJwt],debtController.deleteCustomer);
router.get('/getDebts',[checkJwt.checkJwt],debtController.getDebts);
router.get('/getDebt/:id',debtController.getDebt);
router.post('/setDebt',[checkJwt.checkJwt],debtController.setDebt);
router.put('/editDebt/:id',[checkJwt.checkJwt],debtController.editDebt);
router.delete('/deleteDebt/:id',[checkJwt.checkJwt],debtController.deleteDebt);
router.get('/getTotalDebts',debtController.getTotalDebts);
router.patch('/changePassword',[checkJwt.checkJwt],debtController.changePassword);
router.get('/isAuth',debtController.isAuth);
//admin only
router.post('/registrerNewUser',[checkJwt.checkJwt,checkRole(['admin'])],debtController.registrerNewUser);
router.post('/login',debtController.login);
router.get('/logout',debtController.logout);

module.exports = router;
