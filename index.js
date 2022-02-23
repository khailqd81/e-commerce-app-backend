const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const port = 4000;
const router = require('./routers/index');
// app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}, router);
app.listen(port, () => {
    console.log(`My app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.