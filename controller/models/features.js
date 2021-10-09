const sql = require('mssql');
const sqlConfig = require('../index.js');

const featuresTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`)
   console.log('Trying to make features table...')
   pool = await sql.connect(sqlConfig)

   let testFeatures = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'features'");

   if (testFeatures.recordsets[0][0].TABLE_NAME == 'features') {
    console.log('The features table already exists... ');
   }
   else {
    const { tableset } = await sql.query` CREATE TABLE dbo.features (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, product_id bigint NOT NULL, feature nvarchar(250)NOT NULL,
    value nvarchar(60)) `;
    console.log('features table has been created, ensure data has been loaded...')
   }
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for features closed.')
  }
 }

 module.exports = featuresTable;
