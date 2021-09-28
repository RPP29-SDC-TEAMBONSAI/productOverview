const express = require('express');
const router = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

/* GET /products */

/* GET /products/:product_id */

/* GET /products/:prodcut_id/styles */

/* GET /products/:product_id/related */


module.exports = router;
