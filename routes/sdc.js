const express = require('express');
const router = express();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

/* ROUTE FOR WILL CASEY  */

module.exports = router;