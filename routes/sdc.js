const express = require('express');
const router = express();
const db = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/mssqlOperations.js');

/* ROUTE FOR WILL CASEY  */
router.get('/', (req, res, next) => {
  db.getProduct(req.query.ids).then((data) => {
    res.status(200).send(data[0][0])
  })
  .catch(err => (console.log('Error with /product ', err)))
})

module.exports = router;