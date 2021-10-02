const sql = require('mssql');
const sqlConfig = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/index.js');

const skuTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`MSSQL connection opening with ${sqlConfig.server}...`)
   console.log('Trying to make skus table...')
   pool = await sql.connect(sqlConfig)
   const { tableset } = await sql.query` IF NOT EXISTS (SELECT [name] FROM sys.tables WHERE [name] = 'sku')
   CREATE TABLE skus (
    id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL
    , styleId bigint NOT NULL
    , size nvarchar(55) NOT NULL
    , quantity nvarchar(55) NULL
   ) `;
   console.log('skus table is has been created, please load data...')
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection closed.')
  }
 }

 module.exports = skuTable;