require('dotenv').config();
const port = process.env.PORT || 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const products = require('./routes/products');
const sdc = require('./routes/sdc');

const sqlConfig = require('./controller/index.js');
const styles = require('./controller/models/styles.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/products', products);
app.use('/sdc', sdc);

app.listen(port, function() {
  console.log(`Sever is listening on port ${port}`);
  }).on('error', function(err) {
       if (err.errno === 'EADDRINUSE') {
          console.log(`Port ${port} is already in use!`);
       } else {
         console.log(`Error returned for express server: ${err}`);
        }
      });