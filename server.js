const hostname = '127.0.0.1';
const port = 3000;

let mysql = require('mysql');
let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());

app.get('/', (req, res) => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "joker",
        password: "$4L%KKxW8&@9#5A37g*v",
        database: "jokebook",
    });

    con.connect(function(err) {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error while connecting to the database.');
            return

        }

        con.query("SELECT setup, punchline FROM jokes ORDER BY RAND() LIMIT 1", function (err, result, fields) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error while querying the database.');
                return

            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    });
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



