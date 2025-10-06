# JokebookWeb

This is a small joke app that tells jokes sourced from your MySQL database.
Thanks for viewing!

## Local Deployment
### General Overview
The project provides 2 out of 3 pieces needed to deploy locally.
The website package is intended to live at a path on a webserver that can be accessed by yourself.
The backend package is intended to be hosted on a server that can send and receive http requests.
You will need to provide the MySQL database filled with jokes.

### Local Deployment Example

A possible way of hosting this service locally is through the use of XAMPP (https://www.apachefriends.org/).
We don't need all of these services just the apache server for hosting our website and the mariadb (MySQL) for our database.

Once you have installed XAMPP, you can just paste the files from under the `website` directory in the project over to the `INSTALL DIR/xampp/htdocs` This will allow the website of be visible from localhost.
For the MySQL database you can use the included PHPmyAdmin (http://localhost/phpmyadmin/) to administrate your database.
Important is to create a schema for your jokes called `jokebook`. Under this new schema make a table called `jokes`.

For this example I will use jokes sourced from https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json

This table should have 4 fields `id (INT) AUTOINCREMENT, type VARCHAR, setup VARCHAR, punchline VARCHAR`. With no nulls allowed.
I used a json to sql converter (https://www.beekeeperstudio.io/tools/json-to-sql) to convert these jokes to INSERT statements in a .sql file, then imported the file to the table using phpmyadmin.

You should also create a user that can access the table, these credentials can be what ever you want but an example user can be found in `backend/config.js`.

For the backend, you can run this in terminal from the project with `node server.js`. Make sure the database credentials are correct in `config.js`

Additionally ensure the host and port are same in `config.js` and the top line of the website javascript file `website/scripts/index.js` or else the website will be looking in the wrong place for your backend server.

With all of these things running you should be able to connect to `localhost` or `localhost/website` depending on if you copied the whole project directory to the htdocs folder or just the files and be served some jokes!
