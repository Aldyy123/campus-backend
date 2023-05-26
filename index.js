const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

require('./config');
// Mengimport jalur API
const routes = require('./routes');

// Untuk mengakses body dari request
app.use(bodyParser.urlencoded({extended: true}));

// Untuk keamanan API
app.use(helmet())

// Cors menghindari error CORS
app.use(cors());

// Jalur untuk mengakses API
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
