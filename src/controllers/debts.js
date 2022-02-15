const mysqlConnection = require('../database');

var controller = {
    getCustomers: function (req, res) {
        mysqlConnection.query('SELECT * FROM customers', (err, rows, fiels) => {
            if (!err) {
                res.status(200).json({
                    customers: rows
                });
            }
        });
    },
    getCustomer: function (req, res) {
        let customerId = req.params.id;

        mysqlConnection.query(`SELECT * FROM customers where idcustomers = ${customerId}`, (err, rows, fiels) => {
            if (!err) {
                res.status(200).json({
                    customer: rows
                });
            } else {
                res.status(404).send({
                    message: "El cliente buscado no existe"
                });
            }
        });
    },
    setCustomer: function (req, res) {
        let params = req.body;
        if (params.customerName) {
            mysqlConnection.query(`INSERT INTO customers (customerName,phoneNumber) VALUES ("${params.customerName}","${params.phoneNumber}")`, (err, result, fiels) => {
                if (!err) {
                    res.status(200).send({
                        message: "El cliente se ha creado correctamente"
                    });
                } else {
                    res.status(500).send({
                        message: `se ha producido un error en el servidor: ${err}`
                    });
                }
            });
        }
    },
    editCustomer: function (req, res) {
        let customerId= req.params.id;
        let params = req.body;
        mysqlConnection.query(`UPDATE customers SET customerName = "${params.customerName}", phoneNumber = "${params.phoneNumber}" WHERE idcustomers = ${customerId}`,(err, results, fiels)=>{
            if(!err){
                if(results.affectedRows ===0){
                    return res.status(404).send({
                        message: "The user request no exist"
                    });
                }else{
                    if(results.affectedRows >= 1){
                        return res.status(200).send({
                            message: "The user has been modified correctly"
                        });
                    }
                }
            }else{
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    deleteCustomer:function(req,res){
        let customerId= req.params.id;
        mysqlConnection.query("DELETE FROM customers WHERE idcustomers = ?",[customerId],(err, results, fiels)=>{
            if(!err){
                if(results.affectedRows ===0){
                    return res.status(404).send({
                        message: "The user request no exist"
                    });
                }else{
                    if(results.affectedRows >= 1){
                        return res.status(200).send({
                            message: "The user has been deleted correctly"
                        });
                    }
                }
            }else{
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    getDebts: function (req, res) {
        mysqlConnection.query(`select iddebts,customers.idcustomers, customers.customerName, debtValue, debtState, dateDebt, paymentDate 
                                from debts inner JOIN customers 
                                on debts.customers_idcustomers = customers.idcustomers;`,
            (err, rows, fiels) => {
                if (!err) {
                    res.status(200).json({
                        debts: rows
                    });
                } else {
                    res.status(404).send({
                        message: `Se ha generado el siguiente error: ${err}`
                    });
                }
            });
    }

};

module.exports = controller;