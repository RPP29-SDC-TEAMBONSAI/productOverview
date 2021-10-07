const sql = require('mssql');
const sqlConfig = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/index');

const skuTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`)
   console.log('Trying to make skus table...')
   pool = await sql.connect(sqlConfig)

   let testSkus = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'skus'");

   if (testSkus.recordsets[0][0].TABLE_NAME == 'skus') {
    console.log('The skus table already exists... ');
   }
   else {
    const { tableset } = await sql.query` CREATE TABLE skus (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, styleId bigint NOT NULL,
    size nvarchar(55) NOT NULL, quantity nvarchar(55) NULL) `;
    console.log('skus table is available, ensure data has been loaded...')
   }
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for skus closed.')
  }
 }

 module.exports = skuTable;