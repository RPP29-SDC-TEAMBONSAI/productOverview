const sql = require('mssql');
const sqlConfig = require('../index.js');

const productTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`);
   console.log('Trying to make product table...');
   pool = await sql.connect(sqlConfig);

   let testProduct = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'product'");

   if (testProduct.recordsets[0][0].TABLE_NAME == 'product') {
    console.log('The product table already exists... ');
   }
   else {
    const { tableset } = await sql.query` CREATE TABLE dbo.product (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, name nvarchar(55), slogan nvarchar(250)NOT NULL,
    description nvarchar(600), category nvarchar(55), default_price bigint) `;
    console.log('product table has been created, ensure data has been loaded...')
   }
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for product closed.')
  }
 }

 module.exports = productTable;