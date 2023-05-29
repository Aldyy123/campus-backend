const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

require('./config');
// Mengimport jalur API
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandle');

// Untuk mengakses body dari request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Untuk keamanan API
app.use(helmet())

// Cors menghindari error CORS
app.use(cors());

// Jalur untuk mengakses API
app.use('/', routes);
app.use(errorHandler)


app.listen(process.env.APPLICATION_PORT, () => {
    console.log(`Server started on port ${process.env.APPLICATION_PORT}`);
})
