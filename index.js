const express = require('express');
const app = express();
const port = 4000;
require('./middlewares/bodyParser')(app);
var cors = require('cors')
const router = require('./routers');

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