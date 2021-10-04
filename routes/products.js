const express = require('express');
const router = express();
const db = ('../controller/mssqlOperations');

// const wrap = fn => (...args) => fn(...args).catch(args[2]);

/* GET /products */
// router.get('/', wrap(async (req, res, next) => {}));

router.get('/', (req, res, next) => {
  db.getProducts().then((data) => {
    res.status(200).send(data)
  })
  .catch(err => (console.log('Error with /products ', err)))
});

/* GET /products/:product_id */
router.get('/:product_id', (req, res, next) => {
  db.getProduct(req.params.product_id).then((data) => {
    res.status(200).send(data)
  })
  .catch(err => (console.log('Error with /products ', err)))
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
