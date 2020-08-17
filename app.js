var express = require('express');
var exphbs  = require('express-handlebars');
const payment = require('./controllers/payment');

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let port = process.env.PORT || 8080

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

// Rutas de pago

app.post('/paymentcreate',payment.createPreference);

app.get('/paymentsuccess',payment.success);

app.get('/paymentfailure',payment.failure);

app.get('/paymentpending',payment.pending);

// Fin rutas de pago

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(port);