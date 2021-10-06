const express = require('express');
const router = express();
const db = require('../controller/mssqlOperations.js');

/* ROUTE FOR WILL CASEY  */
router.get('/', (req, res, next) => {
  const ids = req.query.ids.split(',').map(Number);
  const relatedArray = [];

  async function related () {
    for (i = 0; i < ids.length; i++) {
      var promise = await db.getSDC(ids[i])
      relatedArray.push(promise)
    }
    res.status(200).send(relatedArray[0][0])
  }
  related();
})

module.exports = router;