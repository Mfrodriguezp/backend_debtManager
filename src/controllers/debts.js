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
    },
    setCustomer : function(req,res){
        let params = req.body;
        if(params.customerName){
            mysqlConnection.query(`INSERT INTO customers (customerName,phoneNumber) VALUES ("${params.customerName}","${params.phoneNumber}")`,(err,result,fiels)=>{
                if(!err){
                    res.status(200).send({
                        message: "El cliente se ha creado correctamente"
                    });
                }else{
                    res.status(500).send({
                        message: `se ha producido un error en el servidor: ${err}`
                    });
                }
            });
        }
    }

};


module.exports = controller;