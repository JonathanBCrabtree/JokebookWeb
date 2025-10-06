let config = require('./config');
let mysql = require('mysql');
let express = require('express');
let cors = require('cors');
let app = express();

let dbpool = mysql.createPool(config.dbconfig)

app.use(cors());

app.get('/randomjoke', (req, res) => {
    dbpool.query("SELECT setup, punchline FROM jokes ORDER BY RAND() LIMIT 1", function (err, result) {
        if (err) {
            respondError(res, err, 'Error while querying the database.')
        } else if (result.length < 1) {
            respondError(res, `There are no jokes in the database.`)
        } else {
            respondSuccess(res, result[0]);
        }
    });
})

let respondError = function (res, err, msg) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(msg);
}

let respondSuccess = function (res, result) {
    console.log(result);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
}

app.listen(config.port, config.host, () => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
});



