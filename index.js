const express = require('express');
const app = express();
const port = 3000;
const router = require('./routers/index');
app.use('/', router);

app.listen(port, () => {
    console.log(`My app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.