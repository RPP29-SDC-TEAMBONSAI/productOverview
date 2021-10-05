const sql = require('mssql');
const sqlConfig = require('/home/bofowzi/Documents/rpp29/sdc/productOverview/controller/index.js');

const featuresTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`)
   console.log('Trying to make features table...')
   pool = await sql.connect(sqlConfig)
   const { tableset } = await sql.query` CREATE TABLE dbo.features (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, product_id bigint NOT NULL, feature nvarchar(250)NOT NULL,
    value nvarchar(60)) `;
   console.log('features table has been created, ensure data has been loaded...')
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for features closed.')
  }
 }

 module.exports = featuresTable;
