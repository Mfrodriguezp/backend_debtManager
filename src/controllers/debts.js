const mysqlConnection = require('../database');

var controller = {
    getCustomers: function (req, res) {
        mysqlConnection.query('SELECT * FROM getCustomers', (err, rows, fiels) => {
            if (!err) {
                if(!rows.length){
                    res.status(200).json({
                        customers: rows
                    });
                }else{
                    res.status(404).send({
                        message: "The clients table is empty"
                    });
                }
            }else{
                res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    getCustomer: function (req, res) {
        let customerId = req.params.id;

        mysqlConnection.query(`SELECT * FROM customers where idcustomers = ${customerId}`, (err, rows, fiels) => {
            if (!err) {
                if(!rows.length){
                    res.status(200).json({
                        customers: rows
                    });
                }else{
                    res.status(404).send({
                        message: "The clients ID not exist"
                    });
                }
            } else {
                res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    setCustomer: function (req, res) {
        let params = req.body;
        if (params.customerName) {
            mysqlConnection.query(`INSERT INTO customers (customerName,phoneNumber) VALUES ("${params.customerName}","${params.phoneNumber}")`, (err, result, fiels) => {
                if (!err) {
                    res.status(201).send({
                        message: "The Customer has been created success"
                    });
                } else {
                    res.status(500).send({
                        message: `The following error has been generated: ${err}`
                    });
                }
            });
        }
    },
    editCustomer: function (req, res) {
        let customerId = req.params.id;
        let params = req.body;
        mysqlConnection.query(`UPDATE customers SET customerName = "${params.customerName}", phoneNumber = "${params.phoneNumber}" WHERE idcustomers = ${customerId}`, (err, results, fiels) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        message: "The user request no exist"
                    });
                } else {
                    if (results.affectedRows >= 1) {
                        return res.status(201).send({
                            message: "The user has been modified correctly"
                        });
                    }
                }
            } else {
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    deleteCustomer: function (req, res) {
        let customerId = req.params.id;
        mysqlConnection.query("DELETE FROM customers WHERE idcustomers = ?", [customerId], (err, results, fiels) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        message: "The user request no exist"
                    });
                } else {
                    if (results.affectedRows >= 1) {
                        return res.status(200).send({
                            message: "The user has been deleted correctly"
                        });
                    }
                }
            } else {
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    getDebts: function (req, res) {
        mysqlConnection.query(`SELECT * FROM getDebts`,
            (err, rows, fiels) => {
                if (!err) {
                    if (!rows.length) {
                        return res.status(404).send({
                            message: "debts table is empty"
                        });
                    } else {
                        return res.status(200).send({
                            debts: rows
                        });
                    }
                } else {
                    return res.status(500).send({
                        message: `Se ha generado el siguiente error: ${err}`
                    });
                }
            });
    },
    getDebt: function (req, res) {
        let debtId = req.params.id;
        mysqlConnection.query(`select iddebts,customers.idcustomers, customers.customerName, debtValue, debtState, dateDebt, paymentDate 
            from debts inner JOIN customers 
            on debts.customers_idcustomers = customers.idcustomers WHERE iddebts =?;`, [debtId],
            (err, rows, fiels) => {
                if (!err) {
                    if (rows.length) {
                        return res.status(200).send({
                            debt: rows
                        });
                    } else {
                        return res.status(404).send({
                            message: "The id requested not exist"
                        });
                    }
                } else {
                    return res.status(500).send({
                        message: `The following error has been generated: ${err}`
                    });
                }
            });
    },
    setDebt: function (req, res) {
        let params = req.body;
        mysqlConnection.query('SELECT idcustomers,customerName FROM customers WHERE customerName = ?', [params.customerName], (err, rows, fiels) => {
            if (!err) {
                let data = rows.map((field) => {
                    return field.idcustomers;
                });
                if (data.length >= 0) {
                    mysqlConnection.query(`insert into debts (customers_idcustomers,debtValue,dateDebt,debtState) 
                                            VALUES (?,?,DATE_FORMAT(now(),'%Y-%m-%d'),'Debe')`, [data[0], params.debtValue],
                        (err, results, fiels) => {
                            if (!err) {
                                res.status(200).send({
                                    message: `Has creadted ${results.affectedRows} rows`
                                });
                            } else {
                                res.status(500).send({
                                    message: `The following error has been generated: ${err}`
                                });
                            }
                        });
                } else {
                    res.status(404).send({
                        message: "El cliente no se encuentra creado"
                    });
                }
            } else {
                res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    editDebt: function (req, res) {
        let debtId = req.params.id;
        let params = req.body;
        mysqlConnection.query(`UPDATE debts SET debtValue = ?, debtState = ?, paymentDate = DATE_FORMAT(now(),'%Y-%m-%d') 
                                WHERE  iddebts = ?`, [params.debtPayment, params.debtState, debtId], (err, results, fiels) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        message: "The debt request no exist"
                    });
                } else {
                    return res.status(200).send({
                        message: "The debt has been modified correctly"
                    });
                }
            } else {
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    deleteDebt: function (req, res) {
        let debtId = req.params.id;
        mysqlConnection.query(`DELETE FROM debts WHERE iddebts = ?`, [debtId], (err, results, fiels) => {
            if (!err) {
                if (results.affectedRows <= 0) {
                    return res.status(404).send({
                        message: "The debt ID request no exist"
                    });
                } else {
                    return res.status(200).send({
                        message: "the debt has been satisfactorily eliminated"
                    });
                }
            } else {
                return res.status(500).send({
                    message: `The following error has been generated: ${err}`
                });
            }
        });
    },
    getTotalDebts: function (req, res) {
        mysqlConnection.query('SELECT debtState, SUM(debtValue) AS totalDebts FROM debts GROUP BY debtState HAVING debtState = "Debe"',
            (err, rows, fiels) => {
                if (!err) {
                    return res.status(200).send({
                        totalDebts: rows
                    });
                } else {
                    return res.status(500).send({
                        message: `The following error has been generated: ${err}`
                    });
                }
            });
    }
};

module.exports = controller;