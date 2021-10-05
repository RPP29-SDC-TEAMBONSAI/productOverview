const express = require('express');
const router = express();
const db = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/mssqlOperations.js');

// const wrap = fn => (...args) => fn(...args).catch(args[2]);

/* GET /products */
// router.get('/', wrap(async (req, res, next) => {}));

router.get('/', (req, res, next) => {
  console.log('Inside the products route ')
  db.getProducts().then((data) => {
    console.log(data);
    res.status(200).send(data.recordsets)
  })
  .catch(err => (console.log('Error with /products ', err)))
});

/* GET /products/:product_id */
router.get('/:product_id', (req, res, next) => {
  console.log('Inside the products id route')
  db.getProduct(req.params.product_id).then((data) => {
    res.status(200).send(data[0][0])
  })
  .catch(err => (console.log('Error with /product ', err)))
})

/* GET /products/:prodcut_id/styles */
router.get('/:product_id/styles', (req, res, next) => {
  db.getStyles(req.params.product_id).then((data) => {
    res.status(200).send(data)
  })
  .catch(err => (console.log('Error with /products ', err)))
})


/* GET /products/:product_id/related */
router.get('/:product_id/related', (req, res, next) => {
  db.getRelated(req.params.product_id).then((data) => {
    res.status(200).send(data)
  })
  .catch(err => (console.log('Error with /products ', err)))
})


module.exports = router;
