const express = require('express');
const app = express();
const port = 4000;
var cors = require('cors')
const router = require('./routers');
require('dotenv').config();
app.use(cors());
require('./middlewares/bodyParser')(app);
// const formidableMiddleware = require('express-formidable'); 
// app.use(formidableMiddleware());
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}, router);
app.use(express.static(__dirname + 'public'));
app.listen(port, () => {
    console.log(`My app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.