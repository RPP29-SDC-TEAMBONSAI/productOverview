const sql = require('mssql');
const sqlConfig = require('../index');

const photosTable = async () => {
  let pool;
  try {
   // make sure that any items are correctly URL encoded in the connection string
   console.log(`Connecting to MSSQL from ${sqlConfig.server}...`);
   console.log('Trying to make photos table...');
   pool = await sql.connect(sqlConfig);

   let testPhotos = await pool.request().query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'photos'");

   if (testPhotos.recordsets[0][0].TABLE_NAME == 'photos') {
     console.log('The photos table already exists... ');
   } else {
    const { tableset } = await sql.query` CREATE TABLE dbo.photos (id bigint IDENTITY(1,1) PRIMARY KEY CLUSTERED NOT NULL, styleId bigint, url nvarchar(max)) `;
    console.log('photos table has been created, ensure data has been loaded...');
   }
  } catch (err) {
   console.log('Query ' + err) // ... error checks
  } finally {
    await pool.close();
    console.log('Connection for photos closed.')
  }
 }

 module.exports = photosTable;