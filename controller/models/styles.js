const sql = require('mssql');
const sqlConfig = require('../index.js');

const stylesTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`)
   console.log('Trying to make styles table...')
   pool = await sql.connect(sqlConfig)

   let testStyles = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'styles'");

   if (testStyles.recordsets[0][0].TABLE_NAME == 'styles') {
    console.log('The styles table already exists... ');
   }
   else {
    const { tableset } = await sql.query` CREATE TABLE dbo.styles (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, productId bigint NOT NULL, name nvarchar(600)NOT NULL,
    sale_price nvarchar(60), original_price bigint NULL, default_style bigint NOT NULL) `;
   console.log('styles table has been created, ensure data has been loaded...')
   }
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for styles closed.')
  }
 }

 module.exports = stylesTable;


