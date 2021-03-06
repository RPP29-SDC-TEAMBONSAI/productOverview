require('dotenv').config();
const port = process.env.PORT || 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const products = require('./routes/products');
const sdc = require('./routes/sdc');

const skuSchema = require('./controller/models/skus');
const stylesSchema = require('./controller/models/styles');
const featuresSchema = require('./controller/models/features');
const productSchema = require('./controller/models/product');
const photoSchema = require('./controller/models/photos');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/products', products);
app.use('/sdc', sdc);

app.listen(port, function() {
  console.log(`Backend is listening on port ${port}`);
  }).on('error', (err) => (console.log('Backend ' + err)));

// skuSchema();
// stylesSchema();
// featuresSchema();
// productSchema();
// photoSchema();