const app = require('./app');

//settings
app.set('port', process.env.PORT);

//Starting the server
app.listen(app.get('port'), (err) => {
    if (err) throw console.log(`Se ha generado el siguiente error: ${err}`);
    console.log("The server is runnin at http://localhost:",app.get('port'));
});