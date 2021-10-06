const express = require('express');
const router = express();
const db = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/mssqlOperations.js');

/* ROUTE FOR WILL CASEY  */
router.get('/', (req, res, next) => {
  const ids = req.query.ids.split(',').map(Number);
  const relatedArray = [];
  console.log(ids);
  async function related () {
    for (i = 0; i < ids.length; i++) {
      var promise = await db.getSDC(ids[i])
      relatedArray.push(promise)
      console.log(relatedArray)
    }
    res.status(200).send(relatedArray)
  }
  related();
})

module.exports = router;